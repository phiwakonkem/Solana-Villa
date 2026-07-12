'use client'
import { useState, useEffect } from 'react'

interface BlockedDate {
  id: string
  date: string
  reason?: string
  propertyId: string
}

interface Props {
  propertyId: string
  propertyName: string
}

export default function AvailabilityCalendar({ propertyId, propertyName }: Props) {
  const [blockedDates, setBlockedDates] = useState<BlockedDate[]>([])
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [reason, setReason] = useState('')
  const [loading, setLoading] = useState(false)

  const token = typeof window !== 'undefined' ? localStorage.getItem('solana_token') : ''

  useEffect(() => {
    fetch(`/api/admin/blocked-dates?propertyId=${propertyId}`)
      .then(r => r.json())
      .then(setBlockedDates)
  }, [propertyId])

  const year = currentMonth.getFullYear()
  const month = currentMonth.getMonth()
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const monthName = currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })

  function dateString(day: number) {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
  }

  function isBlocked(day: number) {
    return blockedDates.some(b => b.date.startsWith(dateString(day)))
  }

  function getBlockedId(day: number) {
    return blockedDates.find(b => b.date.startsWith(dateString(day)))?.id
  }

  async function toggleDate(day: number) {
    const ds = dateString(day)
    const blocked = isBlocked(day)

    if (blocked) {
      const id = getBlockedId(day)
      await fetch('/api/admin/blocked-dates', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ id })
      })
      setBlockedDates(prev => prev.filter(b => b.id !== id))
    } else {
      setSelectedDate(ds)
    }
  }

  async function confirmBlock() {
    if (!selectedDate) return
    setLoading(true)
    const res = await fetch('/api/admin/blocked-dates', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ propertyId, date: selectedDate, reason })
    })
    const data = await res.json()
    setBlockedDates(prev => [...prev, data])
    setSelectedDate(null)
    setReason('')
    setLoading(false)
  }

  const today = new Date().toISOString().split('T')[0]

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold">{propertyName} — Availability</h3>
        <div className="flex gap-2 items-center">
          <button onClick={() => setCurrentMonth(new Date(year, month - 1))}
                  className="text-gray-400 hover:text-white px-2 py-1 rounded transition-colors">‹</button>
          <span className="text-sm text-gray-300 min-w-[140px] text-center">{monthName}</span>
          <button onClick={() => setCurrentMonth(new Date(year, month + 1))}
                  className="text-gray-400 hover:text-white px-2 py-1 rounded transition-colors">›</button>
        </div>
      </div>

      {/* Legend */}
      <div className="flex gap-4 mb-4 text-xs text-gray-400">
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-emerald-500/20 border border-emerald-500/50 inline-block" /> Available</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-rose-500/20 border border-rose-500/50 inline-block" /> Blocked</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-gray-700 inline-block" /> Past</span>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 mb-2">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
          <div key={d} className="text-center text-xs text-gray-500 py-1">{d}</div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: firstDay }).map((_, i) => <div key={`empty-${i}`} />)}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1
          const ds = dateString(day)
          const isPast = ds < today
          const blocked = isBlocked(day)

          return (
            <button
              key={day}
              onClick={() => !isPast && toggleDate(day)}
              disabled={isPast}
              className={`
                relative aspect-square rounded-lg text-sm font-medium transition-all
                ${isPast ? 'bg-gray-800 text-gray-600 cursor-not-allowed' : ''}
                ${!isPast && !blocked ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20' : ''}
                ${blocked ? 'bg-rose-500/20 border border-rose-500/50 text-rose-400 hover:bg-rose-500/30' : ''}
              `}
            >
              {day}
              {blocked && <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-rose-500" />}
            </button>
          )
        })}
      </div>

      {/* Confirm block dialog */}
      {selectedDate && (
        <div className="mt-4 bg-gray-800 rounded-xl p-4 border border-gray-700">
          <p className="text-sm text-white mb-3">Block <strong>{selectedDate}</strong>?</p>
          <input
            value={reason}
            onChange={e => setReason(e.target.value)}
            placeholder="Reason (e.g. Owner stay, Maintenance)"
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-400 outline-none focus:border-[#D4A853] mb-3"
          />
          <div className="flex gap-2">
            <button onClick={confirmBlock} disabled={loading}
                    className="bg-rose-600 hover:bg-rose-700 text-white text-sm px-4 py-2 rounded-lg transition-colors disabled:opacity-50">
              {loading ? 'Blocking...' : 'Confirm Block'}
            </button>
            <button onClick={() => setSelectedDate(null)}
                    className="bg-gray-700 hover:bg-gray-600 text-gray-300 text-sm px-4 py-2 rounded-lg transition-colors">
              Cancel
            </button>
          </div>
        </div>
      )}

      <p className="text-xs text-gray-500 mt-4">Click a date to block/unblock it. Blocked dates won't be available for booking.</p>
    </div>
  )
}