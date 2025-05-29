# Stage 1: Build Stage
FROM node:21.5.0-alpine AS builder

WORKDIR /app

# Install specific npm version
RUN npm install -g npm@10.2.4

# Install cross-env globally for the build step
RUN npm install -g cross-env

# Copy package files and install deps
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the source code
COPY . .

# Run test-build using globally installed cross-env
# RUN npm run test-build

RUN npm run prod-build
# Stage 2: Runtime Stage
FROM node:21.5.0-alpine AS runner

WORKDIR /app
ENV NODE_ENV=prod

# Install specific npm version
RUN npm install -g npm@10.2.4 pm2

# Install runtime deps
COPY package.json package-lock.json ./
RUN npm install --omit=dev && npm cache clean --force

# Install cross-env globally for runtime (test-start)
#RUN npm install -g cross-env

# Copy over only necessary files
COPY --from=builder /app/.next .next
COPY --from=builder /app/public public
COPY --from=builder /app/static static
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/.env.production .env

EXPOSE 3000

# CMD ["npm", "run", "test-start"]
CMD ["pm2-runtime", "npm", "--", "run", "prod-start"]
