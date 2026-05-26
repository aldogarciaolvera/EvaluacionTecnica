from fastapi import HTTPException, Depends
from app.utils.auth import verify_token

def rol_requerido(roles_aceptados: list):
    def checar_rol(ususario = Depends(verify_token)):
        if ususario['rol'] not in roles_aceptados:
            raise HTTPException(status_code=403, detail="No tienes permiso para acceder a este recurso")
        
        return ususario
    
    return checar_rol

