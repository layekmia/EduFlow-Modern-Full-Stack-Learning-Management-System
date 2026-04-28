# 📚 **EduFlow - Modern Full-Stack Learning Management System (LMS)**

## **Project Description**

**EduFlow** is a comprehensive, feature-rich Learning Management System (LMS) built from scratch with modern web technologies. It provides a complete solution for online course delivery, user management, payment processing, and certificate generation. The platform offers a seamless experience for both students and administrators, with role-based access control, interactive learning tools, and robust payment integration.

## **🚀 Key Features**

### **For Students**

- 🔐 **Authentication** - Email OTP, Google, and GitHub login options
- 📚 **Course Management** - Browse, search, and enroll in courses
- 🎥 **Video Learning** - Interactive video player with progress tracking
- 📄 **PDF Resources** - Download and view course materials
- 🏆 **Certificates** - Auto-generated PDF certificates upon course completion
- 📊 **Dashboard** - Track progress, recent activity, and learning statistics
- ⚙️ **Profile Settings** - Customize profile, notifications, and appearance
- 💳 **Payments** - Secure Stripe integration for course purchases

### **For Administrators**

- 👥 **User Management** - View, edit, and manage all platform users
- 📖 **Course Management** - Create, edit, and organize courses with chapters/lessons
- 🎬 **Content Upload** - Support for images, videos, and PDF resources
- 📈 **Analytics Dashboard** - Track revenue, user growth, and course performance
- 🏷️ **Category Management** - Organize courses by categories
- 🎟️ **Support Tickets** - Manage user inquiries and support requests
- 💰 **Payment Configuration** - Configure Stripe and transaction rules

## **🛠️ Technology Stack**

### **Frontend**

| Technology          | Purpose                         |
| ------------------- | ------------------------------- |
| **Next.js 16**      | React framework with App Router |
| **React 19**        | UI library                      |
| **TypeScript**      | Type-safe development           |
| **Tailwind CSS 4**  | Utility-first styling           |
| **shadcn/ui**       | Component library               |
| **Framer Motion**   | Animations                      |
| **React Hook Form** | Form handling                   |
| **Zod**             | Schema validation               |
| **TipTap**          | Rich text editor                |
| **Recharts**        | Data visualization              |
| **Lucide Icons**    | Icon library                    |

### **Backend**

| Technology             | Purpose                                    |
| ---------------------- | ------------------------------------------ |
| **Next.js API Routes** | Serverless API endpoints                   |
| **Prisma ORM**         | Database ORM                               |
| **PostgreSQL (Neon)**  | Database                                   |
| **Better Auth**        | Authentication (Email OTP, Google, GitHub) |
| **Stripe**             | Payment processing                         |
| **Resend**             | Email delivery                             |
| **AWS S3 / Tigris**    | File storage (images, videos, PDFs)        |
| **Vercel Blob**        | Certificate storage                        |

### **File Upload & Storage**

| Technology          | Purpose                         |
| ------------------- | ------------------------------- |
| **AWS S3 / Tigris** | Course thumbnails, videos, PDFs |
| **Presigned URLs**  | Secure direct uploads           |
| **React Dropzone**  | Drag-and-drop file upload       |
| **Vercel Blob**     | Certificate storage             |

### **Certificate Generation**

| Technology          | Purpose                                 |
| ------------------- | --------------------------------------- |
| **pdf-lib**         | Professional PDF certificate generation |
| **Custom HTML/CSS** | Certificate design templates            |

## **📁 Project Structure**

```
layek_lms/
├── app/
│   ├── (auth)/           # Authentication pages (login, signup, verify)
│   ├── (public)/         # Public routes (home, courses)
│   ├── admin/            # Admin dashboard
│   ├── dashboard/        # User dashboard
│   ├── api/              # API routes
│   └── layout.tsx        # Root layout
├── components/           # Reusable UI components
├── lib/                  # Utilities, configurations
├── prisma/              # Database schema and migrations
├── public/              # Static assets
├── hooks/               # Custom React hooks
├── contexts/            # React contexts
├── utils/               # Helper functions
└── types/               # TypeScript type definitions
```

## **🗄️ Database Schema**

### **Core Models**

- **User** - Authentication, profile, role (USER/ADMIN)
- **Course** - Title, description, price, level, category, status
- **Chapter** - Course chapters with position ordering
- **Lesson** - Lessons within chapters (video, PDF, thumbnail)
- **Enrollment** - User course enrollments with payment status
- **LessonProgress** - Track completed lessons per user
- **Certificate** - Generated certificates for completed courses
- **Category** - Course categorization

## **🔐 Authentication & Authorization**

- **Better Auth** integration with Email OTP, Google, and GitHub
- **Role-based access control** (USER / ADMIN)
- **Protected routes** middleware for dashboard and admin areas
- **Session management** with secure cookies

## **💳 Payment System**

- **Stripe Checkout** integration for one-time payments
- **Webhook handling** for payment confirmation
- **Invoice generation** and PDF receipts
- **Automatic enrollment** upon successful payment

## **📄 Certificate System**

- **Auto-generation** upon course completion
- **Professional PDF certificates** using pdf-lib
- **Unique certificate IDs** with verification
- **Storage in Vercel Blob** with public access
- **Certificate dashboard** for users to view and download

## **🎬 Video Player**

- **Custom video player** with controls
- **Progress tracking** with automatic saving
- **Thumbnail generation** from video frames
- **Fullscreen support** and keyboard shortcuts

## **📁 File Upload System**

- **Drag-and-drop upload** using react-dropzone
- **Presigned URLs** for direct S3/Tigris upload
- **Support for** images, videos, and PDFs
- **Progress tracking** during upload
- **Automatic file deletion** from storage

## **🚀 Getting Started**

### **Prerequisites**

- Node.js 20+
- PostgreSQL database (Neon recommended)
- Stripe account
- S3-compatible storage (Tigris)

### **Installation**

```bash
# Clone the repository
git clone https://github.com/layekmia/EduFlow-Modern-Full-Stack-Learning-Management-System.git
cd eduflow-lms

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local

# Run database migrations
npx prisma migrate dev

# Generate Prisma client
npx prisma generate

# Seed database (optional)
npx prisma db seed

# Start development server
pnpm dev
```

### **Environment Variables**

```env
# Database
DATABASE_URL="postgresql://..."

# Authentication
BETTER_AUTH_URL="http://localhost:3000"
BETTER_AUTH_SECRET="..."

# OAuth
GITHUB_CLIENT_ID="..."
GITHUB_CLIENT_SECRET="..."
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."

# Storage
NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES="..."
AWS_ACCESS_KEY_ID="..."
AWS_SECRET_ACCESS_KEY="..."
AWS_ENDPOINT_URL_S3="..."

# Stripe
STRIPE_SECRET_KEY="..."
STRIPE_WEBHOOK_SECRET="..."
NEXT_PUBLIC_STRIPE_PUBLIC_KEY="..."

# Email
RESEND_API_KEY="..."

# Cloudinary (optional)
CLOUDINARY_CLOUD_NAME="..."
CLOUDINARY_API_KEY="..."
CLOUDINARY_API_SECRET="..."

# Vercel Blob
BLOB_READ_WRITE_TOKEN="..."
```

## **📦 Deployment**

The application is optimized for deployment on **Vercel**:

```bash
# Build for production
pnpm build

# Start production server
pnpm start
```

### **Deployment Checklist**

- [ ] Set all environment variables in Vercel dashboard
- [ ] Configure Stripe webhook for production URL
- [ ] Set up custom domain (if needed)
- [ ] Enable database backups

## **📝 License**

This project is proprietary and confidential. Unauthorized copying, distribution, or use is strictly prohibited.

## **👨‍💻 Author**

**Layek** - [GitHub](https://github.com/layekmia)

---

## **🎯 Key Achievements**

- ✅ Complete LMS with 50+ features
- ✅ Production-ready authentication system
- ✅ Secure payment integration with Stripe
- ✅ Professional PDF certificate generation
- ✅ Admin dashboard with full CRUD operations
- ✅ Responsive design for all devices
- ✅ SEO optimized with metadata and static generation

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**
