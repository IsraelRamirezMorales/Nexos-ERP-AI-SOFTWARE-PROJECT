from fastapi import FastAPI
from app.modules.users.router import router as users_router
from app.modules.auth.router import router as auth_router
from app.modules.products.router import router as products_router
from app.core.config import settings

app = FastAPI(title=settings.PROJECT_NAME)

app.include_router(users_router, prefix="/users", tags=["Users"])
app.include_router(auth_router, prefix="/auth", tags=["Auth"])
app.include_router(products_router, prefix="/products", tags=["Products"])

@app.get("/")
async def root():
    return {"message": "Welcome to Nexos ERP API", "docs": "/docs"}
