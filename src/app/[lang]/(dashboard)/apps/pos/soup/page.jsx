'use client'

// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import SoupList from '@/views/apps/pos/Soup.jsx'

const PosListApp = () => {
  return (
    <>
      <div className=''>
        <div className='display-block'>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={4} lg={2}>
              <SoupList />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={2}>
              <SoupList />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={2}>
              <SoupList />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={2}>
              <SoupList />
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  )
}

export default PosListApp
