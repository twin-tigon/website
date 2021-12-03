FROM ubuntu

ENV DEBIAN_FRONTEND=noninteractive 

RUN apt update && apt install -y curl
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash -
RUN apt update && apt install -y \
    ca-certificates \
    fonts-liberation \
    libappindicator3-1 \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libc6 \
    libcairo2 \
    libcups2 \
    libdbus-1-3 \
    libexpat1 \
    libfontconfig1 \
    libgbm1 \
    libgcc1 \
    libglib2.0-0 \
    libgtk-3-0 \
    libnspr4 \
    libnss3 \
    libpango-1.0-0 \
    libpangocairo-1.0-0 \
    libstdc++6 \
    libx11-6 \
    libx11-xcb1 \
    libxcb1 \
    libxcomposite1 \
    libxcursor1 \
    libxdamage1 \
    libxext6 \
    libxfixes3 \
    libxi6 \
    libxrandr2 \
    libxrender1 \
    libxss1 \
    libxtst6 \
    lsb-release \
    nodejs \
    wget \
    xdg-utils
RUN groupadd -r website && useradd --no-log-init -r -g website website

USER website
WORKDIR /home/website
ADD --chown=website:website package.json .
ADD --chown=website:website package-lock.json .
RUN npm ci

ADD --chown=website:website assets assets
ADD --chown=website:website scripts scripts
ADD --chown=website:website src src
ADD --chown=website:website test test
ADD --chown=website:website .gitignore .
ADD --chown=website:website index.html .
ADD --chown=website:website tsconfig.json .
ADD --chown=website:website web-test-runner.config.mjs .
