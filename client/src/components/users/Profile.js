import React from 'react'
import { showUserProfile, headers } from '../../lib/api'
import { getUserId } from '../../lib/auth'
import { Link } from 'react-router-dom'
import { Icon } from 'semantic-ui-react'


function Profile() {


  const [profile, setProfile] = React.useState({})

  React.useEffect(() => {
    const getProfile = async () => {
      try {
        const { data } = await showUserProfile(getUserId(), headers())
        // console.log(data)
        setProfile(data)
      } catch (err) {
        console.log(err)
      }
    }
    getProfile()
  })

  console.log(profile)
 
  return (
    <>
      <section className="profile-page">
        <div>
          <h1>{profile.first_name} {profile.last_name} </h1>
          <img className="profile-page-image" src={profile.profile_image}></img>
          <p>Joined Sharebnb: {profile.date_joined}</p>
          <p>About {profile.first_name}: {profile.bio_description}</p>
          <h1>Followers {profile.followed_by ? profile.followed_by.length : ''}</h1>
          <h1>Owned Properties</h1>
          {profile.created_property ? profile.created_property.map(property => (
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
          <h1>Reviews</h1>
          <h1>Favourite Properties</h1>
          <h1>Offers</h1>
          {profile.created_property ? profile.created_property.map(property => (
            property.offers.map(offer => (
              <div key={offer.id}>
                <p>From: </p>
                <p>Message: {offer.text}</p>
                <p>Requeted Days:{offer.start_date} - {offer.end_date}</p>
              </div>
            ))
          ))
            :
            ''
          }
        </div>
      </section>
    </>
  )
}

export default Profile