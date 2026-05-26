import { useState, useMemo } from 'react'
import DashboardLayout from '../layouts/DashboardLayout'
import { useReservas } from '../hooks/useReservas'
import ReservationCard from '../components/ReservationCard'
import ReservationForm from '../components/ReservationForm'
import Modal from '../components/Modal'
import Spinner from '../components/Spinner'
import FilterBar from '../components/FilterBar'
import StatsBar from '../components/StatsBar'
import Swal from 'sweetalert2'

export default function PanelPage() {
  const { reservas, loading, error, fetchAll, addReserva, editReserva, removeReserva } = useReservas()

  const [showModal, setShowModal] = useState(false)
  const [editTarget, setEditTarget] = useState(null)
  const [saving, setSaving] = useState(false)
  const [filtro, setFiltro] = useState('Todos')

  const filtered = useMemo(() => {
    if (filtro === 'Todos') return reservas
    return reservas.filter((r) => r.estado === filtro)
  }, [reservas, filtro])

  const openCreate = () => { setEditTarget(null); setShowModal(true) }
  const openEdit = (reserva) => { setEditTarget(reserva); setShowModal(true) }
  const closeModal = () => { setShowModal(false); setEditTarget(null) }

  const handleSubmit = async (formData) => {
    setSaving(true)
    const result = editTarget
      ? await editReserva(editTarget.id, formData)
      : await addReserva(formData)
    setSaving(false)

    if (result.ok) {
      closeModal()
      Swal.fire({
        icon: 'success',
        title: editTarget ? 'Reserva actualizada' : '¡Reserva registrada!',
        timer: 1800,
        showConfirmButton: false,
        confirmButtonColor: '#c2693a',
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: result.message,
        confirmButtonColor: '#c2693a',
      })
    }
  }

  const handleFinalizar = async (id) => {
    const result = await Swal.fire({
      title: '¿Finalizar reserva?',
      text: 'El cliente se ha retirado de la mesa.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, finalizar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#2d8a55',
      cancelButtonColor: '#9a8b7c',
    })
    if (result.isConfirmed) {
      await editReserva(id, { estado: 'Finalizada' })
      Swal.fire({
        icon: 'success',
        title: 'Mesa liberada',
        timer: 1500,
        showConfirmButton: false,
      })
    }
  }

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display font-bold text-dark text-2xl">Panel de Reservas</h1>
          <p className="text-muted text-sm mt-0.5">Gestión de mesas en tiempo real</p>
        </div>
        <div className="flex gap-2">
          <button onClick={fetchAll} className="btn-ghost text-xs">↻ Actualizar</button>
          <button onClick={openCreate} className="btn-primary">+ Nueva reserva</button>
        </div>
      </div>

      {/* Stats */}
      {!loading && !error && (
        <div className="mb-6">
          <StatsBar reservas={reservas} />
        </div>
      )}

      {/* Filters */}
      {!loading && !error && reservas.length > 0 && (
        <div className="mb-5">
          <FilterBar filtro={filtro} onChange={setFiltro} total={filtered.length} />
        </div>
      )}

      {/* Content */}
      {loading && <Spinner label="Cargando reservas..." />}

      {!loading && error && (
        <div className="text-center py-16">
          <p className="text-red-500 text-sm mb-4">{error}</p>
          <button onClick={fetchAll} className="btn-ghost">Reintentar</button>
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div className="text-center py-20 border-2 border-dashed border-border rounded-2xl">
          <div className="text-4xl mb-3">🍽️</div>
          <p className="text-muted text-sm mb-1">
            {reservas.length === 0
              ? 'No hay reservas registradas aún.'
              : 'Ninguna reserva coincide con el filtro.'}
          </p>
          {reservas.length === 0 && (
            <button onClick={openCreate} className="btn-primary mt-4">
              Registrar primera reserva
            </button>
          )}
        </div>
      )}

      {!loading && !error && filtered.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((reserva) => (
            <ReservationCard
              key={reserva.id}
              reserva={reserva}
              onEdit={openEdit}
              onDelete={removeReserva}
              onFinalizar={handleFinalizar}
            />
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <Modal
          title={editTarget ? 'Editar reserva' : 'Nueva reserva'}
          onClose={closeModal}
        >
          <ReservationForm
            initial={editTarget}
            onSubmit={handleSubmit}
            onCancel={closeModal}
            loading={saving}
          />
        </Modal>
      )}
    </DashboardLayout>
  )
}
