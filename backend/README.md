# Backend - Evaluación Técnica Castores

<!-- Badges -->
[![FastAPI](https://img.shields.io/badge/FastAPI-0.95-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com) [![Python](https://img.shields.io/badge/Python-3.11-3776AB?logo=python&logoColor=white)](https://www.python.org) [![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-2.0-31648f?logo=sqlalchemy&logoColor=white)](https://www.sqlalchemy.org) [![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?logo=mysql&logoColor=white)](https://www.mysql.com) [![Docker](https://img.shields.io/badge/Docker-%232496ED?logo=docker&logoColor=white)](https://www.docker.com)

API REST desarrollada con **FastAPI** para gestión de inventario con autenticación JWT, control de roles, y registro automático de movimientos.

## Descripción General

El backend expone una API protegida que permite:

- **Autenticación**: Login con correo/contraseña y refresh tokens.
- **Control de Roles**: Dependencias reutilizables para validar admin/almacenista.
- **Gestión de Productos**: Crear, activar/desactivar, aumentar stock, registrar salidas.
- **Historial Automático**: Cada movimiento de stock se registra automáticamente en `historico`.
- **Consulta de Movimientos**: Filtrado y enriquecimiento con nombres de productos/usuarios.
- **Documentación Interactiva**: Scalar en la raíz del servicio.

## Características Principales

### Autenticación y Autorización

- JWT con `access_token` y `refresh_token`.
- Hash bcrypt para contraseñas.
- Validación de email con `email-validator`.
- Control de roles mediante dependencias (admin=1, almacenista=2).
- Rechazo automático si usuario inactivo (`id_estatus != 1`).

### Gestión de Productos

- Crear productos con nombre, descripción, precio.
- Activar/desactivar productos (cambia `id_estatus`).
- Aumentar stock (suma cantidad, registra ENTRADA en historial).
- Registrar salida (resta cantidad, valida stock, registra SALIDA en historial).
- Stock inicial es 0; solo aumenta con ENTRADA.

### Historial Automático

- Al incrementar stock o registrar salida, se crea automáticamente una fila en `historico`.
- Incluye: `id_usuario` (de token JWT), `id_producto`, `cantidad`, `tipo_operacion` (ENTRADA/SALIDA), `fecha_operacion` (ISO timestamp).
- Garantiza auditoría completa sin intervención del frontend.

### Consulta de Movimientos

- Enriquece resultados con nombres (outer join a `productos` y `usuarios`).
- Retorna: `id_historico`, `producto_nombre`, `usuario_nombre`, `cantidad`, `tipo_operacion`, `fecha_operacion`.

## Estructura del Proyecto

```
backend/
├───────app/
│       ├── main.py                        # FastAPI setup, Scalar, rutas
│       ├── database/
│       │   └── connection.py              # MySQL + SQLAlchemy
│       ├── models/
│       │   ├── usuario.py                 # ORM Usuario
│       │   ├── producto.py                # ORM Producto
│       │   └── historial.py               # ORM Historial
│       ├── routes/
│       │   ├── login.py                   # /api/login/auth, /refresh, /agregar_usuario
│       │   ├── productos.py               # /api/productos/* (CRUD, stock, movimientos)
│       │   └── movimientos.py             # /api/movimientos/obtener_movimientos
│       ├── schemas/
│       │   ├── auth.py                    # LoginRequest, RefreshRequest
│       │   ├── nuevo_usuario.py           # NuevoUsuario (EmailStr)
│       │   ├── producto.py                # ProductoCreate, StockUpdate
│       │   └── movimiento.py              # (Deprecated - historial automático)
│       └── utils/
│           ├── auth.py                    # verify_token (JWT)
│           ├── jwt.py                     # create_access_token, create_refresh_token
│           ├── hash.py                    # hash_password, verify_password
│           ├── roles.py                   # rol_requerido (dependencia)
│           └── security.py                # (Config JWT)
├───────requirements.txt                   # Dependencias Python
├───────Dockerfile                         # Build container
└───────README.md                          # Esta documentación
```

## Tecnologías Utilizadas

- **FastAPI**: Framework web async.
- **SQLAlchemy**: ORM para MySQL.
- **Pydantic**: Validación de datos.
- **PyJWT + python-jose**: Manejo de JWT.
- **Passlib + bcrypt**: Hash seguro de contraseñas.
- **Scalar**: Documentación interactiva (alternativa a Swagger).
- **MySQL**: Base de datos relacional.

## Requerimientos

### Requisitos Previos

- **Python 3.10+** (recomendado 3.11+)
- **MySQL 8.0+**
- **pip** o **pipenv**
- Base de datos creada antes de iniciar.

### Variables de Entorno

Crea archivo `.env` en `backend/`:

```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=evaluacion_tecnica
DB_USER=tu_usuario
DB_PASSWORD=tu_password_seguro
SECRET_KEY=clave_secreta_muy_larga_minimo_32_caracteres
ALGORITHM=HS256
```

## Preparación de Base de Datos

### 1. Crear Base de Datos

```sql
CREATE DATABASE evaluacion_tecnica CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 2. Ejecutar Scripts

En orden:

```bash
cd scripts
# 1. Crear tablas
source 01.TABLES/01.TABLE_usuarios.sql;
source 01.TABLES/02.TABLE_rol.sql;
source 01.TABLES/03.TABLE_productos.sql;
source 01.TABLES/04.TABLE_historico.sql;
source 01.TABLES/05.TABLE_catalogo_estatus.sql;

# 2. Relaciones
source 02.RELACION/01.RELACION_usuarios_rol.sql;
source 02.RELACION/02.RELACION_historico_usuario.sql;
source 02.RELACION/03.RELACION_historico_producto.sql;
source 02.RELACION/04.RELACION_usuarios_catalogoestatus.sql;
source 02.RELACION/05.RELACION_productos_catalogoestatus.sql;

# 3. Datos iniciales
source 03.INSERTS/01.INSERT_rol_admin.sql;
source 03.INSERTS/02.INSERT_rol_almacenista.sql;
source 03.INSERTS/03.INSERT_catalogo_estatus_activo.sql;
source 03.INSERTS/04.INSERT_catalogo_estatus_inactivo.sql;
source 03.INSERTS/05.INSERT_usuarios_admin.sql;
```

## Instalación

```bash
cd backend
pip install -r requirements.txt
```

## Ejecución

### Desarrollo

```bash
cd app
uvicorn main:app --reload --port 8001
```

### Producción

```bash
uvicorn app.main:app --port 8001 --workers 4
```

### Con Docker

```bash
docker build -t inventario-back .
docker run -p 8001:8001 --env-file .env inventario-back
```

## Documentación Interactiva

Una vez en ejecución: `http://localhost:8001`

Scalar es la interfaz de documentación por defecto. Permite probar endpoints directamente.

## Endpoints

### Autenticación

#### `POST /api/login/auth`
#### `POST /api/login/refresh`

### Usuarios

#### `POST /api/login/agregar_usuario`

### Productos

#### `GET /api/productos/obtener_productos`
#### `POST /api/productos/agregar_producto`
#### `PUT /api/productos/activar_producto/{id_producto}`
#### `PUT /api/productos/desactivar_producto/{id_producto}`
#### `PUT /api/productos/incrementar_stock/{id_producto}`
#### `PUT /api/productos/salida_producto/{id_producto}`

### Movimientos

#### `GET /api/movimientos/obtener_movimientos`

## Flujos Importantes

### 1. Login

1. POST `/api/login/auth` con correo/contraseña.
2. Backend valida en BD y retorna tokens.
3. Frontend almacena y usa `access_token` en headers.

### 2. Refresh Token

1. Axios intercepta response 401.
2. POST `/api/login/refresh` con `refresh_token`.
3. Si válido, obtiene nuevo `access_token`.
4. Reintenta request original.
5. Si refresh falla, fuerza logout.

### 3. Crear Producto

1. POST `/api/productos/agregar_producto`.
2. Stock inicial = 0.
3. Solo el admin puede cambiar estado luego.

### 4. Movimiento de Stock

1. **ENTRADA**: PUT `/api/productos/incrementar_stock/{id}`
   - Suma cantidad al stock.
   - Registra automáticamente fila en `historico` con `tipo_operacion = ENTRADA`.

2. **SALIDA**: PUT `/api/productos/salida_producto/{id}`
   - Valida producto activo y stock suficiente.
   - Resta cantidad del stock.
   - Registra automáticamente fila en `historico` con `tipo_operacion = SALIDA`.

### 5. Auditoría

- Cada movimiento crea registro en `historico` con usuario autenticado y timestamp ISO.
- No requiere llamada separada del frontend.
- Garantiza consistencia.
