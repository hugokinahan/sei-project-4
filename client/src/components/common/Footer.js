import React from 'react'
import { Icon } from 'semantic-ui-react'

function Footer() {
  return (
    <div className="footer">
      <div>
        <p>&copy; Sharebnb. 2021</p>
      </div>
      <div>
        <Icon name="instagram icon" className="footer-icon"></Icon>
        <Icon name="facebook icon" className="footer-icon"></Icon>
        <Icon name="twitter square icon" className="footer-icon"></Icon>
        <Icon name="envelope" className="footer-icon"></Icon>
      </div>
    </div>
  )
}

export default Footer