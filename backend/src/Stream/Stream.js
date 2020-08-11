/* eslint-disable */
const fs = require('fs');
const spawn = require('child_process').spawn;
const Events = require('events');

module.exports = class {
	constructor(path, downloads) {
		this.events = new Events();
		
		this.settings = {
			bandwidth: {
				"1000k": 1240800
			},
			codecs: {
				"h.264 High": "avc1.64001f",
				aac: "mp4a.40.2"
			},
			manifest: "hls.m3u8",
			playlist: "playlist.m3u8",
			patterns: {
				movies: /.avi|.mp4|.mkv|.webm|.vob|.ogg|.ogv|.flv|.amv|.mov/,
				subtitles: /.srt|.webvtt|.ass/
			},
			ffmpeg: {
				timeout: 5000,
				downloadThreshold: 10000000,
				hls_time: 8,
				patterns: {
					duration: /#EXTINF:(?<duration>\d+\.\d+)/g,
				}
			}
		}
		
		this.path = null;
		this.files = null;
		this.playlist = null;
		
		// converted subtitles
		this.subtitles = [];
	}
	
	initialize(path, downloads) {
		return new Promise( (resolve, reject) => {
			this.path = path;
			this.downloads = downloads;
			this.status = 'idle';
			this.ready = false;
			this.restart = true;
			this.downloaded = 0;
			this.process = null;
			
			const movies = this.downloads.filter(file => file.match(this.settings.patterns.movies))
			if (!movies.length) return reject('NKNWNFRMT');
			
			this.files = {
				movie: movies.length ? movies[0] : null,
				subtitles: this.downloads.filter(file => file.match(this.settings.patterns.subtitles))
			}
			
			// set converted if manifest contains endlist
			// else remove last segment and associated file
			fs.readFile(this.path + this.settings.manifest, 'utf8', (err, data) => {
				this.converted = !err && data.match(/#EXT-X-ENDLIST/) !== null;
				
				const lines = data ? data.split('\n') : [];

				// Update access time of manifest for garbage collection
				if (!err) fs.utimes(this.path + this.settings.manifest, new Date(), new Date(), () => {});
				
				if (!err && !this.converted && lines.length > 5) {
					let segment = '';
					data = lines.filter( (line, index) => {
						if ( index == (lines.length - 2) && line.match(/hls/) ) segment = line; 
						return index < (lines.length - 3);
					}).join('\n') + '\n';

					fs.unlink(this.path + segment, err => {
						if (err) return reject('CNTDLT');

						fs.writeFile(this.path + this.settings.manifest, data, err => {
							if (err) reject('CNTWRT')
							else resolve();
						});
					});
				} else
					resolve();
			});
		});
	}
	
	finalizeManifest() {
		fs.readFile(this.path + this.settings.manifest, 'utf8', (err, data) => {
			if (!err) {
				data += '#EXT-X-ENDLIST\n';
				fs.writeFile(this.path + this.settings.manifest, data, err => {});
			}
		});
	}
	
	createPlaylist() {
		return new Promise( (resolve, reject) => {
			const data =
			"#EXTM3U\n" +
			"#EXT-X-VERSION:3\n" +
			'#EXT-X-STREAM-INF:BANDWIDTH=' + this.settings.bandwidth["1000k"] +
			',CODECS="' + this.settings.codecs["h.264 High"] + ',' + this.settings.codecs["aac"] + '"\n' +
			this.settings.manifest + "\n\n";
			
			fs.exists(this.path + this.settings.playlist, exists => {
				this.playlist = this.settings.playlist;
				if (exists) resolve();
				else
				fs.writeFile(this.path + this.settings.playlist, data, (err) => {
					if (err) return reject('CNTCRT');
					resolve();
				});
			});
		});
	}
	
	convertSubtitles() {
		return new Promise(async resolve => {
			// if there is no subtitles or subtitles already converted
			if (!this.files.subtitles.length || this.subtitles.length) return resolve();
			
			for (const subtitle of this.files.subtitles) {
				
				await new Promise (resolve => {
					let convertedSubtitles = subtitle.split('.');
					convertedSubtitles.pop();
					convertedSubtitles = this.path + convertedSubtitles.join('.') + '.vtt';

					let options = [
						'-y',
						'-i', this.path + subtitle,
						convertedSubtitles
					];

					this.process = spawn('ffmpeg', options);
					this.process.on('close', () => {
						this.subtitles.push(convertedSubtitles);
						resolve();
					});
				});

			}

			resolve();
		});
	}
	
	async convertVideo() {		
		if (this.converted) this.events.emit('manifest-created');
		else if (this.status == 'idle' && this.downloaded > this.settings.ffmpeg.downloadThreshold) {
			this.status = 'converting';
			
			const offset = await this.parseManifest().catch(() => {}		);
			
			console.log('Stream: Converting video ' + this.files.movie);

			let options = [
				'-i', this.path + this.files.movie,
				'-ss', offset,
				'-g', 60, // group pictures
				'-keyint_min', 30, // insert a key frame every 30 frames
				'-filter:v', 'fps=fps=30',
				'-c:v', 'libx264',
				'-b:v', '1000k',
				'-preset', 'veryfast',
				'-tune', 'film',
				'-crf', 24,
				'-c:a', 'aac',
				'-b:a', '128k',
				'-movflags', 'frag_keyframe+empty_moov',
				'-f', 'hls',
				'-hls_time', this.settings.ffmpeg.hls_time,
				'-hls_init_time', this.settings.ffmpeg.hls_time,
				'-hls_playlist_type', 'event',
				'-hls_flags', 'append_list+omit_endlist',
				this.path + this.settings.manifest
			];
			
			this.process = spawn('ffmpeg', options);
			this.process.stderr.on('data', () => {
				if (this.ready) this.process.stderr.removeAllListeners('data');
				this.checkManifest();
			});
			
			// this.process.stderr.setEncoding('utf8'); // debug
			// this.process.stderr.on('data', data => console.log(data) ); // debug
			
			this.process.on('close', (code, signal) => {
				// reset value to relaunch converting next time the downloaded size exceeds download threshold
				this.downloaded = 0;

				console.log('Stream: End converting video');
				if (signal == 'SIGTERM'|| code == 255) return;
				
				if (this.restart) {
					this.status = 'idle';
					this.videoTimer = setTimeout(() => this.convertVideo(), this.settings.ffmpeg.timeout);
				} else {
					this.status = 'finished';
					this.finalizeManifest();
				}
			});
			
		} else if (this.restart)
			this.videoTimer = setTimeout(() => this.convertVideo(), this.settings.ffmpeg.timeout);
	}
	
	close() {
		if (this.process)  {
			clearTimeout(this.videoTimer);
			this.status = 'cancelled';
			this.process.kill();
		}
	}
	
	parseManifest() {
		return new Promise(resolve => {
			fs.exists(this.path + this.settings.manifest, exists => {
				if (!exists) return resolve( 0 );
				
				const data = fs.readFileSync(this.path + this.settings.manifest).toString();
				const durationMatch = [ ...data.matchAll( this.settings.ffmpeg.patterns.duration ) ];
				
				let duration = 0;
				for (var i = 0; i < durationMatch.length; i++){
					duration += parseFloat(durationMatch[i][1]);
				}
				
				resolve( duration );
			});
		});
	}
	
	checkManifest() {
		if (this.ready === false) {
			fs.exists(this.path + this.settings.manifest, exists => {
				if (exists) {
					this.ready = true;
					this.events.emit('manifest-created');
				}
			});
		}
	}
}