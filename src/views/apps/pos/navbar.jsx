'use client'

import { usePathname, useParams } from 'next/navigation'
import Link from 'next/link'

import classNames from 'classnames'

// Import View Component

const Navbar = () => {
  const pathname = usePathname()
  const params = useParams()
  const { lang: locale, id } = params

  const navItems = [
    { name: 'All', path: `/${locale}/apps/pos` },
    { name: 'Soup', path: `/${locale}/apps/pos/soup` },
    { name: 'Fried', path: `/${locale}/services` },
    { name: 'Grilled', path: `/${locale}/contact` }
  ]

  return (
    <nav className='z-10 fixed top-0 min-w-screen w-full flex bg-blue-500/70 justify-between items-center'>
      <div className='flex justify-between w-full items-center gap-4'>
        <div className='flex gap-4 w-7/10 w-full border border-b-slate-500 shadow-md p-2'>
          <ul className='flex gap-4 list-none'>
            {navItems.map(item => (
              <li key={item.path}>
                <Link href={item.path} passHref>
                  <div
                    className={classNames(
                      'text-lg',
                      { 'font-bold text-white': pathname === item.path },
                      { 'text-black': pathname !== item.path }
                    )}
                  >
                    {item.name}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
