export default function StatsBar({ reservas }) {
  const total = reservas.length
  const confirmadas = reservas.filter((r) => r.estado === 'Confirmada').length
  const espera = reservas.filter((r) => r.estado === 'En Espera').length
  const finalizadas = reservas.filter((r) => r.estado === 'Finalizada').length
  const personas = reservas
    .filter((r) => r.estado !== 'Finalizada')
    .reduce((acc, r) => acc + (Number(r.cantidadPersonas) || 0), 0)

  const stats = [
    { label: 'Total reservas', value: total, icon: '📋', color: 'text-dark' },
    { label: 'Confirmadas', value: confirmadas, icon: '✅', color: 'text-emerald-600' },
    { label: 'En Espera', value: espera, icon: '⏳', color: 'text-amber-600' },
    { label: 'Finalizadas', value: finalizadas, icon: '🏁', color: 'text-gray-400' },
    { label: 'Personas activas', value: personas, icon: '👥', color: 'text-primary' },
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
      {stats.map((s) => (
        <div key={s.label} className="bg-surface border border-border rounded-2xl px-4 py-3 shadow-card">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-base">{s.icon}</span>
            <p className="text-muted text-xs font-medium truncate">{s.label}</p>
          </div>
          <p className={`font-bold text-2xl ${s.color}`}>{s.value}</p>
        </div>
      ))}
    </div>
  )
}
