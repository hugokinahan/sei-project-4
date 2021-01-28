import axios from 'axios'
const baseUrl = '/api'

// Get Properties Requests

// Get All Properties

export function getAllProperties() {
  return axios.get(`${baseUrl}/properties/`)
}

// Get single Property 

export function getSingleProperty(id) {
  return axios.get(`${baseUrl}/properties/${id}`)
}