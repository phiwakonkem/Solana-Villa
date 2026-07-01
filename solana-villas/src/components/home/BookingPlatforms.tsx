const platforms = [
  { name: 'Booking.com', href: 'https://booking.com', note: 'Search "Solana Villas Hazyview"' },
  { name: 'EscapeToTheCountry', href: 'https://escapetothecountry.co.za/property/name/solana-villa', note: 'Search "Solana Villa"' },
  { name: 'LekkeSlaap', href: 'https://www.lekkeslaap.co.za/accommodation/solana-studio-unit', note: 'Listed under Hazyview' },
]

export default function BookingPlatforms() {
  return (
    <section className="py-16 bg-[#FAF7F2] border-t border-gray-200">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <p className="text-[#D4A853] text-xs tracking-widest uppercase font-medium mb-3">
          Prefer to Compare?
        </p>
        <h2 className="font-[Playfair_Display] text-2xl font-bold text-[#1B4332] mb-3">
          Also Available On
        </h2>
        <p className="text-gray-500 text-sm mb-8 max-w-lg mx-auto">
          You'll always get our best rate by booking directly — but we're also listed on these platforms if you'd like to read more reviews first.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          {platforms.map((p) => (
            
              key={p.name}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white border border-gray-200 hover:border-[#1B4332] rounded-xl px-6 py-4 transition-colors text-left min-w-[180px]"
            >
              <p className="font-medium text-[#1B4332]">{p.name}</p>
              <p className="text-gray-400 text-xs mt-1">{p.note}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

