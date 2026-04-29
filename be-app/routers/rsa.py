from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from services.rsa_cipher import generate_keypair, rsa_encrypt, rsa_decrypt

router = APIRouter(prefix="/api/rsa", tags=["RSA"])

class RSAKeyRequest(BaseModel):
    p: int
    q: int

class RSAEncryptRequest(BaseModel):
    text: str
    e: int
    n: int
    output_format: str # "Hexadecimal" hoặc "Decimal" hoặc "Both"

class RSADecryptRequest(BaseModel):
    text: str # Chuỗi đầu vào (có thể là hex hoặc mảng số)
    d: int
    n: int
    input_format: str 

@router.post("/generate-keys")
async def generate_keys(req: RSAKeyRequest):
    # Cần thêm logic kiểm tra p, q có phải số nguyên tố không nếu muốn chặt chẽ
    keys = generate_keypair(req.p, req.q)
    return keys

@router.post("/encrypt")
async def encrypt(req: RSAEncryptRequest):
    decimal_array = rsa_encrypt(req.text, req.e, req.n)
    
    if req.output_format == "Hexadecimal":
        result = " ".join([hex(num)[2:] for num in decimal_array])
    elif req.output_format == "Decimal":
        result = " ".join(map(str, decimal_array))
    else: # Both
        result = f"DEC: {' '.join(map(str, decimal_array))} \nHEX: {' '.join([hex(num)[2:] for num in decimal_array])}"
        
    return {"result": result}

@router.post("/decrypt")
async def decrypt(req: RSADecryptRequest):
    try:
        # Chuyển chuỗi nhận được thành mảng số nguyên để giải mã
        if req.input_format == "Hexadecimal":
            cipher_array = [int(x, 16) for x in req.text.split()]
        else:
            cipher_array = [int(x) for x in req.text.split()]
            
        plaintext = rsa_decrypt(cipher_array, req.d, req.n)
        return {"result": plaintext}
    except Exception as e:
        raise HTTPException(status_code=400, detail="Invalid input format or keys")