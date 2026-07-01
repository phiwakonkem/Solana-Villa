'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface Property {
  id: string
  slug: string
  name: string
  status: string
  price: number
  guests: number
  bedrooms: number
}

interface Booking {
  id: string
  guestName: string
  guestEmail: string
  guestPhone: string
  checkIn: string
  checkOut: string
  guests: number
  totalPrice: number
  status: string
  paymentStatus: string
  property: { name: string }
}

export default function AdminDashboard() {
  const router = useRouter()
  const [properties, setProperties] = useState<Property[]>([])
  const [bookings, setBookings] = useState<Booking[]>([])
  const [tab, setTab] = useState<'properties' | 'bookings'>('bookings')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const user = localStorage.getItem('solana_user')
    if (!user || !JSON.parse(user).isAdmin) {
      router.push('/login')
      return
    }

    const token = localStorage.getItem('solana_token')

    Promise.all([
      fetch('/api/admin/properties', { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()),
      fetch('/api/bookings').then(r => r.json())
    ]).then(([propsData, bookingsData]) => {
      setProperties(propsData)
      setBookings(bookingsData)
      setLoading(false)
    })
  }, [router])

  const handleDelete = async (id: string) => {
    if (!confirm('Remove this property? This cannot be undone.')) return
    await fetch(`/api/admin/properties/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${localStorage.getItem('solana_token')}` }
    })
    setProperties(prev => prev.filter(p => p.id !== id))
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center text-gray-400 bg-gray-950">Loading...</div>

  const statusColor = (s: string) => ({
    pending: 'bg-amber-400/10 text-amber-400',
    confirmed: 'bg-emerald-400/10 text-emerald-400',
    cancelled: 'bg-rose-400/10 text-rose-400'
  }[s] || 'bg-gray-700 text-gray-400')

  const payColor = (s: string) => ({
    paid: 'bg-emerald-400/10 text-emerald-400',
    unpaid: 'bg-gray-700 text-gray-400',
    refunded: 'bg-rose-400/10 text-rose-400'
  }[s] || 'bg-gray-700 text-gray-400')

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">Solana Villas Admin</h1>
            <p className="text-gray-400 text-sm mt-1">Manage properties and bookings</p>
          </div>
          <a href="/admin/properties/new"
             className="bg-[#D4A853] hover:bg-amber-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors">
            + Add Property
          </a>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button onClick={() => setTab('bookings')}
                  className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                    tab === 'bookings' ? 'bg-[#D4A853] text-white' : 'bg-gray-900 text-gray-400'
                  }`}>
            Bookings ({bookings.length})
          </button>
          <button onClick={() => setTab('properties')}
                  className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                    tab === 'properties' ? 'bg-[#D4A853] text-white' : 'bg-gray-900 text-gray-400'
                  }`}>
            Properties ({properties.length})
          </button>
        </div>

        {tab === 'bookings' && (
          <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800 text-left text-gray-400">
                  <th className="p-4 font-medium">Guest</th>
                  <th className="p-4 font-medium">Property</th>
                  <th className="p-4 font-medium">Dates</th>
                  <th className="p-4 font-medium">Guests</th>
                  <th className="p-4 font-medium">Total</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium">Payment</th>
                </tr>
              </thead>
              <tbody>
                {bookings.length === 0 ? (
                  <tr><td colSpan={7} className="p-8 text-center text-gray-500">No bookings yet</td></tr>
                ) : bookings.map(b => (
                  <tr key={b.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                    <td className="p-4">
                      <p className="font-medium">{b.guestName}</p>
                      <p className="text-gray-500 text-xs">{b.guestEmail}</p>
                    </td>
                    <td className="p-4 text-gray-300">{b.property.name}</td>
                    <td className="p-4 text-gray-300 text-xs">
                      {new Date(b.checkIn).toLocaleDateString()} → {new Date(b.checkOut).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-gray-300">{b.guests}</td>
                    <td className="p-4 font-medium">R{b.totalPrice.toLocaleString()}</td>
                    <td className="p-4">
                      <span className={`text-xs px-2 py-1 rounded-full ${statusColor(b.status)}`}>{b.status}</span>
                    </td>
                    <td className="p-4">
                      <span className={`text-xs px-2 py-1 rounded-full ${payColor(b.paymentStatus)}`}>{b.paymentStatus}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === 'properties' && (
          <div className="bg-gray-900 border border-gray-800 rounded-xl divide-y divide-gray-800">
            {properties.map(p => (
              <div key={p.id} className="p-6 flex items-center justify-between">
                <div>
                  <p className="font-medium">{p.name}</p>
                  <p className="text-gray-500 text-sm">
                    {p.status} · R{p.price}/night · {p.guests} guests · {p.bedrooms} bed
                  </p>
                </div>
                <div className="flex gap-2">
                  <a href={`/admin/properties/${p.id}/edit`}
                     className="bg-gray-800 hover:bg-gray-700 text-white text-sm px-4 py-2 rounded-lg transition-colors">
                    Edit
                  </a>
                  <button onClick={() => handleDelete(p.id)}
                          className="bg-rose-900/50 hover:bg-rose-900 text-rose-300 text-sm px-4 py-2 rounded-lg transition-colors">
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}