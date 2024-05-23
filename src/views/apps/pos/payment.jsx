'use client'

import { FaShoppingCart } from 'react-icons/fa'

const Payment = () => {
  return (
    <>
      <section className='min-h-screen bg-gray-100 py-0 sm:py-0 lg:py-0'>
        <div className='fixed lg:fixed sm:fixed mx-auto max-w-screen px-4 sm:px-0 lg:py-0'>
          <div className='items-center justify-start'>
            <div className='bg-blue-500 rounded flex justify-between gap-5 w-full p-2 lg:p-2 sm:p-1'>
              <div>
                <p className='text-white text-sm sm:text-lg lg:text-lg'>Cart</p>
              </div>
              <div className='flex justify-between gap-2'>
                <FaShoppingCart className='text-white text-sm sm:text-lg lg:text-xl items-center justify-center pt-1' />
                <p className='text-white text-sm sm:text-lg lg:text-lg font-bold items-center'>0</p>
              </div>
            </div>
          </div>
          <div className='mx-auto max-w-md sm:py-0 sm:mt-7 lg:py-0 py-3'>
            <div className='rounded-lg bg-white shadow-lg'>
              <div className='px-4 py-6 sm:px-2 sm:py-4 lg:px-6 lg:py-8'>
                <div className='flow-root'>
                  <ul className='-my-8'>
                    <li className='flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0'>
                      <div className='shrink-0 relative'>
                        <img
                          className='h-16 w-16 max-w-full rounded-lg object-cover'
                          src='http://localhost:3000/images/Fried.jpg'
                          alt=''
                        />
                      </div>

                      <div className='relative flex flex-1 flex-col justify-between'>
                        <div className='sm:col-gap-5 sm:grid sm:grid-cols-2'>
                          <div className='pr-8 sm:pr-5 block'>
                            <div>
                              <p className='lg:text-xs sm:text-[9px] font-semibold text-gray-900'>Nike Air Max 2019</p>
                            </div>
                            <div className='grid grid-cols-3 lg:gap-1 sm:gap-6 lg:pt-1 sm:pt-1'>
                              <button className='lg:text-xl bg-blue-500/70 hover:bg-blue-700 text-white font-bold px-2 rounded lg:h-7 lg:w-7 sm:h-5 sm:text-sm sm:px-2 sm:w-5'>-</button>
                              <div className='lg:text-xl lg:px-2 lg:h-7 lg:w-7 bg-blue-500/70 rounded text-white font-bold sm:h-5 sm:text-sm sm:px-2 sm:w-5 sm:flex justify-center'>0</div>
                              <button className='lg:text-xl bg-blue-500/70 hover:bg-blue-700 text-white font-bold px-2 rounded lg:h-7 lg:w-7 sm:h-5 sm:text-sm sm:px-1 sm:w-5'>+</button>
                            </div>
                          </div>

                          <div className='mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end'>
                            <p className='shrink-0 w-20 lg:text-base sm:text-xs font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right'>
                              $1259.00
                            </p>
                          </div>
                        </div>

                        <div className='absolute top-0 right-0 flex sm:bottom-0 sm:top-auto'>
                          <button
                            type='button'
                            className='flex rounded p-2 text-center text-gray-500 transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900'
                          >
                            <svg
                              className='block h-5 w-5'
                              xmlns='http://www.w3.org/2000/svg'
                              fill='none'
                              viewBox='0 0 24 24'
                              stroke='currentColor'
                            >
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                d='M6 18L18 6M6 6l12 12'
                              ></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </li>
                    <li className='flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0'>
                      <div className='shrink-0 relative'>
                        <img
                          className='h-16 w-16 max-w-full rounded-lg object-cover'
                          src='http://localhost:3000/images/Fried.jpg'
                          alt=''
                        />
                      </div>

                      <div className='relative flex flex-1 flex-col justify-between'>
                        <div className='sm:col-gap-5 sm:grid sm:grid-cols-2'>
                          <div className='pr-8 sm:pr-5 block'>
                            <div>
                              <p className='lg:text-xs sm:text-[9px] font-semibold text-gray-900'>Nike Air Max 2019</p>
                            </div>
                            <div className='grid grid-cols-3 lg:gap-1 sm:gap-6 lg:pt-1 sm:pt-1'>
                              <button className='lg:text-xl bg-blue-500/70 hover:bg-blue-700 text-white font-bold px-2 rounded lg:h-7 lg:w-7 sm:h-5 sm:text-sm sm:px-2 sm:w-5'>-</button>
                              <div className='lg:text-xl lg:px-2 lg:h-7 lg:w-7 bg-blue-500/70 rounded text-white font-bold sm:h-5 sm:text-sm sm:px-2 sm:w-5 sm:flex justify-center'>0</div>
                              <button className='lg:text-xl bg-blue-500/70 hover:bg-blue-700 text-white font-bold px-2 rounded lg:h-7 lg:w-7 sm:h-5 sm:text-sm sm:px-1 sm:w-5'>+</button>
                            </div>
                          </div>

                          <div className='mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end'>
                            <p className='shrink-0 w-20 lg:text-base sm:text-xs font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right'>
                              $1259.00
                            </p>
                          </div>
                        </div>

                        <div className='absolute top-0 right-0 flex sm:bottom-0 sm:top-auto'>
                          <button
                            type='button'
                            className='flex rounded p-2 text-center text-gray-500 transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900'
                          >
                            <svg
                              className='block h-5 w-5'
                              xmlns='http://www.w3.org/2000/svg'
                              fill='none'
                              viewBox='0 0 24 24'
                              stroke='currentColor'
                            >
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                d='M6 18L18 6M6 6l12 12'
                              ></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className='mt-6 space-y-3 border-t border-b py-8'>
                  <div className='flex items-center justify-between'>
                    <p className='text-gray-400'>Subtotal</p>
                    <p className='text-lg font-semibold text-gray-900'>$2399.00</p>
                  </div>
                  <div className='flex items-center justify-between'>
                    <p className='text-gray-400'>Shipping</p>
                    <p className='text-lg font-semibold text-gray-900'>$8.00</p>
                  </div>
                </div>
                <div className='mt-6 flex items-center justify-between'>
                  <p className='text-sm font-medium text-gray-900'>Total</p>
                  <p className='text-2xl font-semibold text-gray-900'>
                    <span className='text-xs font-normal text-gray-400'>USD</span> 2499.00
                  </p>
                </div>

                <div className='mt-6 text-center'>
                  <button
                    type='button'
                    className='group inline-flex w-full items-center justify-center rounded-md bg-orange-500 px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800'
                  >
                    Submit
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='group-hover:ml-8 ml-4 h-6 w-6 transition-all'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                      strokeWidth='2'
                    >
                      <path strokeLinecap='round' strokeLinejoin='round' d='M13 7l5 5m0 0l-5 5m5-5H6' />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Payment
