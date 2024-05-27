'use client'

import React, { useState, useEffect, useMemo, useContext } from 'react'

import { FaShoppingCart } from 'react-icons/fa'

import homeContext from '@/contexts/home.context'

const Page = () => {
  const {
    state: { addcards, products, loading },
    dispatch
  } = useContext(homeContext)

  const [searchQuery, setSearchQuery] = useState('')

  const filteredProducts = useMemo(() => {
    console.log('filteredProducts', products)

    return products.filter(product => product.name.toLowerCase().includes(searchQuery.toLowerCase()))
  }, [products, searchQuery])

  // Memoize the entire component's JSX
  const memoizedPage = useMemo(
    () => (
      <section className='bg-gray-100 py-12 text-gray-700 sm:py-16 lg:py-1 '>
        <div className='mx-auto w-full px-4 sm:px-6 lg:px-0'>
          <div className='fixed lg:fixed md:fixed sm:fixed w-[62.4%] sm:w-[65%] md:w-[64.7%] lg:w-[60.5%] top-16 z-20 text-center flex justify-between'>
            <h2 className='text-1xl font-bold sm:text-2xl lg:text-2xl lg:pt-2'>All Food</h2>
            {/* Search Bar */}
            <div className='text-center'>
              <input
                type='text'
                placeholder='Search for food...'
                className='w-full rounded-lg border border-gray-400 lg:px-4 lg:py-3.5 sm:px-4 sm:py-2.5 py-2 px-4 focus:border-blue-500 focus:ring-blue-500'
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          {/* Display Grid */}
          <div className='grid gap-6 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:py-16 '>
            {filteredProducts.length && loading  === 0 ? (
              <div className='col-span-4 text-center flex justify-center items-center h-96'>
                <div className='border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-blue-600' />
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className='col-span-4 text-center'>
                <p className='text-lg font-semibold'>No matching products found.</p>
              </div>
            ) : (
              filteredProducts.map(product => (
                <article key={product?.id} className='relative flex flex-col overflow-hidden rounded-lg border'>
                  <div className='aspect-square overflow-hidden '>
                    <img
                      className='h-full w-full object-cover transition-all duration-300 group-hover:scale-125'
                      src={`http://localhost:3000/images/${product?.image}.jpg`}
                      alt={product?.name}
                    />
                  </div>
                  <div className='absolute top-0 m-2 rounded-full bg-white'>
                    <p className='rounded-full bg-emerald-500 p-1 text-[8px] font-bold uppercase tracking-wide text-white sm:py-1 sm:px-3'>
                      Sale
                    </p>
                  </div>
                  <div className='my-4 mx-auto flex w-10/12 flex-col items-start justify-between'>
                    <div className='mb-2 flex'>
                      <p className='mr-3 text-sm font-semibold'>${product?.price}</p>
                      {/* <del className='text-xs text-gray-400'>${product.originalPrice}</del> */}
                    </div>
                    <h3 className='mb-2 text-sm text-gray-400'>{product?.name}</h3>
                  </div>
                  <button
                    onClick={() => {
                      dispatch({
                        field: 'addcards',
                        value: [...addcards, product]
                      })
                    }}
                    className='hover:border-white/40 flex items-center justify-center rounded-md border border-transparent bg-blue-500/70 px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-blue-300 cursor-pointer'
                  >
                    <FaShoppingCart className='mr-2 h-6 w-6' />
                    Add to cart
                  </button>
                </article>
              ))
            )}
          </div>
        </div>
      </section>
    ),
    [loading, searchQuery, filteredProducts]
  )

  return memoizedPage
}

export default Page
