from pydantic import BaseModel

class NuevoUsuario(BaseModel):
    nombre: str
    correo: str
    contrasena: str
    id_rol: int