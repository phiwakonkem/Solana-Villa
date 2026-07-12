import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  const { reference, bookingId } = await req.json()

  const res = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
    headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` }
  })
  const data = await res.json()

  if (data.data?.status === 'success') {
    await prisma.booking.update({
      where: { id: bookingId },
      data: { paymentStatus: 'paid', status: 'confirmed', paymentRef: reference }
    })
    return NextResponse.json({ success: true })
  }

  return NextResponse.json({ success: false }, { status: 400 })
}