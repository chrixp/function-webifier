import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";
import GeneratedWebsite from './generated'
import AlgoWebifier from './algo-webifier'

export default () => {
    return (
        <Router>
           <Switch>
               <Route exact path="/" component={AlgoWebifier} />
               <Route exact path="/:id" component={GeneratedWebsite} />
           </Switch>
        </Router>
    )
}