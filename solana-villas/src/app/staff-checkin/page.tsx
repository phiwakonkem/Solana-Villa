'use client'
import { useState } from 'react'
import { properties } from '@/data/properties'

export default function StaffCheckin() {
  const [form, setForm] = useState({ name: '', phone: '', propertyId: '', notes: '' })
  const [done, setDone] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetch('/api/housekeepers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    setDone(true)
  }

  if (done) return (
    <div className="min-h-screen bg-[#1B4332] flex items-center justify-center text-white text-center px-6">
      <div>
        <p className="text-3xl mb-3">✅</p>
        <p className="text-lg">Thanks, {form.name}! You're checked in for today.</p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#1B4332] flex items-center justify-center px-6">
      <form onSubmit={handleSubmit}
            className="bg-white rounded-2xl p-8 max-w-sm w-full flex flex-col gap-4">
        <h1 className="font-[Playfair_Display] text-xl font-bold text-[#1B4332] mb-1">
          Staff Check-In
        </h1>
        <p className="text-gray-500 text-sm mb-4">Please confirm you're on site today.</p>

        <input required placeholder="Your Full Name"
               value={form.name}
               onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
               className="border border-gray-200 rounded-lg px-4 py-3 text-sm" />
        <input required placeholder="Phone Number"
               value={form.phone}
               onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
               className="border border-gray-200 rounded-lg px-4 py-3 text-sm" />
        <select required value={form.propertyId}
                onChange={e => setForm(f => ({ ...f, propertyId: e.target.value }))}
                className="border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-600">
          <option value="">Which property?</option>
          {properties.filter(p => p.status === 'active').map(p => (
            <option key={p.slug} value={p.slug}>{p.name}</option>
          ))}
        </select>
        <textarea placeholder="Notes (optional)"
                  value={form.notes}
                  onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                  rows={2}
                  className="border border-gray-200 rounded-lg px-4 py-3 text-sm resize-none" />

        <button type="submit" className="bg-[#1B4332] text-white py-3 rounded-xl font-medium mt-2">
          Check In
        </button>
      </form>
    </div>
  )
}