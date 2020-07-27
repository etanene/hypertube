FROM    node:12.16.2

WORKDIR /app
COPY    * ./
RUN apt update
RUN apt install -y ffmpeg
CMD     ["npm", "run", "dev"]
