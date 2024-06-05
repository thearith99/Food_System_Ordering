import { useState, useEffect } from 'react'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
import CustomTextField from '@core/components/mui/TextField'

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
  }, [])

  const getCategory = async () => {
    try {
      const response = await fetch('/api/categories')
      const jsonData = await response.json()

      setCategories(jsonData)
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

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

  return (
    <CardContent>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={4}>
          <CustomTextField
            select
            fullWidth
            id='select-category'
            value={category}
            onChange={handleCategoryChange}
            SelectProps={{ displayEmpty: true }}
          >
            <MenuItem value=''>All Products</MenuItem>
            {categories.map(category => (
              <MenuItem key={category.id} value={category.name}>
                {category.name}
              </MenuItem>
            ))}
          </CustomTextField>
        </Grid>
      </Grid>
    </CardContent>
  )
}

export default TableFilters
