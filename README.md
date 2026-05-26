# Evaluacion Tecnica - Grupo Castores

Repositorio con la solución desarrollada para la evaluación técnica. Incluye respuestas de SQL, diseño relacional, scripts de base de datos y el backend construido con FastAPI.

## Estructura general

- `README.md`: visión general del proyecto completo.
- `back/`: backend con FastAPI, SQLAlchemy y autenticación JWT.
- `front/`: 
- `scripts/`: scripts SQL para crear tablas, relaciones y datos iniciales.
- `Respuestas_Evaluacion_Practica.pdf`: respuestas del cuestionario SQL.
- `Diagrama_BD.png`: diagrama relacional del modelo de datos.

## Documentación incluida

### 1. Conocimiento de SQL

En la raíz del repositorio se incluye el archivo con las respuestas a la evaluación teórica: [Respuestas_Evaluacion_Practica.pdf](Respuestas_Evaluacion_Practica.pdf).

### 2. Base de datos

El modelo relacional se documenta en [Diagrama_BD.png](Diagrama_BD.png) y los scripts se encuentran en `scripts/`.

Orden sugerido de ejecución:

1. `scripts/01.TABLES/`
2. `scripts/02.RELACION/`
3. `scripts/03.INSERTS/`

### 3. Backend

La implementación de la API vive en `back/` y su documentación técnica completa está en [back/README.md](back/README.md).

## Requerimientos generales

- Python 3.10 o superior.
- MySQL 8 o compatible.
- Variables de entorno para conexión a base de datos y JWT.
- Dependencias instaladas desde `back/requirements.txt`.


