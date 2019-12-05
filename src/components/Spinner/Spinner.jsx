import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'

const Spinner = () => (
  <Grid container alignItems="center">
    <CircularProgress />
    <Box component="span" m={1}>
      Loading
    </Box>
  </Grid>
)

export default Spinner
