import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})

export async function sendBookingEmails({
  villaName, checkIn, checkOut, guests, name, email, phone, message, total
}: {
  villaName: string
  checkIn: string
  checkOut: string
  guests: number
  name: string
  email: string
  phone: string
  message?: string
  total: number
}) {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: 'reservations@solanavillas.co.za',
    subject: `New Booking Request - ${villaName}`,
    html: `
      <h2>New Booking Request</h2>
      <p><strong>Villa:</strong> ${villaName}</p>
      <p><strong>Guest:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Check-in:</strong> ${checkIn}</p>
      <p><strong>Check-out:</strong> ${checkOut}</p>
      <p><strong>Guests:</strong> ${guests}</p>
      <p><strong>Total:</strong> R${total}</p>
      <p><strong>Message:</strong> ${message || 'None'}</p>
    `
  })

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: `Booking Request Received - ${villaName} | Solana Villas`,
    html: `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #1B4332; color: white; padding: 40px; text-align: center;">
          <h1 style="font-size: 28px; margin: 0;">Solana Villas</h1>
          <p style="color: #D4A853; margin: 8px 0 0;">Sabie River Eco Estate, Hazyview</p>
        </div>
        <div style="padding: 40px; background: #FAF7F2;">
          <h2 style="color: #1B4332;">Thank you, ${name}!</h2>
          <p>We've received your booking request for <strong>${villaName}</strong> and will confirm availability within 24 hours.</p>
          <div style="background: white; padding: 20px; border-radius: 12px; margin: 20px 0;">
            <p><strong>Check-in:</strong> ${checkIn}</p>
            <p><strong>Check-out:</strong> ${checkOut}</p>
            <p><strong>Guests:</strong> ${guests}</p>
            <p><strong>Estimated Total:</strong> R${total}</p>
          </div>
          <p>Questions? Reply to this email or WhatsApp us at 072 363 2861.</p>
          <p style="color: #D4A853; font-style: italic;">We look forward to welcoming you!</p>
        </div>
      </div>
    `
  })
}

export async function sendContactEmail({ name, email, phone, subject, message }: {
  name: string; email: string; phone?: string; subject: string; message: string
}) {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: 'reservations@solanavillas.co.za',
    subject: `Contact Form: ${subject}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong> ${message}</p>
    `
  })
}