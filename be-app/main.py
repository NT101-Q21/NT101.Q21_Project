from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
# from routers import playfair, rsa
from routers import rsa

app = FastAPI(title="Cryptography API")

# Mở CORS cho Frontend Vite
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], # Cổng của React/Vite
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Nhúng các router
# app.include_router(playfair.router)
app.include_router(rsa.router)

@app.get("/")
def read_root():
    return {"message": "Backend is running!"}

# Cách chạy: Mở terminal gõ: uvicorn main:app --reload