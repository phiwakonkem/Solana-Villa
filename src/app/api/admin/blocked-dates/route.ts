import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import jwt from 'jsonwebtoken'

function verifyAdmin(req: NextRequest) {
  const auth = req.headers.get('Authorization')
  if (!auth) return false
  try {
    const decoded = jwt.verify(auth.replace('Bearer ', ''), process.env.JWT_SECRET!) as any
    return decoded.isAdmin
  } catch { return false }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const propertyId = searchParams.get('propertyId')
  const dates = await prisma.blockedDate.findMany({
    where: propertyId ? { propertyId } : {}
  })
  return NextResponse.json(dates)
}

export async function POST(req: NextRequest) {
  if (!verifyAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { propertyId, date, reason } = await req.json()
  const blocked = await prisma.blockedDate.create({
    data: { propertyId, date: new Date(date), reason }
  })
  return NextResponse.json(blocked)
}

export async function DELETE(req: NextRequest) {
  if (!verifyAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await req.json()
  await prisma.blockedDate.delete({ where: { id } })
  return NextResponse.json({ success: true })
}