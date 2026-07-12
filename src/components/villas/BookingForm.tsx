'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Props {
  villaName: string
  pricePerNight: number
  propertySlug: string
}

export default function BookingForm({ villaName, pricePerNight, propertySlug }: Props) {
  const router = useRouter()
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guests, setGuests] = useState(2)
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [bookingId, setBookingId] = useState('')

  const nights = checkIn && checkOut
    ? Math.max(0, Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000))
    : 0

  const subtotal = nights * pricePerNight
  const cleaningFee = 500
  const serviceFee = Math.round(subtotal * 0.05)
  const total = subtotal + cleaningFee + serviceFee

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const res = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        propertySlug,
        checkIn,
        checkOut,
        guests,
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: form.message,
        total
      })
    })

    const data = await res.json()
    if (data.success) {
      setBookingId(data.bookingId)
      setStep(3)
    }
    setLoading(false)
  }

  const handlePaystack = () => {
    const handler = (window as any).PaystackPop.setup({
      key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
      email: form.email,
      amount: total * 100,
      currency: 'ZAR',
      ref: bookingId,
      metadata: {
        custom_fields: [
          { display_name: 'Villa', variable_name: 'villa', value: villaName },
          { display_name: 'Check-in', variable_name: 'check_in', value: checkIn },
          { display_name: 'Check-out', variable_name: 'check_out', value: checkOut },
        ]
      },
      callback: function(response: any) {
        fetch('/api/payments/paystack/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ reference: response.reference, bookingId })
        }).then(() => {
          router.push(`/booking-confirmed?id=${bookingId}`)
        })
      },
      onClose: function() {
        console.log('Payment window closed')
      }
    })
    handler.openIframe()
  }

  if (step === 3) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden">
        <div className="bg-[#1B4332] text-white p-6 text-center">
          <p className="text-[#D4A853] text-xs tracking-widest uppercase mb-1">Almost there</p>
          <h3 className="font-[Playfair_Display] text-xl font-bold">Secure Your Stay</h3>
        </div>
        <div className="p-6">
          <div className="bg-[#FAF7F2] rounded-xl p-4 mb-6 text-sm">
            <p className="font-medium text-[#1B4332] mb-1">{villaName}</p>
            <p className="text-gray-500">{checkIn} → {checkOut} · {guests} guests</p>
            <p className="text-[#D4A853] font-bold text-lg mt-2">R{total.toLocaleString()} total</p>
          </div>

          <button
            onClick={handlePaystack}
            className="w-full bg-[#D4A853] hover:bg-amber-600 text-white py-4 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 text-lg"
          >
            🔒 Pay R{total.toLocaleString()} Securely
          </button>

          <p className="text-center text-xs text-gray-400 mt-3">
            Powered by Paystack · SSL encrypted · ZAR currency
          </p>

          <button onClick={() => setStep(2)} className="w-full text-center text-sm text-gray-400 hover:text-gray-600 mt-3 transition-colors">
            ← Edit booking details
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden">
      <div className="bg-[#1B4332] text-white p-6">
        <p className="text-[#D4A853] text-xs tracking-widest uppercase mb-1">Starting from</p>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold">R{pricePerNight.toLocaleString()}</span>
          <span className="text-gray-300 text-sm">/ night</span>
        </div>
      </div>

      <div className="p-6">
        {step === 1 && (
          <>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label className="text-xs text-gray-500 uppercase tracking-wide mb-1 block">Check-in</label>
                <input type="date" value={checkIn}
                       onChange={e => setCheckIn(e.target.value)}
                       min={new Date().toISOString().split('T')[0]}
                       className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#1B4332]" />
              </div>
              <div>
                <label className="text-xs text-gray-500 uppercase tracking-wide mb-1 block">Check-out</label>
                <input type="date" value={checkOut}
                       onChange={e => setCheckOut(e.target.value)}
                       min={checkIn || new Date().toISOString().split('T')[0]}
                       className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#1B4332]" />
              </div>
            </div>

            <div className="mb-6">
              <label className="text-xs text-gray-500 uppercase tracking-wide mb-1 block">Guests</label>
              <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                <button onClick={() => setGuests(Math.max(1, guests - 1))} className="px-4 py-3 text-gray-500 hover:bg-gray-50">−</button>
                <span className="flex-1 text-center font-medium">{guests}</span>
                <button onClick={() => setGuests(Math.min(8, guests + 1))} className="px-4 py-3 text-gray-500 hover:bg-gray-50">+</button>
              </div>
            </div>

            {nights > 0 && (
              <div className="bg-[#FAF7F2] rounded-xl p-4 mb-6 text-sm space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>R{pricePerNight.toLocaleString()} × {nights} nights</span>
                  <span>R{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Cleaning fee</span>
                  <span>R{cleaningFee}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Service fee</span>
                  <span>R{serviceFee}</span>
                </div>
                <div className="border-t border-gray-200 pt-2 flex justify-between font-bold text-[#1B4332]">
                  <span>Total</span>
                  <span>R{total.toLocaleString()}</span>
                </div>
              </div>
            )}

            <button
              onClick={() => nights > 0 && setStep(2)}
              className={`w-full py-4 rounded-xl font-medium transition-colors ${nights > 0 ? 'bg-[#1B4332] hover:bg-green-900 text-white' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
            >
              {nights > 0 ? 'Continue to Details' : 'Select dates to continue'}
            </button>
          </>
        )}

        {step === 2 && (
          <form onSubmit={handleBookingSubmit} className="flex flex-col gap-4">
            <button onClick={() => setStep(1)} type="button" className="text-sm text-[#1B4332] text-left hover:underline">
              ← Back to dates
            </button>

            <div className="bg-[#FAF7F2] rounded-xl p-3 text-sm mb-2">
              <p className="font-medium text-[#1B4332]">{villaName}</p>
              <p className="text-gray-500">{checkIn} → {checkOut} · {guests} guests</p>
              <p className="text-[#D4A853] font-bold mt-1">R{total.toLocaleString()} total</p>
            </div>

            <input required placeholder="Full Name" value={form.name}
                   onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                   className="border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#1B4332]" />
            <input required type="email" placeholder="Email Address" value={form.email}
                   onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                   className="border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#1B4332]" />
            <input required placeholder="Phone / WhatsApp" value={form.phone}
                   onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                   className="border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#1B4332]" />
            <textarea placeholder="Special requests (optional)" value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      rows={3}
                      className="border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#1B4332] resize-none" />

            <button type="submit" disabled={loading}
                    className="w-full bg-[#D4A853] hover:bg-amber-600 disabled:opacity-50 text-white py-4 rounded-xl font-medium transition-colors">
              {loading ? 'Saving...' : 'Secure Your Stay →'}
            </button>

            <p className="text-center text-xs text-gray-400">You won't be charged yet</p>
          </form>
        )}
      </div>
    </div>
  )
}