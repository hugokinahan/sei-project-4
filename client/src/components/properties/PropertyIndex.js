import React from 'react'
import { Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
// import InfiniteScroll from 'react-infinite-scroller'

import { getAllProperties } from '../../lib/api'
import PropertyNavBar from './PropertyNavBar'

function PropertyIndex() {

  const [properties, setProperties] = React.useState([])
  const [filteredProperties, setFilteredProperties] = React.useState([])
  const [searchValue, setSearchValue] = React.useState('')


  React.useEffect(() => {
    const getProperties = async () => {
      try {
        const { data } = await getAllProperties()
        console.log(data)
        setProperties(data)
        setFilteredProperties(data)

      } catch (err) {
        console.log(err)
      }
    }
    getProperties()
  }, [])

  console.log(properties)

  const filterProperties = (event) => {
    const results = properties.filter(property => {
      return property.city.toLowerCase().includes(event.target.value.toLowerCase()) ||
        property.country.toLowerCase().includes(event.target.value.toLowerCase()) ||
        property.continent.toLowerCase().includes(event.target.value.toLowerCase())
    })
    setFilteredProperties(results)
  }


  const handleSearch = event => {
    setSearchValue(event.target.value)
    filterProperties(event)
  }
  

  return (
    <>
      <div className="index-container">
        <PropertyNavBar setFilteredProperties={setFilteredProperties} searchValue={searchValue} handleSearch={handleSearch}/>
        <>{!searchValue && 
        <>
          <h1>Recently Added Properties</h1>
          <div className="index-grid">
            {properties ? properties.slice(34, 37).map(property => (
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
          <hr></hr>
          <h1>All Sharebnbs</h1>
        </>}
        {searchValue && <h1>Search Results for...&quot;{searchValue}&quot;</h1>}
        {/* <hr></hr> */}
        <div className="index-grid">
          {filteredProperties ? filteredProperties.map(property => (
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
        </>
      </div>
    </>
  )
}

export default PropertyIndex