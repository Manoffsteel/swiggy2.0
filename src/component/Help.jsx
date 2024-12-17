import React from 'react'
import Head from './Head'

const Help = () => {
  return (

<div className="p-4 md:p-10 bg-[#37718E] min-h-screen">
{/* Header */}
<h1 className="text-xl md:text-2xl font-bold text-white mb-4 md:pl-28 pt-10 text-center md:text-left">
  Help & Support
</h1>
<p className="text-gray-200 mb-6 md:pl-28 text-center md:text-left">
  Let's take a step ahead and help you better.
</p>

{/* Help Options Section */}
<div className="bg-white rounded-md shadow-md flex flex-col md:flex-row overflow-hidden">
  {/* Help Topics */}
  <div className="bg-gray-200 w-full md:w-1/3 p-6 text-gray-700">
    <ul className="space-y-4 md:space-y-8">
      <li className="border-b pb-2 hover:text-black cursor-pointer hover:font-semibold">
        Swiggy One FAQs
      </li>
      <li className="border-b pb-2 hover:text-black cursor-pointer hover:font-semibold">
        General Issues
      </li>
      <li className="border-b pb-2 hover:text-black cursor-pointer hover:font-semibold">
        Partner Onboarding
      </li>
      <li className="border-b pb-2 hover:text-black cursor-pointer hover:font-semibold">
        Report Safety Emergency
      </li>
      <li className="border-b pb-2 hover:text-black cursor-pointer hover:font-semibold">
        Instamart Onboarding
      </li>
      <li className="border-b pb-2 hover:text-black cursor-pointer hover:font-semibold">
        Legal, Terms & Conditions
      </li>
      <li className="border-b pb-2 hover:text-black cursor-pointer hover:font-semibold">
        FAQs
      </li>
      <li className="hover:text-black cursor-pointer hover:font-semibold">
        Swiggy Money FAQs
      </li>
      <li className="hover:text-black cursor-pointer hover:font-semibold">
        Swiggy Dineout FAQs
      </li>
      <li className="hover:text-black cursor-pointer hover:font-semibold">
        IRCTC FAQs
      </li>
    </ul>
  </div>

  {/* Past Orders Section */}
  <div className="w-full md:w-2/3 p-6">
    <h2 className="text-lg md:text-xl font-semibold text-black mb-4">
      Past Orders
    </h2>
    <div className="flex items-center justify-center p-6 bg-gray-50 border border-dashed border-gray-300 rounded-md">
      <p className="text-gray-500 text-center">
        No orders to show currently.
      </p>
    </div>
  </div>
</div>
</div>
  )
}

export default Help