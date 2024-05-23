// React Imports
import { useState, useEffect } from 'react'

// MUI Imports
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'

const TableFilters = ({ filterProducts }) => {
  // States
  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState('')

  useEffect(() => {
    getCategory()
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

  const handleCategoryChange = event => {
    const selectedCategory = event.target.value
    setCategory(selectedCategory)
    filterProducts(selectedCategory) // Call the filterProducts function with the selected category
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
            <MenuItem value=''>Select Category</MenuItem>
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
