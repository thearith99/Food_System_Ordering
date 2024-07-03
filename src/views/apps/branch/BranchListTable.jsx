'use client'
import React, { useState, useEffect } from 'react'
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton
} from '@mui/material'
import axios from 'axios'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { getLocalizedUrl } from '@/utils/i18n'
import UpdateBranch from './Updatebranch'
import DeleteBranch from './Deletebranch'

const handleBranchClick = (branchId, setSelectedBranch) => {
  setSelectedBranch(branchId)
}

const ProductTable = ({ branchId, products }) => {
  const filteredProducts = products.filter(product => product.branchId === branchId)

  return (
    <TableContainer component={Paper} style={{ maxHeight: '600px', overflowY: 'auto' }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Product ID</TableCell>
            <TableCell>Product Name</TableCell>
            <TableCell>Product Image</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.product}</TableCell>
                <TableCell>
                  <img
                    src={`http://localhost:3000/images/${product.image}.jpg`}
                    alt={product.product.name}
                    width='50'
                    height='50'
                  />
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

const BranchList = () => {
  const [branches, setBranches] = useState([])
  const [products, setProducts] = useState([])
  const [selectedBranch, setSelectedBranch] = useState(null)
  const params = useParams()
  const locale = params.lang

  useEffect(() => {
    // Fetch branches from API
    const fetchBranches = async () => {
      try {
        const response = await axios.get('/api/branch') // Adjust the URL as needed
        setBranches(response.data)
      } catch (error) {
        console.error('Error fetching branches:', error)
      }
    }

    // Fetch products from API
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/branchProduct') // Adjust the URL as needed
        setProducts(response.data)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }

    fetchBranches()
    fetchProducts()
  }, [])

  return (
    <Grid container direction='row' spacing={2}>
      <Grid item xs={6} style={{ backgroundColor: 'white', padding: '20px', maxHeight: '600px', overflowY: 'auto' }}>
        <h1>Branch List</h1>
        <div>
          {branches.map(branch => (
            <div
              className='branch'
              key={branch.id}
              onClick={() => handleBranchClick(branch.id, setSelectedBranch)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between', // Aligns items to the beginning and end of the container
                margin: '10px 0',
                padding: '10px',
                backgroundColor: selectedBranch === branch.id ? 'lightgray' : 'white',
                cursor: 'pointer',
                borderRadius: '5px',
                border: '1px solid black'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img
                  src={branch.imgSrc}
                  alt={branch.id}
                  style={{
                    backgroundColor: 'black',
                    width: '50px',
                    height: '50px',
                    marginRight: '10px'
                  }}
                />
              </div>
              <div className='flex items-center'>{branch.name}</div>
              <div className='flex items-center'>
                <DeleteBranch branch={branch} />
                <UpdateBranch branch={branch} />
                <IconButton onClick={e => e.stopPropagation()}>
                  <Link href={getLocalizedUrl(`apps/branching/view/${branch.id}`, locale)} passHref>
                    <i className='tabler-eye text-[22px] text-textSecondary' />
                  </Link>
                </IconButton>
              </div>
            </div>
          ))}
        </div>
      </Grid>
      <Grid item xs={6} style={{ overflowY: 'auto' }}>
        <ProductTable branchId={selectedBranch} products={products} />
      </Grid>
    </Grid>
  )
}

export default BranchList
