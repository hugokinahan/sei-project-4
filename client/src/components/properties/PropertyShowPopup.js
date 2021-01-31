import React from 'react'
import Popup from 'reactjs-popup'
import useForm from '../../utils/useForm'
import { Button, Icon, Checkbox, Form } from 'semantic-ui-react'
import { getAllProperties, createPropertyRequest ,  getSingleProperty } from '../../lib/api'
import { getUserId } from '../../lib/auth'

import { useParams } from 'react-router-dom'



function PropertyShowPopup ( ) {

  const { id } = useParams()

  const [properties, setProperties] = React.useState(null)
  const [property, setProperty] = React.useState([])

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

  React.useEffect(() => {

    const getData = async () => {
      try {
        const { data } = await getSingleProperty(id)
        setProperty(data)
        // setViewport({ latitude: Number(data.latitude), longitude: Number(data.longitude), zoom: 7 })
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [id])


  const { formdata, errors, handleChange, setErrors } = useForm({
    start_date: '',
    end_date: '',
    offered_property: '',
    text: ''
  })


  const handleSubmit = async event => {
    console.log(formdata)
    event.preventDefault()
    try {
      const newRequest = { ...formdata, owner: getUserId(), requested_property: Number(id) }
      console.log(property.id)
      console.log('NEW REQUEST', newRequest)
      await createPropertyRequest(newRequest) 
      console.log('Request made')
    } catch (err) {
      console.log(err)
    }
  }

  console.log(errors)
  console.log(setErrors)

  console.log(formdata)


  return (
    <Popup
      trigger={<Button className="request-button" type="submit" style={{ backgroundColor: '#012349', borderRadius: 0, color: 'white' }}>
        Request A Swap <Icon name="exchange" className="exchange-icon"/>
      </Button>}
      modal
      nested
    >
      {close => (
        <div className="modal">
          <button className="close" onClick={close}>
          &times;
          </button>
          <div className="header"> 
            {property.owner ?  
              <div>
                <p>Request a swap with {property.owner.first_name} </p>
                <p>{property.address}</p>
                <p>{property.city}, {property.country}</p>
              </div>
              : '' }
          </div>
          <div className="content">
            <Form inverted onSubmit={handleSubmit} className="small form">
              <Form.Group widths='equal'>
                <Form.Field>
                  <label fluid>First Name *</label>
                  <input placeholder='eg. John'
                    onChange={handleChange}
                    name="first_name"
                    // value={formdata.first_name}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Last Name *</label>
                  <input placeholder='eg. Smith'
                    onChange={handleChange}
                    name="last_name"
                    // value={formdata.last_name}
                  />
                </Form.Field>
              </Form.Group>
              <Form.Group widths='equal'>
                <Form.Field>
                  <label>Email *</label>
                  <input placeholder='eg. john.smith@gmail.com'
                    onChange={handleChange}
                    name="owner"
                    value={formdata.owner}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Property To Exchange *</label>
                  <select placeholder='eg. Belmont Estate' 
                    onChange={handleChange}
                    name="offered_property"
                    value={formdata.offered_property}
                  >
                    {properties ? properties.map((property) => (
                      <option key={property.id} value={property.id}>{property.name}</option>
                    ))
                      :
                      ''  }
                  </select>
                </Form.Field>
              </Form.Group>
              <Form.Group widths='equal'>
                <Form.Field>
                  <label>Start Date *</label>
                  <input placeholder='eg. 26/05/21' 
                    type='date'
                    onChange={handleChange}
                    name="start_date"
                    value={formdata.start_date}
                  />
                </Form.Field>
                <Form.Field>
                  <label>End Date *</label>
                  <input placeholder='eg. 06/06/21'
                    type='date'
                    onChange={handleChange}
                    name="end_date"
                    value={formdata.end_date}
                  />
                </Form.Field>
              </Form.Group>
              <Form.Field>
                <label>Message to Owner *</label>
                <textarea placeholder='eg. I would love to swap houses with you for the summer!'
                  onChange={handleChange}
                  name="text"
                  value={formdata.text}
                />
              </Form.Field>
              <Form.Field>
                <Checkbox label='I agree to the Terms and Conditions *' />
              </Form.Field>
              <Button className="popup-auth-request" type='submit' style={{ backgroundColor: 'white', borderRadius: 0, color: '#012349', border: 'none', width: '100%' }}>Request Property Exchange</Button>
            </Form>
          </div>
          {/* <div className="actions">
              <Popup
                trigger={<button className="button"> Trigger </button>}
                position="top center"
                nested
              >
                <span>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae
              magni omnis delectus nemo, maxime molestiae dolorem numquam
              mollitia, voluptate ea, accusamus excepturi deleniti ratione
              sapiente! Laudantium, aperiam doloribus. Odit, aut.
                </span>
              </Popup>
              <button
                className="button"
                onClick={() => {
                  console.log('modal closed ')
                  close()
                }}
              >
            close modal
              </button>
            </div> */}
        </div>
      )}
    </Popup>
  )
}

export default PropertyShowPopup