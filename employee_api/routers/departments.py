from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from database import get_db
from models.department import Department
from schemas.department import DepartmentCreate, DepartmentResponse

router = APIRouter(
    prefix="/departments",
    tags=["Departments"]
)


@router.post(
    "/",
    response_model=DepartmentResponse,
    status_code=status.HTTP_201_CREATED
)
def create_department(
    request: DepartmentCreate,
    db: Session = Depends(get_db)
):

    existing_department = db.query(Department).filter(
        Department.name == request.name
    ).first()

    if existing_department:
        raise HTTPException(
            status_code=400,
            detail="Department already exists"
        )

    new_department = Department(
        name=request.name,
        location=request.location
    )

    db.add(new_department)
    db.commit()
    db.refresh(new_department)

    return new_department


@router.get(
    "/",
    response_model=list[DepartmentResponse]
)
def get_all_departments(
    db: Session = Depends(get_db)
):

    departments = db.query(Department).all()

    return departments