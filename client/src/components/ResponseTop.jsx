import React from "react";

export default function ResponseTop({ status, error }) {
  var message = "";
  if (status != undefined || status != null)
    if (status == 200) message = "Everything is fine!";
    else {
      message = "Oh oh, something went wrong!";
    }
  return (
    <>
      <div className="flex flex-col text-center mb-3">
        <p className="text-4xl">{status}</p>
        <p className="text-xs text-gray-600">{message}</p>
        {error && (
          <p className="text-sm text-red-500">You must insert a uri!</p>
        )}
      </div>
    </>
  );
}
