from fastapi import APIRouter, HTTPException, status

from core.config import settings
from modules.health.service import check_database_connection


router = APIRouter()


@router.get("/")
async def read_root() -> dict[str, str]:
    return {"status": "ok", "message": settings.API_ROOT_MESSAGE}


@router.get("/database")
def read_database_status() -> dict[str, str]:
    try:
        check_database_connection()
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Database connection failed",
        ) from exc

    return {"status": "ok", "database": "connected"}
