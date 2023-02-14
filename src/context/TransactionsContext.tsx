import React from "react";
import { createContext } from "react";
import { api } from "../services/api";

interface ITransactions {
  id: number;
  title: string;
  amount: number;
  type: "deposit" | "withdraw";
  category: string;
  createdAt: string;
}

interface TransactionsProviderProps {
  children: React.ReactNode;
}

interface TransactionsContextProps {
  transactions: ITransactions[];
  createTransaction: (transaction: TransactionsInputType) => Promise<void>;
  setTransactions: React.Dispatch<React.SetStateAction<ITransactions[]>>;
}

type TransactionsInputType = Omit<ITransactions, "id" | "createdAt">;

const TransactionsContext = createContext<TransactionsContextProps>(
  {} as TransactionsContextProps
);

function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = React.useState<ITransactions[]>([]);

  React.useEffect(() => {
    api.get("/transactions").then((res) => {
      setTransactions(res.data.transactions);
    });
  }, []);

  async function createTransaction(transaction: TransactionsInputType) {
    try {
      const response = await api.post("/transactions", {
        ...transaction,
        createdAt: new Date(),
      });

      setTransactions([...transactions, response.data.transactions]);
    } catch (error) {}
  }

  return (
    <TransactionsContext.Provider
      value={{ transactions, setTransactions, createTransaction }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}

export { TransactionsContext, TransactionsProvider };
