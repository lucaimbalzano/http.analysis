from dataclasses import asdict
from model.book import BookModel
from service.response.book import APIResponse, Response
from service.response.utils import customResponse
from datetime import datetime
from fastapi.exceptions import HTTPException
from fastapi.encoders import jsonable_encoder

async def createBook(data,dbSession, uri):
    book = dbSession.query(BookModel).filter(BookModel.isbn == data.isbn).first()
    if book:
        response = Response(url=uri,request={"date": datetime.now()}, response={"book": jsonable_encoder(book)})
        return customResponse(status=500,errors={"message": "Book already registered."}, data=response)
    
    new_book = BookModel()
    new_book.author = data.author
    new_book.title = data.title
    new_book.isbn = data.isbn
    new_book.publicationYear = data.publicationYear

    dbSession.add(new_book)
    dbSession.commit()
    dbSession.refresh(new_book)

    response = Response(url=uri,request={"date": datetime.now()}, response={"books": jsonable_encoder(new_book)})
    return customResponse(200,{},data=response)
    
async def updateBook(book_id, data, dbSession, uri):
    book =  await getBook(book_id, dbSession)
    if book is None:
        response = Response(url=uri,request={"date": datetime.now()})
        return customResponse(status=404,errors={"message": "Book not found."}, data=response)
    book.author = data.author
    book.isbn = data.isbn
    book.title = data.title
    book.publicationYear = data.publicationYear
    dbSession.commit()
    dbSession.refresh(book)
    response = Response(url=uri,request={"date": datetime.now()}, response={"books": jsonable_encoder(book)})
    return customResponse(200,{},data=response)

async def getAllBooks(dbSession, uri):
    books = dbSession.query(BookModel).all()
    if books is None:
        response = Response(url=uri,request={"date": datetime.now(), "content-type": "application/json"}, response={"message": "Book not found", "server": "uvicorn"})
        return customResponse(404,{"message": "Book not found"},data=response)        
    
    data = [BookModel(
        id=str(book.id),
        title=book.title,
        author=book.author,
        isbn=book.isbn,
        publicationYear=str(book.publicationYear)
    ) for book in books]
    books_data = [jsonable_encoder(book) for book in books]
    response = Response(url=uri,request={"date": datetime.now(), "content-type": "application/json"}, response={"books": books_data, "server": "uvicorn"})
    return customResponse(200,{},data=response)

async def getBook(book_id, dbSession):
    book = dbSession.query(BookModel).filter(BookModel.id == book_id).first()
    if not book:
        return None;
        # raise HTTPException(status_code=404, detail="Book, Not found.")
    book.publicationYear = str(book.publicationYear)
    book.id = str(book.id)
    return book

async def getBookByIsbn(isbn, dbSession):
    book = dbSession.query(BookModel).filter(BookModel.isbn == isbn).first()
    if not book:
        raise HTTPException(status_code=404, detail="Book, Not found.")
    book.publicationYear = str(book.publicationYear)
    return book

async def deleteBook(book_id, uri, dbSession):
    book = await getBook(book_id, dbSession)
    if book is None:
        response = Response(url=uri,request={"date": datetime.now(), "content-type": "application/json"}, response={"message": "Book not found", "server": "uvicorn"})
        return customResponse(404,{"message": "Book not found"},data=response)   
    
    dbSession.delete(book)
    dbSession.commit()
    response = Response(url=uri,request={"date": datetime.now(), "content-type": "application/json"}, response={"message": "Data deleted with success", "server": "uvicorn"})
    return customResponse(200,{},data=response)



async def deleteBookByIsbn(isbn, dbSession):
    book = await getBookByIsbn(str(isbn), dbSession)
    dbSession.delete(book)
    dbSession.commit()