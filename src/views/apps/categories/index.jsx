// MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// Component Imports
import CategoryTable from './CategoryTable'

const Categories = ({ userData }) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} className='!pbs-12'>
        <Typography variant='h4' className='mbe-1'>
          Categories list
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <CategoryTable tableData={userData} />
      </Grid>
    </Grid>
  )
}

export default Categories
