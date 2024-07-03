// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import LocationListTable from './LocationListTable'

const Index = ({ userData }) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <LocationListTable tableData={userData} />
      </Grid>
    </Grid>
  )
}

export default Index;
