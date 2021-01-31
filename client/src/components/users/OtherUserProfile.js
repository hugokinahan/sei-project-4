import React from 'react'
import { showUserProfile, followUser, unFollowUser } from '../../lib/api'
import { useParams, Link } from 'react-router-dom'
import { Icon, Divider, Header, Segment } from 'semantic-ui-react'
import moment from 'moment'

import PropertyShowPopup from '../properties/PropertyShowPopup'


function OtherUserProfile() {

  moment().format()

  const [profile, setProfile] = React.useState({})
  const { id } = useParams()


  // const dayCreated = ''
  React.useEffect(() => {
    const getProfile = async () => {
      try {
        const { data } = await showUserProfile(id)
        console.log(data)
        if (data.followed_by) {
          setFollowers(data.followed_by.length)
        }
        setProfile(data)
      } catch (err) {
        console.log(err)
      }
    }
    getProfile()
  }, [])

  console.log(profile)

  // const activeItem = ''

  const [activeItem, setActiveItem] = React.useState(true)

  const handleClickItem = () => {
    setActiveItem(!activeItem)
  }

  const [isFollowed, setIsFollowed] = React.useState(false)
  const [followers, setFollowers] = React.useState(0)

  const handleFollow = async event => {
    event.preventDefault()
    try {
      await followUser(id)
      console.log('user followed')
      setIsFollowed(!isFollowed)
      setFollowers(followers + 1)
    } catch (err) {
      console.log(err)
    }
  }

  const handleUnFollow = async event => {
    event.preventDefault()
    try {
      setIsFollowed(!isFollowed)
      setFollowers(followers - 1)
      await unFollowUser(id)
      console.log('user unfollowed')
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
              {!isFollowed ?
                <Icon onClick={handleFollow} className="add-user-icon" name="add user"></Icon>
                :
                <Icon onClick={handleUnFollow} className="add-user-icon" name="remove user"></Icon>
              }
            </div>
            <div className="profile-statistics">
              <div><p>{followers ? followers : 0} <br></br> Followers </p></div>
              <div><p>{profile.followed_users ? profile.followed_users.length : 0 } <br></br> Following </p></div>
              <div><p>{profile.created_property ? profile.created_property.length : ''}<br></br> Properties</p></div>
            </div>
            <p>Joined Sharebnb: <small className="text-muted px-1">{moment(profile.date_joined).fromNow()}</small></p>
            
          </div>
          <Divider horizontal>
            <Header as='h4'>
        Bio
            </Header>
          </Divider>
          <div className="profile-bio">
            {/* <h2>{profile.first_name}s Bio</h2> */}
            <p>{profile.bio_description}</p>
          </div>
          <Divider horizontal>
            <Header as='h4'>
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
                  <div>
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
                  </div>
                </Segment>  
              </>
              :
          
              <Segment className="ui bottom attached segment active tab">
                <h2>Favourite Properties</h2>
              </Segment>
            }
          </>
          <PropertyShowPopup id={profile.created_property ? profile.created_property.map(property => (property.id)) : ''}/>
        </div>
      </section>
    </>
  )
}

export default OtherUserProfile