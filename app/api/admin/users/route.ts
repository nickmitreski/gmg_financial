import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { UserRole } from '@prisma/client'

function hasPermission(userRole: UserRole, requiredRole: UserRole) {
  const order: Record<UserRole, number> = {
    USER: 0,
    STAFF: 1,
    MANAGER: 2,
    ADMIN: 3,
    SUPER_ADMIN: 4,
  }
  return order[userRole] >= order[requiredRole]
}

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session || !hasPermission(session.user.role, UserRole.MANAGER)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isActive: true,
      createdAt: true,
      lastLogin: true,
      department: true,
    }
  })

  return NextResponse.json({ users })
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session || !hasPermission(session.user.role, UserRole.ADMIN)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    let email: string | undefined
    let name: string | undefined
    let password: string | undefined
    let role: any = 'STAFF'
    let department: string | undefined

    const contentType = request.headers.get('content-type') || ''
    if (contentType.includes('application/json')) {
      const body = await request.json()
      email = body?.email
      name = body?.name
      password = body?.password
      role = body?.role ?? 'STAFF'
      department = body?.department
    } else {
      const form = await request.formData()
      email = String(form.get('email') || '') || undefined
      name = String(form.get('name') || '') || undefined
      password = String(form.get('password') || '') || undefined
      role = (String(form.get('role') || 'STAFF') as any) || 'STAFF'
      department = String(form.get('department') || '') || undefined
    }

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })
    }

    const bcrypt = await import('bcryptjs')
    const hashedPassword = await bcrypt.hash(password, 12)

    const created = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role,
        department,
        isActive: true,
        createdBy: session.user.id,
      },
      select: { id: true, email: true, name: true, role: true, isActive: true }
    })

    return NextResponse.json({ user: created }, { status: 201 })
  } catch (error) {
    console.error('Create user error', error)
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 })
  }
}


