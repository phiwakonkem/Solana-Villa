'use client'
import { useState, useEffect } from 'react'

interface Review {
  id: string
  guestName: string
  rating: number
  comment: string
  createdAt: string
}

interface Props {
  propertySlug: string
  propertyName: string
}

export default function ReviewSection({ propertySlug, propertyName }: Props) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)
  const [form, setForm] = useState({ rating: 5, comment: '' })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('solana_user')
    if (stored) setUser(JSON.parse(stored))

    fetch(`/api/reviews?propertySlug=${propertySlug}`)
      .then(r => r.json())
      .then(data => setReviews(data))
      .catch(() => {})
  }, [propertySlug])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return
    setSubmitting(true)

    const token = localStorage.getItem('solana_token')
    const res = await fetch('/api/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        propertySlug,
        rating: form.rating,
        comment: form.comment,
        guestName: user.name
      })
    })

    if (res.ok) {
      const newReview = await res.json()
      setReviews(prev => [newReview, ...prev])
      setSubmitted(true)
      setForm({ rating: 5, comment: '' })
    }
    setSubmitting(false)
  }

  return (
    <div>
      <h2 className="font-[Playfair_Display] text-2xl font-bold text-[#1B4332] mb-6">
        Guest Reviews
      </h2>

      {/* Existing reviews */}
      {reviews.length === 0 ? (
        <div className="bg-white rounded-2xl p-8 border border-gray-100 text-center text-gray-400 mb-6">
          <p className="text-lg mb-1">No reviews yet</p>
          <p className="text-sm">Be the first to share your experience at {propertyName}</p>
        </div>
      ) : (
        <div className="space-y-4 mb-8">
          {reviews.map(review => (
            <div key={review.id} className="bg-white rounded-2xl p-6 border border-gray-100">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-semibold text-[#1B4332]">{review.guestName}</p>
                  <p className="text-gray-400 text-xs mt-0.5">
                    {new Date(review.createdAt).toLocaleDateString('en-ZA', { year: 'numeric', month: 'long' })}
                  </p>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < review.rating ? 'text-[#D4A853]' : 'text-gray-200'}>★</span>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">{review.comment}</p>
            </div>
          ))}
        </div>
      )}

      {/* Leave a review */}
      {!user ? (
        <div className="bg-[#FAF7F2] border border-[#1B4332]/10 rounded-2xl p-6 text-center">
          <p className="text-gray-600 mb-4">Sign in to leave a review</p>
          <div className="flex gap-3 justify-center">
            <a href="/login" className="bg-[#1B4332] hover:bg-green-900 text-white px-5 py-2.5 rounded-lg text-sm transition-colors">
              Log In
            </a>
            <a href="/signup" className="border border-[#1B4332] text-[#1B4332] px-5 py-2.5 rounded-lg text-sm hover:bg-[#1B4332] hover:text-white transition-colors">
              Sign Up
            </a>
          </div>
        </div>
      ) : submitted ? (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center">
          <p className="text-emerald-700 font-medium">Thank you for your review! 🙏</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 border border-gray-100">
          <h3 className="font-semibold text-[#1B4332] mb-4">Leave a Review</h3>

          <div className="mb-4">
            <label className="text-xs text-gray-500 uppercase tracking-wide mb-2 block">Rating</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map(star => (
                <button key={star} type="button" onClick={() => setForm(f => ({ ...f, rating: star }))}
                        className={`text-2xl transition-transform hover:scale-110 ${star <= form.rating ? 'text-[#D4A853]' : 'text-gray-200'}`}>
                  ★
                </button>
              ))}
            </div>
          </div>

          <textarea
            required
            value={form.comment}
            onChange={e => setForm(f => ({ ...f, comment: e.target.value }))}
            placeholder={`Share your experience at ${propertyName}...`}
            rows={4}
            className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#1B4332] resize-none mb-4"
          />

          <button type="submit" disabled={submitting}
                  className="bg-[#1B4332] hover:bg-green-900 disabled:opacity-50 text-white px-6 py-3 rounded-xl text-sm font-medium transition-colors">
            {submitting ? 'Submitting...' : 'Submit Review'}
          </button>
        </form>
      )}
    </div>
  )
}