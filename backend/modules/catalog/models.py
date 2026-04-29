from datetime import datetime, timezone
from typing import List, Optional

from sqlalchemy import ForeignKey, String, Numeric, Integer, DateTime
from sqlalchemy.orm import Mapped, mapped_column, relationship

from db.base import Base


class Categoria(Base):
    __tablename__ = "categorias"

    id: Mapped[int] = mapped_column(primary_key=True)
    nombre: Mapped[str] = mapped_column(String(255), nullable=False)
    empresa_id: Mapped[int] = mapped_column(ForeignKey("empresas.id"), nullable=False)

    # Relationships
    productos: Mapped[List["Producto"]] = relationship(back_populates="categoria")


class Producto(Base):
    __tablename__ = "productos"

    id: Mapped[int] = mapped_column(primary_key=True)
    nombre: Mapped[str] = mapped_column(String(255), nullable=False)
    precio: Mapped[float] = mapped_column(Numeric(10, 2), nullable=False)
    stock: Mapped[int] = mapped_column(Integer, default=0)
    categoria_id: Mapped[int] = mapped_column(ForeignKey("categorias.id"), nullable=False)
    empresa_id: Mapped[int] = mapped_column(ForeignKey("empresas.id"), nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime, default=lambda: datetime.now(timezone.utc)
    )

    # Relationships
    categoria: Mapped["Categoria"] = relationship(back_populates="productos")
