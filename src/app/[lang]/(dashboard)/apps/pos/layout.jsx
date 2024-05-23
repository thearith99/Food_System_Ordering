'use client'

import Navbar from '@views/apps/pos/navbar';
import Payment from '@views/apps/pos/payment';

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className='flex justify-between lg:gap-5 sm:gap-0 gap-0 w-full'>
        <div className='w-3/4 pt-10'>
          {children}
        </div>
        <div className='w-1/4 pt-10'>
          <Payment/>
        </div>
      </main>
    </>
  );
};

export default Layout;
