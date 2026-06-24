'use client'
import Slideshow from '@/components/ui/Slideshow'

interface Props {
  interiorImages: string[]
  exteriorImages: string[]
}

export default function VillaGallerySplit({ interiorImages, exteriorImages }: Props) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <p className="text-[#D4A853] text-xs tracking-widest uppercase mb-3 font-medium">
          Inside the Villa
        </p>
        <Slideshow images={interiorImages} aspectRatio="aspect-[4/3]" />
      </div>
      <div>
        <p className="text-[#D4A853] text-xs tracking-widest uppercase mb-3 font-medium">
          Outside & Grounds
        </p>
        <Slideshow images={exteriorImages} aspectRatio="aspect-[4/3]" />
      </div>
    </div>
  )
}