# Evaluación Técnica - Grupo Castores

<!-- Badges -->
[![GitHub Repo](https://img.shields.io/badge/github-repo-0066cc?logo=github&logoColor=white)](https://github.com/aldogarciaolvera/EvaluacionTecnica) [![Production Live](https://img.shields.io/badge/production-live-success?logo=vercel&logoColor=white)](https://evaluaciontecnica.atomsystems.org/) [![React](https://img.shields.io/badge/React-18.0-61DAFB?logo=react&logoColor=white)](https://reactjs.org) [![Vite](https://img.shields.io/badge/Vite-4.0-brightgreen?logo=vite&logoColor=white)](https://vitejs.dev) [![FastAPI](https://img.shields.io/badge/FastAPI-0.95-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com) [![Python](https://img.shields.io/badge/Python-3.11-3776AB?logo=python&logoColor=white)](https://www.python.org) [![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?logo=mysql&logoColor=white)](https://www.mysql.com) [![Docker](https://img.shields.io/badge/Docker-%232496ED?logo=docker&logoColor=white)](https://www.docker.com) [![Node.js](https://img.shields.io/badge/Node.js-18.0-43853D?logo=node.js&logoColor=white)](https://nodejs.org) [![pnpm](https://img.shields.io/badge/pnpm-7.0-0066cc?logo=pnpm&logoColor=white)](https://pnpm.io)

Solución completa de un sistema de inventario con:

- **Backend** en `back/` usando FastAPI, SQLAlchemy y JWT.
- **Frontend** en `front/` usando React, Vite y Styled-components.
- **Base de datos** modelada con MySQL y scripts SQL para creación y datos iniciales.
- **IDE** todo el proyecto fue desarrollado con VsCode. Apoyado de Stitch para los diseños.

## Descripción rápida

Esta aplicación cubre un flujo de inventario con control de roles:

- **Administrador**: acceso a Dashboard, gestión de productos, historial y creación de usuarios.
- **Almacenista**: acceso a la pantalla de salidas para registrar movimientos de stock.
- Registro automático de historial en cada movimiento de inventario.
- Validaciones en backend y frontend para stock, emails y permisos.

## Contenido del repositorio

- `README.md`: visión general y guía rápida.
- `back/`: backend FastAPI.
- `front/`: frontend React + Vite.
- `scripts/`: SQL para crear tablas, relaciones y datos iniciales.
- `Respuestas_Evaluacion_Practica.pdf`: respuestas del cuestionario SQL.
- `Diagrama_BD.png`: diagrama relacional del modelo de datos.

## Documentación detallada

- Backend: [back/README.md](back/README.md)
- Frontend: [front/README.md](front/README.md)

## Project URL

Visita la aplicación en: [https://evaluaciontecnica.atomsystems.org/](https://evaluaciontecnica.atomsystems.org/)

## Requisitos generales

- **Python 3.10+**
- **MySQL 8+**
- **Node.js 18+**
- **pnpm** (o npm/yarn) para el frontend
- Variables de entorno adecuadas para la conexión a la base de datos y JWT

## Instalación y arranque rápido

### Iniciar la base de datos

Ejecutar los scripts en el siguiente orden:

1. `scripts/01.TABLES/`
2. `scripts/02.RELACION/`
3. `scripts/03.INSERTS/`

Esto crea las tablas, relaciones y datos iniciales requeridos para el funcionamiento.

### Backend

1. Ir a la carpeta `back/`.
2. Crear y activar un entorno virtual.
3. Instalar dependencias:

```bash
cd back
pip install -r requirements.txt
```

4. Ejecutar el servidor:

```bash
cd back/app
uvicorn main:app --reload --port 8001
```

### Frontend

1. Ir a la carpeta `front/`.
2. Instalar dependencias:

```bash
cd front
pnpm install
```

3. Ejecutar en modo desarrollo:

```bash
pnpm dev
```

4. Abrir el navegador en `http://localhost:5173`.

## Puntos importantes

- El backend registra movimientos de inventario automáticamente en el historial cuando se incrementa stock o se realiza una salida.
- El frontend protege rutas según el rol del usuario y muestra solo las opciones correspondientes.
- El README raíz mantiene una visión general; los detalles técnicos están en los README de [`back/`](back/README.md) y [`front/`](front/README.md).

## Docker

- El frontend cuenta con un `Dockerfile` que construye la app y la sirve con nginx.
- El backend también incluye un `Dockerfile` para ejecutar el servicio con uvicorn.



