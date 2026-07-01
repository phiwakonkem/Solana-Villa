'use client'
import { useState } from 'react';
import { Calendar, Users, CreditCard } from 'lucide-react';
import { prisma } from "@/lib/prisma";

interface Props {
  villaName: string
  pricePerNight: number
}

export default function BookingForm({ villaName, pricePerNight }: Props) {
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guests, setGuests] = useState(2)
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const nights = checkIn && checkOut
    ? Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24))
    : 0

  const total = nights * pricePerNight
  const cleaningFee = 500
  const serviceFee = Math.round(total * 0.05)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl p-8 border border-gray-200 text-center shadow-xl">
        <div className="text-5xl mb-4">🎉</div>
        <h3 className="font-[Playfair_Display] text-2xl font-bold text-[#1B4332] mb-2">
          Request Received!
        </h3>
        <p className="text-gray-500 text-sm mb-4">
          Thank you for your interest in {villaName}. We'll confirm your booking within 24 hours.
        </p>
        <p className="text-[#D4A853] font-medium text-sm">
          Check your email for confirmation details.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden">
      {/* Price Header */}
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
            {/* Dates */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label className="text-xs text-gray-500 uppercase tracking-wide mb-1 block">
                  Check-in
                </label>
                <input type="date" value={checkIn}
                       onChange={e => setCheckIn(e.target.value)}
                       min={new Date().toISOString().split('T')[0]}
                       className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#1B4332]" />
              </div>
              <div>
                <label className="text-xs text-gray-500 uppercase tracking-wide mb-1 block">
                  Check-out
                </label>
                <input type="date" value={checkOut}
                       onChange={e => setCheckOut(e.target.value)}
                       min={checkIn || new Date().toISOString().split('T')[0]}
                       className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#1B4332]" />
              </div>
            </div>

            {/* Guests */}
            <div className="mb-6">
              <label className="text-xs text-gray-500 uppercase tracking-wide mb-1 block">
                Guests
              </label>
              <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                <button onClick={() => setGuests(Math.max(1, guests - 1))}
                        className="px-4 py-3 text-gray-500 hover:bg-gray-50 transition-colors">−</button>
                <span className="flex-1 text-center font-medium">{guests}</span>
                <button onClick={() => setGuests(Math.min(8, guests + 1))}
                        className="px-4 py-3 text-gray-500 hover:bg-gray-50 transition-colors">+</button>
              </div>
            </div>

            {/* Price Breakdown */}
            {nights > 0 && (
              <div className="bg-[#FAF7F2] rounded-xl p-4 mb-6 text-sm">
                <div className="flex justify-between mb-2 text-gray-600">
                  <span>R{pricePerNight.toLocaleString()} × {nights} nights</span>
                  <span>R{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between mb-2 text-gray-600">
                  <span>Cleaning fee</span>
                  <span>R{cleaningFee}</span>
                </div>
                <div className="flex justify-between mb-2 text-gray-600">
                  <span>Service fee</span>
                  <span>R{serviceFee}</span>
                </div>
                <div className="border-t border-gray-200 mt-3 pt-3 flex justify-between font-bold text-[#1B4332]">
                  <span>Total</span>
                  <span>R{(total + cleaningFee + serviceFee).toLocaleString()}</span>
                </div>
              </div>
            )}

            <button
              onClick={() => nights > 0 && setStep(2)}
              className={`w-full py-4 rounded-xl font-medium transition-colors ${
                nights > 0
                  ? 'bg-[#1B4332] hover:bg-green-900 text-white'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              {nights > 0 ? 'Request to Book' : 'Select dates to continue'}
            </button>
          </>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <button onClick={() => setStep(1)}
                    className="text-sm text-[#1B4332] text-left hover:underline">
              ← Back to dates
            </button>

            <div className="bg-[#FAF7F2] rounded-xl p-4 text-sm mb-2">
              <p className="font-medium text-[#1B4332]">{villaName}</p>
              <p className="text-gray-500">{checkIn} → {checkOut} · {guests} guests</p>
              <p className="text-[#D4A853] font-bold mt-1">
                R{(total + cleaningFee + serviceFee).toLocaleString()} total
              </p>
            </div>

            <input required placeholder="Full Name"
                   value={form.name}
                   onChange={e => setForm(f => ({...f, name: e.target.value}))}
                   className="border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#1B4332]" />

            <input required type="email" placeholder="Email Address"
                   value={form.email}
                   onChange={e => setForm(f => ({...f, email: e.target.value}))}
                   className="border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#1B4332]" />

            <input required placeholder="Phone / WhatsApp"
                   value={form.phone}
                   onChange={e => setForm(f => ({...f, phone: e.target.value}))}
                   className="border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#1B4332]" />

            <textarea placeholder="Special requests (optional)"
                      value={form.message}
                      onChange={e => setForm(f => ({...f, message: e.target.value}))}
                      rows={3}
                      className="border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#1B4332] resize-none" />

            <button type="submit"
                    className="w-full bg-[#D4A853] hover:bg-amber-600 text-white py-4 rounded-xl font-medium transition-colors flex items-center justify-center gap-2">
              <CreditCard size={18} />
              Confirm Booking Request
            </button>

            <p className="text-center text-xs text-gray-400">
              You won't be charged yet. We'll confirm availability first.
            </p>
          </form>
        )}
      </div>
    </div>
  )
}