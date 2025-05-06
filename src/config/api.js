import axios from 'axios'
import { useAuthStore } from '@/stores/AuthStore'

export default () =>
  axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
      Authorization: `Bearer ${useAuthStore().authToken}`
    }
  })

