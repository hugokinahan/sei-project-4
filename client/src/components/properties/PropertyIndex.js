import React from 'react'
import { getAllProperties } from '../../lib/api'
import { Container } from 'semantic-ui-react'

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
    <Container>
      <>
        {properties ? properties.map(property => (
          <div key={property.id}>
            <p key={property.id}>{property.name}</p>
            <img src={property.property_image} />
          </div>
        ))
          :
          ''
        }
      </>
    </Container>
  )
}

export default PropertyIndex