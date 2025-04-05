# ImageKit StreamSphere Shop

A modern Next.js application for managing and selling video content using ImageKit integration. This project provides a full-featured platform with user authentication, video upload capabilities.

## Features

-  User Authentication (NextAuth.js)
-  Video Upload and Management (ImageKit)
-  Modern UI with Tailwind CSS and DaisyUI
-  Fully Responsive Design
-  Secure API Routes
-  MongoDB Database Integration

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, DaisyUI
- **Authentication**: NextAuth.js, JWT
- **Database**: MongoDB with Mongoose
- **File Storage**: ImageKit
- **Form Handling**: React Hook Form

## Prerequisites

- Node.js (Latest LTS version)
- MongoDB Database
- ImageKit Account


## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd imagekit-video-main
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Fill in the required environment variables

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Environment Variables

Create a `.env` file with the following variables:

```env


## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build production application
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run seed` - Seed the database


## Project Structure

```
├── app/                  # Next.js app directory
│   ├── api/             # API routes
│   ├── components/      # Reusable components
│   ├── login/          # Login page
│   ├── register/       # Registration page
│   └── upload/         # Video upload page
├── lib/                # Utility functions
├── models/             # MongoDB models
├── public/            # Static assets
└── types.d.ts         # TypeScript declarations
```


