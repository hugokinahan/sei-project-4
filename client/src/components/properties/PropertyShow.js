import React from 'react'
import { getSingleProperty, getAllProperties } from '../../lib/api'
import { useParams, Link, useLocation } from 'react-router-dom'
import { Button, Icon, Menu, Search  } from 'semantic-ui-react'

// import Popup from 'reactjs-popup'
// import useForm from '../../utils/useForm'
import { isAuthenticated, isOwner } from '../../lib/auth'

import PropertyShowMap from './PropertyShowMap'
import PropertyShowPopup from './PropertyShowPopup'


function PropertyShow() {

  const isLoggedIn = isAuthenticated()
  // const history = useHistory()
  useLocation()

  const [property, setProperty] = React.useState([])
  console.log(property)

  

  // const history = useHistory()
  const { id } = useParams()

  const [properties, setProperties] = React.useState([])
  

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

  React.useEffect(() => {

    const getData = async () => {
      try {
        const { data } = await getSingleProperty(id)
        setProperty(data)
        // setViewport({ latitude: Number(data.latitude), longitude: Number(data.longitude), zoom: 7 })
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [id])

  console.log(property)




  return (
    <section className="show-page">
      <div className="index-menu-banner">
        <div className="ui menu index-page">
          <Search/>
          <Link to="/properties/map" className="navbar-item">
            <Menu.Item
              className="home"
              name='Map'
            />
          </Link>
          <Menu.Item
            className="home"
            name='Gallery'
          />
        </div>
      </div>
      <div>
        <img src={property.property_image} />
        <>
          {isLoggedIn ?
            <>
              <div className="icon-buttons">
                <Button className="favorite-button" style={{ backgroundColor: '#012349', borderRadius: 0, color: 'gold' }}>
                  <Icon name="favorite"/>
                </Button>
                <>
                  {isOwner(property.owner ? property.owner.id : '') &&
                <>
                  <Button className="edit-button" style={{ backgroundColor: '#012349', borderRadius: 0, color: 'white' }}>
                    <Icon name="edit" />
                  </Button>
                  <Button className="delete-button" style={{ backgroundColor: '#012349', borderRadius: 0, color: 'white' }}>
                    <Icon name="trash alternate"/>
                  </Button>
                </>
                  }
                </>
              </div>
            </>
            :
            ''
          }
        </>
        <div className="show-details">
          <h2>{property.name}</h2>
          <h4>{property.address}</h4>
          <h4>{property.city}, {property.country}</h4>
          {/* <h6>{property.types.name[0]}</h6> */}
          <p>{property.description}</p>
        </div>
        <PropertyShowPopup property={property} />
      </div>
      <div className="map-user-container">
        <div className="user-details">
          {property.owner ? 
            <div className="user-fields">
              <h2>{property.owner.first_name} {property.owner.last_name}</h2>
              <div className="user-info">
                <div className="user-deets">
                  <p>{property.owner.email}</p>
                  <p>{property.owner.bio_description}</p>
                </div>
                <div className="user-image-button">
                  <div className="user-image">
                    <img src={property.owner.profile_image} />
                  </div>
                  <div className="contact-button">
                    <Button className="request-button" type="submit" style={{ backgroundColor: '#012349', borderRadius: 0, color: 'white' }}>
                      {property.owner ? `Contact ${property.owner.first_name} ${property.owner.last_name}` : '' }
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            :
            ''
          }
        </div>
        <PropertyShowMap property={property}/>
      </div>
      <div className="featured-container">
        <div className="featured-header">
          <h2>Featured Properties</h2>
        </div>
        <div className="index-grid">
          {properties ? properties.slice(40, 43).map(property => (
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
      </div>
    </section>
  )
}

export default PropertyShow