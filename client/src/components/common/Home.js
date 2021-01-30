import React from 'react'
// import { Link } from 'react-router-dom'
import axios from 'axios'
// import { Icon } from 'semantic-ui-react'
import HeroCarousel from 'react-hero-carousel'

function Home() {

  const [properties, setProperties] = React.useState(null)

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
          </div>
        </div>
      </div>
      <div className="homepage-second-layer">
        <div className="users-index">
          {properties ? properties.slice(1, 43).map(property => (
            <div key={property.id}>
              <img src={property.owner.profile_image} />
            </div>
          ))
            :
            ''
          }
        </div>
        <div className="home-reviews">
          <h5>“An property website like no other, Sharebnb provides the most incredible design-led homes in urban and rural locations around the world” — Evening Standard</h5>
          <h5>“I adore Sharebnb. I have been using it for years and enjoyed so many incredible trips to amazing homes.” — Shenna Truelove</h5>
          <h5>“With Sharebnb, you don&apos;t just swap homes, you swap cultures. Through my connections on Sharebnb I have been able to explore the world.” — Yon Mineo</h5>
        </div>
      </div>
    </section>
  )
}

export default Home