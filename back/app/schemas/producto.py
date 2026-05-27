from pydantic import BaseModel, conint

class ProductoCreate(BaseModel):
    nombre: str
    descripcion: str
    precio: float

class StockUpdate(BaseModel):
    cantidad: conint(gt=0)
