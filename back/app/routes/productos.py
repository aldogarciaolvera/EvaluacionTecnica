from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.utils.auth import verify_token
from app.utils.roles import rol_requerido
from app.database.connection import get_db
from app.models.producto import Producto
from app.schemas.producto import ProductoCreate, StockUpdate

products_router = APIRouter()

@products_router.get("/obtener_productos")
def obtener_productos(db: Session = Depends(get_db), usuario = Depends(verify_token)):
    productos = db.query(Producto).all()
    return productos

@products_router.post("/agregar_producto")
def agregar_producto(data: ProductoCreate, db: Session = Depends(get_db), usuario = Depends(verify_token)):
    nuevo_producto = Producto(
        nombre = data.nombre,
        descripcion = data.descripcion,
        precio = data.precio,
        stock = 0,
        id_estatus = 1
    )
    db.add(nuevo_producto)
    db.commit()
    db.refresh(nuevo_producto)
    
    return nuevo_producto

@products_router.put("/activar_producto/{id_producto}")
def activar_producto(id_producto: int, db: Session = Depends(get_db), usuario = Depends(rol_requerido([1]))):
    producto = db.query(Producto).filter(Producto.id_producto == id_producto).first()
    if not producto:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    
    producto.id_estatus = 1
    db.commit()
    
    return {"message": "Producto activado exitosamente"}


@products_router.put("/desactivar_producto/{id_producto}")
def desactivar_producto(id_producto: int, db: Session = Depends(get_db), usuario = Depends(rol_requerido([1]))):
    producto = db.query(Producto).filter(Producto.id_producto == id_producto).first()
    if not producto:
        raise HTTPException(status_code=404, detail="Producto no encontrado")

    producto.id_estatus = 2
    db.commit()
    
    return {"message": "Producto desactivado exitosamente"}


@products_router.put("/incrementar_stock/{id_producto}")
def incrementar_stock(id_producto: int, data: StockUpdate, db: Session = Depends(get_db), usuario = Depends(rol_requerido([1]))):
    producto = db.query(Producto).filter(Producto.id_producto == id_producto).first()
    if not producto:
        raise HTTPException(status_code=404, detail="Producto no encontrado")

    if data.cantidad <= 0:
        raise HTTPException(status_code=400, detail="La cantidad debe ser mayor que cero")

    producto.stock = producto.stock + data.cantidad
    db.commit()
    db.refresh(producto)

    return {
        "message": "Stock actualizado correctamente",
        "stock": producto.stock,
    }
