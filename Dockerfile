FROM node:12

#COPY --from=bxu58381.live.dynatrace.com/linux/oneagent-codemodules:all / /
#ENV LD_PRELOAD /opt/dynatrace/oneagent/agent/lib64/liboneagentproc.so

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install

COPY . /usr/src/app
EXPOSE 80
CMD [ "node", "app.js" ]