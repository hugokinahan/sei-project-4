import React from 'react'
import { Form, Checkbox, Button } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'
import Select from 'react-select'
import useForm from '../../utils/useForm'
import { createProperty, getAllProperties } from '../../lib/api'


function Register() {

  const history = useHistory()

  const { formdata,  handleChange } = useForm({
    name: '',
    address: '',
    city: '',
    county: '',
    continent: '',
    description: '',
    property_image: '',
    is_available: '',
    latitude: '',
    longitude: '',
    bathrooms: '',
    bedrooms: '',
    types: ''
  })

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

  const handleSubmit = async event => {
    event.preventDefault()
    try {
      console.log('User has registered property')
      await createProperty(formdata)
      history.push('/login')
    } catch (err) {
      console.log(err)
    }
  }

  const handleMultiChange = (selected, name) => {
    const propertyTypes = properties ? properties.map(property => property.types.name) : []
    handleChange({
      target: { name, propertyTypes }
    })
  }

  // const propertyTypes = []
  // properties.map(property => {
  //   propertyTypes.push({ value: property.types.name, label: property.types.name })
  // })

  // console.log(errors)
  // console.log(setErrors)

  return (
    <div className="register-container">
      <section className="register-section">
        <h1>Register Your Property</h1>
        <Form inverted onSubmit={handleSubmit} className="small form">
          <Form.Group widths='equal'>
            <Form.Field>
              <label fluid>Property Name</label>
              <input placeholder='eg. Belmont Estate'
                onChange={handleChange}
                name="name"
                value={formdata.name}
              />
            </Form.Field>
            <Form.Field>
              <label>Address</label>
              <input placeholder='eg. 138 Belmont Avenue'
                onChange={handleChange}
                name="address"
                value={formdata.address}
              />
            </Form.Field>
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field>
              <label>City</label>
              <input placeholder='eg. London'
                onChange={handleChange}
                name="city"
                value={formdata.city}
              />
            </Form.Field>
            <Form.Field>
              <label>Country</label>
              <input placeholder='eg. United Kingdom' 
                onChange={handleChange}
                name="country"
                value={formdata.country}
              />
            </Form.Field>
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field>
              <label>Latitude</label>
              <input placeholder='eg. 51.35645'
                onChange={handleChange}
                name="latitude"
                value={formdata.latitude}
              />
            </Form.Field>
            <Form.Field>
              <label>Longitude</label>
              <input placeholder='eg. -51.35645'
                onChange={handleChange}
                name="longitude"
                value={formdata.longitude}
              />
            </Form.Field>
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field>
              <label>Bedrooms</label>
              <select placeholder='eg. 5'
                onChange={handleChange}
                name="bedrooms"
                value={formdata.bedrooms}
              />
            </Form.Field>
            <Form.Field>
              <label>Bathrooms</label>
              <select placeholder='eg. 4'
                onChange={handleChange}
                name="bathrooms"
                value={formdata.bathrooms}
              />
            </Form.Field>
          </Form.Group>
          <Form.Field>
            <label>Property Image</label>
            <input placeholder='eg. property_image.png'
              onChange={handleChange}
              name="property_image"
              value={formdata.property_image}
            />
          </Form.Field>
          <div className="field">
            <label className="label">Select Relevant Property Types</label>
            <div className="control">
              <Select 
                options={'properties.types ? properties.types.name : [] '}
                isMulti // boolean implied to be true without = {}
                name="types"
                onChange={(selected) => handleMultiChange(selected, 'types')}
              />
            </div>
          </div>
          <Form.Field>
            <label>Description</label>
            <textarea placeholder='eg. Exquisite Custom Gated Contemporary Estate in prime London. Amazing View lot with jetliner views. Over 11,000 sqft of luxury living on ¾ of an acre.' 
              onChange={handleChange}
              name="username"
              value={formdata.username}
            />
          </Form.Field>
          <Form.Field>
            <Checkbox label='Available For Exchange' />
          </Form.Field>
          <Button type='submit'>Register Property</Button>
        </Form>
        {/* <p>Already with us? Login <Link to="/login">here</Link></p> */}
      </section>
    </div>
  )
}

export default Register