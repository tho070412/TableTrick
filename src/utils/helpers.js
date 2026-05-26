export function getBadgeClass(estado) {
  const map = {
    Confirmada: 'badge-confirmada',
    'En Espera': 'badge-espera',
    Finalizada: 'badge-finalizada',
  }
  return map[estado] || 'badge-espera'
}

export function formatDateTime(str) {
  if (!str) return '—'
  try {
    return new Date(str).toLocaleString('es-CO', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    })
  } catch { return str }
}

export function formatDateTimeInput(str) {
  if (!str) return ''
  try {
    const d = new Date(str)
    const pad = (n) => String(n).padStart(2, '0')
    return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
  } catch { return '' }
}
