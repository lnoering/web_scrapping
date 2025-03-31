# Use an official Node.js image with ARM support
FROM node:18-bullseye

# Install necessary dependencies for Puppeteer (ARM compatible)
RUN apt-get update && apt-get install -y \
    chromium \
    libnss3 \
    libatk1.0-0 \
    libx11-xcb1 \
    libxcomposite1 \
    libxcursor1 \
    libxdamage1 \
    libxfixes3 \
    libxi6 \
    libxrandr2 \
    libgbm1 \
    libpango-1.0-0 \
    libasound2 \
    libpangocairo-1.0-0 \
    libatk-bridge2.0-0 \
    libcups2 \
    libxss1 \
    libgtk-3-0 \
    ca-certificates \
    fonts-liberation \
    libappindicator3-1 \
    xdg-utils \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
# COPY package.json package-lock.json ./
# RUN npm install

RUN npm init -y
RUN npm install puppeteer
RUN npm install json2csv
RUN npm install csv-parser

# Copy the application files
COPY . .

# Set environment variable for Chromium
ENV PUPPETEER_EXECUTABLE_PATH="/usr/bin/chromium"

# Run Puppeteer script
# CMD ["node", "scraper.js"]
