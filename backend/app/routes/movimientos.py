from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.utils.roles import rol_requerido
from app.database.connection import get_db
from app.models.producto import Producto
from app.models.historial import Historial
from app.models.usuario import Usuario

movimientos_router = APIRouter()



@movimientos_router.get("/obtener_movimientos")
def obtener_movimientos(db: Session = Depends(get_db), usuario = Depends(rol_requerido([1,2]))):
    movimientos = (
        db.query(
            Historial,
            Producto.nombre.label('producto_nombre'),
            Usuario.nombre.label('usuario_nombre')
        )
        .outerjoin(Producto, Producto.id_producto == Historial.id_producto)
        .outerjoin(Usuario, Usuario.id_usuario == Historial.id_usuario)
        .all()
    )

    resultados = []
    for movimiento, producto_nombre, usuario_nombre in movimientos:
        resultados.append({
            "id_historico": movimiento.id_historico,
            "id_producto": movimiento.id_producto,
            "producto_nombre": producto_nombre,
            "id_usuario": movimiento.id_usuario,
            "usuario_nombre": usuario_nombre,
            "cantidad": movimiento.cantidad,
            "tipo_operacion": movimiento.tipo_operacion,
            "fecha_operacion": movimiento.fecha_operacion,
        })

    return resultados
