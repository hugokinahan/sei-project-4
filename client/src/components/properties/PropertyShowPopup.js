import React from 'react'
import Popup from 'reactjs-popup'
import useForm from '../../utils/useForm'
import { Button, Icon, Checkbox, Form } from 'semantic-ui-react'


import { createPropertyRequest ,  getSingleProperty, showUserProfile, headers } from '../../lib/api'
import { getUserId } from '../../lib/auth'



function PropertyShowPopup ({ id }) {



  const [property, setProperty] = React.useState([])
  const [requestErrors, setRequestErrors] = React.useState(false)
  const [profile, setProfile] = React.useState({})


  const { formdata, handleChange } = useForm({
    start_date: '',
    end_date: '',
    offered_property: '',
    text: ''
  })

  const [isSent, setIsSent] = React.useState(false)


  // Get Single Property Request 

  React.useEffect(() => {

    const getData = async () => {
      try {
        const { data } = await getSingleProperty(id)
        setProperty(data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [id])


  // Get Profile Request 

  React.useEffect(() => {
    const getProfile = async () => {
      try {
        const { data } = await showUserProfile(getUserId(), headers())
        setProfile(data)
      } catch (err) {
        console.log(err)
      }
    }
    getProfile()
  }, [getUserId()])


  // Create New Property Swap Request

  const handleSubmit = async event => {
    console.log(formdata)
    event.preventDefault()
    try {
      const newRequest = { ...formdata, owner: getUserId(), requested_property: Number(id) }
      await createPropertyRequest(newRequest) 
      setIsSent(true)
      console.log('Request made')
    } catch (err) {
      setRequestErrors(true)
      console.log(err)
    }
  }



  return (
    <Popup
      trigger={<Button className="request-button" type="submit" style={{ backgroundColor: '#012349', borderRadius: 0, color: 'white' }}>
        Request A Swap <Icon name="exchange" className="exchange-icon"/>
      </Button>}
      modal
      nested
    >
      {close => (
        <div className={!isSent ?  'modal' : 'sent-modal'}>
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
            {!isSent ?
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
                      <>
                        <option key={property.id} value={property.id}>Select Property</option>
                        {profile.created_property ? profile.created_property.map((property) => (
                          <>
                            
                            <option key={property.id} value={property.id}>{property.name}</option>
                              
                          </>
                        ))
                          :
                          ''  }
                      </>
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
              :
              <div className="review-sent-message">
                <h1>Request sent!</h1>
              </div>
            }
            {requestErrors ?
        
              <div className="ui error message small">
                <div className="header">Please ensure each field is completed</div>
              </div>
              :
              ''
            }
          </div>
          <div className="actions">
            <Button className="popup-auth-request" onClick={() => {
              console.log('modal closed ')
              close()
            }} style={{ backgroundColor: 'white', borderRadius: 0, color: '#012349', border: 'none', width: '25%' }}>Close</Button>
            
          </div>
        </div>
      )}
    </Popup>
  )
}

export default PropertyShowPopup