'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Phone } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const links = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/villas', label: 'Villas' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex flex-col">
          <span className={`font-playfair text-2xl font-bold tracking-wide ${
            scrolled ? 'text-forest' : 'text-white'
          }`}>
            Solana Villas
          </span>
          <span className={`text-xs tracking-widest uppercase ${
            scrolled ? 'text-gold' : 'text-gold'
          }`}>
            Mpumalanga
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm tracking-wide hover:text-gold transition-colors ${
                scrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          <a href="tel:+27723632861"
             className={`flex items-center gap-2 text-sm ${
               scrolled ? 'text-forest' : 'text-white'
             }`}>
            <Phone size={16} />
            <span>+27 72 363 2861</span>
          </a>
          <Link href="/villas"
                className="bg-gold hover:bg-amber-600 text-white text-sm px-5 py-2.5 rounded transition-colors font-medium">
            Book Now
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`md:hidden ${scrolled ? 'text-forest' : 'text-white'}`}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4">
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-gray-700 hover:text-gold transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link href="/villas"
                onClick={() => setIsOpen(false)}
                className="bg-gold text-white text-center py-3 rounded font-medium">
            Book Now
          </Link>
        </div>
      )}
    </nav>
  )
}