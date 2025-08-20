# 🔐 Admin Login Credentials

## Admin Dashboard Access

**Login URL:** `http://localhost:3000/admin/auth/signin`

### 👨‍💼 Super Admin Account
- **Email:** `admin@gmgfinancial.com.au`
- **Password:** `admin123`
- **Role:** `SUPER_ADMIN`
- **Permissions:** Full system access

---

## 🚀 Quick Start

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Access the admin portal:**
   ```
   http://localhost:3000/admin/auth/signin
   ```

3. **Login with the credentials above**

4. **You'll be redirected to:**
   ```
   http://localhost:3000/admin/dashboard
   ```

---

## 🔧 Database Management

### View Database
```bash
npm run db:studio
```

### Create Additional Admin Users
```bash
npm run db:seed
```

### Reset Database (if needed)
```bash
npm run db:push
npm run db:seed
```

---

## 🛡️ Security Notes

**⚠️ Important:** Change these default credentials in production!

### For Production:
1. Update password to something secure
2. Use environment variables for sensitive data
3. Enable MFA for admin accounts
4. Regular security audits

---

## 📱 Admin Dashboard Features

✅ **Currently Available:**
- User authentication & authorization
- Role-based access control
- Dashboard with stats and activity
- User management system
- Secure session management

🚧 **Ready to Build:**
- Content management (news, FAQ)
- Calculator administration
- Lead & contact management
- Analytics dashboard
- Email integration

---

**🎉 Your admin system is ready to use!**