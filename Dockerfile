ARG NODE_VERSION=16
ARG DEBIAN_VERSION=buster

FROM node:${NODE_VERSION}-${DEBIAN_VERSION}-slim as development

WORKDIR /insoftex-app

EXPOSE 3000

ENTRYPOINT ["bash", "-c"]

FROM node:${NODE_VERSION}-${DEBIAN_VERSION}-slim as builder

WORKDIR /insoftex-app

COPY package.json .
COPY package-lock.json .
COPY tsconfig.json .
COPY tsconfig.build.json .

RUN npm ci --ignore-scripts

COPY src src

RUN npm run build

FROM node:${NODE_VERSION}-${DEBIAN_VERSION}-slim as release

WORKDIR /insoftex-app

# Add Tini
ENV TINI_VERSION v0.19.0
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini
RUN chmod +x /tini
ENTRYPOINT ["/tini", "--"]

RUN mkdir /insoftex-app/tts && \
    addgroup --gid 1001 --system insoftex && \
    adduser --system --uid 1001 --gid 1001 insoftex && \
    chown -R insoftex:insoftex /insoftex-app && \
    chown insoftex:insoftex /tini

RUN mkdir -p /var/logs/insoftex && \
    chown -R insoftex:insoftex /var/logs/insoftex

COPY --chown=insoftex:insoftex --from=builder /insoftex-app/package.json package.json
COPY --chown=insoftex:insoftex --from=builder /insoftex-app/node_modules node_modules
COPY --chown=insoftex:insoftex --from=builder /insoftex-app/dist dist

USER 1001:1001

CMD ["node", "dist/src/http-server.js"]
