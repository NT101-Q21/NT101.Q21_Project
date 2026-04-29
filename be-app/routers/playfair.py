from fastapi import APIRouter
from pydantic import BaseModel
from services.playfair_cipher import process_playfair

router = APIRouter(prefix="/api/playfair", tags=["Playfair"])

class PlayfairRequest(BaseModel):
    text: str
    key: str

@router.post("/encrypt")
async def encrypt(req: PlayfairRequest):
    ciphertext = process_playfair(req.text, req.key, encrypt=True)
    return {"result": ciphertext}

@router.post("/decrypt")
async def decrypt(req: PlayfairRequest):
    plaintext = process_playfair(req.text, req.key, encrypt=False)
    return {"result": plaintext}