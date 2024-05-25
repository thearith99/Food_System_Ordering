import { useEffect, useState } from 'react'
import { usePathname, useParams } from 'next/navigation'
import Link from 'next/link'
import classNames from 'classnames'

const Navbar = () => {
  const { pathname } = usePathname() // Destructure pathname directly
  const { lang: locale } = useParams() // Destructure lang from params directly
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const getCategory = async () => {
      try {
        const response = await fetch('/api/categories')
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const jsonData = await response.json()
        setCategories(jsonData)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    getCategory()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  const navItems = [
    { name: 'All', path: `/${locale}/apps/pos` },
    ...categories.map(category => ({
      name: category.name,
      path: `/${locale}/apps/pos/${category.id}`
    }))
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
