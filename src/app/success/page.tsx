import Link from 'next/link'

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-[#f5f5f7] flex items-center justify-center p-4 font-sans">
      <div className="bg-white p-10 rounded-[2rem] shadow-lg max-w-md w-full text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Plan Selected!</h1>
        <p className="text-gray-500 mb-8 leading-relaxed">
          You have successfully proceeded with your chosen EMI plan. A representative will contact you shortly to finalize the mutual fund details.
        </p>
        <Link href="/">
          <button className="w-full bg-[#0071e3] text-white rounded-full py-4 font-semibold text-lg hover:bg-[#0077ed] transition-colors shadow-md">
            Return to Products
          </button>
        </Link>
      </div>
    </div>
  )
}
