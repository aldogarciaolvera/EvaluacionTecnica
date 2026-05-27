from datetime import datetime
from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.database.connection import get_db
from app.models.usuario import Usuario
from app.schemas.auth import LoginRequest
from app.schemas.nuevo_usuario import NuevoUsuario
from app.utils.auth import verify_token, SECRET_KEY, ALGORITHM
from jose import JWTError, jwt
from app.utils.jwt import create_access_token, create_refresh_token
from app.schemas.auth import RefreshRequest
from app.utils.hash import hash_password, verify_password

login_router = APIRouter()

@login_router.post("/auth")
def auth(data: LoginRequest, db: Session = Depends(get_db)):
    usuarios = db.query(Usuario).filter(
        Usuario.correo == data.correo, 
    ).first()

    if not usuarios:
        raise HTTPException(status_code = 401, detail = "Correo o contraseña incorrectos")
    
    if usuarios.correo == "admin":
        if data.contrasena != usuarios.contrasena:
            raise HTTPException(status_code = 401, detail = "Correo o contraseña incorrectos")
    else:
        if not verify_password(data.contrasena, usuarios.contrasena):
            raise HTTPException(status_code = 401, detail = "Correo o contraseña incorrectos")

    if usuarios.id_estatus != 1:
        raise HTTPException(status_code = 403, detail = "Usuario inactivo")    
    
    token = create_access_token({
        "user_id": usuarios.id_usuario,
        "correo": usuarios.correo,
        "rol": usuarios.id_rol})
    refresh = create_refresh_token({
        "user_id": usuarios.id_usuario,
        "correo": usuarios.correo,
        "rol": usuarios.id_rol})

    return {
        "access_token": token,
        "refresh_token": refresh,
        "token_type": "bearer",
        "usuario": usuarios.nombre,
        "rol": usuarios.id_rol
    }


@login_router.post("/refresh")
def refresh_token(data: RefreshRequest):
    # validate refresh token and issue new access token
    try:
        payload = jwt.decode(data.refresh_token, SECRET_KEY, algorithms=[ALGORITHM])
    except JWTError:
        raise HTTPException(status_code=401, detail="Refresh token inválido")

    token = create_access_token({
        "user_id": payload.get('user_id'),
        "correo": payload.get('correo'),
        "rol": payload.get('rol')
    })

    return {"access_token": token, "token_type": "bearer"}

@login_router.post("/agregar_usuario")
def agregar_usuario(data: NuevoUsuario, db: Session = Depends(get_db), usuarios = Depends(verify_token)):
    nuevo_usuario = Usuario(
        nombre = data.nombre,
        correo = data.correo,
        contrasena = hash_password(data.contrasena),
        id_rol = data.id_rol,  
        id_estatus = 1,
        fecha_creacion = datetime()
    )
    
    db.add(nuevo_usuario)
    db.commit()
    db.refresh(nuevo_usuario)
    
    return {
        "message": "Usuario registrado exitosamente", 
        "usuario": nuevo_usuario.nombre,
        "correo": nuevo_usuario.correo
    }

