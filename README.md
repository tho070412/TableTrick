# Table-Track — Gestor de Reservas

Aplicación web SPA desarrollada en React para que los anfitriones de un restaurante puedan gestionar las reservas de mesas de forma eficiente durante su turno.

## Demo en produccion
https://table-trick-orcin.vercel.app/

## 🛠️ Stack tecnológico

| Tecnología | Uso |
|---|---|
| React 18 + Vite | Framework y bundler |
| react-router-dom v6 | Enrutamiento SPA |
| Tailwind CSS v3 | Estilos |
| SweetAlert2 | Alertas y confirmaciones |
| Axios | Peticiones HTTP |
| MockAPI | API REST simulada |
| LocalStorage | Persistencia de sesión |



Estructura del recurso `reservas`:

| Campo | Tipo |
|---|---|
| `nombreCliente` | String |
| `fechaHora` | String |
| `cantidadPersonas` | Number |
| `estado` | String (`En Espera` / `Confirmada` / `Finalizada`) |

## 📁 Estructura del proyecto

```
src/
├── components/
│   ├── FilterBar.jsx
│   ├── Modal.jsx
│   ├── Navbar.jsx
│   ├── ProtectedRoute.jsx
│   ├── ReservationCard.jsx
│   ├── ReservationForm.jsx
│   ├── Spinner.jsx
│   └── StatsBar.jsx
├── hooks/
│   └── useReservas.js
├── layouts/
│   └── DashboardLayout.jsx
├── pages/
│   ├── LoginPage.jsx
│   └── PanelPage.jsx
├── services/
│   └── reservasService.js
└── utils/
    ├── auth.js
    └── helpers.js
```

## ⚙️ Instalación local

```bash
git clon https://github.com/tho070412/TableTrick.git
cd table-track
npm install
```
const BASE_URL = 'https://table-track-api.onrender.com/reservas'


```bash
npm run dev
```

## ✨ Funcionalidades

- 🔐 Login con nombre completo + selección de turno (Mañana/Tarde/Noche)
- 🛡️ Rutas protegidas
- 📋 Listado de reservas en tarjetas
- ➕ Crear reserva con validación de campos obligatorios
- ✏️ Editar cualquier dato de una reserva
- ✅ Botón rápido "Finalizar" para liberar mesa
- 🗑️ Cancelar reserva con confirmación SweetAlert2
- 📊 Panel de estadísticas (total, confirmadas, en espera, personas activas)
- 🔍 Filtros por estado
- ⏳ Spinner durante peticiones HTTP
- 📱 Diseño responsivo optimizado para tablet/móvil (uso en piso)

## 🌿 GitFlow

```
main → develop → feature/login-system
                → feature/reservations-crud
                → feature/ui-polishing
```

## 👤 Autor

Thomas Rodriguez Londoño
