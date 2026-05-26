# Backend - Evaluacion Tecnica Castores

API REST desarrollada con FastAPI para cubrir autenticacion, gestion de productos y registro de movimientos de inventario.

## Descripcion general

El backend expone una API protegida con JWT que permite:

- Autenticar usuarios mediante correo y contraseña.
- Diferenciar acceso por rol con dependencias reutilizables.
- Consultar, registrar, activar y desactivar productos.
- Registrar movimientos de inventario en el historico.
- Consultar el historico de movimientos.
- Publicar la documentacion interactiva mediante Scalar en la ruta raiz del servicio.

## Estructura principal

Dentro de `back/app/`:

- `main.py`: arranque de FastAPI, configuracion de Scalar y registro de rutas.
- `database/connection.py`: conexion a MySQL y administracion de sesiones SQLAlchemy.
- `routes/login.py`: login y alta de usuarios.
- `routes/productos.py`: operaciones sobre productos.
- `routes/movimientos.py`: registro y consulta de movimientos.
- `models/`: modelos ORM de usuarios, productos e historico.
- `schemas/`: validacion de entradas con Pydantic.
- `utils/`: utilidades de JWT, autenticacion, hashing y control de roles.

## Requerimientos

### Requisitos previos

- Python 3.10 o superior.
- MySQL 8 o compatible.
- Base de datos creada antes de iniciar la API.
- Variables de entorno configuradas.

### Variables de entorno necesarias

El proyecto espera un archivo `.env` en `back/` con valores como estos:

```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=evaluacion_tecnica
DB_USER=tu_usuario
DB_PASSWORD=tu_password
SECRET_KEY=una_clave_secreta_larga
ALGORITHM=HS256
```

## Preparacion de base de datos

Ejecuta los scripts en este orden:

1. `scripts/01.TABLES/`
2. `scripts/02.RELACION/`
3. `scripts/03.INSERTS/`

Esto crea las tablas, sus relaciones y los datos iniciales para roles, estatus y usuario administrador.

## Instalacion

Desde la carpeta `back/`:

```bash
pip install -r requirements.txt
```

## Ejecucion

Desde `back/app/`:

```bash
uvicorn main:app --reload --port 8001
```

## Documentacion interactiva

Una vez levantado el servicio, Scalar queda disponible en la ruta raíz configurada por FastAPI, normalmente `http://localhost:8001/`.

## Endpoints

### Autenticacion

- `POST /api/login/auth`

### Usuarios

- `POST /api/login/agregar_usuario` - requiere token.

### Productos

- `GET /api/productos/obtener_productos` - requiere token.
- `POST /api/productos/agregar_producto` - requiere token.
- `PUT /api/productos/activar_producto/{id_producto}` - requiere token y rol de administrador.
- `PUT /api/productos/desactivar_producto/{id_producto}` - requiere token y rol de administrador.

### Movimientos

- `POST /api/movimientos/movimiento_historico` - requiere token y rol administrador o almacenista.
- `GET /api/movimientos/obtener_movimientos` - requiere token y rol administrador o almacenista.

## Modelo de acceso

- El endpoint de login emite un JWT con el identificador del usuario, correo y rol.
- El decorador de roles valida acceso según los roles permitidos por endpoint.
- El usuario con correo `admin` conserva contraseña en texto plano en la BD por compatibilidad con la carga inicial.
- El resto de usuarios se autentica con verificacion de hash usando bcrypt.

## Dependencias principales

- FastAPI y Uvicorn.
- SQLAlchemy y PyMySQL.
- python-jose para JWT.
- passlib con bcrypt para hashing.
- python-dotenv para cargar variables de entorno.
- scalar-fastapi para la documentacion interactiva.

## Estructura de datos relevante

- `usuarios`: informacion de autenticacion y rol.
- `productos`: catalogo de productos con stock y estatus.
- `historico`: registro de entradas y salidas de inventario.

## Problemas comunes

- Error de conexion a MySQL: revisa `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER` y `DB_PASSWORD`.
- Error al generar o validar JWT: confirma `SECRET_KEY` y `ALGORITHM`.
- Error al importar modulos: ejecuta el comando desde la carpeta indicada en la seccion de ejecucion.
- Error con bcrypt: reinstala dependencias si el entorno local no tiene soporte correcto para hashing.

