interface SectionHeaderProps {
  eyebrow: string
  title: string
  description?: string
  light?: boolean
}

export default function SectionHeader({ eyebrow, title, description, light = false }: SectionHeaderProps) {
  return (
    <div className="text-center mb-12">
      <p className="text-[#D4A853] text-xs tracking-widest uppercase font-medium mb-3">
        {eyebrow}
      </p>
      <h2 className={`font-[Playfair_Display] text-4xl md:text-5xl font-bold mb-4 ${
        light ? 'text-white' : 'text-[#1B4332]'
      }`}>
        {title}
      </h2>
      {description && (
        <p className={`max-w-xl mx-auto ${light ? 'text-gray-300' : 'text-gray-500'}`}>
          {description}
        </p>
      )}
    </div>
  )
}