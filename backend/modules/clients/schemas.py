from typing import Optional
from pydantic import BaseModel, ConfigDict, EmailStr

class ClientBase(BaseModel):
    nombre: str
    telefono: Optional[str] = None
    email: Optional[EmailStr] = None

class ClientCreate(ClientBase):
    pass

class ClientResponse(ClientBase):
    id: int
    empresa_id: int

    model_config = ConfigDict(from_attributes=True)
