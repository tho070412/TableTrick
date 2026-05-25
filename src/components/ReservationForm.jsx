import { useState, useEffect } from 'react'
import { formatDateTimeInput } from '../utils/helpers'

const EMPTY = {
  nombreCliente: '',
  fechaHora: '',
  cantidadPersonas: '',
  estado: 'En Espera',
}

export default function ReservationForm({ initial = null, onSubmit, onCancel, loading }) {
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (initial) {
      setForm({
        nombreCliente: initial.nombreCliente || '',
        fechaHora: formatDateTimeInput(initial.fechaHora),
        cantidadPersonas: initial.cantidadPersonas || '',
        estado: initial.estado || 'En Espera',
      })
    } else {
      setForm(EMPTY)
    }
    setErrors({})
  }, [initial])

  const validate = () => {
    const errs = {}
    if (!form.nombreCliente.trim()) errs.nombreCliente = 'El nombre del cliente es obligatorio.'
    if (!form.cantidadPersonas || Number(form.cantidadPersonas) < 1)
      errs.cantidadPersonas = 'Ingresa una cantidad válida (mínimo 1).'
    return errs
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    onSubmit({ ...form, cantidadPersonas: Number(form.cantidadPersonas) })
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {/* Nombre cliente */}
      <div>
        <label className="block text-xs font-semibold text-dark mb-1.5">
          Nombre del cliente *
        </label>
        <input
          name="nombreCliente"
          value={form.nombreCliente}
          onChange={handleChange}
          placeholder="Ej: María González"
          className="input-field"
          autoFocus
        />
        {errors.nombreCliente && (
          <p className="text-red-500 text-xs mt-1">{errors.nombreCliente}</p>
        )}
      </div>

      {/* Fecha y hora + cantidad */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-dark mb-1.5">
            Fecha y hora
          </label>
          <input
            type="datetime-local"
            name="fechaHora"
            value={form.fechaHora}
            onChange={handleChange}
            className="input-field"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-dark mb-1.5">
            Personas *
          </label>
          <input
            type="number"
            name="cantidadPersonas"
            value={form.cantidadPersonas}
            onChange={handleChange}
            min="1"
            max="50"
            placeholder="Ej: 4"
            className="input-field"
          />
          {errors.cantidadPersonas && (
            <p className="text-red-500 text-xs mt-1">{errors.cantidadPersonas}</p>
          )}
        </div>
      </div>

      {/* Estado */}
      <div>
        <label className="block text-xs font-semibold text-dark mb-1.5">Estado</label>
        <select name="estado" value={form.estado} onChange={handleChange} className="input-field">
          <option value="En Espera">En Espera</option>
          <option value="Confirmada">Confirmada</option>
          <option value="Finalizada">Finalizada</option>
        </select>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-2">
        <button type="button" onClick={onCancel} className="btn-ghost">Cancelar</button>
        <button type="submit" disabled={loading} className="btn-primary">
          {loading ? 'Guardando...' : initial ? 'Actualizar reserva' : 'Registrar reserva'}
        </button>
      </div>
    </form>
  )
}
