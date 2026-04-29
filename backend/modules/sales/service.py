from typing import List
from sqlalchemy.orm import Session
from sqlalchemy import select

from modules.sales.models import Venta, DetalleVenta
from modules.sales.schemas import SaleCreate
from modules.catalog.models import Producto
from fastapi import HTTPException


def get_sales(db: Session, empresa_id: int) -> List[Venta]:
    return db.execute(
        select(Venta).where(Venta.empresa_id == empresa_id).order_by(Venta.fecha.desc())
    ).scalars().all()


def create_sale(db: Session, sale_in: SaleCreate, empresa_id: int) -> Venta:
    # 1. Start a transaction (handled by db.commit() at the end or explicit begin)
    # We will verify all products first
    
    total_calculated = 0
    sale_details_objects = []
    
    for detail in sale_in.detalles:
        # Get product and verify stock
        product = db.execute(
            select(Producto).where(Producto.id == detail.producto_id, Producto.empresa_id == empresa_id)
        ).scalar_one_or_none()
        
        if not product:
            raise HTTPException(status_code=404, detail=f"Product {detail.producto_id} not found")
        
        if product.stock < detail.cantidad:
            raise HTTPException(
                status_code=400, 
                detail=f"Insufficient stock for {product.nombre}. Available: {product.stock}"
            )
        
        # Update stock
        product.stock -= detail.cantidad
        db.add(product)
        
        # Prepare detail object
        sale_details_objects.append(
            DetalleVenta(
                producto_id=detail.producto_id,
                cantidad=detail.cantidad,
                precio=detail.precio
            )
        )
        total_calculated += detail.precio * detail.cantidad

    # 2. Create Sale
    new_sale = Venta(
        cliente_id=sale_in.cliente_id,
        total=total_calculated, # Use calculated total for safety
        empresa_id=empresa_id,
        detalles=sale_details_objects
    )
    
    db.add(new_sale)
    db.commit()
    db.refresh(new_sale)
    return new_sale
