import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Clear existing items first
  await prisma.cartItem.deleteMany()
  await prisma.item.deleteMany()

  // Create sample items with simple, reliable image URLs
  const items = [
    // Electronics
    { name: 'Wireless Headphones', description: 'High-quality wireless headphones with noise cancellation.', price: 199.99, category: 'Electronics', image: 'https://via.placeholder.com/500x500/4F46E5/FFFFFF?text=Headphones', stock: 50 },
    { name: 'Smart Watch', description: 'Advanced smartwatch with health monitoring and GPS.', price: 399.99, category: 'Electronics', image: 'https://via.placeholder.com/500x500/059669/FFFFFF?text=Smart+Watch', stock: 25 },
    { name: 'Gaming Laptop', description: 'High-performance gaming laptop with RTX graphics.', price: 1299.99, category: 'Electronics', image: 'https://via.placeholder.com/500x500/DC2626/FFFFFF?text=Gaming+Laptop', stock: 15 },
    { name: 'Wireless Charger', description: 'Fast wireless charging pad for all devices.', price: 49.99, category: 'Electronics', image: 'https://via.placeholder.com/500x500/7C3AED/FFFFFF?text=Wireless+Charger', stock: 80 },
    { name: 'Bluetooth Speaker', description: 'Portable speaker with 360-degree sound.', price: 79.99, category: 'Electronics', image: 'https://via.placeholder.com/500x500/EA580C/FFFFFF?text=Bluetooth+Speaker', stock: 60 },
    
    // Clothing
    { name: 'Cotton T-Shirt', description: 'Comfortable organic cotton t-shirt in various colors.', price: 29.99, category: 'Clothing', image: 'https://via.placeholder.com/500x500/0891B2/FFFFFF?text=T-Shirt', stock: 100 },
    { name: 'Denim Jacket', description: 'Classic denim jacket with vintage wash.', price: 89.99, category: 'Clothing', image: 'https://via.placeholder.com/500x500/1E40AF/FFFFFF?text=Denim+Jacket', stock: 45 },
    { name: 'Hoodie', description: 'Soft fleece hoodie with kangaroo pocket.', price: 59.99, category: 'Clothing', image: 'https://via.placeholder.com/500x500/7C2D12/FFFFFF?text=Hoodie', stock: 70 },
    { name: 'Summer Dress', description: 'Lightweight summer dress for warm weather.', price: 69.99, category: 'Clothing', image: 'https://via.placeholder.com/500x500/BE185D/FFFFFF?text=Summer+Dress', stock: 35 },
    { name: 'Business Shirt', description: 'Professional button-down shirt.', price: 49.99, category: 'Clothing', image: 'https://via.placeholder.com/500x500/374151/FFFFFF?text=Business+Shirt', stock: 55 },
    
    // Accessories
    { name: 'Crossbody Bag', description: 'Premium leather crossbody bag.', price: 89.99, category: 'Accessories', image: 'https://via.placeholder.com/500x500/92400E/FFFFFF?text=Crossbody+Bag', stock: 30 },
    { name: 'Sunglasses', description: 'UV protection sunglasses with polarized lenses.', price: 129.99, category: 'Accessories', image: 'https://via.placeholder.com/500x500/0F172A/FFFFFF?text=Sunglasses', stock: 40 },
    { name: 'Leather Wallet', description: 'Genuine leather wallet with RFID blocking.', price: 45.99, category: 'Accessories', image: 'https://via.placeholder.com/500x500/78350F/FFFFFF?text=Leather+Wallet', stock: 65 },
    { name: 'Watch Band', description: 'Silicone watch band for smartwatches.', price: 24.99, category: 'Accessories', image: 'https://via.placeholder.com/500x500/1F2937/FFFFFF?text=Watch+Band', stock: 90 },
    { name: 'Phone Case', description: 'Protective phone case with shock absorption.', price: 19.99, category: 'Accessories', image: 'https://via.placeholder.com/500x500/581C87/FFFFFF?text=Phone+Case', stock: 120 },
    
    // Shoes
    { name: 'Running Shoes', description: 'Lightweight running shoes with cushioning.', price: 129.99, category: 'Shoes', image: 'https://via.placeholder.com/500x500/166534/FFFFFF?text=Running+Shoes', stock: 75 },
    { name: 'Casual Sneakers', description: 'Comfortable everyday sneakers.', price: 89.99, category: 'Shoes', image: 'https://via.placeholder.com/500x500/1E3A8A/FFFFFF?text=Casual+Sneakers', stock: 60 },
    { name: 'Dress Shoes', description: 'Professional leather dress shoes.', price: 159.99, category: 'Shoes', image: 'https://via.placeholder.com/500x500/374151/FFFFFF?text=Dress+Shoes', stock: 25 },
    { name: 'Hiking Boots', description: 'Durable hiking boots with waterproof membrane.', price: 199.99, category: 'Shoes', image: 'https://via.placeholder.com/500x500/7C2D12/FFFFFF?text=Hiking+Boots', stock: 30 },
    { name: 'Sandals', description: 'Comfortable summer sandals.', price: 49.99, category: 'Shoes', image: 'https://via.placeholder.com/500x500/F59E0B/FFFFFF?text=Sandals', stock: 50 },
    
    // Home & Kitchen
    { name: 'Coffee Maker', description: 'Programmable coffee maker with grinder.', price: 149.99, category: 'Home & Kitchen', image: 'https://via.placeholder.com/500x500/92400E/FFFFFF?text=Coffee+Maker', stock: 20 },
    { name: 'Air Fryer', description: 'Digital air fryer with multiple functions.', price: 99.99, category: 'Home & Kitchen', image: 'https://via.placeholder.com/500x500/DC2626/FFFFFF?text=Air+Fryer', stock: 35 },
    { name: 'Blender', description: 'High-speed blender for smoothies.', price: 79.99, category: 'Home & Kitchen', image: 'https://via.placeholder.com/500x500/059669/FFFFFF?text=Blender', stock: 40 },
    { name: 'Dinnerware Set', description: 'Complete 16-piece dinnerware set.', price: 69.99, category: 'Home & Kitchen', image: 'https://via.placeholder.com/500x500/7C3AED/FFFFFF?text=Dinnerware+Set', stock: 25 },
    { name: 'Knife Set', description: 'Professional 8-piece knife set.', price: 119.99, category: 'Home & Kitchen', image: 'https://via.placeholder.com/500x500/374151/FFFFFF?text=Knife+Set', stock: 15 },
    
    // Beauty
    { name: 'Skincare Set', description: 'Complete skincare routine set.', price: 89.99, category: 'Beauty', image: 'https://via.placeholder.com/500x500/EC4899/FFFFFF?text=Skincare+Set', stock: 45 },
    { name: 'Makeup Brushes', description: 'Professional 12-piece brush set.', price: 39.99, category: 'Beauty', image: 'https://via.placeholder.com/500x500/BE185D/FFFFFF?text=Makeup+Brushes', stock: 60 },
    { name: 'Perfume', description: 'Luxury fragrance with long-lasting scent.', price: 79.99, category: 'Beauty', image: 'https://via.placeholder.com/500x500/7C2D12/FFFFFF?text=Perfume', stock: 30 },
    { name: 'Hair Dryer', description: 'Professional hair dryer with ionic technology.', price: 59.99, category: 'Beauty', image: 'https://via.placeholder.com/500x500/EA580C/FFFFFF?text=Hair+Dryer', stock: 25 },
    { name: 'Face Mask Set', description: 'Hydrating face mask set.', price: 24.99, category: 'Beauty', image: 'https://via.placeholder.com/500x500/0891B2/FFFFFF?text=Face+Mask+Set', stock: 80 },
  ]

  // Create all items
  const createdItems = await Promise.all(
    items.map(item => prisma.item.create({ data: item }))
  )

  console.log('Created sample items with placeholder images:', createdItems.length)
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



