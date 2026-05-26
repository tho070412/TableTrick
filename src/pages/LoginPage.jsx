import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { saveSession, isAuthenticated } from '../utils/auth'

const TURNOS = ['Mañana', 'Tarde', 'Noche']
const TURNO_DESC = {
  Mañana: '6:00 AM – 2:00 PM',
  Tarde: '2:00 PM – 9:00 PM',
  Noche: '9:00 PM – 2:00 AM',
}

export default function LoginPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ nombreCompleto: '', turno: 'Mañana' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isAuthenticated()) navigate('/panel', { replace: true })
  }, [navigate])

  const validate = () => {
    const errs = {}
    if (!form.nombreCompleto.trim()) errs.nombreCompleto = 'Ingresa tu nombre completo.'
    return errs
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    setTimeout(() => {
      saveSession({ nombreCompleto: form.nombreCompleto.trim(), turno: form.turno })
      navigate('/panel', { replace: true })
    }, 500)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-4">
      {/* Warm background texture */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-sm animate-slide-up">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🍽️</div>
          <h1 className="font-display font-bold text-dark text-3xl">
            Table<span className="text-primary">Track</span>
          </h1>
          <p className="text-muted text-sm mt-2">Sistema de gestión de reservas</p>
        </div>

        {/* Card */}
        <div className="bg-surface border border-border rounded-2xl p-6 shadow-modal">
          <h2 className="font-semibold text-dark text-base mb-1">Iniciar turno</h2>
          <p className="text-muted text-xs mb-5">Ingresa tus datos para comenzar</p>

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-dark mb-1.5">
                Nombre completo
              </label>
              <input
                name="nombreCompleto"
                value={form.nombreCompleto}
                onChange={handleChange}
                placeholder="Ej: Ana Martínez"
                autoFocus
                className="input-field"
              />
              {errors.nombreCompleto && (
                <p className="text-red-500 text-xs mt-1">{errors.nombreCompleto}</p>
              )}
            </div>

            {/* Turno selector */}
            <div>
              <label className="block text-xs font-semibold text-dark mb-2">Turno</label>
              <div className="grid grid-cols-3 gap-2">
                {TURNOS.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setForm((prev) => ({ ...prev, turno: t }))}
                    className={`py-2.5 px-2 rounded-xl border text-center transition-all duration-150 cursor-pointer ${
                      form.turno === t
                        ? 'border-primary bg-primary-light text-primary font-semibold'
                        : 'border-border text-muted hover:border-primary/50'
                    }`}
                  >
                    <div className="text-lg mb-0.5">
                      {t === 'Mañana' ? '🌅' : t === 'Tarde' ? '🌇' : '🌙'}
                    </div>
                    <div className="text-xs font-medium">{t}</div>
                    <div className="text-[10px] text-muted mt-0.5">{TURNO_DESC[t]}</div>
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 mt-1"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Ingresando...
                </>
              ) : 'Iniciar turno'}
            </button>
          </form>
        </div>

        <p className="text-center text-muted text-xs mt-4">
          
        </p>
      </div>
    </div>
  )
}
