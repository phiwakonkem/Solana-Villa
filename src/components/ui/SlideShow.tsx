'use client'
import { useState, useEffect } from 'react'

interface SlideShowProps {
  images: string[]
  autoPlay?: boolean
  interval?: number
  aspectRatio?: string
}

export default function SlideShow({
  images,
  autoPlay = true,
  interval = 5000,
  aspectRatio = 'aspect-[16/9]'
}: SlideShowProps) {
  const [current, setCurrent] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (!autoPlay || isPaused || images.length <= 1) return
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % images.length)
    }, interval)
    return () => clearInterval(timer)
  }, [autoPlay, isPaused, images.length, interval])

  if (!images || images.length === 0) {
    return (
      <div className={`relative ${aspectRatio} rounded-2xl overflow-hidden bg-gray-100 flex items-center justify-center`}>
        <p className="text-gray-400 text-sm">No images available</p>
      </div>
    )
  }

  function goTo(index: number) {
    setCurrent(index)
  }

  function next() {
    setCurrent(prev => (prev + 1) % images.length)
  }

  function prev() {
    setCurrent(prevIndex => (prevIndex - 1 + images.length) % images.length)
  }

  return (
    <div
      className={`relative ${aspectRatio} rounded-2xl overflow-hidden group`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {images.map((img, i) => (
        <img
          key={i}
          src={img}
          alt={`Slide ${i + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            i === current ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-[#1B4332] w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Previous image"
          >
            ‹
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-[#1B4332] w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Next image"
          >
            ›
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === current ? 'w-6 bg-white' : 'w-1.5 bg-white/50 hover:bg-white/80'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}