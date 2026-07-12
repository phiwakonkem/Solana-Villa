import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, password } = await req.json()

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Name, email and password are required' }, { status: 400 })
    }

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json({ error: 'An account with this email already exists' }, { status: 400 })
    }

    const passwordHash = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
      data: { name, email, phone, passwordHash, isAdmin: false }
    })

    const token = jwt.sign(
      { userId: user.id, isAdmin: false },
      process.env.JWT_SECRET!,
      { expiresIn: '30d' }
    )

    return NextResponse.json({
      success: true,
      token,
      user: { id: user.id, name: user.name, email: user.email }
    })
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json({ error: 'Server error. Please try again.' }, { status: 500 })
  }
}