'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function SignupPage() {
  const router = useRouter()
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    const data = await res.json()

    if (!res.ok) {
      setError(data.error || 'Signup failed')
      setLoading(false)
      return
    }

    localStorage.setItem('solana_token', data.token)
    localStorage.setItem('solana_user', JSON.stringify(data.user))
    router.push('/account')
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center px-6 py-20">
      <div className="bg-white rounded-2xl p-10 max-w-md w-full shadow-lg border border-gray-100">
        <h1 className="font-[Playfair_Display] text-2xl font-bold text-[#1B4332] mb-2">Join Solana Villas</h1>
        <p className="text-gray-500 text-sm mb-8">Sign up for booking access and exclusive offers.</p>

        {error && <p className="bg-rose-50 text-rose-600 text-sm px-4 py-3 rounded-lg mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input required placeholder="Full Name"
                 value={form.name}
                 onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                 className="border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#1B4332]" />
          <input required type="email" placeholder="Email Address"
                 value={form.email}
                 onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                 className="border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#1B4332]" />
          <input placeholder="Phone Number"
                 value={form.phone}
                 onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                 className="border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#1B4332]" />
          <input required type="password" placeholder="Password"
                 value={form.password}
                 onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                 className="border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#1B4332]" />
          <button type="submit" disabled={loading}
                  className="bg-[#1B4332] hover:bg-green-900 text-white py-3.5 rounded-xl font-medium transition-colors disabled:opacity-50">
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-[#1B4332] font-medium hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  )
}