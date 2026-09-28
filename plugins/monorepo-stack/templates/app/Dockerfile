# Multi-stage build for __APP_NAME__.
# Built from the repo root so workspace packages resolve:
#   docker build -f apps/__APP_NAME__/Dockerfile -t __APP_NAME__ .
FROM oven/bun:1 AS deps
WORKDIR /repo
COPY package.json bun.lock ./
COPY apps/__APP_NAME__/package.json apps/__APP_NAME__/
COPY packages packages
RUN bun install --frozen-lockfile

FROM oven/bun:1 AS build
WORKDIR /repo
COPY --from=deps /repo/node_modules node_modules
COPY . .
RUN bun run build --filter __APP_NAME__

FROM oven/bun:1 AS runtime
WORKDIR /repo/apps/__APP_NAME__
ENV NODE_ENV=production
COPY --from=build /repo .
EXPOSE __PORT__
CMD ["bun", "run", "start"]
