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
        {/* <Menu.Item
          className="home"
          name='Home'
        /> */}
        <Icon name="home" style={{ backgroundColor: '#012349', borderRadius: 0, color: 'white' }}/>
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
      <>
        <Menu.Item>
          {!isLoggedIn ?
            <>
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
            </>
            :
            <>
              <Button as="" onClick={handleLogout}>
          Log Out
              </Button>
              <Link to={`/profile/${getUserId()}`}>
                <Button type="submit">
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