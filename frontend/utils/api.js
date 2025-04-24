import axios from 'axios'
const BASE_URL = 'https://bucket-list-beta.vercel.app/api/v1/users';
const api = axios.create({
      baseURL: BASE_URL,
      headers: {
            "Content-Type": 'application/json'
      }
})

export default api