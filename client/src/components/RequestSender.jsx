import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";

export default function RequestSender({
  methodHttpHandler,
  handleSendRequest,
  inputText,
  setInputText,
  handleInputTextChange,
}) {
  const [method, setMethod] = useState("GET");
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const methodHandler = (e) => {
    const selectedMethod = e.target.value;
    setMethod(selectedMethod);
    methodHttpHandler(selectedMethod);
    if (selectedMethod === "PUT")
      handleInputTextChange("http://localhost:8000/book/HTTP/PUT/update/");
    if (selectedMethod === "POST")
      handleInputTextChange("http://localhost:8000/book/HTTP/POST/add/");
    if (selectedMethod === "GET")
      handleInputTextChange(
        "http://localhost:8000/book/HTTP/GET/get-all-books"
      );
    if (selectedMethod === "DELETE")
      handleInputTextChange("http://localhost:8000/book/HTTP/DELETE/");
  };

  useEffect(() => {
    setInputText(inputText);
  }, [inputText]);

  return (
    <div className="bg-gray-200 flex gap-2 p-3 rounded-lg w-full">
      <div className="relative hover:scale-105 hover:shadow-md">
        <select
          className="block appearance-none w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={method}
          onChange={methodHandler}
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
          <svg
            className="h-4 w-4 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path fillRule="evenodd" d="M10 12L6 8h8l-4 4z" />
          </svg>
        </div>
      </div>
      <input
        type="text"
        className="bg-gray-200 focus:outline-none focus:bg-gray-200 focus:border-blue-500 text-sm"
        value={inputText}
        onChange={(e) => handleInputTextChange(e.target.value)}
      />
      {isSmallScreen ? (
        <button
          className="bg-blue-500 text-white pt-1 pl-3 pr-3 pb-1 rounded-md hover:scale-105 hover:shadow-md"
          onClick={handleSendRequest}
        >
          <FiSearch />
        </button>
      ) : (
        <button
          className="bg-blue-500 text-white pt-1 pl-5 pr-5 pb-1 rounded-md hover:scale-105 hover:shadow-md"
          onClick={handleSendRequest}
        >
          SEND
        </button>
      )}
    </div>
  );
}
