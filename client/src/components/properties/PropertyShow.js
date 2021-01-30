import React from 'react'
import { getSingleProperty, getAllProperties } from '../../lib/api'
import { useParams, Link, useLocation } from 'react-router-dom'
import { Button, Icon, Menu, Search, Checkbox, Form } from 'semantic-ui-react'
import ReactMapGL, { Marker } from 'react-map-gl'
import Popup from 'reactjs-popup'
import useForm from '../../utils/useForm'
import { isAuthenticated } from '../../lib/auth'


function PropertyShow() {

  const isLoggedIn = isAuthenticated()
  // const history = useHistory()
  useLocation()

  const [property, setProperty] = React.useState([])
  console.log(property)

  const [popup, setPopup] = React.useState(null)
  console.log(popup)

  const [viewport, setViewport] = React.useState({
    latitude: 51.501476,
    longitude: -0.140634,
    zoom: 15
  })

  // const history = useHistory()
  const { id } = useParams()

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

  const { formdata, errors, handleChange, setErrors } = useForm({
    startDate: '',
    firstName: '',
    lastName: '',
    email: '',
    bioDescription: '',
    endDate: '',
    passwordConfirmation: '',
    profileImage: ''
  })

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('Request made')
  }

  console.log(errors)
  console.log(setErrors)

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
                <Button className="edit-button" style={{ backgroundColor: '#012349', borderRadius: 0, color: 'white' }}>
                  <Icon name="edit" />
                </Button>
                <Button className="delete-button" style={{ backgroundColor: '#012349', borderRadius: 0, color: 'white' }}>
                  <Icon name="trash alternate"/>
                </Button>
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
          <Popup
            trigger={<Button className="request-button" type="submit" style={{ backgroundColor: '#012349', borderRadius: 0, color: 'white' }}>
        Request A Swap <Icon name="exchange" className="exchange-icon"/>
            </Button>}
            modal
            nested
          >
            {close => (
              <div className="modal">
                <button className="close" onClick={close}>
          &times;
                </button>
                <div className="header"> 
                  {property.owner ?  
                    <div>
                      <p>Request a swap with {property.owner.first_name} </p>
                      <p>{property.address}</p>
                      <p>{property.city}, {property.country}</p>
                    </div>
                    : '' }
                </div>
                <div className="content">
                  <Form inverted onSubmit={handleSubmit} className="small form">
                    <Form.Group widths='equal'>
                      <Form.Field>
                        <label fluid>First Name *</label>
                        <input placeholder='eg. John'
                          onChange={handleChange}
                          name="firstName"
                          value={formdata.firstName}
                        />
                      </Form.Field>
                      <Form.Field>
                        <label>Last Name *</label>
                        <input placeholder='eg. Smith'
                          onChange={handleChange}
                          name="lastName"
                          value={formdata.lastName}
                        />
                      </Form.Field>
                    </Form.Group>
                    <Form.Group widths='equal'>
                      <Form.Field>
                        <label>Email *</label>
                        <input placeholder='eg. john.smith@gmail.com'
                          onChange={handleChange}
                          name="email"
                          value={formdata.email}
                        />
                      </Form.Field>
                      <Form.Field>
                        <label>Property To Exchange *</label>
                        <select placeholder='eg. Belmont Estate' 
                          onChange={handleChange}
                          name="offeredProperty"
                          value={formdata.offeredProperty}
                        >
                          {properties ? properties.map((property) => (
                            <option key={property.id} value={property.name}>{property.name}</option>
                          ))
                            :
                            ''  }
                        </select>
                      </Form.Field>
                    </Form.Group>
                    <Form.Group widths='equal'>
                      <Form.Field>
                        <label>Start Date *</label>
                        <input placeholder='eg. 26/05/21' 
                          type='date'
                          onChange={handleChange}
                          name="startDate"
                          value={formdata.startDate}
                        />
                      </Form.Field>
                      <Form.Field>
                        <label>End Date *</label>
                        <input placeholder='eg. 06/06/21'
                          type='date'
                          onChange={handleChange}
                          name="endDate"
                          value={formdata.endDate}
                        />
                      </Form.Field>
                    </Form.Group>
                    <Form.Field>
                      <label>Tell Us About You *</label>
                      <textarea placeholder='eg. I live in L.A and love travelling around the world.'
                        onChange={handleChange}
                        name="bioDescription"
                        value={formdata.bioDescription}
                      />
                    </Form.Field>
                    <Form.Field>
                      <Checkbox label='I agree to the Terms and Conditions *' />
                    </Form.Field>
                    <Button className="popup-auth-request" type='submit' style={{ backgroundColor: 'white', borderRadius: 0, color: '#012349', border: 'none' }}>Request Property Exchange</Button>
                  </Form>
                </div>
                {/* <div className="actions">
              <Popup
                trigger={<button className="button"> Trigger </button>}
                position="top center"
                nested
              >
                <span>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae
              magni omnis delectus nemo, maxime molestiae dolorem numquam
              mollitia, voluptate ea, accusamus excepturi deleniti ratione
              sapiente! Laudantium, aperiam doloribus. Odit, aut.
                </span>
              </Popup>
              <button
                className="button"
                onClick={() => {
                  console.log('modal closed ')
                  close()
                }}
              >
            close modal
              </button>
            </div> */}
              </div>
            )}
          </Popup>
        </div>
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
        <div className="map-container">
          {viewport ? 
            <ReactMapGL
              className="mapbox"
              mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
              height="250px"
              width="250px"
              mapStyle='mapbox://styles/mapbox/streets-v11'
              {...viewport}
              latitude={property.latitude ? Number(property.latitude) : 51.533451}
              longitude={property.longitude ? Number(property.longitude) : -51.533451}
              zoom={4}
              // onClick={() => setPopup(null)}
              onViewportChange={viewport => setViewport(viewport)}
            >
              {property ?
                <Marker
                  className='map-markers'
                  key={property.id}
                  latitude={property.latitude ? Number(property.latitude) : 51.533451}
                  longitude={property.longitude ? Number(property.longitude) : -51.533451}
                >
                  <span
                    role="img"
                    aria-label="map-marker"
                    onClick={() => setPopup(property.owner.first_name)}
                  >
                    {/* <img src={property.owner ? property.owner.profile_image : '' }/> */}
                    <Icon className="icon" name="map marker alternate" />
                  </span>
                </Marker>
                :
                ''
              }
              {/* {popup &&
          // <Popup
          //   closeOnClick={true}
          //   latitude={popup.latitude}
          //   longitude={popup.longitude}
          //   closeButton={false}
          // >
            <h4>{popup.name}, {popup.city}</h4>
            <h4>Events:</h4>
            <div>{events.map(event => {
              if (event.venue.name === popup.name) {
                return <p>
                  <Link to={`/events/${event._id}`}>{event.name}</Link>
                </p>
              }
            })}
            </div>
          </Popup>
            } */}
            </ReactMapGL>
            : 
          // <div className="ring-loader">
          //   <RingLoader color="purple" size={60} />
          // </div>
            ''
          }
        </div>
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