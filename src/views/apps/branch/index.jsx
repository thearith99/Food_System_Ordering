'use client'

// MUI Imports
import Button from '@mui/material/Button'

import Grid from '@mui/material/Grid'
import { useEffect, useState, useMemo } from 'react'

// Component Importss
import BranchListTable from './BranchListTable'
import Addbranch from './Addbranch'
import AddbranchProduct from './AddbranchProduct'

const UserList = ({ userData }) => {
  const [AddbranchOpen, setAddbranchOpen] = useState(false)
  const [AddbranchProductOpen, setAddbranchProductOpen] = useState(false)

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <div className='flex justify-between flex-col items-start md:flex-row md:items-center p-6 border-bs gap-4'>
          <Button
            variant='contained'
            startIcon={<i className='tabler-plus' />}
            onClick={() => setAddbranchOpen(!AddbranchOpen)}
            className='is-full sm:is-auto'
          >
            Add New Branch
          </Button>
          <Button
            variant='contained'
            startIcon={<i className='tabler-plus' />}
            onClick={() => setAddbranchProductOpen(!AddbranchProductOpen)}
            className='is-full sm:is-auto'
          >
            Add New Branch Product
          </Button>
        </div>
      </Grid>
      <Grid item xs={12}>
        <BranchListTable tableData={userData} />
      </Grid>
      <Addbranch open={AddbranchOpen} handleClose={() => setAddbranchOpen(!AddbranchOpen)} />
      <AddbranchProduct
        open={AddbranchProductOpen}
        handleClose={() => setAddbranchProductOpen(!AddbranchProductOpen)}
      />
    </Grid>
  )
}

export default UserList
