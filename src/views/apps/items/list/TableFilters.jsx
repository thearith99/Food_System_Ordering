import { useState, useEffect } from 'react'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
import CustomTextField from '@core/components/mui/TextField'

const TableFilters = ({ setData, tableData }) => {
  // States
  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState('')

  useEffect(() => {
    getCategory()
  }, [])

  const getCategory = async () => {
    try {
      const response = await fetch('/api/categories')
      if (!response.ok) {
        throw new Error('Failed to fetch categories')
      }
      const jsonData = await response.json()
      setCategories(jsonData)
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

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
  return (
    <CardContent>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={4}>
          <CustomTextField
            select
            fullWidth
            id='select-category'
            value={category}
            onChange={e => setCategory(e.target.value)}
            SelectProps={{ displayEmpty: true }}
          >
            <MenuItem value=''>All Products</MenuItem>
            {categories.map(cat => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.name}
              </MenuItem>
            ))}
          </CustomTextField>
        </Grid>
      </Grid>
    </CardContent>
  )
}

export default TableFilters
