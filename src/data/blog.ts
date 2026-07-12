export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  image: string
  category: string
  date: string
  readTime: string
  content: { type: 'intro' | 'heading' | 'para'; text: string }[]
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'best-things-to-do-hazyview',
    title: 'Best Things to Do in Hazyview',
    excerpt: 'From elephant encounters to waterfall hikes — discover the top experiences in and around Hazyview.',
    image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&q=80',
    category: 'Travel Guide',
    date: 'June 2026',
    readTime: '5 min read',
    content: [
      { type: 'intro', text: 'Hazyview is one of Mpumalanga\'s most vibrant towns, perfectly positioned as a gateway to Kruger National Park and the Panorama Route.' },
      { type: 'heading', text: '1. Big Five Safari at Kruger National Park' },
      { type: 'para', text: 'Just 45 minutes from Solana Villas, Kruger National Park is one of Africa\'s greatest wildlife experiences. Enter through the Phabeni or Numbi gates for the best chance of spotting lion, elephant, leopard, buffalo and rhino.' },
      { type: 'heading', text: '2. Elephant Sanctuary' },
      { type: 'para', text: 'Get up close with rescued elephants at one of Hazyview\'s world-renowned elephant sanctuaries. Walk alongside these gentle giants and learn about conservation efforts in the region.' },
      { type: 'heading', text: '3. White Water Rafting on the Sabie River' },
      { type: 'para', text: 'The Sabie River offers thrilling white water rafting for all skill levels. Guided tours operate year-round and are perfect for families and adventure groups.' },
      { type: 'heading', text: '4. Panorama Route Day Trip' },
      { type: 'para', text: 'Drive the legendary Panorama Route — featuring God\'s Window, the Three Rondavels, Bourke\'s Luck Potholes and Berlin Falls. One of the most scenic drives in southern Africa.' },
      { type: 'heading', text: '5. Perry\'s Bridge Hollow' },
      { type: 'para', text: 'This charming artisan village offers curio shopping, restaurants, craft markets and family entertainment. A perfect afternoon outing after a morning in the bush.' },
    ]
  },
  {
    slug: 'family-holidays-mpumalanga',
    title: 'Family Holidays in Mpumalanga',
    excerpt: 'Planning a family getaway? Here\'s everything you need to know about bringing the kids to Mpumalanga.',
    image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=80',
    category: 'Family Travel',
    date: 'May 2026',
    readTime: '7 min read',
    content: [
      { type: 'intro', text: 'Mpumalanga is one of South Africa\'s most family-friendly destinations, with world-class wildlife, outdoor adventures and luxurious self-catering accommodation.' },
      { type: 'heading', text: 'Why Families Love Mpumalanga' },
      { type: 'para', text: 'Unlike hotel stays, luxury villas give families the space, privacy and flexibility they need. Cook family meals, set your own schedule and create a home-away-from-home.' },
      { type: 'heading', text: 'Best Family Activities' },
      { type: 'para', text: 'From junior safari drives designed for children to interactive elephant experiences and waterfall picnics — Mpumalanga offers endless activities that delight children of all ages.' },
      { type: 'heading', text: 'Why Choose Solana Villas for Families' },
      { type: 'para', text: 'Solana Villas accommodates up to 8 guests with a private pool and fully equipped kitchen. Solana Studios offers a quieter option for smaller families seeking an intimate escape.' },
    ]
  },
  {
    slug: 'kruger-national-park-guide',
    title: 'Kruger National Park: The Ultimate Guide',
    excerpt: 'Everything you need to know before visiting Kruger — gates, best times, what to pack, and how to spot the Big Five.',
    image: 'https://images.unsplash.com/photo-1612178537253-bccd437b730e?w=800&q=80',
    category: 'Safari Guide',
    date: 'April 2026',
    readTime: '10 min read',
    content: [
      { type: 'intro', text: 'Covering nearly 2 million hectares of pristine African wilderness, Kruger National Park is one of the world\'s premier safari destinations.' },
      { type: 'heading', text: 'Best Time to Visit' },
      { type: 'para', text: 'The dry winter months (May to September) offer the best game viewing as animals congregate around water sources and the bush is less dense.' },
      { type: 'heading', text: 'Gates Near Hazyview' },
      { type: 'para', text: 'From Solana Villas, the closest gates are Phabeni Gate (30 min) and Numbi Gate (40 min). Both offer excellent game viewing opportunities from the moment you enter.' },
      { type: 'heading', text: 'The Big Five' },
      { type: 'para', text: 'Lion, elephant, leopard, buffalo and rhino — spotting all five is the ultimate safari achievement. Kruger\'s southern section has one of the highest Big Five densities on the continent.' },
    ]
  },
  {
    slug: 'top-golf-courses-hazyview',
    title: 'Top Golf Courses Near Hazyview',
    excerpt: 'Tee off surrounded by Africa\'s most spectacular scenery. The best golf courses within reach of Hazyview.',
    image: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=800&q=80',
    category: 'Activities',
    date: 'March 2026',
    readTime: '4 min read',
    content: [
      { type: 'intro', text: 'Golf in Mpumalanga is unlike anywhere else — imagine teeing off with misty mountains as your backdrop, or spotting a bushbuck grazing along the fairway.' },
      { type: 'heading', text: 'Leopard Creek Country Club' },
      { type: 'para', text: 'Arguably South Africa\'s most exclusive golf course, Leopard Creek borders the Crocodile River and Kruger National Park. Wildlife sightings on the course are common.' },
      { type: 'heading', text: 'Sabie River Bush Lodge' },
      { type: 'para', text: 'A beautifully maintained course set along the Sabie River. Perfect for a relaxed morning round followed by breakfast on the deck.' },
      { type: 'heading', text: 'Hans Merensky Golf Club' },
      { type: 'para', text: 'A championship 18-hole course at the Aventura resort, offering world-class facilities in a spectacular bush setting just 40 minutes from Hazyview.' },
    ]
  },
  {
    slug: 'panorama-route-guide',
    title: 'Panorama Route: A Complete Road Trip Guide',
    excerpt: 'God\'s Window, Bourke\'s Luck Potholes, Berlin Falls — the Panorama Route is one of South Africa\'s most spectacular drives.',
    image: 'https://images.unsplash.com/photo-1552083375-1447ce886485?w=800&q=80',
    category: 'Road Trips',
    date: 'February 2026',
    readTime: '8 min read',
    content: [
      { type: 'intro', text: 'The Panorama Route is one of South Africa\'s most spectacular drives — a journey through dramatic escarpments, ancient forests, thundering waterfalls and jaw-dropping viewpoints.' },
      { type: 'heading', text: 'God\'s Window' },
      { type: 'para', text: 'Named for its heavenly views over the Lowveld, God\'s Window offers one of the most spectacular vistas in Africa. On clear days you can see all the way to Mozambique.' },
      { type: 'heading', text: 'Bourke\'s Luck Potholes' },
      { type: 'para', text: 'A geological wonder where the Treur and Blyde rivers meet, creating cylindrical rock formations carved over millennia. Walkways and bridges offer multiple viewpoints.' },
      { type: 'heading', text: 'Three Rondavels' },
      { type: 'para', text: 'Three massive cylindrical rock formations rising from the floor of the Blyde River Canyon — one of the largest canyons in the world. A truly unforgettable sight.' },
    ]
  },
  {
    slug: 'luxury-self-catering-vs-hotel',
    title: 'Luxury Self-Catering vs Hotels: Why Villas Win',
    excerpt: 'More space, more privacy, more value. Why luxury self-catering villas are the smarter choice.',
    image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80',
    category: 'Travel Tips',
    date: 'January 2026',
    readTime: '6 min read',
    content: [
      { type: 'intro', text: 'When planning a South African holiday, the accommodation you choose shapes your entire experience. More and more travellers are discovering that luxury self-catering villas offer something hotels simply cannot match.' },
      { type: 'heading', text: 'Space and Privacy' },
      { type: 'para', text: 'A luxury villa gives your group exclusive use of the entire property. No shared pools, no crowded restaurants, no noise from neighbouring rooms. Just your private slice of paradise.' },
      { type: 'heading', text: 'Better Value for Groups' },
      { type: 'para', text: 'When shared between 4-8 people, a luxury villa often costs less per person than a comparable hotel room — while offering dramatically more space and a fully equipped kitchen.' },
      { type: 'heading', text: 'The Home-Away-From-Home Experience' },
      { type: 'para', text: 'Cook family meals, set your own schedule, enjoy a private braai under the stars. Villas create memories that hotel stays simply cannot replicate.' },
    ]
  },
]

export const getBlogPost = (slug: string) => blogPosts.find(p => p.slug === slug)