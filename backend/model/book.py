from sqlalchemy import Boolean, Column, DateTime, Integer, String, func, ForeignKey
from sqlalchemy.orm import mapped_column, relationship
from core.database import Base

class BookModel(Base):
    __tablename__ = "book"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(100))
    author = Column(String(100))
    isbn = Column(String(13))
    publicationYear = Column(Integer)
