import React from 'react'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import { Link } from 'react-router-dom'
import { Icon } from 'semantic-ui-react'

import { getAllProperties } from '../../lib/api'
import PropertyNavBar from './PropertyNavBar'

function PropertyIndexMap() {

  const [viewport, setViewport] = React.useState({
    latitude: 51.502643,
    longitude: -0.07497,
    zoom: 2,
    bearing: 0,
    pitch: 0
  })
  const [properties, setProperties] = React.useState([])
  const [popup, setPopup] = React.useState(null)
 
  React.useEffect(() => {
    const getProperties = async () => {
      try {
        const { data } = await getAllProperties()
        setProperties(data)
      } catch (err) {
        console.log(err)
      }
    }
    getProperties()
  }, [])
  


  const handleShowSearch = () => {
    history.push('/properties/')
  }

  
  return (
    <>
      <div className="index-container">
        <PropertyNavBar handleSearch={handleShowSearch} />
        <div className="index-map-container">
          <ReactMapGL
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
            height="100%"
            width="100%"
            mapStyle='mapbox://styles/mapbox/outdoors-v11'
            {...viewport}
            onClick={() => setPopup(null)}
            onViewportChange={(viewport) => setViewport(viewport)}
          >
            {properties.map(property => (
              <Marker
                key={property.id}
                latitude={Number(property.latitude)}
                longitude={Number(property.longitude)}
              >
                <span
                  role="img"
                  aria-label="map-marker"
                  onMouseOver={() => setPopup(property)}

                >

                  <Icon name="map marker alternate icon"></Icon>
                </span>
              </Marker>
            ))}
            {popup &&
          <Link to={`/properties/${popup.id}`}>
            <Popup
              closeOnClick={true}
              onClose={() => setPopup(null)}
              latitude={Number(popup.latitude)}
              longitude={Number(popup.longitude)}
            >
              
              <img src={popup.property_image} width="150px"/>
             
              <p> {popup.name}</p>
              
            </Popup>
          </Link>
            }
          </ReactMapGL>
        </div>
      </div>
    </>
  )
}

export default PropertyIndexMap