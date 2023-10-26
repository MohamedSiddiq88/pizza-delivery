import React from 'react'
import Display from './Display'
import Count from './Count'
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min'

function Test() {
  return (
    <div>
      <Switch>
        <Route exact path="/display">
          <Display></Display>
        </Route>
        <Route exact path="/count">
          <Count></Count>
        </Route>
        </Switch>
    </div>
  )
}

export default Test
