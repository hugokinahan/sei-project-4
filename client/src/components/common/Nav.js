import React from 'react'
import { Link, useLocation, useHistory } from 'react-router-dom'
import { Menu, Button, Icon } from 'semantic-ui-react'

import { logout, isAuthenticated, getUserId } from '../../lib/auth'

function Nav() {

  const isLoggedIn = isAuthenticated()
  const history = useHistory()
  useLocation()

  const handleLogout = () => {
    logout()
    history.push('/')
  }

  return (
    <div className="ui menu fixed">
      <Link to="/" className="navbar-item">
        <Icon name="home" style={{ backgroundColor: '#012349', borderRadius: 0, color: 'white' }}/>
      </Link>
      <Link to="/properties" className="navbar-item">
        <Menu.Item
          className="home"
          name='EXPLORE'
        />
      </Link>
      {isLoggedIn &&
      <Link to="/properties/new" className="navbar-item">
        <Menu.Item
          className="home"
          name='ADD PROPERTY'
        />
      </Link>
      }
      <Menu.Item className="logo">
        <Link to="/">
          <h1 className="logo-header">Sharebnb</h1>
        </Link>
      </Menu.Item>
      <>
        <Menu.Item>
          {!isLoggedIn ?
            <>
              <div className="homepage-buttons">
                <Button as={Link} to={'/register/'} className="sign-up-button" type='submit' style={{ backgroundColor: 'white', borderRadius: 0, color: '#012349', border: '1px solid #012349', width: 100 }}>Sign Up</Button>
              </div>
              <div className="login-button">
                <Button as={Link} to={'/login/'} className="login-button" type='submit' style={{ backgroundColor: 'white', borderRadius: 0, color: '#012349', border: '1px solid #012349', width: 100 }}>Login</Button>
              </div>
            </>
            :
            <>
              <Button as="" onClick={handleLogout} className="login-button" type='submit' style={{ backgroundColor: 'white', borderRadius: 0, color: '#012349', border: '1px solid #012349', width: 100 }}>
          Log Out
              </Button>
              <Link to={`/profile/${getUserId()}`}>
                <Button type="submit" className="login-button" style={{ backgroundColor: 'white', borderRadius: 0, color: '#012349', border: '1px solid #012349', width: 100 }}>
          Profile
                </Button>
              </Link>
              
            </>
          }
        </Menu.Item>
      </>
    </div>
  )
}

export default Nav