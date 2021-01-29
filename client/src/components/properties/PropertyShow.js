import React from 'react'
import { getSingleProperty } from '../../lib/api'
import { useParams } from 'react-router-dom'
import { Button, Icon } from 'semantic-ui-react'
import ReactMapGL, { Marker } from 'react-map-gl'

// import ReactMapGL from 'react-map-gl'

function PropertyShow() {

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

  return (
    <section className="show-page">
      <div>
        <h1>Property Show Page</h1>
        <img src={property.property_image} />
        <div className="icon-buttons">
          <Button className="edit-button" style={{ backgroundColor: '#012349', borderRadius: 0, color: 'white' }}>
            <Icon name="edit" />
          </Button>
          <Button className="delete-button" style={{ backgroundColor: '#012349', borderRadius: 0, color: 'white' }}>
            <Icon name="trash alternate"/>
          </Button>
        </div>
        <div className="show-details">
          <h2>{property.name}</h2>
          <h4>{property.address}</h4>
          <h4>{property.city}, {property.country}</h4>
          {/* <h6>{property.types.name[0]}</h6> */}
          <p>{property.description}</p>
          <Button className="request-button" type="submit" style={{ backgroundColor: '#012349', borderRadius: 0, color: 'white' }}>
          Request A Swap
          </Button>
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
                <div className="user-image">
                  <img src={property.owner.profile_image} />
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
              height="100%"
              width="100%"
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
              // <div className="ring-loader">
              //   <RingLoader color="purple" size={60} />
              // </div>
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
    </section>
  )
}

export default PropertyShow