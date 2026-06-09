import Link from 'next/link'
import { Phone, Mail, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-forest text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="font-playfair text-2xl font-bold mb-2">Solana Villas</h3>
            <p className="text-gold text-xs tracking-widest uppercase mb-4">Mpumalanga, South Africa</p>
            <p className="text-gray-300 text-sm leading-relaxed max-w-sm">
              Exceptional luxury villa accommodation in the heart of Mpumalanga.
              Your perfect escape near Kruger National Park and the Panorama Route.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="https://instagram.com/solanavillas" target="_blank"
                className="text-gray-400 hover:text-[#D4A853] transition-colors text-sm">
                Instagram
              </a>
              <a href="https://facebook.com/solanavillas" target="_blank"
                className="text-gray-400 hover:text-[#D4A853] transition-colors text-sm">
                Facebook
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-gold tracking-wider uppercase text-xs mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm text-gray-300">
              {['Home', 'About', 'Villas', 'Blog', 'Contact'].map(item => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase() === 'home' ? '' : item.toLowerCase()}`}
                        className="hover:text-gold transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-gold tracking-wider uppercase text-xs mb-4">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-center gap-2">
                <Phone size={14} className="text-gold" />
                <a href="tel:+27123456789" className="hover:text-gold transition-colors">
                  +27 12 345 6789
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-gold" />
                <a href="mailto:info@solanavillas.co.za" className="hover:text-gold transition-colors">
                  info@solanavillas.co.za
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={14} className="text-gold mt-0.5" />
                <span>Hazyview, Mpumalanga<br />South Africa</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
          <p>© 2026 Solana Villas. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-gold transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gold transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}