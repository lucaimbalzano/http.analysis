from typing import Any, Dict
from service.response.book import APIResponse, Response


def customResponse(status: int = 200, errors: Dict[str, Any] = None, data: Response = None) -> APIResponse:
    if errors is None:
        errors = {}
    if data is None:
        data = Response(url="", response={}, request={})
    
    return APIResponse(status=status, errors=errors, data=data)