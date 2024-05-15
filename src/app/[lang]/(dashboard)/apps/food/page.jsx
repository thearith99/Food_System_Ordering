// Component Imports
import Categories from '@views/apps/food'

const getData = async () => {
  // Vars
  const res = await fetch(`${process.env.API_URL}/apps/product`)

  if (!res.ok) {
    throw new Error('Failed to fetch userData')
  }

  return res.json()
}

const CategoriesApp = async () => {
  // Vars
  const data = await getData()

  return (
    <div>
      <Categories userData={data} />
    </div>
  )
}

export default CategoriesApp
