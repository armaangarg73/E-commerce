import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Clear existing items first
  await prisma.cartItem.deleteMany()
  await prisma.item.deleteMany()

  // Create sample items - Electronics (5 items)
  const electronics = await Promise.all([
    prisma.item.create({
      data: {
        name: 'Wireless Bluetooth Headphones',
        description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life.',
        price: 199.99,
        category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop&auto=format',
        stock: 50,
      },
    }),
    prisma.item.create({
      data: {
        name: 'Smart Watch Series 8',
        description: 'Advanced smartwatch with health monitoring, GPS, and water resistance.',
        price: 399.99,
        category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop&auto=format',
        stock: 25,
      },
    }),
    prisma.item.create({
      data: {
        name: 'Gaming Laptop',
        description: 'High-performance gaming laptop with RTX graphics and 16GB RAM.',
        price: 1299.99,
        category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=500&fit=crop&auto=format',
        stock: 15,
      },
    }),
    prisma.item.create({
      data: {
        name: 'Wireless Charging Pad',
        description: 'Fast wireless charging pad compatible with all Qi-enabled devices.',
        price: 49.99,
        category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&h=500&fit=crop&auto=format',
        stock: 80,
      },
    }),
    prisma.item.create({
      data: {
        name: 'Bluetooth Speaker',
        description: 'Portable Bluetooth speaker with 360-degree sound and waterproof design.',
        price: 79.99,
        category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop&auto=format',
        stock: 60,
      },
    }),
  ])

  // Clothing (5 items)
  const clothing = await Promise.all([
    prisma.item.create({
      data: {
        name: 'Organic Cotton T-Shirt',
        description: 'Comfortable and sustainable organic cotton t-shirt in various colors.',
        price: 29.99,
        category: 'Clothing',
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop&auto=format',
        stock: 100,
      },
    }),
    prisma.item.create({
      data: {
        name: 'Denim Jacket',
        description: 'Classic denim jacket with vintage wash and modern fit.',
        price: 89.99,
        category: 'Clothing',
        image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=500&h=500&fit=crop&auto=format',
        stock: 45,
      },
    }),
    prisma.item.create({
      data: {
        name: 'Hoodie',
        description: 'Soft fleece hoodie with kangaroo pocket and drawstring hood.',
        price: 59.99,
        category: 'Clothing',
        image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=500&fit=crop&auto=format',
        stock: 70,
      },
    }),
    prisma.item.create({
      data: {
        name: 'Summer Dress',
        description: 'Lightweight summer dress perfect for warm weather occasions.',
        price: 69.99,
        category: 'Clothing',
        image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500&h=500&fit=crop&auto=format',
        stock: 35,
      },
    }),
    prisma.item.create({
      data: {
        name: 'Business Shirt',
        description: 'Professional button-down shirt in wrinkle-free fabric.',
        price: 49.99,
        category: 'Clothing',
        image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&h=500&fit=crop&auto=format',
        stock: 55,
      },
    }),
  ])

  // Accessories (5 items)
  const accessories = await Promise.all([
    prisma.item.create({
      data: {
        name: 'Leather Crossbody Bag',
        description: 'Premium leather crossbody bag perfect for everyday use.',
        price: 89.99,
        category: 'Accessories',
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop&auto=format',
        stock: 30,
      },
    }),
    prisma.item.create({
      data: {
        name: 'Sunglasses',
        description: 'UV protection sunglasses with polarized lenses and stylish frame.',
        price: 129.99,
        category: 'Accessories',
        image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&h=500&fit=crop&auto=format',
        stock: 40,
      },
    }),
    prisma.item.create({
      data: {
        name: 'Leather Wallet',
        description: 'Genuine leather wallet with RFID blocking technology.',
        price: 45.99,
        category: 'Accessories',
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop&auto=format',
        stock: 65,
      },
    }),
    prisma.item.create({
      data: {
        name: 'Smart Watch Band',
        description: 'Silicone watch band compatible with most smartwatches.',
        price: 24.99,
        category: 'Accessories',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop&auto=format',
        stock: 90,
      },
    }),
    prisma.item.create({
      data: {
        name: 'Phone Case',
        description: 'Protective phone case with shock absorption and wireless charging support.',
        price: 19.99,
        category: 'Accessories',
        image: 'https://images.unsplash.com/photo-1601972602288-1efce3b1f2cb?w=500&h=500&fit=crop&auto=format',
        stock: 120,
      },
    }),
  ])

  // Shoes (5 items)
  const shoes = await Promise.all([
    prisma.item.create({
      data: {
        name: 'Running Shoes',
        description: 'Lightweight running shoes with excellent cushioning and breathability.',
        price: 129.99,
        category: 'Shoes',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop&auto=format',
        stock: 75,
      },
    }),
    prisma.item.create({
      data: {
        name: 'Casual Sneakers',
        description: 'Comfortable everyday sneakers with classic design and modern comfort.',
        price: 89.99,
        category: 'Shoes',
        image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=500&fit=crop&auto=format',
        stock: 60,
      },
    }),
    prisma.item.create({
      data: {
        name: 'Dress Shoes',
        description: 'Professional leather dress shoes perfect for business occasions.',
        price: 159.99,
        category: 'Shoes',
        image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=500&fit=crop&auto=format',
        stock: 25,
      },
    }),
    prisma.item.create({
      data: {
        name: 'Hiking Boots',
        description: 'Durable hiking boots with waterproof membrane and ankle support.',
        price: 199.99,
        category: 'Shoes',
        image: 'https://images.unsplash.com/photo-1544966503-7cc4ac81b4a1?w=500&h=500&fit=crop&auto=format',
        stock: 30,
      },
    }),
    prisma.item.create({
      data: {
        name: 'Sandals',
        description: 'Comfortable summer sandals with adjustable straps and cushioned sole.',
        price: 49.99,
        category: 'Shoes',
        image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&h=500&fit=crop&auto=format',
        stock: 50,
      },
    }),
  ])

  // Home & Kitchen (5 items)
  const homeKitchen = await Promise.all([
    prisma.item.create({
      data: {
        name: 'Coffee Maker',
        description: 'Programmable coffee maker with built-in grinder and thermal carafe.',
        price: 149.99,
        category: 'Home & Kitchen',
        image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&h=500&fit=crop&auto=format',
        stock: 20,
      },
    }),
    prisma.item.create({
      data: {
        name: 'Air Fryer',
        description: 'Digital air fryer with multiple cooking functions and easy-clean basket.',
        price: 99.99,
        category: 'Home & Kitchen',
        image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=500&fit=crop&auto=format',
        stock: 35,
      },
    }),
    prisma.item.create({
      data: {
        name: 'Blender',
        description: 'High-speed blender perfect for smoothies, soups, and food prep.',
        price: 79.99,
        category: 'Home & Kitchen',
        image: 'https://images.unsplash.com/photo-1585515656519-1b9b3a0b3b3b?w=500&h=500&fit=crop&auto=format',
        stock: 40,
      },
    }),
    prisma.item.create({
      data: {
        name: 'Dinnerware Set',
        description: 'Complete 16-piece dinnerware set with modern design and dishwasher safe.',
        price: 69.99,
        category: 'Home & Kitchen',
        image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=500&fit=crop&auto=format',
        stock: 25,
      },
    }),
    prisma.item.create({
      data: {
        name: 'Kitchen Knife Set',
        description: 'Professional 8-piece knife set with wooden block and sharpener.',
        price: 119.99,
        category: 'Home & Kitchen',
        image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=500&fit=crop&auto=format',
        stock: 15,
      },
    }),
  ])

  // Beauty (5 items)
  const beauty = await Promise.all([
    prisma.item.create({
      data: {
        name: 'Skincare Set',
        description: 'Complete skincare routine with cleanser, toner, and moisturizer.',
        price: 89.99,
        category: 'Beauty',
        image: 'https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=500&h=500&fit=crop&auto=format',
        stock: 45,
      },
    }),
    prisma.item.create({
      data: {
        name: 'Makeup Brush Set',
        description: 'Professional 12-piece makeup brush set with soft synthetic bristles.',
        price: 39.99,
        category: 'Beauty',
        image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&h=500&fit=crop&auto=format',
        stock: 60,
      },
    }),
    prisma.item.create({
      data: {
        name: 'Perfume',
        description: 'Luxury fragrance with long-lasting scent and elegant packaging.',
        price: 79.99,
        category: 'Beauty',
        image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&h=500&fit=crop&auto=format',
        stock: 30,
      },
    }),
    prisma.item.create({
      data: {
        name: 'Hair Dryer',
        description: 'Professional hair dryer with ionic technology and multiple heat settings.',
        price: 59.99,
        category: 'Beauty',
        image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&h=500&fit=crop&auto=format',
        stock: 25,
      },
    }),
    prisma.item.create({
      data: {
        name: 'Face Mask Set',
        description: 'Hydrating face mask set with natural ingredients for all skin types.',
        price: 24.99,
        category: 'Beauty',
        image: 'https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=500&h=500&fit=crop&auto=format',
        stock: 80,
      },
    }),
  ])

  const totalItems = electronics.length + clothing.length + accessories.length + shoes.length + homeKitchen.length + beauty.length
  console.log('Created sample items:', totalItems)
  console.log('- Electronics:', electronics.length)
  console.log('- Clothing:', clothing.length)
  console.log('- Accessories:', accessories.length)
  console.log('- Shoes:', shoes.length)
  console.log('- Home & Kitchen:', homeKitchen.length)
  console.log('- Beauty:', beauty.length)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
