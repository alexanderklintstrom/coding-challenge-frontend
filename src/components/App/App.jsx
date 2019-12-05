import React, { useState, useCallback } from 'react'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'
import Incidents from '../Incidents'

const App = () => {
  const [filter, setFilter] = useState('')
  const handleFilter = useCallback(
    event => {
      setFilter(event.target.value)
    },
    [filter],
  )

  return (
    <>
      <Box m={2}>
        <Typography variant="h5" component="h3">
          Lock it - Stolen bikes
        </Typography>
        <TextField
          id="outlined-basic"
          label="Filter"
          variant="outlined"
          onChange={handleFilter}
        />
      </Box>
      <Incidents filter={filter} />
    </>
  )
}

export default App
