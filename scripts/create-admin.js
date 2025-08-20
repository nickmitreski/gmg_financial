const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function createAdmin() {
  try {
    // Check if admin already exists
    const existingAdmin = await prisma.user.findUnique({
      where: { email: 'admin@gmgfinancial.com.au' }
    })

    if (existingAdmin) {
      console.log('✅ Admin user already exists')
      console.log('Email: admin@gmgfinancial.com.au')
      console.log('Password: admin123')
      return
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash('admin123', 12)

    // Create the admin user
    const adminUser = await prisma.user.create({
      data: {
        email: 'admin@gmgfinancial.com.au',
        password: hashedPassword,
        name: 'Admin User',
        role: 'SUPER_ADMIN',
        isActive: true,
        department: 'Administration',
      }
    })

    console.log('🎉 Admin user created successfully!')
    console.log('Email: admin@gmgfinancial.com.au')
    console.log('Password: admin123')
    console.log('Role: SUPER_ADMIN')
    console.log('')
    console.log('You can now login at: http://localhost:3000/admin/auth/signin')

  } catch (error) {
    console.error('Error creating admin user:', error)
  } finally {
    await prisma.$disconnect()
  }
}

createAdmin()