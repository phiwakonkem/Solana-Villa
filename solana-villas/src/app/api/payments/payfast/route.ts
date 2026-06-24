import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

function generateSignature(data: Record<string, string>, passphrase: string) {
  const ordered = Object.keys(data).sort().map(k => `${k}=${encodeURIComponent(data[k]).replace(/%20/g, '+')}`).join('&')
  const withPassphrase = `${ordered}&passphrase=${encodeURIComponent(passphrase).replace(/%20/g, '+')}`
  return crypto.createHash('md5').update(withPassphrase).digest('hex')
}

export async function POST(req: NextRequest) {
  const { bookingId, amount, itemName, guestEmail, guestName } = await req.json()

  const data: Record<string, string> = {
    merchant_id: process.env.PAYFAST_MERCHANT_ID || '10000100', // sandbox default
    merchant_key: process.env.PAYFAST_MERCHANT_KEY || '46f0cd694581a',
    return_url: `${process.env.NEXT_PUBLIC_SITE_URL}/booking-confirmed?id=${bookingId}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/booking-cancelled`,
    notify_url: `${process.env.NEXT_PUBLIC_SITE_URL}/api/payments/payfast/notify`,
    name_first: guestName.split(' ')[0],
    email_address: guestEmail,
    m_payment_id: bookingId,
    amount: Number(amount).toFixed(2),
    item_name: itemName,
  }

  const signature = generateSignature(data, process.env.PAYFAST_PASSPHRASE || '')

  return NextResponse.json({
    paymentUrl: 'https://sandbox.payfast.co.za/eng/process',
    fields: { ...data, signature }
  })
}