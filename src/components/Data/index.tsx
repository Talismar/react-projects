interface DataProps {
  status: number;
  data: any;
}

function Data({ status, data }: DataProps) {
  return (
    <div className="col-span-2">
      <div className="bg-gray-800 rounded-md overflow-hidden">
        <div className="border-b border-gray-700 px-4 py-3 flex items-center justify-between">
          <div>Data</div>
          {status && (
            <div
              className={
                status >= 500
                  ? "inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-red-100 text-red-800"
                  : status >= 400
                  ? "inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-yellow-100 text-yellow-800"
                  : status >= 200
                  ? "inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-green-100 text-green-800"
                  : ""
              }
            >
              {status}
            </div>
          )}
        </div>

        <div className="p-4">
          {/* scrollbar scrollbar-thumb-gray-400 scrollbar-track-rose-50 */}
          <div className="overflow-y-auto h-96 ">
            <pre>
              <code id="data" className="language-js line-numbers">
                {JSON.stringify(data, null, 2)}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Data;
