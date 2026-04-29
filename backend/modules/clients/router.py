from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import select

from modules.auth.deps import get_current_user, get_db
from modules.auth.models import Usuario
from modules.clients import schemas, models

router = APIRouter()

@router.get("/", response_model=List[schemas.ClientResponse])
def read_clients(
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_current_user)
):
    return db.execute(
        select(models.Cliente).where(models.Cliente.empresa_id == current_user.empresa_id)
    ).scalars().all()

@router.post("/", response_model=schemas.ClientResponse)
def create_client(
    *,
    db: Session = Depends(get_db),
    client_in: schemas.ClientCreate,
    current_user: Usuario = Depends(get_current_user)
):
    db_client = models.Cliente(
        **client_in.model_dump(),
        empresa_id=current_user.empresa_id
    )
    db.add(db_client)
    db.commit()
    db.refresh(db_client)
    return db_client
