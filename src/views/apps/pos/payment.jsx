'use client'

import { FaShoppingCart } from 'react-icons/fa';

const Payment = () => {
  return <>
    <section class="h-screen bg-gray-100 py-12 sm:py-16 lg:py-0">
      <div class="mx-auto px-4 sm:px-0 lg:px-0">
        <div class="flex items-center justify-start">
          <div className='bg-blue-500 p-2 rounded-lg flex justify-between gap-5 w-full'>
            <div className=''>
              <p className='text-white text-xl'>Cart</p>
            </div>
            <div className='flex justify-between gap-2'>
              <FaShoppingCart className="text-white text-xl items-center justify-center pt-1" />
              <p className="text-white text-lg font-bold items-center">0</p>
            </div>
          </div>
        </div>
        <div class="mx-auto mt-8 max-w-md md:mt-5">
          <div class="rounded-lg bg-white shadow-lg">
            <div class="px-4 py-6 sm:px-8 sm:py-10">
              <div class="flow-root">
                <ul class="-my-8">
                  <li class="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0">
                    <div class="shrink-0 relative">
                      {/* <span class="absolute top-1 left-1 flex h-6 w-6 items-center justify-center rounded-full border bg-white text-sm font-medium text-gray-500 shadow sm:-top-2 sm:-right-2">1</span> */}
                      <img class="h-16 w-16 max-w-full rounded-lg object-cover" src="http://localhost:3000/images/Fried.jpg" alt="" />
                    </div>

                    <div class="relative flex flex-1 flex-col justify-between">
                      <div class="sm:col-gap-5 sm:grid sm:grid-cols-2">
                        <div class="pr-8 sm:pr-5">
                          <p class="text-xs font-semibold text-gray-900">Nike Air Max 2019</p>
                        </div>

                        <div class="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                          <p class="shrink-0 w-20 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right">$1259.00</p>
                        </div>
                      </div>

                      <div class="absolute top-0 right-0 flex sm:bottom-0 sm:top-auto">
                        <button type="button" class="flex rounded p-2 text-center text-gray-500 transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900">
                          <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" class=""></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </li>
                  <li class="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0">
                    <div class="shrink-0 relative">
                      {/* <span class="absolute top-1 left-1 flex h-6 w-6 items-center justify-center rounded-full border bg-white text-sm font-medium text-gray-500 shadow sm:-top-2 sm:-right-2">1</span> */}
                      <img class="h-16 w-16 max-w-full rounded-lg object-cover" src="http://localhost:3000/images/Fried.jpg" alt="" />
                    </div>

                    <div class="relative flex flex-1 flex-col justify-between">
                      <div class="sm:col-gap-5 sm:grid sm:grid-cols-2">
                        <div class="pr-8 sm:pr-5">
                          <p class="text-xs font-semibold text-gray-900">Nike Air Max 2019</p>
                        </div>

                        <div class="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                          <p class="shrink-0 w-20 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right">$1259.00</p>
                        </div>
                      </div>

                      <div class="absolute top-0 right-0 flex sm:bottom-0 sm:top-auto">
                        <button type="button" class="flex rounded p-2 text-center text-gray-500 transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900">
                          <svg class="block h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" class=""></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>

              <div class="mt-6 space-y-3 border-t border-b py-8">
                <div class="flex items-center justify-between">
                  <p class="text-gray-400">Subtotal</p>
                  <p class="text-lg font-semibold text-gray-900">$2399.00</p>
                </div>
                <div class="flex items-center justify-between">
                  <p class="text-gray-400">Shipping</p>
                  <p class="text-lg font-semibold text-gray-900">$8.00</p>
                </div>
              </div>
              <div class="mt-6 flex items-center justify-between">
                <p class="text-sm font-medium text-gray-900">Total</p>
                <p class="text-2xl font-semibold text-gray-900"><span class="text-xs font-normal text-gray-400">USD</span> 2499.00</p>
              </div>

              <div class="mt-6 text-center">
                <button type="button" class="group inline-flex w-full items-center justify-center rounded-md bg-orange-500 px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800">
                  Submit
                  <svg xmlns="http://www.w3.org/2000/svg" class="group-hover:ml-8 ml-4 h-6 w-6 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
}

export default Payment;
