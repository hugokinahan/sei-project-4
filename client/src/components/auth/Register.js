import React from 'react'
import { Form, Checkbox, Button } from 'semantic-ui-react'
import { Link, useHistory } from 'react-router-dom'

import useForm from '../../utils/useForm'
import { registerUser } from '../../lib/api'
import ImageUploadField from '../../utils/ImageUploadField'


function Register() {

  const history = useHistory()

  const { formdata,  handleChange } = useForm({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    bio_description: '',
    password: '',
    password_confirmation: '',
    profile_image: ''
  })

  const handleSubmit = async event => {
    event.preventDefault()
    try {
      console.log('User has registered')
      await registerUser(formdata)
      history.push('/register/property')
    } catch (err) {
      console.log(err)
    }
  }

  // console.log(errors)
  // console.log(setErrors)

  return (
    <div className="register-container">
      <section className="register-section">
        <h1>Sign Up</h1>
        <Form inverted onSubmit={handleSubmit} className="small form">
          <Form.Group widths='equal'>
            <Form.Field>
              <label fluid>First Name</label>
              <input placeholder='eg. John'
                onChange={handleChange}
                name="first_name"
                value={formdata.first_name}
              />
            </Form.Field>
            <Form.Field>
              <label>Last Name</label>
              <input placeholder='eg. Smith'
                onChange={handleChange}
                name="last_name"
                value={formdata.last_name}
              />
            </Form.Field>
          </Form.Group>
          <Form.Field>
            <label>Email</label>
            <input placeholder='eg. john.smith@gmail.com'
              onChange={handleChange}
              name="email"
              value={formdata.email}
            />
          </Form.Field>
          <Form.Field>
            <ImageUploadField
              placeholder='eg. profile-image.png' 
              onChange={handleChange}
              labelText="Profile Image"
              name="profile_image"
              value={formdata.profile_image}
            />
          </Form.Field>
          <Form.Field>
            <label>Username</label>
            <input placeholder='eg. johnsmith123' 
              onChange={handleChange}
              name="username"
              value={formdata.username}
            />
          </Form.Field>
          <Form.Field>
            <label>Tell Us About You</label>
            <textarea placeholder='eg. I live in L.A and love travelling around the world.'
              onChange={handleChange}
              name="bio_description"
              value={formdata.bio_description}
            />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input placeholder='Password must be 8 characters long'
              type='password'
              onChange={handleChange}
              name="password"
              value={formdata.password}
            />
          </Form.Field>
          <Form.Field>
            <label>Password Confirmation</label>
            <input placeholder='Password Confirmation'
              type='password'
              onChange={handleChange}
              name="password_confirmation"
              value={formdata.password_confirmation}
            />
          </Form.Field>
          <Form.Field>
            <Checkbox label='I agree to the Terms and Conditions' />
          </Form.Field>
          <Button type='submit'>Sign Up</Button>
        </Form>
        <p>Already with us? Login <Link to="/login">here</Link></p>
      </section>
    </div>
  )
}

export default Register