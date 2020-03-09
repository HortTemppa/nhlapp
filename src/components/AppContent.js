import React from 'react'
import {
    Route,
    Switch,
    Redirect, 
    useLocation
} from 'react-router-dom'

import {TransitionGroup, CSSTransition} from 'react-transition-group'

import Home from "./Home";
import SingleTeam from "./SingleTeam";

const AppContent = () => {
    let location = useLocation()

    console.log(location)

   return <TransitionGroup>
          <CSSTransition
          timeout = {300}
          classNames = {'fade'}
          key = {location.pathname}>
        <Switch location = {location}>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/teams/:id">
            <SingleTeam />
          </Route>
          <Redirect from="*" to="/" />
        </Switch>
        </CSSTransition>
        </TransitionGroup>
}

export default AppContent