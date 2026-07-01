'use client'
import { useState } from 'react'
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <div className="bg-[#1B4332] text-white py-32 px-6 text-center">
        <p className="text-[#D4A853] text-xs tracking-widest uppercase mb-4">Get In Touch</p>
        <h1 className="font-[Playfair_Display] text-5xl font-bold mb-4">Contact Us</h1>
        <p className="text-gray-300 max-w-xl mx-auto">
          We'd love to hear from you. Reach out for bookings, enquiries or just to say hello.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div>
            <h2 className="font-[Playfair_Display] text-2xl font-bold text-[#1B4332] mb-8">
              How to Reach Us
            </h2>
            <div className="flex flex-col gap-6 mb-10">
              {[
                { icon: Phone, label: 'Phone', value: '+27 72 363 2861', href: 'tel:+27723632861' },
                { icon: MessageCircle, label: 'WhatsApp', value: '+27 72 363 2861', href: 'https://wa.me/27723632861' },
                { icon: Mail, label: 'Email', value: 'reservations@solanavillas.co.za', href: 'mailto:reservations@solanavillas.co.za' },
                { icon: MapPin, label: 'Location', value: 'Hazyview, Mpumalanga, South Africa', href: '#' },
              ].map((item, i) => (
                <a key={i} href={item.href}
                   className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-[#1B4332]/10 rounded-xl flex items-center justify-center group-hover:bg-[#1B4332] transition-colors shrink-0">
                    <item.icon size={20} className="text-[#1B4332] group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">{item.label}</p>
                    <p className="text-gray-700 font-medium group-hover:text-[#1B4332] transition-colors">{item.value}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Map placeholder */}
            <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 h-56 flex items-center justify-center">
              <div className="text-center text-gray-400">
                <p className="text-3xl mb-2">📍</p>
                <p className="font-medium text-gray-600">Hazyview, Mpumalanga</p>
                <a href="https://maps.google.com/?q=Hazyview+Mpumalanga+South+Africa"
                   target="_blank"
                   className="text-[#1B4332] text-sm underline mt-2 block">
                  View on Google Maps →
                </a>
              </div>
            </div>
          </div>

          {/* Form */}
          <div>
            {sent ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-lg">
                <div className="text-5xl mb-4">✉️</div>
                <h3 className="font-[Playfair_Display] text-2xl font-bold text-[#1B4332] mb-2">
                  Message Sent!
                </h3>
                <p className="text-gray-500">
                  Thank you for reaching out. We'll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}
                    className="bg-white rounded-2xl p-8 border border-gray-100 shadow-lg flex flex-col gap-4">
                <h2 className="font-[Playfair_Display] text-2xl font-bold text-[#1B4332] mb-2">
                  Send us a Message
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <input required placeholder="Your Name"
                         value={form.name}
                         onChange={e => setForm(f => ({...f, name: e.target.value}))}
                         className="border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#1B4332] col-span-2" />
                  <input required type="email" placeholder="Email Address"
                         value={form.email}
                         onChange={e => setForm(f => ({...f, email: e.target.value}))}
                         className="border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#1B4332]" />
                  <input placeholder="Phone Number"
                         value={form.phone}
                         onChange={e => setForm(f => ({...f, phone: e.target.value}))}
                         className="border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#1B4332]" />
                  <select value={form.subject}
                          onChange={e => setForm(f => ({...f, subject: e.target.value}))}
                          className="border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#1B4332] col-span-2 text-gray-500">
                    <option value="">Select Subject</option>
                    <option value="booking">Booking Enquiry</option>
                    <option value="availability">Availability Check</option>
                    <option value="pricing">Pricing Information</option>
                    <option value="other">General Enquiry</option>
                  </select>
                  <textarea required placeholder="Your Message"
                            value={form.message}
                            onChange={e => setForm(f => ({...f, message: e.target.value}))}
                            rows={5}
                            className="border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#1B4332] col-span-2 resize-none" />
                </div>
                <button type="submit"
                        className="w-full bg-[#1B4332] hover:bg-green-900 text-white py-4 rounded-xl font-medium transition-colors">
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}