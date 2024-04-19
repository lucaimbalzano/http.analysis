import BookModel from "./BookModel.js"
import axios from 'axios';


const handleRequestsClient = async (method, uri, body) => {
  var response = {};
  if(body)
    if (typeof body.publicationYear === 'number') body.publicationYear = body.publicationYear.toString();
  if (uri.includes("GET/get-all-books")) {
    response = await fetchBooks(uri, method);
  }
  if (uri.includes("GET/")) {
    response = await fetchBookById(uri, method);
  }
  if (uri.includes("POST/add")) {
    response = await createBook(body);
  }
  if (uri.includes("PUT/update")) {
    response = await updateBook(body.id, body);
  }
  if (uri.includes("DELETE/")) {
    response = await deleteBook(uri);
  }
  return response;
};

const fetchHeaders = async (res) => {
  const headersObject = {};
  await res.headers.forEach(() => {
    for (const [name, value] of res.headers) {
      headersObject[name] = value;
    }
  });
  return headersObject;
};

const fetchBooks = async (uri, method) => {
  try {
    const res = await fetch(uri, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
    });
    var headersObject = await fetchHeaders(res);
    const data = await res.json();
    return { data, header: headersObject };
  } catch (error) {
    console.log(error);
  }
};

const fetchBookById = async (uri, method) => {
  try {
    const res = await fetch(uri, {
      method: method,
      headers: {
        accept: "application/json",
      },
    });
    var headersObject = await fetchHeaders(res);
    const data = await res.json();
    return { data, header: headersObject };
  } catch (error) {
    console.log(error);
  }
};

const updateBook = async (id, body) => {
  try {
    const res = await fetch(`/book/HTTP/PUT/update/${id}`, {
      method: "PUT",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    var headersObject = await fetchHeaders(res);
    const data = await res.json();
    return { data, header: headersObject };
  } catch (error) {
    console.log(error);
  }
};

const deleteBook = async (uri) => {
  try {
    const res = await fetch(uri, {
      method: "DELETE",
      headers: {
        accept: "application/json",
      },
    });
    var headersObject = await fetchHeaders(res);
    const data = await res.json();
    return { data, header: headersObject };
  } catch (error) {
    console.log(error);
  }
};

const createBook = async (body) => {
  try {
    const res = await fetch("/book/HTTP/POST/add", {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    var headersObject = await fetchHeaders(res);
    const data = await res.json();
    return { data, header: headersObject };
  } catch (error) {
    console.log(error);
  }
};

function generateTitle() {
  const adjectives = [
    "The",
    "A",
    "An",
    "My",
    "Your",
    "Our",
    "His",
    "Her",
    "Their",
  ];
  const nouns = [
    "Cat",
    "Dog",
    "House",
    "Tree",
    "Mountain",
    "Ocean",
    "Car",
    "Book",
    "Computer",
  ];
  const adjective =
    adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return `${adjective} ${noun}`;
}

function generateAuthor() {
  const firstNames = [
    "John",
    "Jane",
    "Alice",
    "Bob",
    "Emma",
    "Michael",
    "Emily",
    "David",
    "Sarah",
  ];
  const lastNames = [
    "Smith",
    "Johnson",
    "Williams",
    "Brown",
    "Jones",
    "Garcia",
    "Davis",
    "Martinez",
    "Miller",
  ];
  const firstName =
    firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName =
    lastNames[Math.floor(Math.random() * lastNames.length)];
  return `${firstName} ${lastName}`;
}

function generateISBN() {
  let isbn = "";
  for (let i = 0; i < 13; i++) {
    isbn += Math.floor(Math.random() * 10);
  }
  return isbn;
}

function generatePublicationYear() {
  const currentYear = new Date().getFullYear();
  return 1900 + Math.floor(Math.random() * (currentYear - 1900 + 1));
}

const generateRandomBook = async () => {
  return new BookModel(
    generateTitle(),
    generateAuthor(),
    generateISBN(),
    generatePublicationYear().toString()
  );
};

export default handleRequestsClient;
export { generateRandomBook, fetchBooks };
