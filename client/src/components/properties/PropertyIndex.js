import React from 'react'
import { getAllProperties } from '../../lib/api'

function PropertyIndex() {

  const [properties, setProperties] = React.useState(null)

  React.useEffect(() => {
    const getProperties = async () => {
      try {
        const { data } = await getAllProperties()
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
    <>
      {properties ? properties.map(property => (
        <p key={property.id}>{property.name}</p>
      ))
        :
        ''
      }
    </>
  )
}

export default PropertyIndex