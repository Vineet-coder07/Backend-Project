# Vitetube — Backend

Minimal, production-oriented backend for a YouTube-like service. Implements APIs for user accounts, video upload/streaming, metadata, comments, likes, subscriptions and search. Designed to be modular, scalable, and operable locally via Docker or in cloud environments.

## Features
- User authentication (JWT + refresh tokens)
- Video upload (multipart/chunked), transcoding pipeline (FFmpeg)
- HLS/DASH streaming + thumbnail generation
- Video metadata: title, description, tags, visibility, categories
- Comments, replies, likes/dislikes, view counting
- Subscriptions and notifications (webhooks / pubsub)
- Search (text + tag filtering)
- Presigned URL support for direct uploads to object storage (S3/MinIO)
- Rate limiting, input validation, role-based access control
- Background workers and queues for transcoding and processing

## Architecture (high level)
- API service (REST/GraphQL)
- Auth service (JWT + refresh tokens)
- Worker service (transcoding, thumbnailing, processing)
- Object storage (S3 / MinIO) for media artifacts
- Database (Postgres) for metadata, Redis for cache & rate-limiting
- Message queue (Redis Streams / RabbitMQ) for background jobs
- CDN in front of HLS segments for scale

## Tech stack (suggested)
- Node.js + TypeScript
- Express / Fastify or Apollo GraphQL
- ORM: Prisma or TypeORM
- PostgreSQL
- Redis
- MinIO / AWS S3
- FFmpeg (transcoding)
- BullMQ / RabbitMQ for job queue
- Docker + docker-compose for local dev

## Quick start (local)
Prereqs: Docker, Docker Compose, Node 18+, yarn/npm

1. Clone
    git clone <repo> && cd <repo>

2. Copy env
    cp .env.example .env

3. Start services
    docker-compose up -d

4. Install & run
    yarn install
    yarn prisma:migrate  # or npm run migrate
    yarn dev

## Example environment variables (.env)
NODE_ENV=development
PORT=4000
DATABASE_URL=postgresql://user:pass@db:5432/vitetube
REDIS_URL=redis://redis:6379
S3_ENDPOINT=http://minio:9000
S3_BUCKET=vitetube
S3_ACCESS_KEY=miniokey
S3_SECRET_KEY=miniosecret
JWT_SECRET=replace_with_secure_key
FFMPEG_PATH=/usr/bin/ffmpeg

## API overview (examples)
- POST /auth/register — create account
- POST /auth/login — returns access + refresh tokens
- POST /auth/refresh — refresh access token
- POST /videos — create video record (returns upload URL or accept multipart)
- POST /videos/:id/upload — chunked upload endpoint (or use presigned URLs)
- POST /videos/:id/complete — signal upload complete -> enqueue transcoding
- GET /videos/:id/manifest.m3u8 — HLS manifest (public or signed)
- GET /videos/:id — metadata and playback URLs
- POST /videos/:id/comments
- POST /videos/:id/like, POST /videos/:id/unlike
- GET /search?q=...&tags=...

Design APIs to return presigned URLs for direct uploads and to protect streaming manifests with signed URLs for private content.

## Media handling & streaming
- Accept original uploads, transcode to multiple bitrates with FFmpeg
- Produce HLS segments (+ optional DASH)
- Store originals & derivatives in object storage
- Use presigned URLs and short-lived signed manifest URLs when needed
- Offload heavy CPU tasks to worker pool for resilience

## Background jobs
- Enqueue tasks for: transcode, thumbnail generation, waveform extraction, snapshotting, notifications, analytics aggregation.
- Use job retries, error logging, metrics.

## Security & privacy
- Validate uploads and metadata, enforce file type/size limits
- Rate limit endpoints (IP + auth)
- Protect private videos with signed CDN URLs
- Input sanitization and RBAC for admin operations

## Observability
- Structured logging, request tracing, metrics (Prometheus), health endpoints
- Sentry for error tracking

## Testing & CI
- Unit tests for services, integration tests for API + DB (use Docker test DB)
- Linting + type checking in CI
- Example commands:
  yarn test
  yarn lint
  yarn typecheck

## Deployment & scaling notes
- Deploy API behind autoscaling group / k8s
- Place CDN in front of object storage for HLS distribution
- Use autoscaling worker pool for transcoding; consider GPU instances for heavy workloads
- Use read replicas and caching for read-heavy endpoints (home/feed)

## Contributing
- Fork -> feature branch -> PR
- Run tests & linters before PR
- Follow repository code style and API contract guidelines

## License
Specify project license (e.g. MIT).

---

This README is a starting template — adapt infrastructure details, endpoints, and operational runbooks to your project requirements.