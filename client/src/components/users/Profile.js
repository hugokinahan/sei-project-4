import React from 'react'
import { showUserProfile, headers, deletePropertyRequest, editPropertyRequest } from '../../lib/api'
import { Link } from 'react-router-dom'
import { getUserId } from '../../lib/auth'
import { Icon, Divider, Header, Segment, Card, Button, Image } from 'semantic-ui-react'
import moment from 'moment'
import useForm from '../../utils/useForm'

function Profile() {

  moment().format()

  const [profile, setProfile] = React.useState({})

  const { formdata,  setFormdata } = useForm({
    start_date: '',
    end_date: '',
    offered_property: '',
    requested_property: '',
    owner: '',
    text: '',
    is_accepted: ''
  })

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
  }, [getUserId()])

  console.log(profile)

  const [activeItem, setActiveItem] = React.useState(true)
  const [isRecievedRequests, setIsRecievedRequests] = React.useState(true)

  const handleClickItem = () => {
    setActiveItem(!activeItem)
  }

  const handleClickRequestTab = () => {
    setIsRecievedRequests(!isRecievedRequests)
  }

  const handleRequestDelete = async event => {
    event.preventDefault()
    try {
      console.log(event.target.name)
      const requestId = event.target.name
      await deletePropertyRequest(requestId)
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
      // console.log(data)
    } catch (err) {
      console.log(err)
    }
  }
 
  return (
    <>
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
            <Header as='h4'>
              <Icon name='mail outline' />
      Property Swap Requests
            </Header>
          </Divider>
          <div className="ui attached tabular menu">
            <div className={isRecievedRequests ? 'active item' : 'item' }>
              <div onClick={handleClickRequestTab}> Recieved </div>
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
                          <Image
                            floated='right'
                            size='mini'
                            src={offer.owner.profile_image}
                          />
                          <Card.Header>{offer.owner.first_name} {offer.owner.last_name} </Card.Header>
                          <Card.Meta>Friends of Elliot</Card.Meta>
                          <Card.Description>
                      Message: {offer.text}
                          </Card.Description>
                          <Card.Description>
                      Dates: {moment(offer.start_date).format('MMM Do YY')} to {moment(offer.end_date).format('MMM Do YY')}
                          </Card.Description>
                          <Card.Description>
                      Wants to swap: {offer.requested_property.name}
                          </Card.Description>
                          <Card.Description>
                      Their Property: {offer.offered_property.name}
                          </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                          {!offer.is_accepted ? 
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
                      <Card.Content>
                        <Image
                          floated='right'
                          size='mini'
                          src={offer.requested_property.property_image}
                        />
                        <Card.Header>{offer.requested_property.name} </Card.Header>
                        <Card.Meta>{offer.requested_property.city}, {offer.requested_property.country}</Card.Meta>
                        <Card.Description>
                  Your Message: {offer.text}
                        </Card.Description>
                        <Card.Description>
                  From {moment(offer.start_date).format('MMM Do YY')} to {moment(offer.end_date).format('MMM Do YY')}
                        </Card.Description>
                        <Card.Description>
                  In exchange For: 
                        </Card.Description>
                      </Card.Content>
                      <Card.Content extra>
                        <div>
                          <>
                            {offer.is_accepted ? 
                              <div className='ui two buttons'>
                                <Button basic color='green'>
        Accepted
                                </Button>
                                <Button as={Link} to={`/properties/${offer.requested_property.id}`} basic color='red' >
                            
                              View Property
                                </Button>
                              </div>
                              :
                              <Button basic color='red'>
        Pending
                              </Button>
                            }
                          </>
                          
                          <Button onClick={handleRequestDelete} name={offer.id}>
                            <Icon onClick={handleRequestDelete} value={offer.id} name="trash alternate outline"></Icon>
                          </Button>
                        </div>
                       
                      </Card.Content>
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
            <Header as='h4'>
      Bio
            </Header>
          </Divider>
          <div>
            {/* <h2>{profile.first_name}s Bio</h2> */}
            <p>{profile.bio_description}</p>
          </div>
          <Divider horizontal>
            <Header as='h4'>
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
                    <Link to={`/properties/${property.id}`} key={property.id} className="index-grid-div-container" >
                      <div className="profile-grid-div">
                        <img src={property.property_image} />
                        <div className="index-grid-house-info">
                          <div className="house-name-details">
                            <p>{property.name}</p>
                            <p>{property.city}, {property.country}</p>
                          </div>
                          <div className="house-details">
                            <div className="bathrooms">
                              <Icon name="bath" className="profile-icon"></Icon>
                              <p>{property.bathrooms} bathrooms </p>
              
                            </div>
                            <div className="bedrooms">
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
                </Segment>  
              </>
              :
        
              <Segment className="ui bottom attached segment active tab">
                {profile.favorited_property ? profile.favorited_property.map(property => (
                  <Link to={`/properties/${property.id}`} key={property.id} className="index-grid-div-container" >
                    <div className="profile-grid-div">
                      <img src={property.property_image} />
                      <div className="index-grid-house-info">
                        <div className="house-name-details">
                          <p>{property.name}</p>
                          <p>{property.city}, {property.country}</p>
                        </div>
                        <div className="house-details">
                          <div className="bathrooms">
                            <Icon name="bath" className="profile-icon"></Icon>
                            <p>{property.bathrooms} bathrooms </p>
              
                          </div>
                          <div className="bedrooms">
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
              </Segment>
            }
          </>
          
        </div>
      </section>
    </>
          
  )
}

export default Profile