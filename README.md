# E-Commerce Store

A professional e-commerce web application built with Next.js, featuring user authentication, product management, and shopping cart functionality.

## Features

### Backend (Next.js API Routes)
- **JWT Authentication**: Secure user registration and login with JWT tokens
- **CRUD APIs for Items**: Complete product management with filtering capabilities
- **Cart Management**: Add, remove, and update cart items with persistence
- **Database Integration**: SQLite database with Prisma ORM

### Frontend (Next.js App Router)
- **Professional UI**: Modern, responsive design with Tailwind CSS
- **User Authentication**: Signup and login pages with form validation
- **Product Listing**: Browse products with advanced filtering and search
- **Shopping Cart**: Persistent cart functionality that survives logout/login
- **Mobile Responsive**: Optimized for all device sizes

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: SQLite with Prisma ORM
- **Authentication**: JWT (jsonwebtoken)
- **Form Handling**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Password Hashing**: bcryptjs

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd e-commerce
```

2. Install dependencies:
```bash
npm install
```

3. Set up the database:
```bash
npx prisma generate
npx prisma db push
npx tsx prisma/seed.ts
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login

### Items
- `GET /api/items` - Get all items with filtering
- `POST /api/items` - Create new item
- `GET /api/items/[id]` - Get item by ID
- `PUT /api/items/[id]` - Update item
- `DELETE /api/items/[id]` - Delete item

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/[id]` - Update cart item quantity
- `DELETE /api/cart/[id]` - Remove item from cart

## Features in Detail

### Authentication
- Secure JWT-based authentication
- Password hashing with bcryptjs
- Protected API routes
- Persistent login state

### Product Management
- Advanced filtering by category, price range
- Search functionality
- Pagination support
- Stock management
- Professional product cards

### Shopping Cart
- Add/remove items
- Quantity management
- Persistent across sessions
- Real-time updates
- Order summary

### User Experience
- Responsive design
- Loading states
- Error handling
- Form validation
- Professional animations

## Database Schema

### User
- id (String, Primary Key)
- email (String, Unique)
- password (String, Hashed)
- name (String)
- createdAt, updatedAt (DateTime)

### Item
- id (String, Primary Key)
- name (String)
- description (String)
- price (Float)
- category (String)
- image (String, Optional)
- stock (Int)
- createdAt, updatedAt (DateTime)

### CartItem
- id (String, Primary Key)
- userId (String, Foreign Key)
- itemId (String, Foreign Key)
- quantity (Int)
- createdAt, updatedAt (DateTime)

## Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="file:./dev.db"

# JWT Secret
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"

# Next.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret"
```

## Deployment

1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.