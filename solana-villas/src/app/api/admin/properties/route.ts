import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import jwt from 'jsonwebtoken'

function verifyAdmin(req: NextRequest) {
  const auth = req.headers.get('Authorization')
  if (!auth) return null
  const token = auth.replace('Bearer ', '')
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { isAdmin: boolean }
    return decoded.isAdmin ? decoded : null
  } catch {
    return null
  }
}

export async function GET(req: NextRequest) {
  if (!verifyAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const properties = await prisma.property.findMany({ orderBy: { createdAt: 'asc' } })
  return NextResponse.json(properties)
}

export async function POST(req: NextRequest) {
  if (!verifyAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  const property = await prisma.property.create({ data: body })
  return NextResponse.json(property)
}