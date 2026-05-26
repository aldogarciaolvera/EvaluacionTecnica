from fastapi import APIRouter, Depends
from utils.auth import verify_token

products_router = APIRouter()

@products_router.get("/productos")
def get_products(usuario: dict = Depends(verify_token)):
    return {"message": "Ruta protegida", "usuario": usuario}