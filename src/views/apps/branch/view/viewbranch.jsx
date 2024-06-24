'use client'
import React, { useState, useEffect } from 'react'
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material'
import axios from 'axios'
import { useParams } from 'next/navigation'
import { getLocalizedUrl } from '@/utils/i18n'
import AddbranchProduct from '../AddbranchProduct'
import AddDiscount from './AddDiscount'
import UpdateBranchProduct from './UpdatebranchProduct'
import DeleteBranchProduct from './DeletebranchProduct'
const ViewBranch = () => {
  const { id } = useParams()
  const [products, setProducts] = useState([])
  const [branchName, setBranchName] = useState('')
  const params = useParams()
  const [AddbranchProductOpen, setAddbranchProductOpen] = useState(false)
  const [AddDiscountOpen, setAddDiscountOpen] = useState(false)

  const locale = params.lang

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
  const ProductTable = ({ id, products }) => {
    const filteredProducts = products.filter(product => {
      // Convert both id and branchId to strings for comparison
      const productId = String(product.branchId)
      const branchId = String(id)
      return productId === branchId
    })

    return (
      <TableContainer component={Paper} style={{ maxHeight: '600px', overflowY: 'auto' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Product ID</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell>Product Image</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <TableRow key={product.id}>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>{product.product.name}</TableCell>
                  <TableCell>
                    <img
                      src={`http://localhost:3000/images/${product.product.image}.jpg`}
                      alt={product.product.name}
                      width='50'
                      height='50'
                    />
                  </TableCell>
                  <TableCell>
                    {' '}
                    <DeleteBranchProduct branchProduct={product} />
                    <UpdateBranchProduct branch={product} />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} align='center'>
                  No items
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <div className='flex justify-between flex-col items-start md:flex-row md:items-center p-6 border-bs gap-4'>
          <Button
            variant='contained'
            startIcon={<i className='tabler-arrow' />}
            href={getLocalizedUrl(`apps/branching`, locale)}
            className='is-full sm:is-auto'
          >
            Back
          </Button>
          <Button
            variant='contained'
            startIcon={<i className='tabler-plus' />}
            onClick={() => setAddbranchProductOpen(!AddbranchProductOpen)}
            className='is-full sm:is-auto'
          >
            Add New Branch Product
          </Button>
          <Button
            variant='contained'
            startIcon={<i className='tabler-plus' />}
            onClick={() => setAddDiscountOpen(!AddDiscountOpen)}
            className='is-full sm:is-auto'
          >
            Add New Discount
          </Button>
        </div>
      </Grid>
      <Grid item xs={12}>
        <h2>Branch: {branchName}</h2>
        <ProductTable id={id} products={products} />
      </Grid>
      <AddbranchProduct
        open={AddbranchProductOpen}
        handleClose={() => setAddbranchProductOpen(!AddbranchProductOpen)}
      />
      <AddDiscount open={AddDiscountOpen} handleClose={() => setAddDiscountOpen(!AddDiscountOpen)} />
    </Grid>
  )
}

export default ViewBranch
