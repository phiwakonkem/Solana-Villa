import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getBlogPost } from '@/data/blog'

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug)
  if (!post) return notFound()

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <div className="relative h-[60vh] overflow-hidden">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-12 text-white max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-[#D4A853] text-white text-xs px-3 py-1 rounded-full">{post.category}</span>
            <span className="text-gray-300 text-sm">{post.date} · {post.readTime}</span>
          </div>
          <h1 className="font-[Playfair_Display] text-4xl md:text-5xl font-bold leading-tight">{post.title}</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-16">
        {post.content.map((block, i) => {
          if (block.type === 'intro') return (
            <p key={i} className="text-xl text-gray-600 leading-relaxed mb-8 font-light border-l-4 border-[#D4A853] pl-6">
              {block.text}
            </p>
          )
          if (block.type === 'heading') return (
            <h2 key={i} className="font-[Playfair_Display] text-2xl font-bold text-[#1B4332] mt-10 mb-4">{block.text}</h2>
          )
          return <p key={i} className="text-gray-600 leading-relaxed mb-6">{block.text}</p>
        })}

        <div className="mt-16 bg-[#1B4332] text-white rounded-2xl p-10 text-center">
          <h3 className="font-[Playfair_Display] text-2xl font-bold mb-3">Ready to Experience Mpumalanga?</h3>
          <p className="text-gray-300 mb-6">Book your stay at Solana Villas and create memories that last a lifetime.</p>
          <Link href="/villas" className="inline-block bg-[#D4A853] hover:bg-amber-600 text-white px-8 py-3 rounded-xl font-medium transition-colors">
            View Our Villas
          </Link>
        </div>

        <div className="mt-10">
          <Link href="/blog" className="text-[#1B4332] hover:text-[#D4A853] transition-colors">← Back to Journal</Link>
        </div>
      </div>
    </div>
  )
}