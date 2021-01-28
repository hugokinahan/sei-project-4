import React from 'react'
import { Form, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import useForm from '../../utils/useForm'

function Login() {
  const { formdata, handleChange } = useForm({
    email: '',
    password: ''
  })

  const handleSubmit = () => {
    console.log('User has logged in')
  }

  return (
    <div className="login-container">
      
      <section className="login-section">
        <h1>Log In</h1>
        <Form inverted onSubmit={handleSubmit}>
          <Form.Field>
            <label>Email</label>
            <input placeholder='eg. john.smith@gmail.com'
              onChange={handleChange}
              name="email"
              value={formdata.email}
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
          <Button type='submit'>Log In</Button>
        </Form>
        <p>Dont have an account? Sign up <Link to="/register">here</Link></p>
      </section>
    </div>
  )
}

export default Login