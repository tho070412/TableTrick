import { useNavigate } from 'react-router-dom'
import { getSession, clearSession } from '../utils/auth'
import Swal from 'sweetalert2'

const TURNO_ICON = { Mañana: '🌅', Tarde: '🌇', Noche: '🌙' }

export default function Navbar() {
  const navigate = useNavigate()
  const session = getSession()

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: '¿Cerrar sesión?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Salir',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#c2693a',
      cancelButtonColor: '#9a8b7c',
    })
    if (result.isConfirmed) {
      clearSession()
      navigate('/login')
    }
  }

  return (
    <nav className="bg-surface border-b border-border sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <span className="text-2xl">🍽️</span>
          <div>
            <span className="font-display font-bold text-dark text-lg leading-none">Table</span>
            <span className="font-display font-bold text-primary text-lg leading-none">Track</span>
          </div>
        </div>

        {/* Session */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-dark font-semibold text-sm leading-tight">{session?.nombreCompleto}</span>
            <span className="text-muted text-xs">
              {TURNO_ICON[session?.turno]} Turno {session?.turno}
            </span>
          </div>
          <button onClick={handleLogout} className="btn-ghost text-xs py-1.5 px-3">
            Salir
          </button>
        </div>
      </div>
    </nav>
  )
}
