import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Clear existing items first
  await prisma.cartItem.deleteMany()
  await prisma.item.deleteMany()

  // Create sample items with reliable image URLs
  const items = [
    // Electronics
    {
      name: 'Wireless Bluetooth Headphones',
      description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life.',
      price: 199.99,
      category: 'Electronics',
      image: 'https://picsum.photos/500/500?random=1',
      stock: 50,
    },
    {
      name: 'Smart Watch Series 8',
      description: 'Advanced smartwatch with health monitoring, GPS, and water resistance.',
      price: 399.99,
      category: 'Electronics',
      image: 'https://picsum.photos/500/500?random=2',
      stock: 25,
    },
    {
      name: 'Gaming Laptop',
      description: 'High-performance gaming laptop with RTX graphics and 16GB RAM.',
      price: 1299.99,
      category: 'Electronics',
      image: 'https://picsum.photos/500/500?random=3',
      stock: 15,
    },
    {
      name: 'Wireless Charging Pad',
      description: 'Fast wireless charging pad compatible with all Qi-enabled devices.',
      price: 49.99,
      category: 'Electronics',
      image: 'https://picsum.photos/500/500?random=4',
      stock: 80,
    },
    {
      name: 'Bluetooth Speaker',
      description: 'Portable Bluetooth speaker with 360-degree sound and waterproof design.',
      price: 79.99,
      category: 'Electronics',
      image: 'https://picsum.photos/500/500?random=5',
      stock: 60,
    },
    // Clothing
    {
      name: 'Organic Cotton T-Shirt',
      description: 'Comfortable and sustainable organic cotton t-shirt in various colors.',
      price: 29.99,
      category: 'Clothing',
      image: 'https://picsum.photos/500/500?random=6',
      stock: 100,
    },
    {
      name: 'Denim Jacket',
      description: 'Classic denim jacket with vintage wash and modern fit.',
      price: 89.99,
      category: 'Clothing',
      image: 'https://picsum.photos/500/500?random=7',
      stock: 45,
    },
    {
      name: 'Hoodie',
      description: 'Soft fleece hoodie with kangaroo pocket and drawstring hood.',
      price: 59.99,
      category: 'Clothing',
      image: 'https://picsum.photos/500/500?random=8',
      stock: 70,
    },
    {
      name: 'Summer Dress',
      description: 'Lightweight summer dress perfect for warm weather occasions.',
      price: 69.99,
      category: 'Clothing',
      image: 'https://picsum.photos/500/500?random=9',
      stock: 35,
    },
    {
      name: 'Business Shirt',
      description: 'Professional button-down shirt in wrinkle-free fabric.',
      price: 49.99,
      category: 'Clothing',
      image: 'https://picsum.photos/500/500?random=10',
      stock: 55,
    },
    // Accessories
    {
      name: 'Leather Crossbody Bag',
      description: 'Premium leather crossbody bag perfect for everyday use.',
      price: 89.99,
      category: 'Accessories',
      image: 'https://picsum.photos/500/500?random=11',
      stock: 30,
    },
    {
      name: 'Sunglasses',
      description: 'UV protection sunglasses with polarized lenses and stylish frame.',
      price: 129.99,
      category: 'Accessories',
      image: 'https://picsum.photos/500/500?random=12',
      stock: 40,
    },
    {
      name: 'Leather Wallet',
      description: 'Genuine leather wallet with RFID blocking technology.',
      price: 45.99,
      category: 'Accessories',
      image: 'https://picsum.photos/500/500?random=13',
      stock: 65,
    },
    {
      name: 'Smart Watch Band',
      description: 'Silicone watch band compatible with most smartwatches.',
      price: 24.99,
      category: 'Accessories',
      image: 'https://picsum.photos/500/500?random=14',
      stock: 90,
    },
    {
      name: 'Phone Case',
      description: 'Protective phone case with shock absorption and wireless charging support.',
      price: 19.99,
      category: 'Accessories',
      image: 'https://picsum.photos/500/500?random=15',
      stock: 120,
    },
    // Shoes
    {
      name: 'Running Shoes',
      description: 'Lightweight running shoes with excellent cushioning and breathability.',
      price: 129.99,
      category: 'Shoes',
      image: 'https://picsum.photos/500/500?random=16',
      stock: 75,
    },
    {
      name: 'Casual Sneakers',
      description: 'Comfortable everyday sneakers with classic design and modern comfort.',
      price: 89.99,
      category: 'Shoes',
      image: 'https://picsum.photos/500/500?random=17',
      stock: 60,
    },
    {
      name: 'Dress Shoes',
      description: 'Professional leather dress shoes perfect for business occasions.',
      price: 159.99,
      category: 'Shoes',
      image: 'https://picsum.photos/500/500?random=18',
      stock: 25,
    },
    {
      name: 'Hiking Boots',
      description: 'Durable hiking boots with waterproof membrane and ankle support.',
      price: 199.99,
      category: 'Shoes',
      image: 'https://picsum.photos/500/500?random=19',
      stock: 30,
    },
    {
      name: 'Sandals',
      description: 'Comfortable summer sandals with adjustable straps and cushioned sole.',
      price: 49.99,
      category: 'Shoes',
      image: 'https://picsum.photos/500/500?random=20',
      stock: 50,
    },
    // Home & Kitchen
    {
      name: 'Coffee Maker',
      description: 'Programmable coffee maker with built-in grinder and thermal carafe.',
      price: 149.99,
      category: 'Home & Kitchen',
      image: 'https://picsum.photos/500/500?random=21',
      stock: 20,
    },
    {
      name: 'Air Fryer',
      description: 'Digital air fryer with multiple cooking functions and easy-clean basket.',
      price: 99.99,
      category: 'Home & Kitchen',
      image: 'https://picsum.photos/500/500?random=22',
      stock: 35,
    },
    {
      name: 'Blender',
      description: 'High-speed blender perfect for smoothies, soups, and food prep.',
      price: 79.99,
      category: 'Home & Kitchen',
      image: 'https://picsum.photos/500/500?random=23',
      stock: 40,
    },
    {
      name: 'Dinnerware Set',
      description: 'Complete 16-piece dinnerware set with modern design and dishwasher safe.',
      price: 69.99,
      category: 'Home & Kitchen',
      image: 'https://picsum.photos/500/500?random=24',
      stock: 25,
    },
    {
      name: 'Kitchen Knife Set',
      description: 'Professional 8-piece knife set with wooden block and sharpener.',
      price: 119.99,
      category: 'Home & Kitchen',
      image: 'https://picsum.photos/500/500?random=25',
      stock: 15,
    },
    // Beauty
    {
      name: 'Skincare Set',
      description: 'Complete skincare routine with cleanser, toner, and moisturizer.',
      price: 89.99,
      category: 'Beauty',
      image: 'https://picsum.photos/500/500?random=26',
      stock: 45,
    },
    {
      name: 'Makeup Brush Set',
      description: 'Professional 12-piece makeup brush set with soft synthetic bristles.',
      price: 39.99,
      category: 'Beauty',
      image: 'https://picsum.photos/500/500?random=27',
      stock: 60,
    },
    {
      name: 'Perfume',
      description: 'Luxury fragrance with long-lasting scent and elegant packaging.',
      price: 79.99,
      category: 'Beauty',
      image: 'https://picsum.photos/500/500?random=28',
      stock: 30,
    },
    {
      name: 'Hair Dryer',
      description: 'Professional hair dryer with ionic technology and multiple heat settings.',
      price: 59.99,
      category: 'Beauty',
      image: 'https://picsum.photos/500/500?random=29',
      stock: 25,
    },
    {
      name: 'Face Mask Set',
      description: 'Hydrating face mask set with natural ingredients for all skin types.',
      price: 24.99,
      category: 'Beauty',
      image: 'https://picsum.photos/500/500?random=30',
      stock: 80,
    },
  ]

  // Create all items
  const createdItems = await Promise.all(
    items.map(item => prisma.item.create({ data: item }))
  )

  console.log('Created sample items:', createdItems.length)
  console.log('- Electronics:', createdItems.filter(item => item.category === 'Electronics').length)
  console.log('- Clothing:', createdItems.filter(item => item.category === 'Clothing').length)
  console.log('- Accessories:', createdItems.filter(item => item.category === 'Accessories').length)
  console.log('- Shoes:', createdItems.filter(item => item.category === 'Shoes').length)
  console.log('- Home & Kitchen:', createdItems.filter(item => item.category === 'Home & Kitchen').length)
  console.log('- Beauty:', createdItems.filter(item => item.category === 'Beauty').length)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })



