import { InternalAxiosRequestConfig } from "axios";

interface ConfigsProps {
  configs: InternalAxiosRequestConfig;
}

function Configs({ configs }: ConfigsProps) {
  return (
    <div className="bg-gray-800 rounded-md overflow-hidden">
      <div className="border-b border-gray-700 px-4 py-3">Config</div>

      <div className="p-4">
        <div className="overflow-y-auto h-96">
          <pre>
            <code id="config" className="language-js line-numbers">
              {JSON.stringify(configs, null, 2)}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
}

export default Configs;
