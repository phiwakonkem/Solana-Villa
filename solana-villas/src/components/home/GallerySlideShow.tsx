import { solanaInteriorImages, solanaExteriorImages } from '@/data/villaImages'
import VillaGallerySplit from '@/components/villas/VillaGallerySplit'

export default function GallerySlideshow() {
  return (
    <section className="py-24 bg-[#FAF7F2]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-[#D4A853] text-xs tracking-widest uppercase font-medium mb-3">
            A Closer Look
          </p>
          <h2 className="font-[Playfair_Display] text-4xl font-bold text-[#1B4332]">
            Step Inside Solana Villas
          </h2>
        </div>
        <VillaGallerySplit
          interiorImages={solanaInteriorImages}
          exteriorImages={solanaExteriorImages}
        />
      </div>
    </section>
  )
}