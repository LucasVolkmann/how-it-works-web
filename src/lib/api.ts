import axios from "axios"
import Cookies from "js-cookie"

const base = process.env.NEXT_PUBLIC_API_URL || ''
const normalized = base.replace(/\/$/, '')
export const api = axios.create({
  baseURL: `${normalized}/api`,
})

api.interceptors.request.use((config: any) => {
  const token = Cookies.get("token")
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`
  return config
})

export default api
