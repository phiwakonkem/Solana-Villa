import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const propertyId = searchParams.get('propertyId')
  const checkIn = searchParams.get('checkIn')
  const checkOut = searchParams.get('checkOut')

  if (!propertyId || !checkIn || !checkOut) {
    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 })
  }

  const overlapping = await prisma.booking.findMany({
    where: {
      propertyId,
      status: { in: ['pending', 'confirmed'] },
      AND: [
        { checkIn: { lt: new Date(checkOut) } },
        { checkOut: { gt: new Date(checkIn) } }
      ]
    }
  })

  return NextResponse.json({
    available: overlapping.length === 0,
    conflictingBookings: overlapping.length
  })
}