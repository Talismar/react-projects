import React from "react";
import { TransactionsContext } from "../context/TransactionsContext";

function useTransactions() {
  const context = React.useContext(TransactionsContext);

  return context;
}

export { useTransactions };
