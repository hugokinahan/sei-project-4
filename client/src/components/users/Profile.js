import React from 'react'
import { Link } from 'react-router-dom'
import Popup from 'reactjs-popup'
import { Icon, Divider, Header, Segment, Card, Button, Image, Dimmer, Loader } from 'semantic-ui-react'
import moment from 'moment'


import { showUserProfile, headers, deletePropertyRequest, editPropertyRequest } from '../../lib/api'
import { getUserId } from '../../lib/auth'
import useForm from '../../utils/useForm'

function Profile() {

  moment().format()

  const [profile, setProfile] = React.useState({})
  const [isAccepted, setisAccepted] = React.useState()
  const [isDeleted, setIsDeleted] = React.useState(false)

  const { formdata,  setFormdata } = useForm({
    start_date: '',
    end_date: '',
    offered_property: '',
    requested_property: '',
    owner: '',
    text: '',
    is_accepted: ''
  })

  const [activeItem, setActiveItem] = React.useState(true)
  const [isRecievedRequests, setIsRecievedRequests] = React.useState(true)

  React.useEffect(() => {
    const getProfile = async () => {
      try {
        const { data } = await showUserProfile(getUserId(), headers())
        // console.log(data)
        setProfile(data)
        const updatedData = { ...data }
        setFormdata(updatedData.created_property.offers[0])
      } catch (err) {
        console.log(err)
      }
    }
    getProfile()
  }, [getUserId(), isAccepted, isDeleted ])

  console.log(profile)

  
  // Tab Functions

  const handleClickItem = () => {
    setActiveItem(!activeItem)
  }

  const handleClickRequestTab = () => {
    setIsRecievedRequests(!isRecievedRequests)
  }

  
  // Delete & Accept Requests

  const handleRequestDelete = async event => {
    event.preventDefault()
    try {
      console.log(event.target.name)
      const requestId = event.target.name
      await deletePropertyRequest(requestId)
      setIsDeleted(true)
      history.push(`/profile/${getUserId()}`)
      // console.log(data)
    } catch (err) {
      console.log(err)
    }
  }


  const handleAcceptRequest = async event => {
    event.preventDefault()
    try {
      console.log(event.target.name)
      const requestId = event.target.name
      formdata.is_accepted = true
      await editPropertyRequest(requestId, formdata)
      setisAccepted(true)
      // console.log(data)
    } catch (err) {
      console.log(err)
    }
  }


 
  return (
    <>
      {profile ?
        <section className="profile-page">
          <div className="profile-page-container">
            <div className="profile-page-header">
              <img className="profile-page-image" src={profile.profile_image}></img>
              <div className="profile-title">
                <h1>{profile.first_name} {profile.last_name} </h1>
              </div>
              <div className="profile-statistics">
                <div><p>{profile.followed_by ? profile.followed_by.length : ''} <br></br> Followers </p></div>
                <div><p>{profile.followed_user ? profile.followed_user.length : ''} <br></br> Following </p></div>
                <div><p>{profile.created_property ? profile.created_property.length : ''} <br></br> Properties</p></div>
              </div>
              <p>Joined Sharebnb: <small className="text-muted px-1">{moment(profile.date_joined).fromNow()}</small></p>
          
            </div>
            <Divider horizontal>
              <Header as='h4' color='#012349'>
                <Icon name='mail outline' />
      Property Swap Requests
              </Header>
            </Divider>
            <div className="ui attached tabular menu">
              <div className={isRecievedRequests ? 'active item' : 'item' }>
                <div onClick={handleClickRequestTab}> Received </div>
              </div>
              <div className={isRecievedRequests ? 'item' : 'active item'}>
                <div onClick={handleClickRequestTab}> Sent </div>
              </div>
            </div>
            <>
              {isRecievedRequests  ?
                <>
                  <Card.Group className="request-cards">
                    {profile.created_property ? profile.created_property.map(property => (
                      property.offers.map(offer => (
          
                        <Card key={offer.id} name={offer.id} className="request-cards">
                          <Card.Content>
                            <Link to={`/users/profile/${offer.owner.id}`}>
                              <Image
                                floated='right'
                                size='mini'
                                src={offer.owner.profile_image}
                              />
                            </Link>
                            <Card.Header><Link to={`/users/profile/${offer.owner.id}`}>{offer.owner.first_name} {offer.owner.last_name} </Link></Card.Header>
                            <Card.Meta>{offer.offered_property.city}</Card.Meta>
                            <Card.Description>
                      Message: {offer.text}
                            </Card.Description>
                            <Card.Description>
                      Dates: {moment(offer.start_date).format('MMM Do YY')} to {moment(offer.end_date).format('MMM Do YY')}
                            </Card.Description>
                            <Card.Description>
                      Would like to swap: {offer.requested_property.name}
                            </Card.Description>
                            <Card.Description>
                      In exchange for: {offer.offered_property.name}
                            </Card.Description>
                          </Card.Content>
                          <Card.Content extra>
                            {!offer.is_accepted  ? 
                              <div className='ui two buttons'>
                                <Button basic color='green' name={offer.id} onClick={handleAcceptRequest}>
            Accept
                                </Button>
                                <Button basic color='red'>
            Decline
                                </Button>
                              </div>
                              :
                              <div className='ui two buttons'>
                                <Button basic color='green'>
        Accepted
                                </Button>
                                <Button as={Link} to={`/properties/${offer.offered_property.id}`} basic color='green'>
                            View Property
                                </Button>
                              </div>
                            }
                          </Card.Content>
                        </Card>
                      ))
                    ))
                      :
                      ''
                    }
                  </Card.Group> 
                </>
                :
                <>
                  <Card.Group>
                    {profile.posted_offers ? profile.posted_offers.map(offer => (

                  
                      <Card key={offer.id} name={offer.id}>
                            
                      
                        <>
                          {/* <Link to={`/properties/${offer.requested_property.id}`}> */}
                          <Card.Content>
                            <Popup
                              trigger={<Button 
                                floated='right'
                                size='mini'
                              >
                                <Icon name="trash alternate outline"></Icon>
                              </Button>}
                              modal
                              nested
                            >
                              {close => (
                                <div className="delete-request-modal">
                                  <button className="close" onClick={close}>
&times;
                                  </button>
                                  {!isDeleted ?

                                    <>
                                      <div className="header"> 
                                        <h3>Are you sure you want to delete this Request?</h3>
                                      </div>
                                      <div className="delete-request-popup-buttons">
                                        <Button onClick={handleRequestDelete} name={offer.id}>Yes</Button>
                                        <Button onClick={close}>No</Button>
                                      </div>
                                    </>
                                    :
                        
                                    <div className="header"> 
                                      <h3>Request Deleted!</h3>
                                    </div>
                                  }
                                </div>
                              )}
                            </Popup>
                          
                            {/* <Image
                            floated='right'
                            size='mini'
                            src={offer.requested_property.property_image}
                          /> */}
                            <Card.Header><Link to={`/properties/${offer.requested_property.id}`}>{offer.requested_property.name} </Link></Card.Header>
                            <Card.Meta>{offer.requested_property.city}, {offer.requested_property.country}</Card.Meta>
                            <Card.Description>
                  Your Message: {offer.text}
                            </Card.Description>
                            <Card.Description>
                  From {moment(offer.start_date).format('MMM Do YY')} to {moment(offer.end_date).format('MMM Do YY')}
                            </Card.Description>
                            <Card.Description>
                  In Exchange For: {offer.offered_property.name}
                            </Card.Description>
                          </Card.Content>
                          {/* </Link> */}
                          <Card.Content extra>
                            <div>
                              <>
                                {offer.is_accepted ? 
                                  <div className='ui two buttons'>
                                    <Button basic color='green'>
        Accepted
                                    </Button>
                                    <Button as={Link} to={`/properties/${offer.requested_property.id}`} basic color='green' >
                            
                              View Property
                                    </Button>
                                  </div>
                                  :
                                  <Button basic color='red'>
        Pending
                                  </Button>
                                }
                              </>
                          
                            
                            
                            </div>
                       
                          </Card.Content>
                        </>
                       
                          
                      </Card>
                        
                    
                    
                    ))
                  
                      :
                      ''
                    }
                  </Card.Group> 
                </>
              }
            </>
            <Divider horizontal>
              <Header as='h4' color='#012349'>
      Bio
              </Header>
            </Divider>
            <div>
              {/* <h2>{profile.first_name}s Bio</h2> */}
              <p className="profile-bio-description">{profile.bio_description}</p>
            </div>
            <Divider horizontal>
              <Header as='h4' color='#012349'>
                <Icon name='home' />
      Properties
              </Header>
            </Divider>
            <div className="ui attached tabular menu">
              <div className={activeItem ? 'active item' : 'item' }>
                <div onClick={handleClickItem}> Owned </div>
              </div>
              <div className={activeItem ? 'item' : 'active item'}>
                <div onClick={handleClickItem}> Favourites </div>
              </div>
            </div>
            <>
              {activeItem  ?
                <>
                  <Segment className="ui bottom attached segment active tab">
                    {profile.created_property ? profile.created_property.map(property => (
                      <Link to={`/properties/${property.id}`} key={property.id} className="profile-grid-div-container" >
                        <div className="profile-grid-div">
                          <img src={property.property_image} />
                          <div className="index-grid-house-info">
                            <div className="profile-house-name-details">
                              <p>{property.name}</p>
                              <p>{property.city}, {property.country}</p>
                            </div>
                            <div className="house-details">
                              <div className="profile-bathrooms">
                                <Icon name="bath" className="profile-icon"></Icon>
                                <p>{property.bathrooms} bathrooms </p>
              
                              </div>
                              <div className="profile-bedrooms">
                                <Icon name="bed" className="profile-icon"></Icon>
                                <p>{property.bedrooms} bedrooms </p>
              
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))
                      :
                      ''
                    }
                    {/* <h2>Reviews</h2> */}
                    <div>
                      <Link to="/properties/new">
                        <div className="profile-add-new-property">
                          <Icon name="add" />
                      Add New Property
                        </div>
                      </Link>
                    </div>
                  </Segment>  
                </>
                :
        
                <Segment className="ui bottom attached segment active tab">
                  <div className="profile-div-grid">
                    {profile.favorited_property ? profile.favorited_property.map(property => (
                      <Link to={`/properties/${property.id}`} key={property.id} className="profile-grid-div-container" >
                        <div className="profile-grid-div">
                          <img src={property.property_image} />
                          <div className="index-grid-house-info">
                            <div className="profile-house-name-details">
                              <p>{property.name}</p>
                              <p>{property.city}, {property.country}</p>
                            </div>
                            <div className="house-details">
                              <div className="profile-bathrooms">
                                <Icon name="bath" className="profile-icon"></Icon>
                                <p>{property.bathrooms} bathrooms </p>
              
                              </div>
                              <div className="profile-bedrooms">
                                <Icon name="bed" className="profile-icon"></Icon>
                                <p>{property.bedrooms} bedrooms </p>
              
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))
                      :
                      ''
                    }
                  </div>
                </Segment>
              }
            </>
          
          </div>
          
         
        
        </section>
        :
        <Segment>
          <Dimmer active inverted>
            <Loader inverted>Loading</Loader>
          </Dimmer>
    
          <Image src='/images/wireframe/short-paragraph.png' />
        </Segment>
      }
    </>
          
  )
}

export default Profile