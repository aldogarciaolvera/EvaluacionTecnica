from fastapi import APIRouter, HTTPException
from schemas.auth import LoginRequest
from utils.security import verify_password
from utils.jwt import create_access_token

auth_router = APIRouter()

fake_user = {
    "id": 1,
    "usuario": "admin",
    "password": "12345",
    "rol": "ADMIN"
}

@auth_router.post("/login")
def login(data: LoginRequest):
    if data.usuario != fake_user["usuario"]:
        raise HTTPException(status_code=401, detail="Usuario no encontrado")
    if not verify_password(data.contrasena, fake_user["password"]):
        raise HTTPException(status_code=401, detail="Contraseña incorrecta")
    token = create_access_token({"sub": fake_user["usuario"], "rol": fake_user["rol"]})
    return {"access_token": token, "token_type": "bearer"}

