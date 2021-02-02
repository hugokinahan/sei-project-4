import React from 'react'
import { getAllProperties } from '../../lib/api'
import { Menu, Input } from 'semantic-ui-react'
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes'
import { Link, useLocation } from 'react-router-dom'

function PropertyIndex( { setFilteredProperties, searchValue, handleSearch, handleMultiTypeSelect }) {

  const [properties, setProperties] = React.useState([])
  const location = useLocation()
  


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

    

  // const handleSelect = ()=> {
  //   console.log('hello')
  // }


  // const continents = [ 
  //   { label: 'North America', value: 'North America' },
  //   { label: 'Central America', value: 'Central America' },
  //   { label: 'South America', value: 'South America' },
  //   { label: 'Europe', value: 'Europe' },
  //   { label: 'Asia', value: 'Asia' },
  //   { label: 'Africa', value: 'Africa' },
  //   { label: 'Australasia', value: 'Oceania' }
  // ]
  // const bedrooms = [ 
  //   { label: '0-5', value: 1 },
  //   { label: '5+', value: 5 },
  //   { label: '8+', value: 8 },
  //   { label: '12+', value: 12 },
  //   { label: '16+', value: 16 },
  //   { label: '20+', value: 20 }
   
  // ]

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

  // const filterProperties = (event) => {
  //   const results = properties.filter(property => {
  //     return property.city.toLowerCase().includes(event.target.value.toLowerCase()) ||
  //       property.country.toLowerCase().includes(event.target.value.toLowerCase()) ||
  //       property.continent.toLowerCase().includes(event.target.value.toLowerCase())
  //   })
  //   setFilteredProperties(results)
  // }






  // const handleMultiBedroomSelect = (selected) => {
  //   // setMultiSelectValue(selected)
  //   console.log(selected)
  //   // const results = properties.filter(property => {
  //   //   return property.continent.toLowerCase().includes(selected.value.toLowerCase())
  //   // })
  //   // console.log(results)
  //   // filterMultiProperties(selected)
  // }

  


  return (
    <>
      <div className="index-menu-banner">
        <div className="ui menu index-page">
          {location.pathname === '/properties' &&
          <Input
            className="search-button"
            icon='search'
            placeholder="Search by City, Country or Continent..."
            onChange={handleSearch}
            value={searchValue}
              
          />
          }
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
          {/* <h1>Properties</h1> */}
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
          {location.pathname === '/properties' &&
          <>
            {/* <ReactMultiSelectCheckboxes options={continents} placeholder="Continent"  
              onChange={selected => handleMultiContinentSelect(selected, 'continents')}
            />
            <ReactMultiSelectCheckboxes options={bedrooms} placeholder="Bedrooms"  onChange={selected => handleMultiBedroomSelect(selected, 'bedrooms')}/> */}
            <ReactMultiSelectCheckboxes options={types} placeholder="Types"  onChange={selected => handleMultiTypeSelect(selected, 'types')}/>
          </>
          }
        </div>
      </div>
    </>
  )
}

export default PropertyIndex