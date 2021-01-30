import React from 'react'
import { getAllProperties } from '../../lib/api'
import { Icon, Menu, Search } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

function PropertyIndex() {

  const [properties, setProperties] = React.useState(null)

  React.useEffect(() => {
    const getProperties = async () => {
      try {
        const { data } = await getAllProperties()
        console.log(data)
        setProperties(data)

      } catch (err) {
        console.log(err)
      }
    }
    getProperties()
  }, [])

  console.log(properties)

  return (
    <>
      <div className="index-container">
        <div className="index-menu-banner">
          <div className="ui menu index-page">
            <Search/>
            <h1>Properties</h1>
            <Link to="/properties/map" className="navbar-item">
              <Menu.Item
                className="home"
                name='Map'
              />
            </Link>
            <Link to="/properties" className="navbar-item">
              <Menu.Item
                className="home"
                name='Index'
              />
            </Link>
          </div>
        </div>
        <>
          <h1>Featured</h1>
          <hr></hr>
          <h1>All Sharebnbs</h1>
          <hr></hr>
          <div className="index-grid">
            {properties ? properties.map(property => (
              <Link to={`/properties/${property.id}`} key={property.id} className="index-grid-div-container" >
                <div className="index-grid-div">
                  <img src={property.property_image} />
                  <div className="index-grid-house-info">
                    <div className="house-name-details">
                      <p>{property.name}</p>
                      <p>{property.city}, {property.country}</p>
                    </div>
                    <div className="house-details">
                      <div className="bathrooms">
                        <Icon name="bath" className="index-icon"></Icon>
                        <p>{property.bathrooms} bathrooms </p>
                      
                      </div>
                      <div className="bedrooms">
                        <Icon name="bed" className="index-icon"></Icon>
                        <p>{property.bedrooms} bedrooms </p>
                      
                      </div>
                    </div>
                  </div>
                  <div className="index-user-info">
                    <div className="index-owner-details">
                      <div className="user-profile-image">
                        <img src={property.owner.profile_image}></img>
                      </div>
                      <p>Added by {property.owner.first_name} {property.owner.last_name}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))
              :
              ''
            }
          </div>
        </>
      </div>
    </>
  )
}

export default PropertyIndex