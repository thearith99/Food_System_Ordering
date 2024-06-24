// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import OrderingListTable from './OrderingListTable'

const UserList = ({ userData }) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <OrderingListTable tableData={userData} />
      </Grid>
    </Grid>
  )
}

export default UserList
