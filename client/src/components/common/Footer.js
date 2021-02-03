import React from 'react'
import { Icon } from 'semantic-ui-react'
import { useLocation } from 'react-router-dom'

function Footer() {

  const location = useLocation()

  return (
    <>
      <div className={location.pathname === '/properties' ? 'mainpage-footer' : 'footer'}>
        <div>
          <p>&copy; Sharebnb. 2021</p>
        </div>
        <div className="footer-icons">
          <Icon name="instagram icon" className="footer-icon"></Icon>
          <Icon name="facebook icon" className="footer-icon"></Icon>
          <Icon name="twitter square icon" className="footer-icon"></Icon>
        </div>
      </div>

    </>
  )
}

export default Footer