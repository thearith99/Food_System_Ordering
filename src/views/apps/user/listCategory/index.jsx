// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import CategoryListTable from './CategoryListTable'


const UserList = ({ userData }) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <CategoryListTable tableData={userData} />
      </Grid>
    </Grid>
  )
}

export default UserList
