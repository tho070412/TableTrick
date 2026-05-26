import axios from 'axios'


const BASE_URL = 'https://table-track-api.onrender.com/reservas'
const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

export async function getReservas() {
  const { data } = await api.get('/')
  return data
}

export async function createReserva(payload) {
  const { data } = await api.post('/', payload)
  return data
}

export async function updateReserva(id, payload) {
  const { data } = await api.put(`/${id}`, payload)
  return data
}

export async function deleteReserva(id) {
  const { data } = await api.delete(`/${id}`)
  return data
}
