import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Clear existing data
  await prisma.emiPlan.deleteMany()
  await prisma.variant.deleteMany()
  await prisma.product.deleteMany()

  // 1. iPhone 17 Pro
  const iphone17Pro = await prisma.product.create({
    data: {
      slug: 'iphone-17-pro',
      name: 'iPhone 17 Pro',
      description: 'The ultimate iPhone.',
      variants: {
        create: [
          {
            name: '256GB',
            mrp: 134900,
            price: 127400,
            image: '/iphone-17-pro-orange.png',
            colors: JSON.stringify(['#F9CC9D', '#D1D5DB', '#374151']),
            emiPlans: {
              create: [
                { monthlyPayment: 44967, tenureMonths: 3, interestRate: 0, cashback: 7500 },
                { monthlyPayment: 22483, tenureMonths: 6, interestRate: 0, cashback: 7500 },
                { monthlyPayment: 11242, tenureMonths: 12, interestRate: 0, cashback: 7500 },
                { monthlyPayment: 5621, tenureMonths: 24, interestRate: 0, cashback: 7500 },
                { monthlyPayment: 4297, tenureMonths: 36, interestRate: 10.5, cashback: 7500 },
                { monthlyPayment: 3385, tenureMonths: 48, interestRate: 10.5, cashback: 7500 },
                { monthlyPayment: 2842, tenureMonths: 60, interestRate: 10.5, cashback: 7500 },
              ]
            }
          },
          {
            name: '512GB',
            mrp: 154900,
            price: 147400,
            image: '/iphone-17-pro-silver.png',
            colors: JSON.stringify(['#F9CC9D', '#D1D5DB', '#374151']),
            emiPlans: {
              create: [
                { monthlyPayment: 49133, tenureMonths: 3, interestRate: 0, cashback: 7500 },
                { monthlyPayment: 24566, tenureMonths: 6, interestRate: 0, cashback: 7500 },
              ]
            }
          }
        ]
      }
    }
  })

  // 2. Samsung Galaxy S24 Ultra
  const s24Ultra = await prisma.product.create({
    data: {
      slug: 'samsung-s24-ultra',
      name: 'Samsung Galaxy S24 Ultra',
      description: 'Galaxy AI is here.',
      variants: {
        create: [
          {
            name: '512GB',
            mrp: 139999,
            price: 129999,
            image: '/s24-ultra.png',
            colors: JSON.stringify(['#4B4B4B', '#A8A9AD']),
            emiPlans: {
              create: [
                { monthlyPayment: 43333, tenureMonths: 3, interestRate: 0, cashback: 5000 },
                { monthlyPayment: 21666, tenureMonths: 6, interestRate: 0, cashback: 5000 },
                { monthlyPayment: 10833, tenureMonths: 12, interestRate: 0, cashback: 5000 },
              ]
            }
          },
          {
            name: '1TB',
            mrp: 159999,
            price: 149999,
            image: '/s24-ultra-grey.png',
            colors: JSON.stringify(['#4B4B4B', '#A8A9AD']),
            emiPlans: {
              create: [
                { monthlyPayment: 49999, tenureMonths: 3, interestRate: 0, cashback: 5000 },
              ]
            }
          }
        ]
      }
    }
  })

  // 3. Sony PlayStation 5
  const ps5 = await prisma.product.create({
    data: {
      slug: 'sony-ps5',
      name: 'Sony PlayStation 5',
      description: 'Play Has No Limits.',
      variants: {
        create: [
          {
            name: 'Standard Edition',
            mrp: 54990,
            price: 49990,
            image: '/ps5.png',
            colors: JSON.stringify(['#FFFFFF']),
            emiPlans: {
              create: [
                { monthlyPayment: 16663, tenureMonths: 3, interestRate: 0, cashback: null },
                { monthlyPayment: 8331, tenureMonths: 6, interestRate: 0, cashback: null },
              ]
            }
          },
          {
            name: 'Digital Edition',
            mrp: 44990,
            price: 39990,
            image: '/ps5-digital.png',
            colors: JSON.stringify(['#FFFFFF']),
            emiPlans: {
              create: [
                { monthlyPayment: 13330, tenureMonths: 3, interestRate: 0, cashback: null },
                { monthlyPayment: 6665, tenureMonths: 6, interestRate: 0, cashback: null },
              ]
            }
          }
        ]
      }
    }
  })

  console.log('Database seeded!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
