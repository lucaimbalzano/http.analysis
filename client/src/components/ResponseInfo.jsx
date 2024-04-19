export default function ResponseInfo({ status, dateString, server }) {
  const date = new Date(dateString);
  const options = { weekday: "short", day: "2-digit", month: "short" };
  const formattedDate = date.toLocaleDateString("en-US", options);

  return (
    <>
      <div className="w-[250px] h-[400px] pt-2 rounded-xl">
        <p className="text-xs text-gray-600">RESPONSE</p>
        <div className="bg-gray-200 hover:bg-gray-300">
          <div className="pl-2 pt-2 pb-2">
            <p className="text-sm text-gray-800">HTTP/1.1 {status}</p>
          </div>
        </div>
        <div className="bg-gray-200 hover:bg-gray-300">
          <div className="pl-2 pt-2 pb-2">
            <p className="text-sm text-gray-800">Date: {formattedDate}</p>
          </div>
        </div>
        <div className="bg-gray-200 hover:bg-gray-300">
          <div className="pl-2 pt-2 pb-2">
            <p className="text-sm text-gray-800">Server: {server}</p>
          </div>
        </div>
      </div>
    </>
  );
}
