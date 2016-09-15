FROM dandart/mean
EXPOSE 80
ENV PORT=80
ENV IP=0.0.0.0
VOLUME /var/lib/mongodb
WORKDIR /app
RUN mkdir ~/.ssh && ssh-keyscan -H github.com >> ~/.ssh/known_hosts
# RUN git clone https://github.com/dandart/pcomm.git /app
# RUN npm -d install
# RUN make
# CMD git pull && /etc/init.d/mongodb start && forever app/server.js
