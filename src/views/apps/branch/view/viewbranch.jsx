'use client'

// React Imports
import { useEffect, useState, useMemo } from 'react'

// Next Imports
import { useParams } from 'next/navigation'
import { getLocalizedUrl } from '@/utils/i18n'
import axios from 'axios'
import Link from 'next/link'
// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Checkbox from '@mui/material/Checkbox'
import { styled } from '@mui/material/styles'
import TablePagination from '@mui/material/TablePagination'
import MenuItem from '@mui/material/MenuItem'

// Third-party Imports
import classnames from 'classnames'
import { rankItem } from '@tanstack/match-sorter-utils'
import {
  createColumnHelper,
  flexRender,
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
import AddbranchProduct from './Addproductinbranch'
import UpdateBranchProduct from './UpdatebranchProduct'
import DeleteBranchProduct from './DeletebranchProduct'

// Style Imports
import tableStyles from '@core/styles/table.module.css'

// Styled Components
const Icon = styled('i')({})

const fuzzyFilter = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value)

  // Store the itemRank info
  addMeta({
    itemRank
  })

  // Return if the item should be filtered in/out
  return itemRank.passed
}

const DebouncedInput = ({ value: initialValue, onChange, debounce = 500, ...props }) => {
  // States
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])
  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return <CustomTextField {...props} value={value} onChange={e => setValue(e.target.value)} />
}

// Column Definitions
const columnHelper = createColumnHelper()

const ListCategory = () => {
  // States
  const { id } = useParams()
  const [AddbranchProductOpen, setAddbranchProductOpen] = useState(false)
  const [rowSelection, setRowSelection] = useState({})
  const [products, setProducts] = useState([])
  const [branchName, setBranchName] = useState('')
  const [data, setData] = useState([])
  const [globalFilter, setGlobalFilter] = useState('')
  const locale = useParams().lang

  useEffect(() => {
    const fetchBranchName = async () => {
      try {
        const response = await axios.get(`/api/branch/${id}`) // Adjust the URL as needed
        setBranchName(response.data.branch.name)
        console.log('Fetched branch name:', response.data.branch.name)
      } catch (error) {
        console.error('Error fetching branch name:', error)
      }
    }

    fetchBranchName()
  }, [id])
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/branchProduct') // Adjust the URL as needed
        console.log('Fetched products:', response.data)
        setProducts(response.data)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }
    fetchProducts()
  }, [])
  useEffect(() => {
    setData(products.filter(product => String(product.branchId) === String(id)))
  }, [products, id])
  const columns = useMemo(() => [
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
    columnHelper.accessor('image', {
      header: 'Image',
      cell: ({ row }) => (
        <img src={`http://localhost:3000/images/${row.original.image}.jpg`} alt='' width='50' height='50' />
      )
    }),
    columnHelper.accessor('product', {
      header: 'Product Name',
      cell: ({ row }) => (
        <div className='flex items-center gap-4'>
          <div className='flex flex-col'>
            <Typography color='text.primary' className='font-medium'>
              {row.original.product}
            </Typography>
          </div>
        </div>
      )
    }),
    columnHelper.accessor('price', {
      header: 'Price',
      cell: ({ row }) => (
        <div className='flex items-center gap-4'>
          <div className='flex flex-col'>
            <Typography color='text.primary' className='font-medium'>
              {row.original.price}
            </Typography>
          </div>
        </div>
      )
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      cell: ({ row }) => (
        <div className='flex items-center gap-4'>
          <div className='flex flex-col'>
            <Typography color='text.primary' className='font-medium'>
              {row.original.status}
            </Typography>
          </div>
        </div>
      )
    }),
    columnHelper.accessor('action', {
      header: 'Action',
      cell: ({ row }) => (
        <div className='flex items-center'>
          <DeleteBranchProduct branchProduct={row.original} />
          <UpdateBranchProduct branchProduct={row.original} />
        </div>
      ),
      enableSorting: false
    })
  ])

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
        <CardHeader title={`Branch: ${branchName}`} className='pbe-4' />
        <div className='flex justify-between flex-col items-start md:flex-row md:items-center p-6 border-bs gap-4'>
          <Button
            variant='contained'
            startIcon={<i className='tabler-arrow' />}
            href={getLocalizedUrl(`apps/branching`, locale)}
            className='is-full sm:is-auto'
          >
            Back
          </Button>
          <Link href={getLocalizedUrl(`apps/branching/discount/${id}`, locale)} passHref>
            <Button variant='contained' startIcon={<i className='tabler-plus' />} className='is-full sm:is-auto'>
              View Discount{' '}
            </Button>
          </Link>
          <Link href={getLocalizedUrl(`apps/branching/productdiscount/${id}`, locale)} passHref>
            <Button variant='contained' startIcon={<i className='tabler-plus' />} className='is-full sm:is-auto'>
              View Product Discount{' '}
            </Button>
          </Link>
        </div>
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
              variant='contained'
              startIcon={<i className='tabler-plus' />}
              onClick={() => setAddbranchProductOpen(!AddbranchProductOpen)}
              className='is-full sm:is-auto'
            >
              Add New Branch Product
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
      <AddbranchProduct
        open={AddbranchProductOpen}
        handleClose={() => setAddbranchProductOpen(!AddbranchProductOpen)}
        BranchId={id}
      />
    </>
  )
}

export default ListCategory
