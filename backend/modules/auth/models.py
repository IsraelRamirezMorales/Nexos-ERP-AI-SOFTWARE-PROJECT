from datetime import datetime, timezone
from typing import List, Optional

from sqlalchemy import ForeignKey, String, Text, DateTime
from sqlalchemy.orm import Mapped, mapped_column, relationship

from db.base import Base


class Empresa(Base):
    __tablename__ = "empresas"

    id: Mapped[int] = mapped_column(primary_key=True)
    nombre: Mapped[str] = mapped_column(String(255), nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime, default=lambda: datetime.now(timezone.utc)
    )

    # Relationships
    usuarios: Mapped[List["Usuario"]] = relationship(back_populates="empresa")


class Usuario(Base):
    __tablename__ = "usuarios"

    id: Mapped[int] = mapped_column(primary_key=True)
    nombre: Mapped[str] = mapped_column(String(255), nullable=False)
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True, nullable=False)
    password: Mapped[str] = mapped_column(Text, nullable=False)
    empresa_id: Mapped[int] = mapped_column(ForeignKey("empresas.id"), nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime, default=lambda: datetime.now(timezone.utc)
    )

    # Relationships
    empresa: Mapped["Empresa"] = relationship(back_populates="usuarios")
