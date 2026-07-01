'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    const data = await res.json()

    if (!res.ok) {
      setError(data.error || 'Login failed')
      setLoading(false)
      return
    }

    localStorage.setItem('solana_token', data.token)
    localStorage.setItem('solana_user', JSON.stringify(data.user))
    router.push(data.user.isAdmin ? '/admin' : '/account')
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center px-6 py-20">
      <div className="bg-white rounded-2xl p-10 max-w-md w-full shadow-lg border border-gray-100">
        <h1 className="font-[Playfair_Display] text-2xl font-bold text-[#1B4332] mb-2">Welcome Back</h1>
        <p className="text-gray-500 text-sm mb-8">Log in to manage your bookings and view offers.</p>

        {error && <p className="bg-rose-50 text-rose-600 text-sm px-4 py-3 rounded-lg mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input required type="email" placeholder="Email Address"
                 value={form.email}
                 onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                 className="border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#1B4332]" />
          <input required type="password" placeholder="Password"
                 value={form.password}
                 onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                 className="border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#1B4332]" />
          <button type="submit" disabled={loading}
                  className="bg-[#1B4332] hover:bg-green-900 text-white py-3.5 rounded-xl font-medium transition-colors disabled:opacity-50">
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{' '}
          <Link href="/signup" className="text-[#1B4332] font-medium hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  )
}