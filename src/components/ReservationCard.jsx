import { getBadgeClass, formatDateTime } from '../utils/helpers'

export default function ReservationCard({ reserva, onEdit, onDelete, onFinalizar }) {
  const { id, nombreCliente, fechaHora, cantidadPersonas, estado } = reserva
  const yaFinalizada = estado === 'Finalizada'

  return (
    <div className={`card group ${yaFinalizada ? 'opacity-60' : ''}`}>
      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-primary-light rounded-xl flex items-center justify-center shrink-0">
            <span className="text-primary font-bold text-sm">
              {nombreCliente?.[0]?.toUpperCase()}
            </span>
          </div>
          <div>
            <h3 className="font-semibold text-dark text-sm leading-tight">{nombreCliente}</h3>
            <p className="text-muted text-xs mt-0.5">
              👥 {cantidadPersonas} {cantidadPersonas === 1 ? 'persona' : 'personas'}
            </p>
          </div>
        </div>
        <span className={getBadgeClass(estado)}>{estado}</span>
      </div>

      {/* Date/time */}
      <div className="flex items-center gap-1.5 text-xs text-muted mb-4 bg-bg rounded-lg px-3 py-2">
        <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>{formatDateTime(fechaHora)}</span>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-3 border-t border-border gap-2 flex-wrap">
        {!yaFinalizada && (
          <button
            onClick={() => onFinalizar(id)}
            className="btn-success text-xs py-1 px-3"
          >
            ✓ Finalizar
          </button>
        )}
        {yaFinalizada && (
          <span className="text-xs text-gray-400 font-medium">Mesa liberada</span>
        )}
        <div className="flex gap-2 ml-auto">
          <button onClick={() => onEdit(reserva)} className="btn-ghost text-xs py-1 px-3">
            Editar
          </button>
          <button onClick={() => onDelete(id)} className="btn-danger text-xs py-1 px-3">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )
}
