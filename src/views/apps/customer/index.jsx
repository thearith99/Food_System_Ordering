// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import CustomerListTable from './CustomerListTable'
import CustomerListCards from './CustomerListCards'

const UserList = ({ userData }) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <CustomerListCards />
      </Grid>
      <Grid item xs={12}>
        <CustomerListTable tableData={userData} />
      </Grid>
    </Grid>
  )
}

export default UserList
