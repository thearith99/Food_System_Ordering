// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import OrderingListTable from './OrderingListTable'
import OrderingListCards from './OrderingListCards'

const UserList = ({ userData }) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <OrderingListCards />
      </Grid>
      <Grid item xs={12}>
        <OrderingListTable tableData={userData} />
      </Grid>
    </Grid>
  )
}

export default UserList
