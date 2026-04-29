from sqlalchemy import ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column

from db.base import Base


class Cliente(Base):
    __tablename__ = "clientes"

    id: Mapped[int] = mapped_column(primary_key=True)
    nombre: Mapped[str] = mapped_column(String(255), nullable=False)
    telefono: Mapped[str] = mapped_column(String(50), nullable=True)
    email: Mapped[str] = mapped_column(String(255), nullable=True)
    empresa_id: Mapped[int] = mapped_column(ForeignKey("empresas.id"), nullable=False)
