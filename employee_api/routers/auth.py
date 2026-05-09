from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from jose import JWTError, jwt
from datetime import datetime, timedelta

from database import get_db
from models.user import User
from schemas.user import UserCreate, UserResponse
from utils.hashing import Hash

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)

SECRET_KEY = "mysecretkey"
ALGORITHM = "HS256"

security = HTTPBearer()


# ================= REGISTER =================

@router.post("/register", response_model=UserResponse)
def register(
    request: UserCreate,
    db: Session = Depends(get_db)
):

    existing_user = db.query(User).filter(
        User.username == request.username
    ).first()

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Username already exists"
        )

    hashed_password = Hash.bcrypt(request.password)

    new_user = User(
        username=request.username,
        hashed_password=hashed_password,
        role="user"
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user


# ================= CREATE TOKEN =================

def create_access_token(data: dict):

    to_encode = data.copy()

    expire = datetime.utcnow() + timedelta(minutes=60)

    to_encode.update({"exp": expire})

    encoded_jwt = jwt.encode(
        to_encode,
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    return encoded_jwt


# ================= LOGIN =================

@router.post("/login")
def login(
    request: UserCreate,
    db: Session = Depends(get_db)
):

    user = db.query(User).filter(
        User.username == request.username
    ).first()

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    if not Hash.verify(
        user.hashed_password,
        request.password
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid password"
        )

    access_token = create_access_token(
        data={
            "sub": user.username,
            "role": user.role
        }
    )

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }


# ================= GET CURRENT USER =================

@router.get("/me", response_model=UserResponse)
def get_me(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
):

    token = credentials.credentials

    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid token"
    )

    try:

        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        username = payload.get("sub")

        if username is None:
            raise credentials_exception

    except JWTError:
        raise credentials_exception

    user = db.query(User).filter(
        User.username == username
    ).first()

    if user is None:
        raise credentials_exception

    return user