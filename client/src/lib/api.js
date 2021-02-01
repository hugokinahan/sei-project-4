import axios from 'axios'
import { getToken } from './auth'

export function headers() {
  return {
    headers: { Authorization: `Bearer ${getToken()}` }
  }
}

const baseUrl = '/api'


// * Get Properties Requests

// Get All Properties

export function getAllProperties() {
  return axios.get(`${baseUrl}/properties/`)
}

// Get single Property 

export function getSingleProperty(id) {
  return axios.get(`${baseUrl}/properties/${id}`)
}

// Create a Property

export function createProperty(formdata) {
  return axios.post(`${baseUrl}/properties`, formdata, headers())
}

// Delete a property 

export function deleteProperty(id) {
  return axios.delete(`${baseUrl}/properties/${id}`, headers())
}

// Edit a Property

export function editProperty(id, formdata) {
  return axios.put(`${baseUrl}/properties/${id}`, formdata, headers())
}

// Get all property types

export function getAllPropertyTypes() {
  return axios.get(`${baseUrl}/types/`)
}

// * Reviews requests

// Get All Reviews

export function getAllReviews() {
  return axios.get(`${baseUrl}/reviews`)
}

// Get One Review

export function getSingleReview(id) {
  return axios.get(`${baseUrl}/reviews/${id}`)
}

// Create a Property Review

export function createPropertyReview(formdata, id) {
  return axios.post(`${baseUrl}/properties/${id}/reviews`, formdata, headers())
}

// Create a User Review

export function createUserReview(formdata, id) {
  return axios.post(`${baseUrl}/profile/${id}/reviews`, formdata, headers())
}

// Delete Property Review

export function deletePropertyReview(id, reviewId) {
  return axios.delete(`${baseUrl}/properties/${id}/reviews/${reviewId}`, headers())
}

// Delete User Review

export function deleteUserReviw(id, reviewId) {
  return axios.delete(`${baseUrl}/profile/${id}/reviews/${reviewId}`, headers())
}

// * Auth Requests

export function registerUser(formdata) {
  return axios.post(`${baseUrl}/auth/register/`, formdata)
}

export function loginUser(formdata) {
  return axios.post(`${baseUrl}/auth/login/`, formdata)
}

export function showUserProfile(id) {
  return axios.get(`${baseUrl}/auth/profile/${id}`, headers())
}

export function editUserProfile(formdata) {
  return axios.put(`${baseUrl}/auth/update-profile/`, formdata, headers())
}

export function followUser(id) {
  return axios.post(`${baseUrl}/auth/profile/${id}/follow/`, null, headers())
}

export function unFollowUser(id) {
  return axios.delete(`${baseUrl}/auth/profile/${id}/follow/`, headers())
}


//* Make a Offer / Request a swap

export function createPropertyRequest(formdata) {
  console.log(formdata)
  return axios.post(`${baseUrl}/offers/`, formdata, headers())
}

export function deletePropertyRequest(id) {
  return axios.delete(`${baseUrl}/offers/${id}/`, headers())
}

export function editPropertyRequest(id, formdata) {
  return axios.put(`${baseUrl}/offers/${id}/`, formdata, headers())
}