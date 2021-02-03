import React from 'react'
import ReactMapGL, { Marker } from 'react-map-gl'
import { Icon } from 'semantic-ui-react'


function PropertyShowMap({ property }) {

  // const [popup, setPopup] = React.useState(null)
  // console.log(popup)

  // const [viewport, setViewport] = React.useState({
  //   latitude: 51.501476,
  //   longitude: -0.140634,
  //   zoom: 15
  // })

  
  return (
    <div className="map-container">
      {/* {viewport ?  */}
      <ReactMapGL
        className="mapbox"
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        height="250px"
        width="250px"
        mapStyle='mapbox://styles/mapbox/streets-v11'
        // {...viewport}
        latitude={property.latitude ? Number(property.latitude) : 51.533451}
        longitude={property.longitude ? Number(property.longitude) : -51.533451}
        zoom={4}
        // onClick={() => setPopup(null)}
        // onViewportChange={viewport => setViewport(viewport)}
      >
        {property ?
          <Marker
            className='map-markers'
            key={property.id}
            latitude={property.latitude ? Number(property.latitude) : 51.533451}
            longitude={property.longitude ? Number(property.longitude) : -51.533451}
          >
            {/* <span
                role="img"
                aria-label="map-marker"
                onClick={() => setPopup(property.owner.first_name)}
              > */}
            <Icon className="icon" name="map marker alternate" />
            {/* </span> */}
          </Marker>
          :
          ''
        }
      </ReactMapGL>
      {/* : 
        ''
      } */}
    </div>
  )
}

export default PropertyShowMap