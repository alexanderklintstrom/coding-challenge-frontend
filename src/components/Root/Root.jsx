import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import App from '../App'
import Incident from '../Incident'

const Root = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <App />
          </Route>
          <Route path="/incident/:id">
            <Incident />
          </Route>
        </Switch>
      </Router>
    </>
  )
}

export default Root
