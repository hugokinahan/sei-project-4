import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Nav from './components/common/Nav'
import Home from './components/common/Home'

import PropertyIndex from './components/properties/PropertyIndex'
import PropertyIndexMap from './components/properties/PropertyIndexMap'
import PropertyShow from './components/properties/PropertyShow'
import PropertyNew from './components/properties/PropertyNew'
import PropertyEdit from './components/properties/PropertyEdit'

import Register from './components/auth/Register'
import Login from './components/auth/Login'

import Profile from './components/users/Profile'

function App() {

  return (
    <BrowserRouter>
      <Nav />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/properties/new" component={PropertyNew} />
        <Route path="/properties/:id/edit" component={PropertyEdit} />
        <Route path="/properties/:id" component={PropertyShow} />
        <Route path="/properties/map" component={PropertyIndexMap} />
        <Route path="/properties" component={PropertyIndex} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/profile" component={Profile} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
