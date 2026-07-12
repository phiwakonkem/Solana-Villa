import Link from 'next/link'
import { blogPosts } from '@/data/blog'

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <div className="bg-[#1B4332] text-white py-32 px-6 text-center">
        <p className="text-[#D4A853] text-xs tracking-widest uppercase mb-4">Travel Inspiration</p>
        <h1 className="font-[Playfair_Display] text-5xl font-bold mb-4">The Solana Journal</h1>
        <p className="text-gray-300 max-w-xl mx-auto">
          Travel guides, local tips and inspiration for your Mpumalanga adventure.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map(post => (
            <Link key={post.slug} href={`/blog/${post.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition-shadow">
              <div className="relative h-52 overflow-hidden">
                <img src={post.image} alt={post.title}
                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 text-[#1B4332] text-xs px-3 py-1 rounded-full font-medium">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-[Playfair_Display] text-lg font-bold text-[#1B4332] mb-3 group-hover:text-[#D4A853] transition-colors leading-tight">
                  {post.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}