FROM ubuntu:latest
VOLUME ["/var/www"]
WORKDIR /var/www
EXPOSE 80
ENV PORT=80
ENV HOST=0.0.0.0
RUN locale-gen en_GB.UTF-8
RUN DEBIAN_FRONTEND=noninteractive apt-get update && apt-get -y dist-upgrade
RUN DEBIAN_FRONTEND=noninteractive apt-get -y install curl
RUN curl -sL https://deb.nodesource.com/setup_6.x | bash -
RUN DEBIAN_FRONTEND=noninteractive apt-get -y install git nodejs build-essential
RUN npm -g install forever grunt-cli
CMD npm -d install && grunt && forever app/server.js
