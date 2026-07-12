import Link from 'next/link'

export default function BookingConfirmed() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-6">🎉</div>
        <h1 className="font-[Playfair_Display] text-3xl font-bold text-[#1B4332] mb-3">
          Booking Confirmed!
        </h1>
        <p className="text-gray-500 mb-8 leading-relaxed">
          Thank you for booking with Solana Villas. A confirmation email is on its way to you.
          We can't wait to welcome you to Mpumalanga!
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/" className="bg-[#1B4332] hover:bg-green-900 text-white px-6 py-3 rounded-xl text-sm transition-colors">
            Back to Home
          </Link>
          <a href="https://wa.me/27723632861" target="_blank"
             className="border border-[#1B4332] text-[#1B4332] px-6 py-3 rounded-xl text-sm hover:bg-[#1B4332] hover:text-white transition-colors">
            WhatsApp Us
          </a>
        </div>
      </div>
    </div>
  )
}