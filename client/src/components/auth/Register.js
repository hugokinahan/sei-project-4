import React from 'react'
import { Form, Checkbox, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import useForm from '../../utils/useForm'


function Register() {

  const { formdata, errors, handleChange, setErrors } = useForm({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    bioDescription: '',
    password: '',
    passwordConfirmation: '',
    profileImage: ''
  })

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('User has registered')
  }

  console.log(errors)
  console.log(setErrors)

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
                name="firstName"
                value={formdata.firstName}
              />
            </Form.Field>
            <Form.Field>
              <label>Last Name</label>
              <input placeholder='eg. Smith'
                onChange={handleChange}
                name="lastName"
                value={formdata.lastName}
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
            <label>Image</label>
            <input placeholder='eg. profile-image.png' 
              onChange={handleChange}
              name="profileImage"
              value={formdata.profileImage}
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
              name="bioDescription"
              value={formdata.bioDescription}
            />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input placeholder='Password'
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
              name="passwordConfirmation"
              value={formdata.passwordConfirmation}
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