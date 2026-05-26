from pydantic import BaseModel

class Movimiento(BaseModel):
    id_usuario: int
    id_producto: int
    cantidad: int
    tipo_operacion: str