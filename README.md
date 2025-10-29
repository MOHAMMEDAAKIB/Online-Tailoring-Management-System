# Online Tailoring Management System

A full-stack web application to digitize a tailoring shop's workflow: customer measurements, order management, billing, payments, and notifications — with a future AI measurement PoC.

---

## Table of Contents

- Project Overview
- Goals & Value
- Epics (High-level Features)
- Architecture & Tech Stack
- Data Model (Core Entities)
- API Blueprint (Core Endpoints)
- Development Setup (local)
- Docker Compose (recommended services)
- Environment Variables
- Testing & CI
- Deployment Notes
- Security & Privacy
- Future Work: AI Measurement PoC
- Contribution
- License

---

## Project Overview

The Online Tailoring Management System provides a platform for tailors to manage customers, measurements, orders, bills and payment tracking, while enabling customers to submit measurements, view orders and pay online. The system is backend-first and designed to support a future AI service that estimates body measurements from photos.

## Goals & Value

- Reduce manual paperwork and human error in measurement & billing.
- Streamline communication between tailors and customers with email/SMS notifications.
- Provide a clean admin dashboard to manage orders, customers, and billing.
- Enable online payments via Stripe or PayHere (hosted checkout recommended).
- Provide an extensible architecture for future AI-based measurement automation.

## Epics (confirmed)

1. User Management – Register, login, and role-based access for Admin (Tailor) and Customer.
2. Shop Advertisement – Landing page with services, pricing, and contact details.
3. Measurement Management – Store, update and version body measurements (manual input initially).
4. Order & Billing – Create orders, generate itemized bills and invoices, keep history.
5. Payment Gateway – Hosted checkout, webhook handling and transaction recording.
6. Notifications – Email (Nodemailer/SendGrid) and SMS (Twilio/local provider) for order updates.
7. Admin Dashboard – Manage customers, measurements, orders, bills and simple reports.
8. AI Measurement (Future) – Auto measurement detection from images (separate microservice).
9. System Security – Access control, secure storage and backups.

## Architecture

Three-Tier Architecture (Presentation → Application → Data)

- Presentation Layer: React (Vite) or Next.js (frontend app for customers and admin).
- Application Layer: Node.js (Express.js) — controllers, services, modules pattern.
- Data Layer: MySQL for relational storage.

Supporting components:
- Redis — job queue (BullMQ) and caching.
- S3-compatible storage — media storage (future measurement photos) with signed URLs.
- Worker processes — handle email/SMS, invoice PDF generation, AI job orchestration.

## Recommended Tech Stack (MVP)

- Frontend: React (Vite) or Next.js
- Backend: Node.js + Express.js (TypeScript recommended)
- ORM: Prisma (recommended) or TypeORM/Sequelize (Prisma works well with TypeScript & MySQL)
- Database: MySQL (managed for production) — Postgres is an alternative
- Queue: Redis + BullMQ
- Email: Nodemailer (dev) / SendGrid (production)
- SMS: Twilio or local SMS provider
- Payments: Stripe (global sandbox) or PayHere (local)
- AI (future): Python + FastAPI + MediaPipe or ML model
- Containerization: Docker + docker-compose for local development

## Core Data Model (high-level)

- user
  - id, email, password_hash, name, phone, role (customer|admin), created_at, updated_at
- measurement
  - id, user_id, label, chest, waist, hips, sleeve, shoulder, neck, length, unit, notes, created_at
- order
  - id, user_id, status, items_json (or items relation), measurement_snapshot, subtotal, tax, discount, total, created_by, created_at
- invoice
  - id, order_id, invoice_no, items_snapshot, subtotal, tax, total, paid, payment_id, issued_at
- payment_transaction
  - id, provider, provider_payment_id, order_id, amount, currency, status, raw_payload, created_at
- notification_log
  - id, user_id, channel, template, payload, status, sent_at, error

Notes:
- Store a measurement snapshot on orders/invoices to preserve historical accuracy when measurements change.
- Use JSON fields for flexible item/line snapshots (supported in MySQL 5.7+).

## API Blueprint (core)

Use REST and produce an OpenAPI (Swagger) spec early for client generation.

Authentication
- POST /api/auth/register — body: {name,email,password,phone}
- POST /api/auth/login — body: {email,password}
- POST /api/auth/refresh — refresh token
- POST /api/auth/logout

Users
- GET /api/users/:id — get user (admin or self)
- PUT /api/users/:id — update profile

Measurements
- GET /api/measurements — list (customer: own; admin: all or by customer)
- POST /api/measurements — create measurement
- GET /api/measurements/:id
- PUT /api/measurements/:id
- DELETE /api/measurements/:id

Orders & Billing
- POST /api/orders — create order (admin)
- GET /api/orders — list orders with filters
- GET /api/orders/:id — fetch order
- PATCH /api/orders/:id/status — update status (Pending→In Progress→Ready→Delivered)
- GET /api/invoices/:orderId — fetch/generate invoice

Payments
- POST /api/payments/create-checkout — create hosted checkout session (returns URL/session)
- POST /api/webhooks/payments — payment provider webhook (verify signature and update payment/order)

Notifications
- POST /api/notifications/send — admin triggers an email/SMS
- GET /api/notifications/logs — view notification logs

AI (Future)
- POST /api/ai/measurements/request — upload image & enqueue inference
- GET /api/ai/measurements/:id — fetch AI result (measurements + confidence)

Security
- Protect admin routes with role-based middleware
- Validate and sanitize all payloads (zod/Joi)

## Development Setup (recommended)

This README assumes you have Docker Desktop installed on Windows and PowerShell as the shell.

1. Clone the repo

```powershell
git clone <your-repo-url> "e:/Projects/Online Tailoring Management System"
cd "e:/Projects/Online Tailoring Management System"
```

2. Create a `.env` file (see Environment Variables below)

3. Start services (dev)

```powershell
docker-compose up --build
```

4. Install backend dependencies (if running locally)

```powershell
# from backend/ folder
npm install
npm run dev
```

5. Run database migrations (Prisma example)

```powershell
npx prisma migrate dev --name init
```

6. Run tests

```powershell
npm test
```

## Docker Compose (example services)

- app (Node.js/Express)
- mysql (MySQL server)
- redis (job queue)
- adminer (optional DB admin)

(We will add an example `docker-compose.yml` when scaffolding the backend.)

## Environment Variables (example)

Create `.env` with values for local dev. Example keys:

- NODE_ENV=development
- PORT=4000
- DATABASE_URL=mysql://user:pass@mysql:3306/tailor_db
- REDIS_URL=redis://redis:6379
- JWT_SECRET=replace_with_strong_secret
- JWT_REFRESH_SECRET=replace_with_strong_secret
- STRIPE_SECRET_KEY=sk_test_...
- STRIPE_WEBHOOK_SECRET=whsec_...
- SENDGRID_API_KEY=...
- TWILIO_ACCOUNT_SID=...
- TWILIO_AUTH_TOKEN=...
- S3_ENDPOINT=... (for media storage)
- S3_BUCKET=...
- S3_ACCESS_KEY=...
- S3_SECRET_KEY=...

Do not commit `.env` to source control. Use a secret manager for production.

## Testing & CI

- Unit tests: Jest (backend) — cover auth, measurement validation, and billing math.
- Integration tests: payment flow using provider sandbox keys and local webhook simulator.
- CI: GitHub Actions to run lint, tests and build.

Suggested test cases:
- Register/login flow (happy & invalid credentials)
- Measurement create/update validations
- Order creation and invoice snapshotting
- Payment webhook processing (idempotent handling)

## Deployment Notes

- Use managed MySQL (or RDS) in production.
- Use managed Redis for queueing (or Redis Cloud).
- Store files in AWS S3 or S3-compatible storage (DigitalOcean Spaces) with signed URLs.
- Use HTTPS; configure secure cookies and CORS properly.
- Use environment secrets (GitHub Secrets, Azure Key Vault, AWS Secrets Manager) for production keys.

## Security & Privacy

- Hash passwords with bcrypt (or argon2).
- Use HTTPS in production.
- Use hosted checkout (Stripe Checkout/PayHere) to avoid handling card data.
- Verify webhook signatures from payment provider.
- Minimize and secure storage of PII. Require explicit consent before storing customer photos for AI training.
- Implement retention and deletion policies for images and PII.

## Future Work: AI Measurement PoC

- Separate microservice: Python + FastAPI using MediaPipe or a trained model to detect body landmarks and estimate measurements.
- Flow: customer uploads photos → images stored in S3 → backend enqueues AI job → AI service processes images and returns measurement estimates → admin reviews & accepts/rejects.
- Privacy & consent: explicitly request permission, and provide an opt-in toggle before image upload.
- Compute: model may require GPU for fast inference—plan for GPU-backed instances or managed inference services.

## Contribution

1. Fork the repository
2. Create feature branch: `feature/your-feature`
3. Run tests & linters locally
4. Submit PR with a clear description and linked issue

Please follow the code style, write tests for new features and document API changes in the OpenAPI spec.

## Useful Resources

- Stripe docs: https://stripe.com/docs
- Twilio docs: https://www.twilio.com/docs
- Prisma docs: https://www.prisma.io/docs
- Express docs: https://expressjs.com/
- FastAPI docs: https://fastapi.tiangolo.com/

## License

Specify your license here (MIT, Apache-2.0, etc.).

---

If you'd like, I can now:

- Add a concrete `docker-compose.yml` and a scaffolded backend folder (`backend/`) with Express + Prisma + MySQL + Redis and a working auth/measurements skeleton.
- Produce a full OpenAPI spec for the endpoints above.

Which of these should I do next? (I will update the todo list accordingly.)
