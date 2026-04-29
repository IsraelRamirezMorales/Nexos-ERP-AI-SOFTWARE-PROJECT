from fastapi import FastAPI

from core.config import settings
from modules.health.router import router as health_router
from modules.auth.router import router as auth_router
from modules.catalog.router import router as catalog_router
from modules.clients.router import router as clients_router
from modules.sales.router import router as sales_router


from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(title=settings.PROJECT_NAME)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(health_router, prefix="/health", tags=["health"])
app.include_router(auth_router, prefix=f"{settings.API_V1_STR}/auth", tags=["auth"])
app.include_router(catalog_router, prefix=f"{settings.API_V1_STR}/catalog", tags=["catalog"])
app.include_router(clients_router, prefix=f"{settings.API_V1_STR}/clients", tags=["clients"])
app.include_router(sales_router, prefix=f"{settings.API_V1_STR}/sales", tags=["sales"])
