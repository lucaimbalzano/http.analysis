from fastapi import APIRouter, status, Depends
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from service.response.book import APIResponse, Response
from service.request.book import RegisterBookRequest
from core.database import get_session
from service.controller import book as bookController
from service.response.utils import customResponse
from datetime import datetime
from fastapi.encoders import jsonable_encoder


bookRouter = APIRouter(
    prefix="/book",
    tags=["Book"],
    responses={404: {"description": "Not found"}},
)   

baseUri = 'http://127.0.0.1:8000/book/';

@bookRouter.post('/HTTP/POST/add', status_code=status.HTTP_202_ACCEPTED)
async def create_book(data:RegisterBookRequest, dbSession: Session = Depends(get_session)):
    resourceUri = baseUri + '/HTTP/POST/add'
    return await bookController.createBook(data, dbSession, uri=resourceUri);

@bookRouter.put('/HTTP/PUT/update/{book_id}', status_code=status.HTTP_202_ACCEPTED)
async def update_book(book_id: int, data:RegisterBookRequest, dbSession: Session = Depends(get_session)):
    resourceUri = baseUri + '/HTTP/PUT/update'
    return await bookController.updateBook(book_id, data, dbSession, resourceUri);    

@bookRouter.get("/HTTP/GET/get-all-books", response_model=APIResponse)
async def get_books(dbSession: Session = Depends(get_session)):
    resourceUri = baseUri + '/HTTP/GET/get-all-books'
    return await bookController.getAllBooks(dbSession=dbSession, uri=resourceUri)

@bookRouter.get("/HTTP/GET/{book_id}", response_model=APIResponse)
async def get_book(book_id: int, dbSession: Session = Depends(get_session)):
    resourceUri = baseUri + '/HTTP/GET/'+str(book_id)
    res = await bookController.getBook(book_id=book_id, dbSession=dbSession)
    if res is None:
        response = Response(url=resourceUri,request={"date": datetime.now(), "content-type": "application/json"}, response={"message": "Book not found", "server": "uvicorn"})
        return customResponse(404,{"message": "Book not found"},data=response)        
    response = Response(url=resourceUri,request={"date": datetime.now(), "content-type": "application/json"}, response={"book": jsonable_encoder(res), "server": "uvicorn"})
    return customResponse(200,{},data=response)       

@bookRouter.delete("/HTTP/DELETE/{book_id}", status_code=status.HTTP_202_ACCEPTED)
async def delete_book(book_id: int, dbSession: Session = Depends(get_session)):
    resourceUri = f"{baseUri}/HTTP/DELETE/"+ str(book_id)
    return await bookController.deleteBook(book_id=book_id, uri=resourceUri, dbSession=dbSession)
    
            
@bookRouter.delete("/HTTP/DELETE/delete-isbn/{isbn}", status_code=status.HTTP_202_ACCEPTED)
async def delete_book(isbn: str, dbSession: Session = Depends(get_session)):
    await bookController.deleteBookByIsbn(isbn=isbn, dbSession=dbSession)
    return {"message": "Book has been succesfully deleted."}