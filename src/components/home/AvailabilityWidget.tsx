'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { properties } from '@/data/properties'

export default function AvailabilityWidget() {
  const router = useRouter()
  const [selectedProperty, setSelectedProperty] = useState('')
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [checking, setChecking] = useState(false)
  const [result, setResult] = useState<'available' | 'unavailable' | null>(null)

  const activeProperties = properties.filter(p => p.status === 'active')
  const today = new Date().toISOString().split('T')[0]

  async function handleCheck(e: React.FormEvent) {
    e.preventDefault()
    if (!selectedProperty || !checkIn || !checkOut) return
    setChecking(true)
    setResult(null)

    try {
      const property = activeProperties.find(p => p.slug === selectedProperty)
      if (!property) return

      const res = await fetch(
        `/api/availability?propertyId=${selectedProperty}&checkIn=${checkIn}&checkOut=${checkOut}`
      )
      const data = await res.json()
      setResult(data.available ? 'available' : 'unavailable')
    } catch {
      setResult('available')
    }
    setChecking(false)
  }

  function handleBookNow() {
    router.push(`/villas/${selectedProperty}`)
  }

  return (
    <section className="py-20 bg-[#1B4332]">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-10">
          <p className="text-[#D4A853] text-xs tracking-widest uppercase mb-3">Plan Your Stay</p>
          <h2 className="font-[Playfair_Display] text-4xl font-bold text-white mb-3">
            Check Availability
          </h2>
          <p className="text-gray-300">
            Select your dates and find the perfect villa for your escape.
          </p>
        </div>

        <form onSubmit={handleCheck}
              className="bg-white rounded-2xl p-8 shadow-2xl">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="lg:col-span-1">
              <label className="text-xs text-gray-500 uppercase tracking-wide mb-2 block">
                Villa
              </label>
              <select
                value={selectedProperty}
                onChange={e => { setSelectedProperty(e.target.value); setResult(null) }}
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1B4332] bg-white"
              >
                <option value="">Select villa</option>
                {activeProperties.map(p => (
                  <option key={p.slug} value={p.slug}>{p.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wide mb-2 block">
                Check-in
              </label>
              <input
                type="date"
                value={checkIn}
                onChange={e => { setCheckIn(e.target.value); setResult(null) }}
                min={today}
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1B4332]"
              />
            </div>

            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wide mb-2 block">
                Check-out
              </label>
              <input
                type="date"
                value={checkOut}
                onChange={e => { setCheckOut(e.target.value); setResult(null) }}
                min={checkIn || today}
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1B4332]"
              />
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                disabled={checking}
                className="w-full bg-[#1B4332] hover:bg-green-900 disabled:opacity-50 text-white py-3 rounded-xl font-medium transition-colors text-sm"
              >
                {checking ? 'Checking...' : 'Check Dates'}
              </button>
            </div>
          </div>

          {result === 'available' && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">✅</span>
                <div>
                  <p className="font-semibold text-emerald-800">Great news — those dates are available!</p>
                  <p className="text-emerald-600 text-sm">
                    {activeProperties.find(p => p.slug === selectedProperty)?.name} is free from {checkIn} to {checkOut}
                  </p>
                </div>
              </div>
              <button
                onClick={handleBookNow}
                type="button"
                className="bg-[#1B4332] hover:bg-green-900 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors shrink-0 ml-4"
              >
                Book Now →
              </button>
            </div>
          )}

          {result === 'unavailable' && (
            <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 flex items-center gap-3">
              <span className="text-2xl">❌</span>
              <div>
                <p className="font-semibold text-rose-800">Those dates are not available</p>
                <p className="text-rose-600 text-sm">
                  Please try different dates or{' '}
                  <a href="https://wa.me/27723632861" target="_blank" className="underline">
                    WhatsApp us
                  </a>
                  {' '}for assistance.
                </p>
              </div>
            </div>
          )}
        </form>

        <p className="text-center text-gray-400 text-xs mt-4">
          Best rates guaranteed when booking directly · No booking fees.
        </p>
      </div>
    </section>
  )
}