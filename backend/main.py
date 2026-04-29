from fastapi import FastAPI

from core.config import settings
from modules.health.router import router as health_router


app = FastAPI(title=settings.PROJECT_NAME)
app.include_router(health_router)
