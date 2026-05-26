# Backend - Evaluacion Tecnica Castores

API REST desarrollada con FastAPI para el ejercicio practico de autenticacion y gestion de productos.

## Que hace esta app

- Autentica usuarios con endpoint de login.
- Genera tokens JWT para sesiones.
- Protege endpoints de productos mediante token Bearer.
- Consulta y administra productos activos/inactivos en MySQL.

## Que contiene

Estructura principal dentro de `back/app/`:

- `main.py`: arranque de FastAPI y registro de rutas.
- `database/connection.py`: conexion a MySQL y sesion SQLAlchemy.
- `routes/login.py`: endpoint de autenticacion (`/login`).
- `routes/productos.py`: endpoints CRUD basicos para productos.
- `models/`: modelos ORM (`Usuario`, `Producto`).
- `schemas/`: validacion de payloads de entrada con Pydantic.
- `utils/jwt.py` y `utils/auth.py`: creacion y validacion de JWT.

## Requisitos

- Python 3.10+ (recomendado).
- MySQL disponible y base de datos creada.

## Instalacion

Desde la carpeta `back/`:

```bash
pip install -r requirements.txt
```

## Configuracion de entorno

1. Crea un archivo `.env` en `back/`.
2. Toma como base `back/.env.example`.
3. Completa variables:

```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=tu_base
DB_USER=tu_usuario
DB_PASSWORD=tu_password

SECRET_KEY=tu_clave_secreta_larga
ALGORITHM=HS256
```

Nota: el proyecto usa `SECRET_KEY` y `ALGORITHM` para JWT.

## Como ejecutar

Puedes correr la app de dos formas:

Desde `back/`:

```bash
uvicorn app.main:app --reload --port 8001
```

Desde `back/app/`:

```bash
uvicorn main:app --reload --port 8001
```

## Como usar la API

### 1) Login

- Endpoint: `POST /login`
- Body JSON:

```json
{
	"correo": "usuario@dominio.com",
	"contrasena": "123456"
}
```

Respuesta esperada: `access_token` y `token_type`.

### 2) Consumir endpoints protegidos

Envia el token en header:

```http
Authorization: Bearer <access_token>
```

Endpoints de productos:

- `GET /obtener_productos`
- `POST /agregar_producto`
- `PUT /activar_producto/{id_producto}`
- `PUT /desactivar_producto/{id_producto}`

## Dependencias principales

- FastAPI + Uvicorn
- SQLAlchemy + PyMySQL
- python-jose (JWT)
- python-dotenv
- passlib/bcrypt

## Problemas comunes

- Error de conexion MySQL: verifica variables `DB_*` y acceso a la base.
- Error de JWT: revisa que `SECRET_KEY` y `ALGORITHM` esten definidos.
- Error de imports al ejecutar: confirma que estas en la carpeta correcta (`back/` o `back/app/`) segun el comando usado.
