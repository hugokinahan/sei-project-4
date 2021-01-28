import React from 'react'
import axios from 'axios'
import { Container } from 'semantic-ui-react'

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
    <Container>
      <h1>HouseSwap</h1>
    </Container>
  )
}

export default Home