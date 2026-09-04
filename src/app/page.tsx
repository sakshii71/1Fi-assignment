import Link from 'next/link'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function Home() {
  const products = await prisma.product.findMany({
    include: { variants: true }
  })

  return (
    <main className="min-h-screen bg-[#f5f5f7] p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-[2.5rem] font-semibold text-center mb-12">Select your product.</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((product) => {
            const defaultImage = product.variants[0]?.image || 'https://via.placeholder.com/256x320'
            const defaultPrice = product.variants[0]?.price
            
            return (
              <Link key={product.id} href={`/products/${product.slug}`}>
                <div className="bg-white p-8 rounded-[2rem] shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col items-center text-center h-full">
                  <h2 className="text-2xl font-semibold mb-2">{product.name}</h2>
                  <p className="text-[#86868b] text-sm mb-6">{product.description}</p>
                  
                  <div className="flex-grow flex items-center justify-center mb-6">
                    <img src={defaultImage} alt={product.name} className="h-48 object-contain mix-blend-multiply drop-shadow-md" />
                  </div>
                  
                  {defaultPrice && (
                    <div className="text-lg font-medium mb-4">From ₹{defaultPrice.toLocaleString('en-IN')}</div>
                  )}
                  
                  <div className="bg-[#0071e3] text-white px-6 py-2 rounded-full font-medium text-sm hover:bg-[#0077ed] transition-colors">
                    Buy with EMI
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </main>
  )
}
