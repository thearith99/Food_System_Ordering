import { useState, useEffect } from 'react'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
import CustomTextField from '@core/components/mui/TextField'

<<<<<<< HEAD
const TableFilters = ({ filterProducts }) => {
  // States
  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState('')
  const [products, setProducts] = useState([]) // Assuming you have products state
  const [filteredProducts, setFilteredProducts] = useState([]) // State for filtered products

  useEffect(() => {
    getCategory()
    // Fetch initial products
    getProducts()
=======
const TableFilters = ({ setData, tableData }) => {
  // States
  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState('')

  useEffect(() => {
    getCategory()
>>>>>>> origin/master
  }, [])

  const getCategory = async () => {
    try {
      const response = await fetch('/api/categories')
<<<<<<< HEAD
      const jsonData = await response.json()

=======
      if (!response.ok) {
        throw new Error('Failed to fetch categories')
      }
      const jsonData = await response.json()
>>>>>>> origin/master
      setCategories(jsonData)
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

<<<<<<< HEAD
  const getProducts = async () => {
    try {
      const response = await fetch('/api/products')
      const jsonData = await response.json()

      // Set initial products and filteredProducts state to show all products
      setProducts(jsonData)
      setFilteredProducts(jsonData)
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }

  const handleCategoryChange = event => {
    const selectedCategory = event.target.value
    setCategory(selectedCategory)
    filterProducts(selectedCategory)
  }

=======
  useEffect(() => {
    const filteredData = tableData?.filter(item => {
      if (category && item.categoryId !== category) {
        return false
      } else {
        return true
      }
    })
    setData(filteredData)
  }, [category, tableData, setData])
>>>>>>> origin/master
  return (
    <CardContent>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={4}>
          <CustomTextField
            select
            fullWidth
            id='select-category'
            value={category}
<<<<<<< HEAD
            onChange={handleCategoryChange}
            SelectProps={{ displayEmpty: true }}
          >
            <MenuItem value=''>All Products</MenuItem>
            {categories.map(category => (
              <MenuItem key={category.id} value={category.name}>
                {category.name}
=======
            onChange={e => setCategory(e.target.value)}
            SelectProps={{ displayEmpty: true }}
          >
            <MenuItem value=''>All Products</MenuItem>
            {categories.map(cat => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.name}
>>>>>>> origin/master
              </MenuItem>
            ))}
          </CustomTextField>
        </Grid>
      </Grid>
    </CardContent>
  )
}

export default TableFilters
