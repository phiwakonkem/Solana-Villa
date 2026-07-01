import { PrismaClient } from '../src/generated/prisma'
import { properties } from '../src/data/properties'

const prisma = new PrismaClient()

async function main() {
  for (const p of properties) {
    await prisma.property.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        slug: p.slug,
        name: p.name,
        status: p.status,
        tagline: p.tagline,
        guests: p.guests,
        bedrooms: p.bedrooms,
        bathrooms: p.bathrooms,
        price: p.price,
        location: p.location,
        description: p.description,
        interiorImages: p.interiorImages,
        exteriorImages: p.exteriorImages,
        amenities: p.amenities,
        houseRules: p.houseRules,
        externalListing: p.externalListing,
      }
    })
  }
  console.log('Seeded properties ✅')
}

main().finally(() => prisma.$disconnect())