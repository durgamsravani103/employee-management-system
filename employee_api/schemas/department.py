from pydantic import BaseModel


class DepartmentCreate(BaseModel):
    name: str
    location: str


class DepartmentResponse(BaseModel):
    id: int
    name: str
    location: str

    class Config:
        from_attributes = True