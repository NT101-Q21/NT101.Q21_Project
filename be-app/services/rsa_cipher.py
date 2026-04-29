import math

def generate_keypair(p: int, q: int) -> dict:
    n = p * q
    phi = (p - 1) * (q - 1)
    
    # Chọn e cơ bản (thường là 65537, hoặc số nhỏ hơn thỏa mãn)
    e = 65537 if phi > 65537 else 3
    while math.gcd(e, phi) != 1:
        e += 2
        
    # Tính d là nghịch đảo modulo của e (Dùng hàm có sẵn của Python 3.8+)
    d = pow(e, -1, phi)
    
    return {"n": n, "e": e, "d": d}

def rsa_encrypt(text: str, e: int, n: int) -> list:
    # Mã hóa từng ký tự thành mảng các số nguyên
    return [pow(ord(char), e, n) for char in text]

def rsa_decrypt(cipher_array: list, d: int, n: int) -> str:
    # Giải mã từng số nguyên về lại ký tự
    return "".join([chr(pow(char, d, n)) for char in cipher_array])