import React from 'react';

const Page = () => {
  return (
    <>
      <section className="bg-gray-100 py-12 text-gray-700 sm:py-16 lg:py-0">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-0">
          <div className=" text-center flex justify-between ">
            <h2 className=" text-sm font-bold sm:text-2xl">All Food</h2>
            {/* Search Bar */}
            <div className="text-center">
              <input
                type="text"
                placeholder="Search for food..."
                className="w-full rounded-md border border-gray-400 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
          {/* Display Grid */}
          <div className="mt-7 grid gap-6 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <article className="relative flex flex-col overflow-hidden rounded-lg border">
              <div class="aspect-square overflow-hidden">
                <img class="h-full w-full object-cover transition-all duration-300 group-hover:scale-125" src="http://localhost:3000/images/Fried.jpg" alt="" />
              </div>
              <div class="absolute top-0 m-2 rounded-full bg-white">
                <p class="rounded-full bg-emerald-500 p-1 text-[8px] font-bold uppercase tracking-wide text-white sm:py-1 sm:px-3">Sale</p>
              </div>
              <div class="my-4 mx-auto flex w-10/12 flex-col items-start justify-between">
                <div class="mb-2 flex">
                  <p class="mr-3 text-sm font-semibold">$99.00</p>
                  <del class="text-xs text-gray-400"> $79.00 </del>
                </div>
                <h3 class="mb-2 text-sm text-gray-400">Fresh Apples</h3>
              </div>
              <a href="#" class="hover:border-white/40 flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-blue-300">
                <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Add to cart</a>
            </article>

            <article className="relative flex flex-col overflow-hidden rounded-lg border">
              <div class="aspect-square overflow-hidden">
                <img class="h-full w-full object-cover transition-all duration-300 group-hover:scale-125" src="http://localhost:3000/images/Fried.jpg" alt="" />
              </div>
              <div class="absolute top-0 m-2 rounded-full bg-white">
                <p class="rounded-full bg-emerald-500 p-1 text-[8px] font-bold uppercase tracking-wide text-white sm:py-1 sm:px-3">Sale</p>
              </div>
              <div class="my-4 mx-auto flex w-10/12 flex-col items-start justify-between">
                <div class="mb-2 flex">
                  <p class="mr-3 text-sm font-semibold">$99.00</p>
                  <del class="text-xs text-gray-400"> $79.00 </del>
                </div>
                <h3 class="mb-2 text-sm text-gray-400">Fresh Apples</h3>
              </div>
              <a href="#" class="hover:border-white/40 flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-blue-300">
                <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Add to cart</a>
            </article>

            <article className="relative flex flex-col overflow-hidden rounded-lg border">
              <div class="aspect-square overflow-hidden">
                <img class="h-full w-full object-cover transition-all duration-300 group-hover:scale-125" src="http://localhost:3000/images/Fried.jpg" alt="" />
              </div>
              <div class="absolute top-0 m-2 rounded-full bg-white">
                <p class="rounded-full bg-emerald-500 p-1 text-[8px] font-bold uppercase tracking-wide text-white sm:py-1 sm:px-3">Sale</p>
              </div>
              <div class="my-4 mx-auto flex w-10/12 flex-col items-start justify-between">
                <div class="mb-2 flex">
                  <p class="mr-3 text-sm font-semibold">$99.00</p>
                  <del class="text-xs text-gray-400"> $79.00 </del>
                </div>
                <h3 class="mb-2 text-sm text-gray-400">Fresh Apples</h3>
              </div>
              <a href="#" class="hover:border-white/40 flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-blue-300">
                <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Add to cart</a>
            </article>

            <article className="relative flex flex-col overflow-hidden rounded-lg border">
              <div class="aspect-square overflow-hidden">
                <img class="h-full w-full object-cover transition-all duration-300 group-hover:scale-125" src="http://localhost:3000/images/Fried.jpg" alt="" />
              </div>
              <div class="absolute top-0 m-2 rounded-full bg-white">
                <p class="rounded-full bg-emerald-500 p-1 text-[8px] font-bold uppercase tracking-wide text-white sm:py-1 sm:px-3">Sale</p>
              </div>
              <div class="my-4 mx-auto flex w-10/12 flex-col items-start justify-between">
                <div class="mb-2 flex">
                  <p class="mr-3 text-sm font-semibold">$99.00</p>
                  <del class="text-xs text-gray-400"> $79.00 </del>
                </div>
                <h3 class="mb-2 text-sm text-gray-400">Fresh Apples</h3>
              </div>
              <a href="#" class="hover:border-white/40 flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-blue-300">
                <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Add to cart</a>
            </article>

            {/* Repeat the above article component for each food item */}
          </div>
        </div>
      </section>
    </>
  );
}

export default Page;
