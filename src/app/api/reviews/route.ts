import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import jwt from 'jsonwebtoken'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const propertySlug = searchParams.get('propertySlug')

  const property = await prisma.property.findUnique({ where: { slug: propertySlug || '' } })
  if (!property) return NextResponse.json([])

  const reviews = await (prisma as any).review.findMany({
    where: { propertyId: property.id },
    orderBy: { createdAt: 'desc' }
  })

  return NextResponse.json(reviews)
}

export async function POST(req: NextRequest) {
  const auth = req.headers.get('Authorization')
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    jwt.verify(auth.replace('Bearer ', ''), process.env.JWT_SECRET!)
  } catch {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
  }

  const { propertySlug, rating, comment, guestName } = await req.json()

  const property = await prisma.property.findUnique({ where: { slug: propertySlug } })
  if (!property) return NextResponse.json({ error: 'Property not found' }, { status: 404 })

  const review = await (prisma as any).review.create({
    data: { propertyId: property.id, guestName, rating, comment }
  })

  return NextResponse.json(review)
}