# ECommerce Web Application (MERN Stack)

## About the Project

A full-stack ecommerce platform built with the MERN stack, featuring a customer-facing storefront, a dedicated admin panel and a secure REST API backend. Customers can browse products, manage their cart and place orders, while admins can manage the product catalog and track order status all from a separate admin dashboard.

## Features

**Customer Store (Frontend)**
- User registration and login (JWT-based authentication)
- Browse and search products by category
- Add to cart, update quantities and view cart totals
- Place orders and view order history

**Admin Panel**
- Separate admin authentication, isolated from customer accounts
- Add new products with multiple image uploads (up to 4 images per product)
- Remove products from the catalog
- View all orders and update order status

**Backend**
- RESTful API built with Express 5
- MongoDB database via Mongoose
- Image uploads handled with Multer and stored on Cloudinary
- Password hashing with bcrypt
- PayPal integration for order payments

## Tech Stack 

| Layer | Technologies |
|---|---|
| Frontend (Store) | React 19, Vite, Tailwind CSS, React Router, Axios, React Toastify |
| Admin Panel | React 19, Vite, Tailwind CSS, React Router, Axios, React Toastify |
| Backend | Node.js, Express 5, MongoDB, Mongoose |
| Auth | JSON Web Tokens (JWT), bcrypt |
| File Storage | Multer, Cloudinary |

## Project Structure

```
ECommerce-Project/
├── frontend/     # Customer-facing storefront (React + Vite)
├── admin/        # Admin dashboard (React + Vite)
└── backend/      # REST API (Express + MongoDB)
```

## Getting Started

### Prerequisites
- Node.js installed
- A MongoDB database (local or Atlas)
- A Cloudinary account (for image uploads)

### 1. Clone the repository
```bash
git clone https://github.com/Umar-Farooq-Afridi/ECommerce-Project.git
cd ECommerce-Project
```

### 2. Backend setup
```bash
cd backend
npm install
```

Create a `.env` file in `backend/` with:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret
```

Run the backend:
```bash
npm run dev
```

### 3. Frontend setup (store)
```bash
cd ../frontend
npm install
npm run dev
```

### 4. Admin panel setup
```bash
cd ../admin
npm install
npm run dev
```

## API Endpoints

| Route | Method | Description | Auth |
|---|---|---|---|
| `/api/user/register` | POST | Register a new user | Public |
| `/api/user/login` | POST | Login user | Public |
| `/api/user/admin` | POST | Admin login | Public |
| `/api/product/list` | POST | List all products | Public |
| `/api/product/single` | POST | Get single product details | Public |
| `/api/product/add` | POST | Add a new product (with images) | Admin |
| `/api/product/remove` | POST | Remove a product | Admin |
| `/api/cart/get` | POST | Get user's cart | User |
| `/api/cart/add` | POST | Add item to cart | User |
| `/api/cart/update` | POST | Update cart item quantity | User |
| `/api/order/place` | POST | Place a new order | User |
| `/api/order/userorders` | POST | Get logged-in user's orders | User |
| `/api/order/list` | POST | Get all orders | Admin |
| `/api/order/status` | POST | Update order status | Admin |

## Author

**Umar Farooq: Software Engineer | Web Developer | MERN Stack Developer**
- GitHub: [@Umar-Farooq-Afridi](https://github.com/Umar-Farooq-Afridi)
- Portfolio: [umar-farooq-portfolio.vercel.app](https://umar-farooq-portfolio.vercel.app)