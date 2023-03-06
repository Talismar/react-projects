import { useEffect, useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { api } from "./services/api";
import Prism from "prismjs";
import Data from "./components/Data";
import Headers from "./components/Headers";
import Configs from "./components/Configs";

function App() {
  const [data, setData] = useState();
  const [headers, setHeaders] = useState<any>();
  const [configs, setConfigs] = useState<any>();
  const [status, setStatus] = useState<any>();

  useEffect(() => {
    Prism.highlightAll();
    // console.log(import.meta.env.VITE_SOME_KEY);
  }, [data, headers, configs]);

  function updateStates(response: AxiosResponse) {
    setData(response.data);
    setHeaders(response.headers);
    setConfigs(response.config);
    setStatus(response.status);
  }

  async function getToken() {
    try {
      const credentials = {
        username: "thalocanadmin",
        password: "Senha123*",
      };
      const response = await api.post("token/", credentials);
      api.defaults.headers["Authorization"] = "Bearer " + response.data.access;
      updateStates(response);
    } catch (error) {
      const errors = error as AxiosError;
      updateStates(errors.response as AxiosResponse);
    }
  }

  async function get() {
    try {
      const response = await api.get("users/me/");
      updateStates(response);
    } catch (error) {
      const errors = error as AxiosError;

      if (errors?.response?.status === 403) {
        getToken();
      }

      updateStates(errors.response as AxiosResponse);
    }
  }

  const post = async () => {
    try {
      const response = await api.post(
        "team_member/add_member/",
        {
          email: "talismar78sss8.una@gmail.com",
          study_id: 2,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Error updating 2222");
      updateStates(response);
    } catch (error) {
      const errors = error as AxiosError;
      console.log("Error updating");
      if (errors?.response?.status === 403) {
        getToken();
      }

      updateStates(errors.response as AxiosResponse);
    }
  };

  function multiple() {
    Promise.all([
      axios.get("https://jsonplaceholder.typicode.com/posts"),
      axios.get("https://jsonplaceholder.typicode.com/users"),
    ]).then((response) => {
      console.table(response[1].data);
    });
  }

  function transform() {
    axios
      .get("https://jsonplaceholder.typicode.com/users", {
        transformResponse: [
          function (data, headers) {
            const payload = JSON.parse(data).map(
              (item: { name: string }) => item.name
            );

            return payload;
          },
          function (data, headers) {
            console.log(data);
            return data;
          },
        ],
      })
      .then((response) => {
        setData(response.data);
        setHeaders(response.headers);
        setConfigs(response.config);
        setStatus(response.status);
      });
  }

  function clean() {
    setStatus(undefined);
    setData(undefined);
    setHeaders(undefined);
    setConfigs(undefined);
  }

  function cancel() {
    const controller = new AbortController();
    axios
      .get("https://jsonplaceholder.typicode.com/users", {
        signal: controller.signal,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    controller.abort();
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-300">
      <header className="border-b border-gray-800">
        <div className="container p-4 mx-auto text-center">
          <h1 className="font-medium text-xl">Biblioteca - Axios</h1>
        </div>
      </header>

      <section className="border-b border-gray-800">
        <div className="container p-4 mx-auto flex items-center justify-between">
          <div className="flex gap-2">
            <button
              onClick={get}
              type="button"
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded text-purple-700 bg-purple-100 hover:bg-purple-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              GET
            </button>

            <button
              onClick={post}
              type="button"
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              POST
            </button>

            <button
              id="put"
              type="button"
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              PUT
            </button>

            <button
              id="patch"
              type="button"
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded text-yellow-700 bg-yellow-100 hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            >
              PATCH
            </button>

            <button
              id="delete"
              type="button"
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              DELETE
            </button>

            <button
              onClick={multiple}
              type="button"
              className="inline-flex items-center px-3 py-2 border border-gray-700 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-500 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Múltiplos
            </button>

            <button
              onClick={transform}
              type="button"
              className="inline-flex items-center px-3 py-2 border border-gray-700 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-500 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Transform
            </button>

            <button
              id="error"
              type="button"
              className="inline-flex items-center px-3 py-2 border border-gray-700 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-500 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Error handling
            </button>

            <button
              onClick={cancel}
              type="button"
              className="inline-flex items-center px-3 py-2 border border-gray-700 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-500 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
          </div>

          <div>
            <button
              onClick={clean}
              type="button"
              className="inline-flex items-center px-3 py-2 border border-gray-700 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-500 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Limpar
            </button>
          </div>
        </div>
      </section>

      <main className="container p-4 mx-auto">
        <div className="grid grid-cols-2 gap-6">
          <Data data={data} status={status} />
          <Headers headers={headers} />
          <Configs configs={configs} />
        </div>
      </main>
    </div>
  );
}

export default App;
