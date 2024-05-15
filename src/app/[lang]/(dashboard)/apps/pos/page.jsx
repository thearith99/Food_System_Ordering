<<<<<<< HEAD
<<<<<<< HEAD
// Component Imports
import Pos from '@views/apps/pos/index.jsx'

const getData = async () => {
  // Vars
  const res = await fetch(`${process.env.API_URL}/apps/user-list`)

  if (!res.ok) {
    throw new Error('Failed to fetch userData')
  }

  return res.json()
}

const PosListApp = async () => {
  // Vars
  const data = await getData()

  return <Pos userData={data} />
}

export default PosListApp;
=======
=======
>>>>>>> d5bf2c63f1a302406e372fa83cf65d2b83112255
import Card from '@mui/material/Card'

import ProductList from '@views/apps/pos'

const AnotherPage = () => {
  return (
    <Card className='overflow-visible'>
      <ProductList />
    </Card>
  )
}

export default AnotherPage
<<<<<<< HEAD
>>>>>>> d5bf2c63f1a302406e372fa83cf65d2b83112255
=======
>>>>>>> d5bf2c63f1a302406e372fa83cf65d2b83112255
