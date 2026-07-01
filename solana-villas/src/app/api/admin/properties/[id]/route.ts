import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import jwt from 'jsonwebtoken'

function verifyAdmin(req: NextRequest) {
  const auth = req.headers.get('Authorization')
  if (!auth) return null
  try {
    const decoded = jwt.verify(auth.replace('Bearer ', ''), process.env.JWT_SECRET!) as { isAdmin: boolean }
    return decoded.isAdmin ? decoded : null
  } catch {
    return null
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  if (!verifyAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  const property = await prisma.property.update({ where: { id: params.id }, data: body })
  return NextResponse.json(property)
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  if (!verifyAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  await prisma.property.delete({ where: { id: params.id } })
  return NextResponse.json({ success: true })
}