from pydantic import BaseModel, EmailStr


class EmployeeCreate(BaseModel):

    name: str

    email: EmailStr

    designation: str

    phone: str

    department_id: int


class EmployeeOut(BaseModel):

    id: int

    name: str

    email: EmailStr

    designation: str

    phone: str

    department_id: int

    class Config:

        from_attributes = True