import axios from 'axios'
import config from '@/config'

axios.defaults.baseURL = config.reeApi.baseUrl

const apiService = {
  get (resource: string, params: object) {
    return axios.get(resource, { params })
  },
}

export default apiService
