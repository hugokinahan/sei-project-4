import React from 'react'
import { getSingleProperty, getAllProperties, deleteProperty } from '../../lib/api'
import { useParams, Link, useLocation, useHistory } from 'react-router-dom'
import { Button, Icon, Comment, Form } from 'semantic-ui-react'
import Popup from 'reactjs-popup'

// import Popup from 'reactjs-popup'
// import useForm from '../../utils/useForm'
import { isAuthenticated, isOwner } from '../../lib/auth'

import PropertyShowMap from './PropertyShowMap'
import PropertyShowPopup from './PropertyShowPopup'
import PropertyNavBar from './PropertyNavBar'


function PropertyShow() {

  const isLoggedIn = isAuthenticated()
  const history = useHistory()
  useLocation()

  const [property, setProperty] = React.useState([])
  console.log(property)

  const { id } = useParams()

  

  // const history = useHistory()
  // const { id } = useParams()

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

  const handleDelete = async event => {
    event.preventDefault()
    try {
      await deleteProperty(id)
      history.pushState('/properties')
    } catch (err) {
      console.log(err)
    }
  }


  // const [filteredProperties, setFilteredProperties] = React.useState([])



  const handleShowSearch = () => {
    history.push('/properties/')
  }



  return (
    <section className="show-page">
      <PropertyNavBar handleSearch={handleShowSearch} className="navbar"/>
      <div>
        <div className="homepage-top-layer">
          <img src={property.property_image} />
          <>
            {isLoggedIn ?
              <>
                <div className="icon-buttons">
                  <Button className="favorite-button" style={{ backgroundColor: '#012349', borderRadius: 100, color: 'white' }} onClick={{ color: 'gold' }}>
                    <Icon name="favorite"/>
                  </Button>
                  <>
                    {isOwner(property.owner ? property.owner.id : '') &&
                <>
                  <Button as={Link} to={`/properties/${id}/edit`} className="edit-button" style={{ backgroundColor: '#012349', borderRadius: 0, color: 'white' }}>
                    <Icon name="edit" />
                  </Button>
                  {/* <Button onClick={handleDelete} className="delete-button" style={{ backgroundColor: '#012349', borderRadius: 0, color: 'white' }}>
                    <Icon name="trash alternate"/>
                  </Button> */}
                  <Popup
                    trigger={<Button onClick={handleDelete} className="delete-button" style={{ backgroundColor: '#012349', borderRadius: 0, color: 'white' }}>
                      <Icon name="trash alternate"/>
                    </Button>}
                    modal
                    nested
                  >
                    {close => (
                      <div className="delete-modal">
                        <button className="close" onClick={close}>
&times;
                        </button>
                        <div className="header"> 
                          <h3>Are you sure you want to delete this property?</h3>
                        </div>
                        <div className="delete-popup-buttons">
                          <Button onClick={handleDelete} >Yes</Button>
                          <Button as={Link} to={'/properties/'}>No</Button>
                        </div>
                      </div>
                    )}
                  </Popup>
                </>
                    }
                  </>
                </div>
              
              </>
              :
              ''
            }
          </>
        </div>
        <div className="show-details">
          <h2>{property.name}</h2>
          <p>{property.address}</p>
          <p>{property.city}, {property.country}</p>
          {/* <h6>{property.types.name[0]}</h6> */}
          <p>{property.description}</p>
          <Icon name="bath" className="index-icon"></Icon>
          <p>{property.bathrooms} bathrooms </p>
          <Icon name="bed" className="index-icon"></Icon>
          <p>{property.bedrooms} bedrooms </p>
        </div>
        <>
          {isLoggedIn ?
            <>
              <PropertyShowPopup property={property} id={id} />
              <Popup
                trigger={<Button as={Link} className="review-button" type="submit" style={{ backgroundColor: '#012349', borderRadius: 0, color: 'white' }}>
                Leave a Review <Icon name="review" className="review-icon"/>
                </Button>}
                modal
                nested
              >
                {close => (
                  <div className="review-modal">
                    <button className="close" onClick={close}>
&times;
                    </button>
                    <div className="delete-popup-buttons">
                      <Form.Field>
                        <label>Leave A Review</label>
                        <textarea placeholder='eg. I loved this property!'
                          // onChange={handleChange}
                          name="text"
                          // value={formdata.text}
                        />
                        <Button className="submit-review" type="submit" style={{ backgroundColor: 'white', borderRadius: 0, color: '#012349' }}>Submit Review</Button>
                      </Form.Field>
                    </div>
                  </div>
                )}
              </Popup>
            </>
            :
            <div>
              <Button as={Link} to='' className="request-button" type="submit" style={{ backgroundColor: '#012349', borderRadius: 0, color: 'white' }}>
        Request A Swap <Icon name="exchange" className="exchange-icon"/>
              </Button>
            </div>
          }
        </>
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
                    <img src={property.owner ? property.owner.profile_image : '' } />
                  </div>
                  <div className="contact-button">
                    <Button as={Link} to={isLoggedIn ? `/users/profile/${property.owner.id}` : '/login'}className="request-button"  style={{ backgroundColor: '#012349', borderRadius: 0, color: 'white' }}>
                      {property.owner ? `View ${property.owner.first_name}s profile` : '' }
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
      <div className="reviews-container">
        <h2>Reviews</h2>
        <div className="reviews-info">
          <Comment.Group>
            <Comment>
              {/* <Comment.Avatar as='a' src={property ? property.owner.profile_image : '' } /> */}
              <Comment.Content>
                <Comment.Author>{property.owner ? property.owner.first_name : '' } {property.owner ? property.owner.last_name : '' }</Comment.Author>
                <Comment.Metadata>
                  <div>2 days ago</div>
                  <div>
                    <Icon name='star' />5 Faves
                  </div>
                </Comment.Metadata>
                <Comment.Text>
          Hey guys, I hope this example comment is helping you read this
          documentation.
                </Comment.Text>
              </Comment.Content>
            </Comment>
          </Comment.Group>
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