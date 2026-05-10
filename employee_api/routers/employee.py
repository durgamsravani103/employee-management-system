from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db

from models.employee import Employee

from schemas.employee import EmployeeCreate


router = APIRouter(
    prefix="/employees",
    tags=["Employees"]
)


# GET ALL EMPLOYEES

@router.get("/")
def get_employees(
    db: Session = Depends(get_db)
):

    employees = db.query(Employee).all()

    return employees


# ADD EMPLOYEE

@router.post("/")
def add_employee(
    employee: EmployeeCreate,
    db: Session = Depends(get_db)
):

    new_employee = Employee(

        name=employee.name,

        email=employee.email,

        designation=employee.designation,

        phone=employee.phone,

        department_id=employee.department_id
    )

    db.add(new_employee)

    db.commit()

    db.refresh(new_employee)

    return new_employee


# UPDATE EMPLOYEE

@router.put("/{employee_id}")
def update_employee(
    employee_id: int,
    updated_employee: EmployeeCreate,
    db: Session = Depends(get_db)
):

    employee = db.query(Employee).filter(
        Employee.id == employee_id
    ).first()

    if not employee:

        return {
            "message": "Employee Not Found"
        }

    employee.name = updated_employee.name

    employee.email = updated_employee.email

    employee.designation = updated_employee.designation

    employee.phone = updated_employee.phone

    employee.department_id = updated_employee.department_id

    db.commit()

    db.refresh(employee)

    return employee


# DELETE EMPLOYEE

@router.delete("/{employee_id}")
def delete_employee(
    employee_id: int,
    db: Session = Depends(get_db)
):

    employee = db.query(Employee).filter(
        Employee.id == employee_id
    ).first()

    if not employee:

        return {
            "message": "Employee Not Found"
        }

    db.delete(employee)

    db.commit()

    return {
        "message": "Employee Deleted Successfully"
    }