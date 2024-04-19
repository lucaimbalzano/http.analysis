import { useEffect, useState, useRef } from "react";
import ResponseTop from "../components/ResponseTop";
import RequestSender from "../components/RequestSender";
import UrlInfo from "../components/UrlInfo";
import ResponseInfo from "../components/ResponseInfo";
import handleRequestsClient from "./handleRequests";
import PutBodyRequest from "../components/PutBodyRequest";
import { generateRandomBook } from "./handleRequests";
import { fetchBooks } from "./handleRequests";

export default function Home() {
  const divRef = useRef(null);
  const [response, setResponse] = useState();
  const [method, setMethod] = useState("GET");
  const [bookSelect, setBookSelect] = useState();
  const [error, setError] = useState();
  const [inputText, setInputText] = useState("");
  const [idGetSingleBook, setIdGetSingleBook] = useState("");

  useEffect(() => {
    async function fetchAllBooks() {
      var res = await fetchBooks(
        "http://localhost:8000/book/HTTP/GET/get-all-books",
        "GET"
      );
      var lengthBook = res.data.data.response.books.length;
      var randomIndex = Math.floor(Math.random() * lengthBook);
      const idBook = res.data.data.response.books[randomIndex].id;
      setIdGetSingleBook(idBook);
    }
    fetchAllBooks();
  }, []);

  const handleClickGetSingleBook = () => {
    if (divRef.current) {
      setInputText(divRef.current.innerText.split("\n")[2]);
    }
  };

  const handleInputTextChange = (newValue) => {
    setInputText(newValue);
  };

  const handleRequestToSend = async (method, uri, body) => {
    var res = await handleRequestsClient(method, uri, body);
    setResponse({ ...response, ...res });
  };

  function methodHttpHandler(method) {
    setMethod(method);
  }

  function bookSelectedHandler(book) {
    setBookSelect(book);
  }

  const handleSendRequest = async () => {
    if (inputText == "") {
      setError(error);
      return;
    }
    let selectedMethod = method;
    if (method === "POST") {
      var body = await generateRandomBook();
      await handleRequestToSend(selectedMethod, inputText, body);
      return;
    }
    if (method === "PUT") {
      await handleRequestToSend(selectedMethod, inputText, bookSelect);
      return;
    }
    await handleRequestToSend(selectedMethod, inputText, null);
  };

  return (
    <div>
      <div className="h-screen flex flex-col justify-start items-center">
        <div className="flex flex-col-reverse">
          <div className="mt-24 md:mt-10">
            {response && response != undefined ? (
              <ResponseTop status={response.data.status} error={error} />
            ) : (
              <ResponseTop error={error} />
            )}
            <RequestSender
              methodHttpHandler={methodHttpHandler}
              handleSendRequest={handleSendRequest}
              inputText={inputText}
              setInputText={setInputText}
              handleInputTextChange={handleInputTextChange}
            />
          </div>
        </div>
        {method === "PUT" && (
          <PutBodyRequest bookSelected={bookSelectedHandler} />
        )}
        <div className="mt-4 flex flex-wrap gap-5 justify-center">
          {response && response != undefined && (
            <UrlInfo urlResponse={response.data.data.url} />
          )}
          {response && response != undefined && (
            <ResponseInfo
              status={response.data.status}
              server={response.header.server}
              dateString={response.header.date}
            />
          )}
        </div>
        <div
          className="flex flex-col text-center mt-5 pb-10 hover:scale-105"
          onClick={handleClickGetSingleBook}
          ref={divRef}
        >
          <p>SHARE</p>
          <div className="bg-gray-200 mt-3 p-2 rounded-xl ">
            http://localhost:8000/book/HTTP/GET/{idGetSingleBook}
          </div>
        </div>
      </div>
    </div>
  );
}
