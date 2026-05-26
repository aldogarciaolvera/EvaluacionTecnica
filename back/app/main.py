from fastapi import FastAPI
from scalar_fastapi import (
    get_scalar_api_reference, 
    Layout,
    DocumentDownloadType
)
from sqlalchemy import text
from routes.login import login_router
from routes.productos import products_router
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

app.include_router(login_router, tags=["Login"])
app.include_router(products_router, tags=["Productos"])