from datetime import datetime, timedelta

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from jose import jwt

from database import get_db
from models.user import User
from schemas.user import UserCreate, UserResponse
from utils.hashing import Hash
from dependencies import get_current_user

SECRET_KEY = "mysecretkey"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


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

    if not Hash.verify(user.hashed_password, request.password):
        raise HTTPException(
            status_code=401,
            detail="Invalid password"
        )

    access_token_expires = timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )

    access_token = create_access_token(
        data={"sub": user.username},
        expires_delta=access_token_expires
    )

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }


def create_access_token(
    data: dict,
    expires_delta: timedelta = None
):

    to_encode = data.copy()

    expire = datetime.utcnow() + expires_delta

    to_encode.update({"exp": expire})

    encoded_jwt = jwt.encode(
        to_encode,
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    return encoded_jwt


@router.get("/me", response_model=UserResponse)
def get_me(
    current_user: User = Depends(get_current_user)
):

    return current_user