# Frontend - React + Vite + Styled-Components

<!-- Badges -->
[![GitHub Repo](https://img.shields.io/badge/github-repo-0066cc?logo=github&logoColor=white)](https://github.com/aldogarciaolvera/EvaluacionTecnica) [![Production Live](https://img.shields.io/badge/production-live-success?logo=vercel&logoColor=white)](https://evaluaciontecnica.atomsystems.org/) [![React](https://img.shields.io/badge/React-18.0-61DAFB?logo=react&logoColor=white)](https://reactjs.org) [![Vite](https://img.shields.io/badge/Vite-4.0-brightgreen?logo=vite&logoColor=white)](https://vitejs.dev) [![Zustand](https://img.shields.io/badge/Zustand-4.0-brown?logo=react&logoColor=white)](https://github.com/pmndrs/zustand) [![Styled Components](https://img.shields.io/badge/Styled--Components-5.0-DB7093?logo=styled-components&logoColor=white)](https://styled-components.com) [![pnpm](https://img.shields.io/badge/pnpm-7.0-0066cc?logo=pnpm&logoColor=white)](https://pnpm.io) [![Docker](https://img.shields.io/badge/Docker-%232496ED?logo=docker&logoColor=white)](https://www.docker.com)

Aplicación web para gestión de inventario. Desarrollada con React 18, Vite, y Zustand para state management.

### Funcionalidades Principales

1. **Sistema de Autenticación JWT**
   - Login con correo y contraseña.
   - Tokens auto-refrescables al expirar.
   - Cierre automático por inactividad (30 min con advertencia a 25 min).

2. **Control de Roles**
   - **Admin**: Acceso a Dashboard, Historial, creación de usuarios.
   - **Almacenista**: Acceso solo a Salidas.
   - Protección de rutas según rol.

3. **Dashboard (Admin)**
   - Lista de todos los productos con stock, precio, estado.
   - Opciones: Activar/Desactivar, Aumentar Stock.
   - Modal para crear nuevos productos.
   - Historial automático de cambios.

4. **Registro de Salidas (Almacenista)**
   - Lista de productos activos.
   - Modal para registrar salida con validación de stock.
   - Interfaz simplificada y segura.

5. **Historial de Movimientos (Admin)**
   - Vista de todas las ENTRADA/SALIDA de productos.
   - Filtrado por tipo de movimiento.
   - Muestra nombre del producto y usuario responsable.
   - Timestamps de operaciones.

6. **Gestión de Usuarios (Admin)**
   - Modal integrado en el menú de usuario.
   - Crear nuevos usuarios con validación de email.
   - Asignación de rol (Admin/Almacenista).
   - Prevención de emails duplicados.

7. **Tema Dinámico**
   - Toggle claro/oscuro.
   - Persistencia en localStorage.
   - Transiciones suaves.

## Stack Tecnológico

- **React 18**: Framework UI con hooks.
- **Vite**: Bundler ultra-rápido con HMR.
- **Zustand**: State management minimalista.
- **Styled-components**: CSS-in-JS con componentes.
- **Axios**: Cliente HTTP con interceptores.
- **React Router v6**: Enrutamiento con protección.
- **Lucide React**: Iconografía consistente.
- **pnpm**: Gestor de paquetes.

## Estructura de Carpetas

```
src/
├── api/
│   └── apiClient.js              # Axios + interceptores para JWT
├── components/
│   ├── dashboard/
│   │   └── DashboardPage.jsx     # Inventario principal
│   ├── salidas/
│   │   └── SalidasPage.jsx       # Registro de salidas
│   ├── historial/
│   │   └── HistorialPage.jsx     # Movimientos con filtrado
│   ├── login/
│   │   └── LoginPage.jsx         # Autenticación
│   └── ui/
│       ├── PageShell.jsx         # Layout principal
│       ├── Sidebar.jsx           # Menú lateral
│       ├── Modal.jsx             # Portal modal centrado
│       ├── Input.jsx             # Input reutilizable
│       ├── Boton.jsx             # Botón con variantes
│       ├── BotonTheme.jsx        # Toggle tema
│       └── SelectorRol.jsx       # Selector roles
├── store/
│   ├── useAuthStore.js           # Zustand auth
│   └── useThemeStore.js          # Zustand tema
├── theme/
│   └── theme.js                  # Temas light/dark
├── utils/
│   └── idle.js                   # Timer inactividad
├── App.jsx                       # Enrutamiento
├── main.jsx                      # Entry point
└── index.css                     # Estilos globales
```

## Configuración Inicial

### 1. Instalar Dependencias

```bash
cd front
pnpm install
```

### 2. Backend URL

Edita `src/api/apiClient.js` si el backend no está en `http://localhost:8001`:

```javascript
const API_BASE_URL = 'http://tu-backend:puerto';
```

### 3. Variables de Entorno (opcional)

`.env.local`:
```env
VITE_API_URL=http://localhost:8001
```

## Ejecución

### Desarrollo

```bash
pnpm dev
```

Abre `http://localhost:5173`.

### Build

```bash
pnpm run build
```

Genera `dist/` optimizado.

## Docker

### Build

```bash
docker build -t inventory-frontend .
```

### Run

```bash
docker run -p 80:80 inventory-frontend
```

Disponible en `http://localhost`.

## Flujos de Usuario

### Admin

1. Login → Dashboard (inventario).
2. Ver productos, aumentar stock, crear productos.
3. Acceder a Historial de movimientos.
4. Crear usuarios desde menú de usuario.
5. Logout.

### Almacenista

1. Login → Salidas.
2. Seleccionar producto y registrar salida.
3. Validación automática de stock.
4. Logout.