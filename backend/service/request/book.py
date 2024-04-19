from pydantic import BaseModel

class RegisterBookRequest(BaseModel):
    title: str
    author: str
    isbn: str
    publicationYear: str
    


