# 1Fi SDE1 Assignment

A full-stack web application for displaying products with EMI plans backed by mutual funds.

## Tech Stack
- **Frontend**: Next.js (App Router), React, Tailwind CSS
- **Backend**: Next.js API Routes (Node.js)
- **Database**: SQLite (via Prisma ORM)

## Setup and Run Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Database & Seed Data
Initialize the SQLite database and seed it with dummy products (iPhone 17 Pro, Samsung Galaxy S24 Ultra, PlayStation 5) and their EMI plans:
```bash
npx prisma db push
npm run seed
```

### 3. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## API Endpoints

### 1. Get All Products
- **URL**: `/api/products`
- **Method**: `GET`
- **Response**:
```json
[
  {
    "id": "...",
    "slug": "iphone-17-pro",
    "name": "iPhone 17 Pro",
    "description": "The ultimate iPhone.",
    "variants": [
      {
        "id": "...",
        "name": "256GB",
        "mrp": 134900,
        "price": 127400,
        "image": "/iphone-17-pro-orange.png",
        "colors": "[\"#F9CC9D\", \"#D1D5DB\", \"#374151\"]"
      }
    ]
  }
]
```

### 2. Get Single Product (with Variants & EMI Plans)
- **URL**: `/api/products/:slug`
- **Method**: `GET`
- **Example**: `/api/products/iphone-17-pro`
- **Response**:
```json
{
  "id": "...",
  "slug": "iphone-17-pro",
  "name": "iPhone 17 Pro",
  "description": "The ultimate iPhone.",
  "variants": [
    {
      "id": "...",
      "name": "256GB",
      "mrp": 134900,
      "price": 127400,
      "image": "/iphone-17-pro-orange.png",
      "colors": "[\"#F9CC9D\", \"#D1D5DB\", \"#374151\"]",
      "emiPlans": [
        {
          "id": "...",
          "monthlyPayment": 44967,
          "tenureMonths": 3,
          "interestRate": 0,
          "cashback": 7500
        },
        ...
      ]
    }
  ]
}
```

## Schema Used
The database schema is defined using Prisma (`prisma/schema.prisma`):

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}

model Product {
  id          String    @id @default(uuid())
  slug        String    @unique
  name        String
  description String?
  variants    Variant[]
}

model Variant {
  id        String    @id @default(uuid())
  productId String
  product   Product   @relation(fields: [productId], references: [id])
  name      String
  mrp       Float
  price     Float
  image     String
  colors    String    // JSON string of colors
  emiPlans  EmiPlan[]
}

model EmiPlan {
  id            String  @id @default(uuid())
  variantId     String
  variant       Variant @relation(fields: [variantId], references: [id])
  monthlyPayment Float
  tenureMonths  Int
  interestRate  Float
  cashback      Float?
}
```
