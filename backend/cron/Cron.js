const cron = require('node-cron');
const fs = require('fs');

module.exports = class {
    constructor(videoFolder, manifest) {
        this.folder = videoFolder;
        this.manifest = manifest;
        this.interval = 30;
    }

    cleanUp() {
        cron.schedule('0 0 * * *', () => {
            // traverse video folder
            fs.readdir(this.folder, (err, files) => {
                if (err) return;

                files.forEach(file => {
                    const manifest = this.folder + '/' + file + '/' + this.manifest;

                    fs.stat(manifest, (err, stats) => {
                        if (err) return;

                        const dayDiff = parseInt( (Date.now() - new Date(stats.atime)) / (24 * 3600 * 1000) );
                        
                        if (dayDiff > this.interval) {
                            fs.rmdir(this.folder + '/' + file, {
                                recursive: true
                            }, (err) => {})
                        }
                    });

                });
            })
        });
    }
}