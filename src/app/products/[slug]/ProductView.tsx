'use client'

import { useEffect, useState } from 'react'

export default function ProductView({ slug }: { slug: string }) {
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null)
  const [selectedEmiPlanId, setSelectedEmiPlanId] = useState<string | null>(null)

  useEffect(() => {
    fetch(`/api/products/${slug}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data)
        if (data && data.variants && data.variants.length > 0) {
          setSelectedVariantId(data.variants[0].id)
          if (data.variants[0].emiPlans && data.variants[0].emiPlans.length > 0) {
            setSelectedEmiPlanId(data.variants[0].emiPlans[0].id)
          }
        }
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [slug])

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  if (!product || product.error) return <div className="min-h-screen flex items-center justify-center">Product not found</div>

  const selectedVariant = product.variants.find((v: any) => v.id === selectedVariantId)
  const colors = selectedVariant && selectedVariant.colors ? JSON.parse(selectedVariant.colors) : []

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center p-4 sm:p-8 font-sans">
      <div className="bg-[#f9f9f9] rounded-[2rem] shadow-sm max-w-[1100px] w-full flex flex-col md:flex-row overflow-hidden">
        
        {/* Left Side: Product Image & Variants */}
        <div className="w-full md:w-1/2 p-8 lg:p-14 flex flex-col items-center">
          <div className="w-full flex flex-col mb-4">
            <span className="text-[#ff3b30] text-xs font-semibold tracking-wider mb-2">NEW</span>
            <h1 className="text-[2.5rem] leading-none font-medium text-black mb-1">{product.name}</h1>
            {selectedVariant && (
              <p className="text-[#86868b] text-xl">{selectedVariant.name}</p>
            )}
          </div>

          <div className="flex-grow flex items-center justify-center w-full mb-10 mt-6">
            <img 
               src={selectedVariant.image || 'https://via.placeholder.com/256x320?text=Product+Image'} 
               alt={product.name}
               className="max-h-[350px] object-contain drop-shadow-md mix-blend-multiply"
            />
          </div>

          <div className="text-center mt-auto">
            <p className="text-[13px] text-[#86868b] mb-3">Available in {colors.length} finishes</p>
            <div className="flex justify-center space-x-2">
              {colors.map((color: string, idx: number) => (
                <div 
                  key={idx} 
                  className="w-5 h-5 rounded-full border border-gray-200"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Pricing & EMI Plans */}
        <div className="w-full md:w-1/2 p-8 lg:p-14 bg-white rounded-[2rem] shadow-lg md:-ml-4 z-10 flex flex-col">
          {selectedVariant && (
            <div className="mb-4">
              <div className="text-[2.2rem] font-semibold text-black leading-none mb-1">{formatCurrency(selectedVariant.price)}</div>
              <div className="text-base text-[#86868b] line-through font-medium">{formatCurrency(selectedVariant.mrp)}</div>
            </div>
          )}

          <p className="text-[#1d1d1f] mb-6 font-medium text-lg">EMI plans backed by mutual funds</p>

          <div className="space-y-3 mb-8 overflow-y-auto pr-2 custom-scrollbar flex-grow">
            {selectedVariant?.emiPlans?.map((plan: any) => {
              const isSelected = selectedEmiPlanId === plan.id;
              return (
                <div 
                  key={plan.id}
                  onClick={() => setSelectedEmiPlanId(plan.id)}
                  className={`p-4 rounded-xl border-[1.5px] cursor-pointer transition-all ${
                    isSelected ? 'border-[#34c759] bg-[#f4fdf6]' : 'border-[#e5e5ea] hover:border-[#34c759]'
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <div className="font-semibold text-[#1d1d1f] text-[15px]">
                      {formatCurrency(plan.monthlyPayment)} x {plan.tenureMonths} months
                    </div>
                    <div className="text-[#1d1d1f] text-[15px] font-medium">
                      {plan.interestRate}% interest
                    </div>
                  </div>
                  {plan.cashback && (
                    <div className="text-[#34c759] text-[12px] font-semibold mt-1">
                      Additional cashback of {formatCurrency(plan.cashback)}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          <button 
            className="w-full bg-[#0071e3] text-white rounded-full py-4 font-semibold text-lg hover:bg-[#0077ed] transition-colors mt-auto shadow-md"
            onClick={() => {
              if (selectedEmiPlanId) {
                window.location.href = '/success';
              } else {
                alert('Please select an EMI plan first.');
              }
            }}
          >
            Proceed with plan
          </button>
        </div>

      </div>
    </div>
  )
}
