import { useEffect, useState } from "react";

function parseUrl(url) {
  var parser = document.createElement("a");
  parser.href = url;

  var parsedUrl = {
    protocol: parser.protocol,
    domain: parser.hostname,
    path: parser.pathname,
  };

  return parsedUrl;
}

export default function UrlInfo({ urlResponse }) {
  const [url, setUrl] = useState();

  useEffect(() => {
    if (urlResponse) {
      setUrl(parseUrl(urlResponse));
    }
  }, [urlResponse]);

  return (
    <>
      <div className="bg-gray-200 w-[250px] h-[400px] pt-2 rounded-xl">
        <p className="text-xs text-gray-600 pl-2 mb-3">URL INFO</p>
        <div className="pt-2 pb-2 mt-1 bg-gray-300 hover:bg-gray-400 hover:shadow-lg hover:scale-105 mb-1">
          <p className="text-sm text-gray-800 pl-2">DOMAIN</p>
          <p className="text-gray-500 text-xs pl-2">{url && url.domain}</p>
        </div>
        <div className="pt-2 pb-2 mt-1 bg-gray-300 hover:bg-gray-400 hover:shadow-lg hover:scale-105 mb-1">
          <p className="text-sm text-gray-800 pl-2">PROTOCOL</p>
          <p className="text-gray-500 text-xs pl-2 uppercase">
            {url && url.protocol.split(":")[0]}
          </p>
        </div>
        <div className="pt-2 pb-2 mt-1 bg-gray-300 hover:bg-gray-400 hover:shadow-lg hover:scale-105 mb-1">
          <p className="text-sm text-gray-800 pl-2">PATH</p>
          <p className="text-gray-500 text-xs pl-2">{url && url.path}</p>
        </div>
      </div>
    </>
  );
}
