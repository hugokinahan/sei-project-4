import React from 'react'
import { showUserProfile } from '../../lib/api'
import { useParams, Link } from 'react-router-dom'
import { Icon } from 'semantic-ui-react'
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
        setProfile(data)
      } catch (err) {
        console.log(err)
      }
    }
    getProfile()
  }, [])

  console.log(profile)

 
 
  return (
    <>
      <section className="profile-page">
        <div className="profile-page-container">
          <div className="profile-page-header">
            <img className="profile-page-image" src={profile.profile_image}></img>
            <div className="profile-title">
              <h1>{profile.first_name} {profile.last_name} </h1>
              <Icon className="add-user-icon" name="add user"></Icon>
            </div>
            <div className="profile-statistics">
              <div><p>{profile.followed_by ? profile.followed_by.length : ''} Followers </p></div>
              <div><p>{profile.followed_by ? profile.followed_by.length : ''} Following </p></div>
              <div><p>{profile.created_by ? profile.created_property.length : 0} Properties</p></div>
            </div>
            <p>Joined Sharebnb: <small className="text-muted px-1">{moment(profile.date_joined).fromNow()}</small></p>
          </div>
          <div>
            <h2>{profile.first_name}s Bio</h2>
            <p>{profile.bio_description}</p>
          </div>
          <h2>Owned Properties</h2>
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
          <h2>Reviews</h2>
          <h2>Favourite Properties</h2>
          <PropertyShowPopup id={profile.created_property ? profile.created_property.map(property => (property.id)) : ''}/>
        </div>
      </section>
    </>
  )
}

export default OtherUserProfile