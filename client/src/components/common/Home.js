import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Icon, Button } from 'semantic-ui-react'
import HeroCarousel from 'react-hero-carousel'
import { getAllPropertyTypes } from '../../lib/api'

function Home() {

  const [properties, setProperties] = React.useState(null)
  const [propertyTypes, setPropertyTypes] = React.useState([])

  React.useEffect(() => {
    const getProperties = async () => {
      try {
        const { data } = await axios('/api/properties/')
        console.log(data)
        setProperties(data)

      } catch (err) {
        console.log(err)
      }
    }
    getProperties()
  }, [])

  console.log(properties)

  React.useEffect(() => {
    const getPropertyTypes = async () => {
      try {
        const { data } = await getAllPropertyTypes()
        console.log(data)
        setPropertyTypes(data)
        // setFilteredProperties(data)

      } catch (err) {
        console.log(err)
      }
    }
    getPropertyTypes()
  }, [])

  console.log(propertyTypes)

  return (
    <section className="home-page-section">
      <div className="hero">
        <div className="homepage-layout">
          <div className="carousel">
            <HeroCarousel interval={8000}>
              <img
                src="https://ogroup.com/wp-content/uploads/2018/09/1206amalfi-high-2-1.jpg"

              />
              <img
                src="https://img.gtsstatic.net/reno/imagereader.aspx?imageurl=https%3A%2F%2Fimg.gtsstatic.net%2Freno%2Fimagereader.aspx%3Fimageurl%3Dhttps%253A%252F%252Fsir.azureedge.net%252F1103i215%252F37ttpmpdkbfpmc2qzvfqfjk7a2i215%26option%3DN%26permitphotoenlargement%3Dfalse&option=N&permitphotoenlargement=false&w=1024"
              />
              <img
                src="https://img.gtsstatic.net/reno/imagereader.aspx?imageurl=https%3A%2F%2Fimg.gtsstatic.net%2Freno%2Fimagereader.aspx%3Fimageurl%3Dhttps%253A%252F%252Fsir.azureedge.net%252F1103i215%252Fg2yns46rcrzvm560sq0pggy4b7i215%26option%3DN%26permitphotoenlargement%3Dfalse&option=N&permitphotoenlargement=false&w=1024"
              />
              <img
                src="https://img.gtsstatic.net/reno/imagereader.aspx?imageurl=https%3A%2F%2Fimg.gtsstatic.net%2Freno%2Fimagereader.aspx%3Fimageurl%3Dhttps%253A%252F%252Fsir.azureedge.net%252F1103i215%252F2njbpshyg9a0m5p057988znnx1i215%26option%3DN%26permitphotoenlargement%3Dfalse&option=N&permitphotoenlargement=false&w=1024"
              />
              <img
                src="https://img.gtsstatic.net/reno/imagereader.aspx?imageurl=https%3A%2F%2Fimg.gtsstatic.net%2Freno%2Fimagereader.aspx%3Fimageurl%3Dhttps%253A%252F%252Fsir.azureedge.net%252F1103i215%252F2dv1skzv47vg46a8ktwar408s2i215%26option%3DN%26permitphotoenlargement%3Dfalse&option=N&permitphotoenlargement=false&w=1024"
              />
              <img
                src="https://img.gtsstatic.net/reno/imagereader.aspx?imageurl=https%3A%2F%2Fimg.gtsstatic.net%2Freno%2Fimagereader.aspx%3Fimageurl%3Dhttps%253A%252F%252Fsir.azureedge.net%252F280i215%252Fwms7pm7vbvfg4867kbtfpqgf21i215%26option%3DN%26permitphotoenlargement%3Dfalse&option=N&permitphotoenlargement=false&w=1024"
              />
              <img
                src="https://img.gtsstatic.net/reno/imagereader.aspx?imageurl=https%3A%2F%2Fimg.gtsstatic.net%2Freno%2Fimagereader.aspx%3Fimageurl%3Dhttps%253A%252F%252Fsir.azureedge.net%252F1103i215%252Fb0v12tnvdsvpmvjry02gsk5ea4i215%26option%3DN%26permitphotoenlargement%3Dfalse&option=N&permitphotoenlargement=false&w=1024"
              />
              <img
                src="https://img.gtsstatic.net/reno/imagereader.aspx?imageurl=https%3A%2F%2Fimg.gtsstatic.net%2Freno%2Fimagereader.aspx%3Fimageurl%3Dhttps%253A%252F%252Fsir.azureedge.net%252F1103i215%252Fs1fmp880z6wnm5650qfr5gt4s5i215%26option%3DN%26permitphotoenlargement%3Dfalse&option=N&permitphotoenlargement=false&w=1024"
              />
            </HeroCarousel>
          </div>
          <div className="headers">
            <h1>Welcome To Sharebnb</h1>
            <h4>Trade your property with one of our millions* of users and enjoy a unique stay at a destination chosen by you.</h4>
            <div className="homepage-buttons">
              <Button as={Link} to={'/register/'} className="sign-up-button" type='submit' style={{ backgroundColor: 'white', borderRadius: 0, color: '#012349', border: '1px solid #012349', width: '100%' }}>Sign Up</Button>
            </div>
            <div className="login-button">
              <Button as={Link} to={'/login/'} className="login-button" type='submit' style={{ backgroundColor: 'white', borderRadius: 0, color: '#012349', border: '1px solid #012349', width: '100%' }}>Login</Button>
            </div>
            <div className="header-comment">
              <h5>Sign Up today and join the fastest growing home swap community in the world 🌍</h5>
            </div>
          </div>
        </div>
      </div>
      <hr></hr>
      <div className="homepage-second-layer">
        <div className="users-index">
          {properties ? properties.slice(1, 50).map(property => (
            <div key={property.id}>
              <img src={property.owner.profile_image} />
            </div>
          ))
            :
            ''
          }
        </div>
        <div className="home-reviews">
          {/* <h5>“An property website like no other, Sharebnb provides the most incredible design-led homes in urban and rural locations around the world” — Evening Standard</h5> */}
          <h2>Join the Sharebnb Community</h2>
          <h5>“I adore Sharebnb. I have been using it for years and enjoyed so many incredible trips to amazing homes.” — Shenna Truelove</h5>
          <h5>“With Sharebnb, you don&apos;t just swap homes, you swap cultures. Through my connections on Sharebnb I have been able to explore the world.” — Yon Mineo</h5>
        </div>
      </div>
      <hr className="hr"/>
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
      {/* <div className="property-types">
        <h2>Discover More</h2>
        {propertyTypes ? propertyTypes.map(property => {
          <h4>{property.name}</h4>
        })
          :
          <h4>NoPe</h4>
        } */}
      {/* <h6>City</h6>
        <h6>Countryside</h6>
        <h6>Beach</h6>
        <h6>Mansion</h6>
        <h6>Cosy</h6>
        <h6>Spacious</h6>
        <h6>Modern</h6>
        <h6>Traditional</h6>
        <h6>Apartment</h6>
        <h6>Chalet</h6>
        <h6>Pet Friendly</h6>
        <h6>Bungalow</h6>
        <h6>Peaceful</h6>
        <h6>Lively</h6>
        <h6>Penthouse</h6> */}
      {/* </div> */}
    </section>
  )
}

export default Home