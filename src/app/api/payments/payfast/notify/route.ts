import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const paymentId = formData.get('m_payment_id') as string
  const paymentStatus = formData.get('payment_status') as string

  if (paymentStatus === 'COMPLETE') {
    await prisma.booking.update({
      where: { id: paymentId },
      data: { paymentStatus: 'paid', status: 'confirmed' }
    })
  }

  return NextResponse.json({ received: true })
}