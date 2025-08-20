# Admin Dashboard Setup Guide

## 🎉 Authentication & Backend System Complete!

The authentication system and admin dashboard backend has been successfully implemented. Here's what's been set up:

## ✅ What's Been Implemented

### 1. **Authentication System**
- **NextAuth.js** with multiple providers:
  - Email/password authentication
  - Google OAuth (optional)
  - Session management with JWT
- **Password hashing** with bcryptjs
- **Role-based access control** with 5 user roles:
  - `SUPER_ADMIN`: Full system access
  - `ADMIN`: Most features, can manage users
  - `MANAGER`: View analytics, manage content
  - `STAFF`: Limited access, view-only for most
  - `USER`: Basic access (for future client portal)

### 2. **Database Schema (Prisma + PostgreSQL)**
- User management with roles and permissions
- NextAuth.js required tables
- Audit trails and security features
- MFA support (ready for implementation)

### 3. **Admin Dashboard Structure**
- **Responsive sidebar navigation** with role-based menu items
- **Admin header** with user menu and notifications
- **Main dashboard** with stats, recent activity, and quick actions
- **Protected routes** with automatic role checking
- **Professional UI** with Tailwind CSS

### 4. **Security Features**
- Role-based permissions system
- Protected API routes
- Secure password hashing
- Session management
- Unauthorized access handling

## 🚀 Getting Started

### 1. **Start the Database**
```bash
# Start local PostgreSQL (if using local DB)
npm run db:push

# Or set up with Supabase:
# 1. Create a Supabase project
# 2. Replace DATABASE_URL in .env with your Supabase connection string
# 3. Run: npm run db:push
```

### 2. **Environment Variables**
Update `.env` with your actual values:
```env
# Database
DATABASE_URL="your-postgresql-connection-string"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-super-secret-jwt-key"

# Google OAuth (optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

### 3. **Create First Admin User**
```bash
# Method 1: Use the setup API
curl -X POST http://localhost:3000/api/admin/setup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@gmgfinancial.com.au",
    "password": "your-secure-password",
    "name": "Admin User"
  }'

# Method 2: Use Prisma Studio
npm run db:studio
# Then manually create a user with role SUPER_ADMIN
```

### 4. **Start the Application**
```bash
npm run dev
```

### 5. **Access Admin Dashboard**
1. Go to: `http://localhost:3000/admin/auth/signin`
2. Sign in with your admin credentials
3. You'll be redirected to: `http://localhost:3000/admin/dashboard`

## 📁 File Structure

```
app/
├── admin/
│   ├── auth/signin/page.tsx     # Login page
│   ├── dashboard/page.tsx       # Main dashboard
│   ├── unauthorized/page.tsx    # Access denied page
│   └── layout.tsx              # Admin layout wrapper
├── api/
│   ├── auth/[...nextauth]/route.ts  # NextAuth API
│   └── admin/setup/route.ts     # First admin setup
src/
├── components/admin/
│   ├── AdminSidebar.tsx        # Navigation sidebar
│   └── AdminHeader.tsx         # Top header
├── lib/
│   ├── auth.ts                 # NextAuth configuration
│   ├── auth-utils.ts           # Permission utilities
│   └── prisma.ts               # Database client
└── types/
    └── next-auth.d.ts          # TypeScript definitions
```

## 🔐 Permission System

### Role Hierarchy
1. **SUPER_ADMIN** (Level 4): Everything
2. **ADMIN** (Level 3): User management, most features
3. **MANAGER** (Level 2): Content, analytics
4. **STAFF** (Level 1): View-only access
5. **USER** (Level 0): Basic access

### Usage Examples
```typescript
// In components
import { checkPermission, PERMISSIONS } from '@/lib/auth-utils'

if (checkPermission(userRole, PERMISSIONS.EDIT_USERS)) {
  // Show edit button
}

// In pages
import { requireAuth } from '@/lib/auth-utils'

export default async function AdminPage() {
  const session = await requireAuth(UserRole.MANAGER)
  // Page content
}
```

## 🛡️ Security Best Practices

1. **Change default secrets** in production
2. **Use HTTPS** in production
3. **Set up proper database backups**
4. **Enable audit logging**
5. **Regular security updates**
6. **Multi-factor authentication** (MFA ready)

## 🎯 Next Steps - Suggested Implementation Order

### Phase 1: Core Admin Features
1. **User Management** - CRUD operations for staff users
2. **Content Management** - News articles, FAQ management
3. **Calculator Management** - Update rates and formulas

### Phase 2: Business Features
1. **Contact Form Management** - View and respond to inquiries
2. **Lead Tracking** - Simple CRM functionality
3. **Analytics Dashboard** - Website and calculator usage

### Phase 3: Advanced Features
1. **Document Management** - Secure file uploads
2. **Email Integration** - Automated responses
3. **Appointment Scheduling** - Calendar integration
4. **Multi-factor Authentication** - Enhanced security

## 🚨 Troubleshooting

### Database Connection Issues
```bash
# Check if database is running
npm run db:studio

# Reset database
npm run db:push
```

### Authentication Issues
- Check `NEXTAUTH_SECRET` is set
- Verify `NEXTAUTH_URL` matches your domain
- Check user exists and `isActive: true`

### Permission Issues
- Check user role in database
- Verify permission hierarchy in `auth-utils.ts`
- Check if user session is valid

## 📞 Support

For implementation assistance or questions, contact your development team. The system is ready for production deployment with proper environment setup.

---

**🎉 Congratulations! Your admin authentication system is ready!**