from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, ConfigDict


class SaleDetailBase(BaseModel):
    producto_id: int
    cantidad: int
    precio: float


class SaleDetailCreate(SaleDetailBase):
    pass


class SaleDetailResponse(SaleDetailBase):
    id: int
    venta_id: int

    model_config = ConfigDict(from_attributes=True)


class SaleBase(BaseModel):
    cliente_id: Optional[int] = None
    total: float


class SaleCreate(SaleBase):
    detalles: List[SaleDetailCreate]


class SaleResponse(SaleBase):
    id: int
    fecha: datetime
    empresa_id: int
    detalles: List[SaleDetailResponse]

    model_config = ConfigDict(from_attributes=True)
