import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { UserRole } from '@prisma/client'
import bcrypt from 'bcryptjs'

export async function POST(request: Request) {
  try {
    // Check if any admin users already exist
    const existingAdmin = await prisma.user.findFirst({
      where: {
        role: {
          in: [UserRole.SUPER_ADMIN, UserRole.ADMIN]
        }
      }
    })

    if (existingAdmin) {
      return NextResponse.json(
        { error: 'Admin user already exists' },
        { status: 400 }
      )
    }

    const { email, password, name } = await request.json()

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Email, password, and name are required' },
        { status: 400 }
      )
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create the first admin user
    const adminUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: UserRole.SUPER_ADMIN,
        isActive: true,
        department: 'Administration',
      }
    })

    return NextResponse.json({
      message: 'Admin user created successfully',
      user: {
        id: adminUser.id,
        email: adminUser.email,
        name: adminUser.name,
        role: adminUser.role,
      }
    })
  } catch (error) {
    console.error('Error creating admin user:', error)
    return NextResponse.json(
      { error: 'Failed to create admin user' },
      { status: 500 }
    )
  }
}