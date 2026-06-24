const socials = [
  {
    name: 'Instagram',
    handle: '@solana_hazyview',
    href: 'https://www.instagram.com/solana_hazyview?igsh=MWI6aTEybjc1YzJ2bQ==',
    bg: 'bg-gradient-to-br from-purple-600 via-pink-500 to-amber-400',
    description: 'Daily glimpses of villa life'
  },
  {
    name: 'WhatsApp',
    handle: '072 363 2861',
    href: 'https://wa.me/27723632861',
    bg: 'bg-[#25D366]',
    description: 'Chat with us directly'
  },
  {
    name: 'Facebook',
    handle: 'Solana Villas',
    href: 'https://facebook.com/solanavillas',
    bg: 'bg-[#1877F2]',
    description: 'Updates, offers & guest stories'
  },
]

export default function SocialConnect() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-[#D4A853] text-xs tracking-widest uppercase font-medium mb-3">
            Stay Connected
          </p>
          <h2 className="font-[Playfair_Display] text-4xl font-bold text-[#1B4332] mb-3">
            Follow Our Journey
          </h2>
          <p className="text-gray-500 max-w-md mx-auto">
            Get a feel for the villas and see what our guests are up to.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {socials.map((s) => (
            
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-2xl overflow-hidden h-40 flex flex-col justify-end p-5 text-white transition-transform hover:-translate-y-1"
            >
              <div className={`absolute inset-0 ${s.bg} opacity-90 group-hover:opacity-100 transition-opacity`} />
              <div className="relative z-10">
                <p className="font-semibold text-lg">{s.name}</p>
                <p className="text-white/80 text-sm">{s.handle}</p>
                <p className="text-white/60 text-xs mt-1">{s.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}