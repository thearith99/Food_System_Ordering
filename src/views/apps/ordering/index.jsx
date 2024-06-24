// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import OrderingListTable from './OrderingListTable'
<<<<<<< HEAD
import OrderingListCards from './OrderingListCards'
=======
>>>>>>> origin/master

const UserList = ({ userData }) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
<<<<<<< HEAD
        <OrderingListCards />
      </Grid>
      <Grid item xs={12}>
=======
>>>>>>> origin/master
        <OrderingListTable tableData={userData} />
      </Grid>
    </Grid>
  )
}

export default UserList
