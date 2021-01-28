import React from 'react'
import axios from 'axios'

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
    <h1>HouseSwap</h1>
  )
}

export default Home