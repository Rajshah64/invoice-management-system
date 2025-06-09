# Invoice Management System

A modern, full-stack invoice management application built with Next.js 15, TypeScript, and Prisma. This application provides a complete solution for creating, managing, and tracking invoices with user authentication and a responsive dashboard.

## ✨ Features

- **User Authentication**: Secure authentication with NextAuth.js
- **Invoice Management**: Create, edit, and manage invoices with detailed tracking
- **Dashboard**: Comprehensive dashboard for invoice overview and analytics
- **PDF Generation**: Export invoices as PDF documents
- **Email Integration**: Send invoices via email using Mailtrap
- **Responsive Design**: Modern UI with Tailwind CSS and Radix UI components
- **Database Integration**: PostgreSQL database with Prisma ORM
- **Theme Support**: Light/dark theme toggle
- **Form Validation**: Robust form validation with Zod and Conform

## 🛠 Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Radix UI
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **PDF Generation**: jsPDF
- **Email**: Mailtrap, Nodemailer
- **Form Handling**: Conform, Zod
- **UI Components**: Custom components with Radix UI primitives

## 📋 Prerequisites

- Node.js 18+
- PostgreSQL database
- pnpm (recommended) or npm

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd invoice_management
```

### 2. Install Dependencies

```bash
pnpm install
# or
npm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/invoice_db"

# NextAuth.js
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"

# Email (Mailtrap)
MAILTRAP_TOKEN="your-mailtrap-token"
MAILTRAP_ENDPOINT="your-mailtrap-endpoint"

# OAuth providers (optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

### 4. Database Setup

```bash
# Initialize Prisma
pnpm prisma generate

# Push the schema to your database
pnpm prisma db push

# (Optional) Open Prisma Studio to view your database
pnpm prisma studio
```

### 5. Run the Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📁 Project Structure

```
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── components/        # Shared components
│   ├── dashboard/         # Dashboard pages
│   ├── login/             # Authentication pages
│   ├── onboarding/        # User onboarding
│   ├── utils/             # Utility functions
│   └── verify/            # Email verification
├── components/            # Reusable UI components
├── lib/                   # Shared libraries and configurations
├── prisma/               # Database schema and migrations
│   └── schema.prisma     # Prisma schema file
├── public/               # Static assets
└── ...config files
```

## 🗄 Database Schema

The application uses the following main models:

- **User**: User accounts with authentication
- **Invoice**: Invoice records with status tracking
- **Account/Session**: NextAuth.js authentication tables

### Invoice Status Types

- `PENDING`: Invoice awaiting payment
- `PAID`: Invoice has been paid

## 🔧 Available Scripts

```bash
# Development
pnpm dev                    # Start development server with Turbopack

# Building
pnpm build                  # Build for production
pnpm start                  # Start production server

# Database
pnpm prisma generate        # Generate Prisma client
pnpm prisma db push         # Push schema changes to database
pnpm prisma studio          # Open Prisma Studio
pnpm prisma:reset-client    # Reset and reinstall Prisma client

# Code Quality
pnpm lint                   # Run ESLint
```

## 🎨 UI Components

This project uses a modern component system built with:

- **Radix UI**: Accessible, unstyled UI primitives
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Beautiful icons
- **React Hot Toast/Sonner**: Toast notifications
- **React Day Picker**: Date selection

## 📧 Email Integration

The application integrates with Mailtrap for email functionality:

- Send invoices to clients
- Email notifications
- Secure email delivery

## 🔐 Authentication

User authentication is handled by NextAuth.js with support for:

- Email/password authentication
- OAuth providers (Google, etc.)
- Session management
- Email verification

## 📄 PDF Generation

Invoice PDFs are generated using jsPDF with:

- Professional invoice templates
- Company branding
- Detailed invoice information
- Download and email capabilities

## 🚀 Deployment

### Environment Variables for Production

Ensure all environment variables are properly set in your production environment.

### Database

Make sure your PostgreSQL database is accessible and properly configured.

### Vercel Deployment (Recommended)

This Next.js application is optimized for deployment on Vercel:

1. Connect your repository to Vercel
2. Configure environment variables
3. Deploy automatically on every push to main

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📝 Prisma Commands Reference

Common Prisma commands used in this project:

```bash
prisma init          # Initialize Prisma
prisma generate      # Generate Prisma client
prisma db push       # Push schema to database
prisma db pull       # Pull schema from database
prisma studio        # Open Prisma Studio GUI
```

## 📞 Support

For questions or issues, please:

1. Check the existing issues
2. Create a new issue with detailed information
3. Provide steps to reproduce any bugs

---

Built with ❤️ using Next.js 15 and modern web technologies.
