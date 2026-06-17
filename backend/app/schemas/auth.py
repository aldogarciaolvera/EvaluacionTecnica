from pydantic import BaseModel

class LoginRequest(BaseModel):
    correo: str
    contrasena: str


class RefreshRequest(BaseModel):
    refresh_token: str