import { useState, useEffect, useCallback } from 'react'
import { getReservas, createReserva, updateReserva, deleteReserva } from '../services/reservasService'
import Swal from 'sweetalert2'

export function useReservas() {
  const [reservas, setReservas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchAll = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getReservas()
      setReservas(data)
    } catch {
      setError('No se pudo conectar con la API.')
      Swal.fire({
        icon: 'error',
        title: 'Error de conexión',
        text: 'No se pudieron cargar las reservas. Verifica tu API.',
        confirmButtonColor: '#c2693a',
      })
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchAll() }, [fetchAll])

  const addReserva = async (payload) => {
    try {
      const nueva = await createReserva(payload)
      setReservas((prev) => [...prev, nueva])
      return { ok: true }
    } catch {
      return { ok: false, message: 'Error al crear la reserva.' }
    }
  }

  const editReserva = async (id, payload) => {
    try {
      const actualizada = await updateReserva(id, payload)
      setReservas((prev) => prev.map((r) => (r.id === id ? actualizada : r)))
      return { ok: true }
    } catch {
      return { ok: false, message: 'Error al actualizar la reserva.' }
    }
  }

  const removeReserva = async (id) => {
    const result = await Swal.fire({
      title: '¿Cancelar reserva?',
      text: '¿Estás seguro de cancelar esta reserva?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, cancelar reserva',
      cancelButtonText: 'Volver',
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#9a8b7c',
    })

    if (!result.isConfirmed) return { ok: false, cancelled: true }

    try {
      await deleteReserva(id)
      setReservas((prev) => prev.filter((r) => r.id !== id))
      Swal.fire({
        icon: 'success',
        title: 'Reserva cancelada',
        text: 'La reserva fue eliminada del sistema.',
        confirmButtonColor: '#c2693a',
        timer: 2000,
        showConfirmButton: false,
      })
      return { ok: true }
    } catch {
      return { ok: false, message: 'Error al cancelar la reserva.' }
    }
  }

  return { reservas, loading, error, fetchAll, addReserva, editReserva, removeReserva }
}
