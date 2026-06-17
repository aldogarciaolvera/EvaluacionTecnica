from pydantic import BaseModel, EmailStr

class NuevoUsuario(BaseModel):
    nombre: str
    correo: EmailStr
    contrasena: str
    id_rol: int