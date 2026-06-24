'use client'
import { useState } from 'react'
import { X } from 'lucide-react'

export default function VillaGallery({ images }: { images: string[] }) {
  const [selected, setSelected] = useState<number | null>(null)

  return (
    <>
      <div className="grid grid-cols-3 gap-3">
        {images.map((img, i) => (
          <button key={i} onClick={() => setSelected(i)}
                  className="rounded-xl overflow-hidden h-40 group">
            <img src={img} alt={`Photo ${i + 1}`}
                 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          </button>
        ))}
      </div>

      {selected !== null && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-6"
             onClick={() => setSelected(null)}>
          <button onClick={() => setSelected(null)}
                  className="absolute top-6 right-6 text-white hover:text-gray-300">
            <X size={28} />
          </button>
          <img src={images[selected]} alt={`Photo ${selected + 1}`}
               className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg"
               onClick={e => e.stopPropagation()} />
        </div>
      )}
    </>
  )
}