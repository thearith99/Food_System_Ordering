'use client'

import Navbar from '../../../../../views/apps/pos/navbar';
import Payment from '../../../../../views/apps/pos/payment';

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className='flex justify-between gap-10 w-full'>
        <div className='w-3/5 pt-10'>
          {children}
        </div>
        <div className='w-2/5 pt-10'>
          <Payment/>
        </div>
      </main>
    </>
  );
};

export default Layout;
