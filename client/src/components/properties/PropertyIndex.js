import React from 'react'
import { getAllProperties } from '../../lib/api'
import { Icon, Menu, Input } from 'semantic-ui-react'
// import Select from 'react-select'
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes'
import { Link } from 'react-router-dom'

function PropertyIndex() {

  const [properties, setProperties] = React.useState([])
  const [filteredProperties, setFilteredProperties] = React.useState([])
  const [searchValue, setSearchValue] = React.useState('')
  // const [selected, setSelected] = React.useState([])

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


  // Filter Functions

  // const filteredCities = ['japan', 'tokyo']

  // let searchValue = ''

  // const handleSelectCity = (e) => {
  //   const results = properties.filter(property => {
  //     return property.city.toLowerCase().includes(e.target.value.toLowerCase()) ||
  //       property.country.toLowerCase().includes(e.target.value.toLowerCase()) ||
  //       property.continent.toLowerCase().includes(e.target.value.toLowerCase())
  //   })
  //   setProperties(results)
    
  const filterProperties = (event) => {
    const results = properties.filter(property => {
      return property.city.toLowerCase().includes(event.target.value.toLowerCase()) ||
        property.country.toLowerCase().includes(event.target.value.toLowerCase()) ||
        property.continent.toLowerCase().includes(event.target.value.toLowerCase())
    })
    setFilteredProperties(results)
  }



  // const filterSearchProperties = (event) => {
  //   const results = properties.filter(property => {
  //     return property.continent.includes(event.value)
  //   })
  //   setFilteredProperties(results)
  // }

  
  

  const handleSearch = event => {
    setSearchValue(event.target.value)
    filterProperties(event)
  }

  const handleSelect = ()=> {
    console.log('hello')
  }

 

  const continents = [ 
    { label: 'North America', value: 'North America' },
    { label: 'Central America', value: 'Central America' },
    { label: 'South America', value: 'South America' },
    { label: 'Europe', value: 'Europe' },
    { label: 'Asia', value: 'Asia' },
    { label: 'Africa', value: 'Africa' },
    { label: 'Oceania', value: 'Oceania' }
  ]
  const bedrooms = [ 
    { label: '0-5', value: 1 },
    { label: '5+', value: 2 },
    { label: '8+', value: 3 },
    { label: '12+', value: 4 },
    { label: '16+', value: 5 },
    { label: '20+', value: 10 }
   
  ]

  const types = [ 
    { label: 'City', value: 'City' },
    { label: 'Countryside', value: 'Countryside' },
    { label: 'Beach', value: 'Beach' },
    { label: 'Mansion', value: 'Mansion' },
    { label: 'Cosy', value: 'Cosy' },
    { label: 'Spacious', value: 'Spacious' },
    { label: 'Modern', value: 'Modern' },
    { label: 'Traditional', value: 'Traditional' },
    { label: 'Apartment', value: 'Apartment' },
    { label: 'Chalet', value: 'Chalet' },
    { label: 'Pet-friendly', value: 'Pet-friendly' },
    { label: 'Bungalow', value: 'Bungalow' },
    { label: 'Peaceful', value: 'Peaceful' },
    { label: 'Lively', value: 'Lively' },
    { label: 'Penthouse', value: 'Penthouse' }
  ]

  
  

  return (
    <>
      <div className="index-container">
        <div className="index-menu-banner">
          <div className="ui menu index-page">
            <Input
              className="search-button"
              icon='search'
              placeholder="Search by City, Country or Continent..."
              onChange={handleSearch}
              value={searchValue}
              
            />
            {/* <Select 
              placeholder="Select a City..."
              options={filteredCities}
              onChange={handleSearch}
            /> */}
            {/* <Dropdown.Menu>
                <Select 
                  placeholder="Select a City..."
                  options={filteredCities}
                  onChange={handleSelectCity}
                />
                <Dropdown.Divider />
                
              </Dropdown.Menu> */}
           
            {/* <div className="selects">
              <div>
                <Select 
                  placeholder="Select a Continent..."
                  // options={filteredContinents}
                  // onChange={handleSelectContinent}
                />
              </div>
              <div>
                <Select 
                  placeholder="Select a Country..."
                  // options={filteredCountries}
                  // onChange={handleSelectCountry}
                />
              </div>
              <div>
                <Select 
                  placeholder="Select a City..."
                  // options={filteredCities}
                  // onChange={handleSelectCity}
                />
              </div>
            </div> */}
            <h1>Properties</h1>
            <Link to="/properties/map" className="navbar-item">
              <Menu.Item
                className="home"
                name='Map'
              />
            </Link>
            <Link to="/properties" className="navbar-item">
              <Menu.Item
                className="home"
                name='Index'
              />
            </Link>
            <ReactMultiSelectCheckboxes options={continents} placeholder="Continent"  onChange={handleSelect} />
            <ReactMultiSelectCheckboxes options={bedrooms} placeholder="Bedrooms"  onChange={handleSelect}/>
            <ReactMultiSelectCheckboxes options={types} placeholder="Types"  onChange={handleSelect}/>
          </div>
        </div>
        <>{!searchValue && 
        <>
          <h1>Featured</h1>
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