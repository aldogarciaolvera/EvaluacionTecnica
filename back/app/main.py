from fastapi import FastAPI
from scalar_fastapi import (
    get_scalar_api_reference, 
    Layout,
    DocumentDownloadType
)
from routes.auth import auth_router
from sqlalchemy import text
from database.connection import engine

app = FastAPI(
    title="Api Evaluacion Tecnica", 
    version="1.0.0", 
    description="API desarrollada para la evaluacion tecnica",
    docs_url=None,
    redoc_url=None)

@app.get("/", include_in_schema=False)
async def scalar_html():
    return get_scalar_api_reference(
        openapi_url=app.openapi_url,
        title=app.title,
        layout=Layout.MODERN,
        dark_mode=True,
        show_sidebar=True,
        persist_auth=True,
        document_download_type=DocumentDownloadType.NONE
    )

@app.get("/conexion")
def root():
    with engine.connect() as connection:
        result = connection.execute(text("SELECT '¡Conexión exitosa!' AS mensaje"))
        return {
            "db":"ok",
            "result": result.scalar()
        }

app.include_router(auth_router, tags=["Login"])
