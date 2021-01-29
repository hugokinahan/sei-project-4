import React from 'react'
import { Link } from 'react-router-dom'
import { Menu, Button } from 'semantic-ui-react'

function Nav() {

  return (
    <div className="ui menu fixed">
      <Link to="/" className="navbar-item">
        <Menu.Item
          className="home"
          name='Home'
        />
      </Link>
      <Link to="/properties" className="navbar-item">
        <Menu.Item
          className="home"
          name='Explore'
        />
      </Link>

      <Menu.Item className="logo">
        <Link to="/">
          <h1 className="logo-header">Sharebnb</h1>
        </Link>
      </Menu.Item>
      

      <Menu.Item>
        <Link to="/register">
          <Button type="submit">
            Register
          </Button>
        </Link>
        <Link to="/login">
          <Button type="submit">
            Log In
          </Button>
        </Link>
      </Menu.Item>
    </div>
  )
}

export default Nav