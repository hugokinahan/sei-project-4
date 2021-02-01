import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Nav from './components/common/Nav'
import Home2 from './components/common/Home'

import PropertyIndex from './components/properties/PropertyIndex'
import PropertyIndexMap from './components/properties/PropertyIndexMap'
import PropertyShow from './components/properties/PropertyShow'
import PropertyNew from './components/properties/PropertyNew'
import PropertyEdit from './components/properties/PropertyEdit'

import Register from './components/auth/Register'
import Login from './components/auth/Login'

import Profile from './components/users/Profile'
import OtherUserProfile from './components/users/OtherUserProfile'
import PropertyRegister from './components/properties/PropertyRegister'

function App() {

  return (
    <BrowserRouter>
      <Nav />
      <Switch>
        <Route exact path="/" component={Home2} />
        <Route path="/properties/new" component={PropertyNew} />
        <Route path="/properties/:id/edit" component={PropertyEdit} />
        <Route path="/properties/map" component={PropertyIndexMap} />
        <Route path="/properties/:id" component={PropertyShow} />
        <Route path="/properties" component={PropertyIndex} />
        <Route path="/register/property" component={PropertyRegister} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/profile/:id" component={Profile} />
        <Route path="/users/profile/:id" component={OtherUserProfile} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
