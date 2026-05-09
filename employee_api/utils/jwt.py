SECRET_KEY = "your_secret_key_here"
ALGORITHM = "HS256"

def create_access_token(data: dict, expires_delta=None):
    from datetime import datetime, timedelta
    from jose import jwt

    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=30))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
