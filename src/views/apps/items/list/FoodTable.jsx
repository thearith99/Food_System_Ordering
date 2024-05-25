'use client'

// React Imports
import { useState, useMemo, useEffect } from 'react'

// Next Imports
import Link from 'next/link'
import { useParams } from 'next/navigation'

// MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import CardContent from '@mui/material/CardContent'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import TablePagination from '@mui/material/TablePagination'
import { styled } from '@mui/material/styles'

// Third-party Imports
import { rankItem } from '@tanstack/match-sorter-utils'
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  getSortedRowModel
} from '@tanstack/react-table'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'
import TablePaginationComponent from '@components/TablePaginationComponent'
import TableFilters from './TableFilters'
import AddFoodDrawer from './AddfoodDrawer'

import Updateproduct from './Updateproduct'
import DeleteProduct from './Deleteproduct'

// Util Imports
// Style Imports
import tableStyles from '@core/styles/table.module.css'

// Styled Components
const Icon = styled('i')({})

const fuzzyFilter = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value)
  addMeta({ itemRank })
  return itemRank.passed
}

const DebouncedInput = ({ value: initialValue, onChange, debounce = 500, ...props }) => {
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])
  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
  }, [value])

  return <CustomTextField {...props} value={value} onChange={e => setValue(e.target.value)} />
}

const columnHelper = createColumnHelper()

const FoodTable = ({ tableData }) => {
  const [addFoodOpen, setAddFoodOpen] = useState(false)
  const [rowSelection, setRowSelection] = useState({})
  const [products, setProducts] = useState(null)
  const [filteredProducts, setFilteredProducts] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  const { lang: locale } = useParams()

  useEffect(() => {
    getProduct()
  }, [])

  useEffect(() => {
    if (products) {
      filterProducts('')
    }
  }, [products, searchQuery])

  const getProduct = async () => {
    try {
      const response = await fetch('/api/products')
      const jsonData = await response.json()
      setProducts(jsonData)
      setFilteredProducts(jsonData)
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }

  const filterProducts = category => {
    let filtered = products
    if (category) {
      filtered = filtered.filter(product => product.category.name === category)
    }
    if (searchQuery) {
      filtered = filtered.filter(product => product.name.toLowerCase().includes(searchQuery.toLowerCase()))
    }
    setFilteredProducts(filtered)
  }

  const table = useReactTable({
    data: filteredProducts,
    filterFns: { fuzzy: fuzzyFilter },
    state: { rowSelection },
    initialState: { pagination: { pageSize: 10 } },
    enableRowSelection: true,
    globalFilterFn: fuzzyFilter,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues()
  })

  return (
    <>
      <Card>
        <TableFilters filterProducts={filterProducts} />
        <CardContent className='flex justify-between flex-col gap-4 items-start sm:flex-row sm:items-center'>
          <div className='flex items-center gap-2'>
            <Typography>Show</Typography>
            <CustomTextField
              select
              value={table.getState().pagination.pageSize}
              onChange={e => table.setPageSize(Number(e.target.value))}
              className='is-[70px]'
            >
              <MenuItem value='10'>10</MenuItem>
              <MenuItem value='25'>25</MenuItem>
              <MenuItem value='50'>50</MenuItem>
            </CustomTextField>
          </div>
          <div className='flex gap-4 flex-col !items-start is-full sm:flex-row sm:is-auto sm:items-center'>
            <DebouncedInput
              value={searchQuery}
              className='is-[250px]'
              onChange={value => setSearchQuery(value)}
              placeholder='Search Food'
            />
            <Button
              variant='contained'
              startIcon={<i className='tabler-plus' />}
              onClick={() => setAddFoodOpen(!addFoodOpen)}
              className='is-full sm:is-auto'
            >
              Add New food
            </Button>
          </div>
        </CardContent>
        <div className='overflow-x-auto'>
          <table className={tableStyles.table}>
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Product Name</th>
                <th>Category Name</th>
                <th>Image</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product, index) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.category.name}</td>
                  <td>
                    <img src={`http://localhost:3000/images/${product.image}.jpg`} alt='' width='50' height='50' />
                  </td>
                  <td>{product.price} $</td>
                  <td className='flex justify-start pt-4 space-x-1'>
                    <Updateproduct product={product} />
                    <DeleteProduct product={product} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <TablePagination
          component={() => <TablePaginationComponent table={table} />}
          count={table.getFilteredRowModel().rows.length}
          rowsPerPage={table.getState().pagination.pageSize}
          page={table.getState().pagination.pageIndex}
          onPageChange={(_, page) => {
            table.setPageIndex(page)
          }}
        />
      </Card>
      <AddFoodDrawer open={addFoodOpen} handleClose={() => setAddFoodOpen(!addFoodOpen)} />
    </>
  )
}

export default FoodTable
