// Component Imports
import Categories from '@views/apps/categories'

const getData = async () => {
  // Vars
  const res = await fetch(`${process.env.API_URL}/apps/categories`)

  if (!res.ok) {
    throw new Error('Failed to fetch userData')
  }

  return res.json()
}

const CategoriesApp = async () => {
  // Vars
  const data = await getData()

  return <Categories userData={data} />
}

export default CategoriesApp
