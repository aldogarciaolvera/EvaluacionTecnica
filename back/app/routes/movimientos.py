from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.utils.roles import rol_requerido
from app.database.connection import get_db
from app.models.producto import Producto
from app.models.historial import Historial
from app.schemas.movimiento import Movimiento

movimientos_router = APIRouter()

@movimientos_router.post("/movimiento_historico")
def movimiento_historico(data: Movimiento, db: Session = Depends(get_db), usuario = Depends(rol_requerido([1,2]))):
    producto = db.query(Producto).filter(Producto.id_producto == data.id_producto).first()
    if not producto:
        raise HTTPException(status_code = 404, detail = "Producto no encontrado")
    if data.tipo_operacion not in ["ENTRADA", "SALIDA"]:
        raise HTTPException(status_code = 400, detail = "Tipo de movimiento inválido")
    if data.tipo_operacion == "ENTRADA":
        producto.stock += data.cantidad
    elif data.tipo_operacion == "SALIDA":
        if producto.stock < data.cantidad:
            raise HTTPException(status_code = 400, detail = "Stock insuficiente para salida")
        producto.stock -= data.cantidad

    nuevo_historial = Historial(
        id_usuario = usuario["user_id"],
        id_producto = data.id_producto,
        tipo_operacion = data.tipo_operacion,
        cantidad = data.cantidad
    )
    
    db.add(nuevo_historial)
    db.commit()
    db.refresh(nuevo_historial)
    
    return {
        "message": "Movimiento registrado exitosamente", 
        "stock_actual": producto.stock
    }

@movimientos_router.get("/obtener_movimientos")
def obtener_movimientos(db: Session = Depends(get_db), usuario = Depends(rol_requerido([1,2]))):
    movimientos = db.query(Historial).all()
    
    return movimientos
