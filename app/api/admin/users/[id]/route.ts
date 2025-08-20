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

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session || !hasPermission(session.user.role, UserRole.MANAGER)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const user = await prisma.user.findUnique({
    where: { id: params.id },
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

  if (!user) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json({ user })
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session || !hasPermission(session.user.role, UserRole.ADMIN)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const data = await request.json()
    const { name, role, isActive, department, password } = data

    const updateData: any = {}
    if (typeof name !== 'undefined') updateData.name = name
    if (typeof department !== 'undefined') updateData.department = department
    if (typeof isActive !== 'undefined') updateData.isActive = Boolean(isActive)
    if (typeof role !== 'undefined') updateData.role = role
    if (typeof password === 'string' && password.length > 0) {
      const bcrypt = await import('bcryptjs')
      updateData.password = await bcrypt.hash(password, 12)
    }

    const updated = await prisma.user.update({
      where: { id: params.id },
      data: updateData,
      select: { id: true, email: true, name: true, role: true, isActive: true, department: true }
    })

    return NextResponse.json({ user: updated })
  } catch (error) {
    console.error('Update user error', error)
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 })
  }
}

export async function POST(
  request: Request,
  ctx: { params: { id: string } }
) {
  // Method override support for HTML forms
  const contentType = request.headers.get('content-type') || ''
  if (contentType.includes('application/x-www-form-urlencoded') || contentType.includes('multipart/form-data')) {
    const form = await request.formData()
    const method = String(form.get('_method') || 'POST').toUpperCase()
    if (method === 'PATCH') {
      const payload: any = {}
      if (form.has('name')) payload.name = String(form.get('name') || '')
      if (form.has('department')) payload.department = String(form.get('department') || '')
      if (form.has('role')) payload.role = String(form.get('role') || '')
      if (form.has('isActive')) payload.isActive = String(form.get('isActive')) === 'true'
      if (form.has('password')) payload.password = String(form.get('password') || '')
      return PATCH(new Request(request.url, { method: 'PATCH', body: JSON.stringify(payload), headers: { 'content-type': 'application/json' } }), ctx)
    }
  }
  return NextResponse.json({ error: 'Unsupported method' }, { status: 405 })
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session || !hasPermission(session.user.role, UserRole.SUPER_ADMIN)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    await prisma.user.delete({ where: { id: params.id } })
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Delete user error', error)
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 })
  }
}


