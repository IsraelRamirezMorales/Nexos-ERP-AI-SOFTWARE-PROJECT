from datetime import datetime, timezone
from typing import List

from sqlalchemy import ForeignKey, Numeric, DateTime, Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship
from modules.catalog.models import Producto

from db.base import Base


class Venta(Base):
    __tablename__ = "ventas"

    id: Mapped[int] = mapped_column(primary_key=True)
    cliente_id: Mapped[int] = mapped_column(ForeignKey("clientes.id"), nullable=True)
    total: Mapped[float] = mapped_column(Numeric(10, 2), nullable=False)
    fecha: Mapped[datetime] = mapped_column(
        DateTime, default=lambda: datetime.now(timezone.utc)
    )
    empresa_id: Mapped[int] = mapped_column(ForeignKey("empresas.id"), nullable=False)

    # Relationships
    detalles: Mapped[List["DetalleVenta"]] = relationship(back_populates="venta", cascade="all, delete-orphan")


class DetalleVenta(Base):
    __tablename__ = "detalle_ventas"

    id: Mapped[int] = mapped_column(primary_key=True)
    venta_id: Mapped[int] = mapped_column(ForeignKey("ventas.id"), nullable=False)
    producto_id: Mapped[int] = mapped_column(ForeignKey("productos.id"), nullable=False)
    cantidad: Mapped[int] = mapped_column(Integer, nullable=False)
    precio: Mapped[float] = mapped_column(Numeric(10, 2), nullable=False)

    # Relationships
    venta: Mapped["Venta"] = relationship(back_populates="detalles")
    producto: Mapped["Producto"] = relationship(primaryjoin="DetalleVenta.producto_id == Producto.id")
