import axios from 'axios'
import FeedbackService from './feedback'

const API_ENVIROMENT = {
  production: '',
  development: '',
  local: 'http://localhost:3000/api'
}

const httpClient = axios.create({
  baseURL: API_ENVIROMENT.local
})

httpClient.interceptors.response.use((response) => {
  return response
}, (error) => {
  const canThrowError = error.request.status === 0 || error.request.status === 500
  if (canThrowError) {
    throw new Error(error.message)
  }
  return error
})

export default {
  feedback: FeedbackService(httpClient)
}
