'use client'

// React Imports
<<<<<<< HEAD
import { useState, useMemo, useEffect } from 'react'

// Next Imports
import Link from 'next/link'
=======
import { useEffect, useState, useMemo } from 'react'

// Next Imports
>>>>>>> origin/master
import { useParams } from 'next/navigation'

// MUI Imports
import Card from '@mui/material/Card'
<<<<<<< HEAD
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
=======
import CardHeader from '@mui/material/CardHeader'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Checkbox from '@mui/material/Checkbox'
import CircularProgress from '@mui/material/CircularProgress'
import { styled } from '@mui/material/styles'
import TablePagination from '@mui/material/TablePagination'
import MenuItem from '@mui/material/MenuItem'

// Third-party Imports
import classnames from 'classnames'
import { rankItem } from '@tanstack/match-sorter-utils'
import {
  createColumnHelper,
  flexRender,
>>>>>>> origin/master
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
<<<<<<< HEAD

import Updateproduct from './Updateproduct'
import DeleteProduct from './Deleteproduct'

// Util Imports
=======
import Updateproduct from './Updateproduct'
import Deleteproduct from './Deleteproduct'

>>>>>>> origin/master
// Style Imports
import tableStyles from '@core/styles/table.module.css'

// Styled Components
const Icon = styled('i')({})

const fuzzyFilter = (row, columnId, value, addMeta) => {
<<<<<<< HEAD
  const itemRank = rankItem(row.getValue(columnId), value)
  addMeta({ itemRank })
=======
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value)

  // Store the itemRank info
  addMeta({
    itemRank
  })

  // Return if the item should be filtered in/out
>>>>>>> origin/master
  return itemRank.passed
}

const DebouncedInput = ({ value: initialValue, onChange, debounce = 500, ...props }) => {
<<<<<<< HEAD
=======
  // States
>>>>>>> origin/master
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])
  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
<<<<<<< HEAD
=======
    // eslint-disable-next-line react-hooks/exhaustive-deps
>>>>>>> origin/master
  }, [value])

  return <CustomTextField {...props} value={value} onChange={e => setValue(e.target.value)} />
}

<<<<<<< HEAD
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
=======
// Column Definitions
const columnHelper = createColumnHelper()

const ListCategory = ({ tableData }) => {
  // States
  const [AddFoodOpen, setAddFoodOpen] = useState(false)
  const [rowSelection, setRowSelection] = useState({})
  const [data, setData] = useState(tableData)
  const [globalFilter, setGlobalFilter] = useState('')
  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState([])

  useEffect(() => {
    getCategories()
  }, [])

  const getCategories = async () => {
    try {
      const response = await fetch('/api/categories')
      if (!response.ok) {
        throw new Error('Failed to fetch categories')
      }
      const jsonData = await response.json()
      setCategories(jsonData)
      setLoading(false) // Set loading to false after fetching categories
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const getCategoryName = categoryId => {
    const category = categories.find(cat => cat.id === categoryId)
    return category ? category.name : 'Unknown'
  }

  const { lang: locale } = useParams()

  const columns = useMemo(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler()
            }}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            {...{
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler()
            }}
          />
        )
      },
      columnHelper.accessor('name', {
        header: 'Product Name',
        cell: ({ row }) =>
          loading ? (
            <CircularProgress size={24} />
          ) : (
            <div className='flex items-center gap-4'>
              <div className='flex flex-col'>
                <Typography color='text.primary' className='font-medium'>
                  {row.original.name}
                </Typography>
              </div>
            </div>
          )
      }),
      columnHelper.accessor('categoryId', {
        header: 'Category Name',
        cell: ({ row }) =>
          loading ? (
            <CircularProgress size={24} />
          ) : (
            <div className='flex items-center gap-4'>
              <div className='flex flex-col'>
                <Typography color='text.primary' className='font-medium'>
                  {getCategoryName(row.original.categoryId)}
                </Typography>
              </div>
            </div>
          )
      }),
      columnHelper.accessor('price', {
        header: 'Price',
        cell: ({ row }) =>
          loading ? (
            <CircularProgress size={24} />
          ) : (
            <div className='flex items-center gap-4'>
              <div className='flex flex-col'>
                <Typography color='text.primary' className='font-medium'>
                  {row.original.price}
                </Typography>
              </div>
            </div>
          )
      }),
      columnHelper.accessor('image', {
        header: 'Image',
        cell: ({ row }) =>
          loading ? (
            <CircularProgress size={24} />
          ) : (
            <img src={`http://localhost:3000/images/${row.original.image}.jpg`} alt='' width='50' height='50' />
          )
      }),
      columnHelper.accessor('action', {
        header: 'Action',
        cell: ({ row }) =>
          loading ? (
            <CircularProgress size={24} />
          ) : (
            <div className='flex items-center'>
              <Deleteproduct product={row.original.id} />
              <Updateproduct product={row.original} />
            </div>
          ),
        enableSorting: false
      })
    ],
    [categories, loading]
  )

  const table = useReactTable({
    data: data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter
    },
    state: {
      rowSelection,
      globalFilter
    },
    initialState: {
      pagination: {
        pageSize: 10
      }
    },
    enableRowSelection: true, // enable row selection for all rows
    // enableRowSelection: row => row.original.age > 18, // or enable row selection conditionally per row
    globalFilterFn: fuzzyFilter,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    onGlobalFilterChange: setGlobalFilter,
>>>>>>> origin/master
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
<<<<<<< HEAD
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
=======
        <CardHeader title='List Food' className='pbe-4' />
        <TableFilters setData={setData} tableData={tableData} />{' '}
        <div className='flex justify-between flex-col items-start md:flex-row md:items-center p-6 border-bs gap-4'>
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
          <div className='flex flex-col sm:flex-row is-full sm:is-auto items-start sm:items-center gap-4'>
            <DebouncedInput
              value={globalFilter ?? ''}
              onChange={value => setGlobalFilter(String(value))}
              placeholder='Search Product'
              className='is-full sm:is-auto'
            />
            <Button
              color='secondary'
              variant='tonal'
              startIcon={<i className='tabler-upload' />}
              className='is-full sm:is-auto'
            >
              Export
            </Button>
            <Button
              variant='contained'
              startIcon={<i className='tabler-plus' />}
              onClick={() => setAddFoodOpen(!AddFoodOpen)}
              className='is-full sm:is-auto'
            >
              Add New Product
            </Button>
          </div>
        </div>
        <div className='overflow-x-auto'>
          <table className={tableStyles.table}>
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th key={header.id}>
                      {header.isPlaceholder ? null : (
                        <>
                          <div
                            className={classnames({
                              'flex items-center': header.column.getIsSorted(),
                              'cursor-pointer select-none': header.column.getCanSort()
                            })}
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            {{
                              asc: <i className='tabler-chevron-up text-xl' />,
                              desc: <i className='tabler-chevron-down text-xl' />
                            }[header.column.getIsSorted()] ?? null}
                          </div>
                        </>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            {table.getFilteredRowModel().rows.length === 0 ? (
              <tbody>
                <tr>
                  <td colSpan={table.getVisibleFlatColumns().length} className='text-center'>
                    No data available
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                {table
                  .getRowModel()
                  .rows.slice(0, table.getState().pagination.pageSize)
                  .map(row => {
                    return (
                      <tr key={row.id} className={classnames({ selected: row.getIsSelected() })}>
                        {row.getVisibleCells().map(cell => (
                          <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                        ))}
                      </tr>
                    )
                  })}
              </tbody>
            )}
>>>>>>> origin/master
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
<<<<<<< HEAD
      <AddFoodDrawer open={addFoodOpen} handleClose={() => setAddFoodOpen(!addFoodOpen)} />
=======
      <AddFoodDrawer open={AddFoodOpen} handleClose={() => setAddFoodOpen(!AddFoodOpen)} />
>>>>>>> origin/master
    </>
  )
}

<<<<<<< HEAD
export default FoodTable
=======
export default ListCategory
>>>>>>> origin/master
