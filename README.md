# Solana Villas

A full-featured holiday villa booking platform built for **Sabie River Eco Estate** and **De Rust Estate** in Hazyview, Mpumalanga. It handles multi-property listings, direct bookings, payments, an admin dashboard, and staff/housekeeper check-ins — built to eventually replace third-party booking fees from Booking.com and Airbnb.

🔗 Live site (in progress): [solanavillas.co.za](https://solanavillas.co.za)

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript) ![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?logo=prisma) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-336791?logo=postgresql) ![Tailwind](https://img.shields.io/badge/TailwindCSS-4-06B6D4?logo=tailwindcss)

---

## Features

- **Public site** — home, about, blog, and dedicated pages per villa (`/villas/solana`, `/villas/solana-studios`)
- **Direct bookings** — availability checking, booking creation, and confirmation flow
- **Payments** — PayFast integration (South African payment gateway) with webhook notification handling
- **Auth** — email/password signup & login with JWT sessions and bcrypt password hashing
- **Admin dashboard** (`/admin`) — manage properties, view/manage bookings
- **Housekeeper check-in log** — a lightweight staff-facing check-in page (`/staff-checkin`)
- **Channel manager webhook** — endpoint scaffolded for future Booking.com / LekkeSlaap sync
- **Contact form** with email delivery via Nodemailer
- **SEO** — dynamic `sitemap.ts` and `robots.ts`

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| Database | PostgreSQL (Neon serverless) |
| ORM | Prisma 7 (with `@prisma/adapter-neon` / `@prisma/adapter-pg`) |
| Auth | JWT (`jsonwebtoken`) + `bcryptjs` |
| Payments | PayFast |
| Email | Nodemailer |
| CMS | Sanity (`next-sanity`) for blog content |
| Forms | React Hook Form + Zod validation |
| Animation | Framer Motion |
| Analytics | Vercel Analytics |
| Hosting | Vercel |

## Project Structure

```
Solana-Villa/
├── prisma/
│   ├── schema.prisma        # Property, Booking, User, Housekeeper models
│   └── seed.ts
├── prisma.config.ts          # Must stay at project root (Prisma 7 requirement)
├── src/
│   ├── app/
│   │   ├── (main)/            # Public site: home, about, blog, villas, contact
│   │   ├── admin/              # Admin dashboard
│   │   ├── login/ signup/      # Auth pages
│   │   ├── staff-checkin/      # Housekeeper check-in log
│   │   └── api/
│   │       ├── auth/           # login, signup
│   │       ├── availability/
│   │       ├── bookings/
│   │       ├── admin/properties/
│   │       ├── payments/payfast/   # payment + webhook notify
│   │       ├── channel-manager/webhook/
│   │       ├── housekeepers/
│   │       └── contact/
│   ├── components/
│   ├── lib/
│   ├── data/
│   └── types/
└── public/
```

## Data Model

The Prisma schema defines four core models:

- **Property** — villa details, images, amenities, pricing, house rules
- **Booking** — guest details, check-in/out dates, payment status, linked to a Property
- **User** — for authenticated guest/admin accounts
- **Housekeeper** — staff assigned to properties, with check-in logs

## Getting Started

### Prerequisites

- Node.js 20+
- A PostgreSQL database (this project is built for [Neon](https://neon.tech), but any Postgres instance works)
- npm

### 1. Clone the repository

```bash
git clone https://github.com/phiwakonkem/Solana-Villa.git
cd Solana-Villa
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root (kept out of git via `.gitignore`):

```env
# Database
DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"

# Auth
JWT_SECRET="your-long-random-secret"

# Site
NEXT_PUBLIC_SITE_URL="http://localhost:3000"

# Email (Nodemailer)
EMAIL_USER="your@email.com"
EMAIL_PASS="your-app-password"

# PayFast
PAYFAST_MERCHANT_ID="your-merchant-id"
PAYFAST_MERCHANT_KEY="your-merchant-key"
PAYFAST_PASSPHRASE="your-passphrase"
```

> ⚠️ Never commit `.env` — it's already excluded by `.gitignore`.

### 4. Set up the database

```bash
npx prisma generate
npx prisma migrate dev
npx prisma db seed   # optional: loads sample properties
```

> **Note:** `prisma.config.ts` must live at the project root, not inside `prisma/` — this is required by Prisma 7's new config architecture.

### 5. Run the development server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000).

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Known Limitations / Roadmap

- Channel manager webhook is scaffolded but not yet connected to a live Booking.com/LekkeSlaap account
- Admin dashboard covers properties and bookings; reporting/analytics views are planned
- Currently deployed under active development at `solanavillas.co.za`

## Author

**Phiwakonke Mthethwa**
Full-Stack Developer, Centurion, South Africa

- GitHub: [@phiwakonkem](https://github.com/phiwakonkem)
- LinkedIn: [phiwakonke-mthethwa](https://www.linkedin.com/in/phiwakonke-mthethwa-97aa74331)
- Email: phiwakonkem@gmail.com

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
