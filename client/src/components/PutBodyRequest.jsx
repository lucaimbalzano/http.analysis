import { useEffect, useState } from "react";
import { fetchBooks } from "../pages/handleRequests";

export default function PutBodyRequest({ bookSelected }) {
  const [bookUpdated, setBookUpdated] = useState({});
  const [idSelected, setIdSelected] = useState();

  useEffect(() => {
    async function fetchAllBooks() {
      var res = await fetchBooks(
        "http://localhost:8000/book/HTTP/GET/get-all-books",
        "GET"
      );
      setBookUpdated({ books: res.data.data.response.books });
    }
    fetchAllBooks();
  }, []);

  function handleBook(book) {
    setIdSelected(book.id);
    bookSelected(book);
  }

  const handleChangeInput = (event, index) => {
    const { id, value } = event.target;
    const updatedBooks = [...bookUpdated.books];
    const updatedBook = { ...updatedBooks[index] };
    updatedBook[id] = value;
    updatedBooks[index] = updatedBook;
    setBookUpdated((prevBookUpdated) => ({
      ...prevBookUpdated,
      books: updatedBooks,
    }));
    bookSelected({ ...updatedBooks[index] });
  };

  return (
    <div className="mt-2 p-3 w-48">
      <div className="bg-gray-200 rounded-lg text-center">
        <p className="uppercase text-gray-600 p-3">Books</p>
        {bookUpdated &&
          bookUpdated.books &&
          bookUpdated.books.map((book, index) => (
            <div key={index}>
              <button
                className="hover:scale-105 hover:shadow-xl hover:bg-gray-400 hover:text-gray-300 w-full"
                key={`${book.id}${index}`}
                onClick={() => handleBook(book)}
              >
                {book.id}::
                {book.isbn}
              </button>
              {idSelected && idSelected == book.id && (
                <>
                  <input
                    id="isbn"
                    type="text"
                    placeholder="isbn"
                    value={book.isbn}
                    onChange={(event) => handleChangeInput(event, index)}
                    className="p-3 mt-2 mb-2 w-32 rounded-xl"
                  />
                  <input
                    id="title"
                    type="text"
                    placeholder="title"
                    value={book.title}
                    onChange={(event) => handleChangeInput(event, index)}
                    className="p-3 mt-2 mb-2 w-32 rounded-xl"
                  />
                  <input
                    id="publicationYear"
                    type="text"
                    placeholder="publicationYear"
                    value={book.publicationYear}
                    onChange={(event) => handleChangeInput(event, index)}
                    className="p-3 mt-2 mb-2 w-32 rounded-xl"
                  />
                  <input
                    id="author"
                    type="text"
                    placeholder="author"
                    value={book.author}
                    onChange={(event) => handleChangeInput(event, index)}
                    className="p-3 mt-2 mb-2 w-32 rounded-xl"
                  />
                </>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}
