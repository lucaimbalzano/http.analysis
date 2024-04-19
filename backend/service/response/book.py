from pydantic import BaseModel, HttpUrl
from typing import Dict, Any

class ModelBookResponse(BaseModel):
    id: str
    title: str
    author: str
    isbn: str
    publicationYear: str


class Response(BaseModel):
    url: HttpUrl
    response: Dict[str, Any]
    request: Dict[str, Any]

class APIResponse(BaseModel):
    status: int = 200
    errors: Dict[str, Any] = {}
    data: Response

# {
#  "status": 200,
#  "errors": {},
#  "data": {
#     "url": {},
#     "response":{},
#     "request": {}
#   }
# }