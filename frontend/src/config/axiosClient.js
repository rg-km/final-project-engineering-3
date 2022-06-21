import axios from 'axios'

const url = 'http://api.fundingresearch.com:8080/'

const instance = axios.create({
  baseURL: url,
  withCredentials: true,
})

export default instance
