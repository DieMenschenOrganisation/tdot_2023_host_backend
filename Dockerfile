FROM oven/bun
WORKDIR app
COPY package.json ./
RUN bun i
COPY . .
EXPOSE 8000
CMD ["bun", "run", "start"]