from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from database.connection import get_db
from models.usuario import Usuario
from schemas.auth import LoginRequest
from utils.jwt import create_access_token

login_router = APIRouter()

fake_user = {
    "id": 1,
    "usuario": "admin",
    "password": "12345",
    "rol": "ADMIN"
}

@login_router.post("/login")
def login(data: LoginRequest, db: Session = Depends(get_db)):
    usuarios = db.query(Usuario).filter(
        Usuario.correo == data.correo, 
    ).first()

    if not usuarios:
        raise HTTPException(status_code=401, detail="Correo o contraseña incorrectos")
    
    if usuarios.contrasena != data.contrasena:
        raise HTTPException(status_code=401, detail="Correo o contraseña incorrectos")

    if usuarios.id_estatus != 1:
        raise HTTPException(status_code=403, detail="Usuario inactivo")    
    
    token = create_access_token({
        "user_id": usuarios.id_usuario,
        "correo": usuarios.correo,
        "rol": usuarios.id_rol})
    
    return {
        "access_token": token, 
        "token_type": "bearer",
        "usuario": usuarios.nombre,
        "rol": usuarios.id_rol
    }

