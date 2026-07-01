import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  const { name, phone, propertyId, notes } = await req.json()
  const entry = await prisma.housekeeper.create({
    data: { name, phone, propertyId, notes }
  })
  return NextResponse.json({ success: true, entry })
}

export async function GET() {
  const entries = await prisma.housekeeper.findMany({
    include: { property: true },
    orderBy: { checkInDate: 'desc' },
    take: 20
  })
  return NextResponse.json(entries)
}