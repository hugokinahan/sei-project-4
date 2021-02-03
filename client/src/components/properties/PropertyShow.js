import React from 'react'

import { useParams, Link, useLocation, useHistory } from 'react-router-dom'
import { Button, Icon,  Form, Comment } from 'semantic-ui-react'
import Popup from 'reactjs-popup'
import useForm from '../../utils/useForm'
import moment from 'moment'


import { getSingleProperty, getAllProperties, deleteProperty, favouriteAProperty, unFavouriteProperty, createPropertyReview, deletePropertyReview } from '../../lib/api'
import { isAuthenticated, isOwner, getUserId } from '../../lib/auth'


import PropertyShowMap from './PropertyShowMap'
import PropertyShowPopup from './PropertyShowPopup'
import PropertyNavBar from './PropertyNavBar'

function PropertyShow() {

  moment().format()
  const { id } = useParams()
  
  const isLoggedIn = isAuthenticated()
  const history = useHistory()
  useLocation()

  const [property, setProperty] = React.useState([])
  const [properties, setProperties] = React.useState([])
  
  const [isFavourite, setIsFavourite] = React.useState(false)
  const [isDeleted, setIsDeleted] = React.useState(false)

  const [reviews, setReviews] = React.useState(null)
  const [reviewPosted, setReviewPosted] = React.useState(false)
  const [newReview, setNewReview] = React.useState()
  const [reviewErrors, setReviewErrors] = React.useState(false)

  // Form Data
  const { formdata, handleChange, errors, setErrors } = useForm({
    text: '', 
    owner: {}, 
    property: ''
  })
  console.log(errors)

  // Use Effect Fetch Data

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
  }, [id])



  React.useEffect(() => {

    const getData = async () => {
      try {
        const { data } = await getSingleProperty(id)
        setProperty(data)
        console.log(data)
        const found = data.favorited_by.some(owner => owner.id === getUserId())
        console.log(found)
        if (found) {
          setIsFavourite(true)
        }

        if (data.reviews) {
          setReviews(data.reviews)
        }
        console.log(reviews)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [id, newReview])
 




  // Favourite A Property

  const handleFavouriteProperty = async event => {
    event.preventDefault()
    try {
      await favouriteAProperty(id)
      setIsFavourite(!isFavourite)
    } catch (err) {
      console.log(err)
    }
    //* Add to favourites
  }

  const handleUnFavourite = async event => {
    event.preventDefault()
    try {
      setIsFavourite(!isFavourite)
      await unFavouriteProperty(id)
    } catch (err) {
      console.log(err)
    }
    //* Remove from favourites
  }

  


  // Delete Property

  const handleDelete = async event => {
    event.preventDefault()
    try {
      setIsDeleted(true)
      await deleteProperty(id)
      history.push('/properties/')
    } catch (err) {
      console.log(err)
    }
  }





  const handleShowSearch = () => {
    history.push('/properties')
  }

 

  // * Submit Reviews
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const propertyId = e.target.name
      console.log(e.target.name)
      const reviewToAdd = { ...formdata, property: propertyId, owner: getUserId() }
      
      console.log(reviewToAdd)
      await createPropertyReview(reviewToAdd)
      setNewReview({ propertyId, formdata })
      setReviewPosted(true)
      formdata.text = ''
      formdata.rating = ''
    } catch (err) {
      setReviewErrors(true)
      setErrors(err.response.data.errors)
    }
  }

  // Delete a Review

  const handleDeleteReview = async event => {
    event.preventDefault()
    try {
      const reviewId = event.target.name
      await deletePropertyReview(reviewId)
      setNewReview({ id, formdata })      
    } catch (err) {
      console.log(err)
    }
  }




  return (
    <section className="show-page">
      <PropertyNavBar handleSearch={handleShowSearch} className="navbar"/>
      <div>
        <div className="showpage-top-layer">
          <img src={property.property_image} />
          <>
            {isLoggedIn ?
              <>
              
                <div className="icon-buttons">
                  {
                    !isFavourite ?
                      <Button className="favorite-button" style={{ backgroundColor: '#012349', borderRadius: 100, color: 'white' }} onClick={handleFavouriteProperty}>
                        <Icon name="favorite"/>
                      </Button>
                      :
                      <Button className="favorite-button" onClick={handleUnFavourite} style={{ backgroundColor: '#012349', borderRadius: 100, color: 'gold' }} >
                        <Icon name="favorite"/>
                      </Button>
                  }
                  <>
                    {isOwner(property.owner ? property.owner.id : '') &&
                <>
                  <Button as={Link} to={`/properties/${id}/edit`} className="edit-button" style={{ backgroundColor: '#012349', borderRadius: 0, color: 'white' }}>
                    <Icon name="edit" />
                  </Button>
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
                        {!isDeleted ?

                          <>
                            <div className="header"> 
                              <h3>Are you sure you want to delete this property?</h3>
                            </div>
                            <div className="delete-showpage-popup-buttons">
                              <Button onClick={handleDelete} >Yes</Button>
                              <Button onClick={close}>No</Button>
                            </div>
                          </>
                          :
                        
                          <div className="header"> 
                            <h3>Property Deleted!</h3>
                          </div>
                        }
                      </div>
                    )}
                  </Popup>
                </>
                    }
                  </>
                </div>
              
              </>
              :
              <div className="icon-buttons">
                <Button className="favorite-button" style={{ backgroundColor: '#012349', borderRadius: 100, color: 'white' }} onClick={handleFavouriteProperty}>
                  <Icon name="favorite"/>
                </Button>
              </div>
            }
          </>
        </div>
        <div className="show-details">
          <h2>{property.name}</h2>
          <p>{property.address}</p>
          <p>{property.city}, {property.country}</p>
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
                    
                    <div>
                      {!reviewPosted ?
                        <Form.Field>
                          <label>Leave A Review</label>
                          <textarea placeholder='eg. I loved this property!'
                            onChange={handleChange}
                            name="text"
                            value={formdata.text}
                          />
                
                          <p>Rating</p>
                          <input placeholder='eg. 1-5'
                            onChange={handleChange}
                            type="number"
                            name="rating"
                            value={formdata.rating}
                          />
                          <Button onClick={handleSubmit} name={property.id} className="submit-review" type="submit" style={{ backgroundColor: 'white', borderRadius: 0, color: '#012349' }}>Submit Review</Button>
                          {reviewErrors ?
        
                            <div className="ui error message small">
                              <div className="header">Please ensure each field is completed</div>
                            </div>
                            :
                            ''
                          }
                        
                        </Form.Field>
                        :
                        <div>
                          <h1>Review Added!</h1>
                        </div>
                      }
                    </div>
                  </div>
                )}
              </Popup>
            </>
            :
            <div>
            </div>
          }
        </>
      </div>
      <div className="middle-section">
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
              {reviews ? reviews.map(review => {
                return <Comment className="showpage-comment" key={review.id}>
                  <Comment.Avatar as='a' src={review.owner.profile_image} />
                  <Comment.Content>
                    <Comment.Author>{review.owner.first_name} {review.owner.last_name}</Comment.Author>
                    <Comment.Metadata>
                      <div>{<p><small className="text-muted px-1">{moment(review.created_at).fromNow()}</small></p>}</div>
                      <div>
                        <Icon name='star' />{review.rating}
                      </div>
                    </Comment.Metadata>
                    <Comment.Text>
                      <p>{review.text}</p>
                    </Comment.Text>
                    {isOwner(review.owner ? review.owner.id : '') &&
                            <Comment.Actions>
                              <Comment.Action onClick={handleDeleteReview} name={review.id}>Delete</Comment.Action>
                            </Comment.Actions>
                    }
                  </Comment.Content>
                </Comment>
              })
                :
                <h4>Be the first to leave a review on {property.name}</h4>
              }
            </Comment.Group>
          </div>
        </div>
      </div>
      
    
      <div className="showpage-featured-header">
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
      
      
    </section>
  )
}

export default PropertyShow