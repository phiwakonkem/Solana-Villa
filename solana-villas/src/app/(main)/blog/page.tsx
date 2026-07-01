import Link from 'next/link'

const posts = [
  {
    slug: 'best-things-to-do-hazyview',
    title: 'Best Things to Do in Hazyview',
    excerpt: 'From elephant encounters to waterfall hikes — discover the top experiences waiting for you in and around Hazyview, Mpumalanga.',
    image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&q=80',
    category: 'Travel Guide',
    date: 'June 2026',
    readTime: '5 min read'
  },
  {
    slug: 'family-holidays-mpumalanga',
    title: 'Family Holidays in Mpumalanga',
    excerpt: 'Planning a family getaway? Here\'s everything you need to know about bringing the kids to Mpumalanga for an unforgettable African adventure.',
    image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=80',
    category: 'Family Travel',
    date: 'May 2026',
    readTime: '7 min read'
  },
  {
    slug: 'kruger-national-park-guide',
    title: 'Kruger National Park: The Ultimate Guide',
    excerpt: 'Everything you need to know before visiting Kruger National Park — gates, best times, what to pack, and how to spot the Big Five.',
    image: 'https://images.unsplash.com/photo-1612178537253-bccd437b730e?w=800&q=80',
    category: 'Safari Guide',
    date: 'April 2026',
    readTime: '10 min read'
  },
  {
    slug: 'top-golf-courses-hazyview',
    title: 'Top Golf Courses Near Hazyview',
    excerpt: 'Tee off surrounded by Africa\'s most spectacular scenery. We round up the best golf courses within easy reach of Hazyview.',
    image: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=800&q=80',
    category: 'Activities',
    date: 'March 2026',
    readTime: '4 min read'
  },
  {
    slug: 'panorama-route-guide',
    title: 'Panorama Route: A Complete Road Trip Guide',
    excerpt: 'God\'s Window, Bourke\'s Luck Potholes, Berlin Falls — the Panorama Route is one of South Africa\'s most spectacular drives.',
    image: 'https://images.unsplash.com/photo-1552083375-1447ce886485?w=800&q=80',
    category: 'Road Trips',
    date: 'February 2026',
    readTime: '8 min read'
  },
  {
    slug: 'luxury-self-catering-vs-hotel',
    title: 'Luxury Self-Catering vs Hotels: Why Villas Win',
    excerpt: 'More space, more privacy, more value. We break down why luxury self-catering villas are the smarter choice for your next South African holiday.',
    image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80',
    category: 'Travel Tips',
    date: 'January 2026',
    readTime: '6 min read'
  }
]

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
        {/* Featured post */}
        <div className="mb-16">
          <Link href={`/blog/${posts[0].slug}`}
                className="group grid md:grid-cols-2 gap-8 bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
            <div className="relative h-72 md:h-auto overflow-hidden">
              <img src={posts[0].image} alt={posts[0].title}
                   className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="p-10 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-[#1B4332]/10 text-[#1B4332] text-xs px-3 py-1 rounded-full font-medium">
                  {posts[0].category}
                </span>
                <span className="text-gray-400 text-xs">{posts[0].readTime}</span>
              </div>
              <h2 className="font-[Playfair_Display] text-3xl font-bold text-[#1B4332] mb-4 group-hover:text-[#D4A853] transition-colors">
                {posts[0].title}
              </h2>
              <p className="text-gray-500 leading-relaxed mb-6">{posts[0].excerpt}</p>
              <span className="text-[#1B4332] font-medium text-sm group-hover:text-[#D4A853] transition-colors">
                Read Article →
              </span>
            </div>
          </Link>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {posts.slice(1).map(post => (
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
                <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
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