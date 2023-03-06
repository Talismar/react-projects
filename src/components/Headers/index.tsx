import { AxiosResponseHeaders } from "axios";
import React from "react";

interface HeadersProps {
  headers: AxiosResponseHeaders;
}

function Headers({ headers }: HeadersProps) {
  return (
    <div className="bg-gray-800 rounded-md overflow-hidden">
      <div className="border-b border-gray-700 px-4 py-3">Headers</div>

      <div className="p-4">
        <div className="overflow-y-auto h-96">
          <pre>
            <code id="headers" className="language-js line-numbers">
              {JSON.stringify(headers, null, 2)}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
}

export default Headers;
