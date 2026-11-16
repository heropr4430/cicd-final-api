FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json ./
RUN npm install
COPY index.js app.js ./

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app ./
USER node
EXPOSE 3000
CMD ["npm", "start"]
