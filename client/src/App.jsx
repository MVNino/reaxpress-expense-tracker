import { useState } from "react";
import Balance from "./components/Balance";
import CreateTransaction from "./components/CreateTransaction";
import Header from "./components/Header";
import IncomeExpense from "./components/IncomeExpense";
import TransactionList from "./components/TransactionList";

const App = () => {
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      name: "iPhone 15",
      amount: -600,
    },
    {
      id: 2,
      name: "Macbook Air",
      amount: -800,
    },
    {
      id: 3,
      name: "Withdraw money",
      amount: 1600,
    },
  ]);

  const income = transactions
    .map((transaction) => transaction.amount)
    .filter((amount) => amount > 0)
    .reduce((acc, transaction) => acc + transaction, 0);

  const expense = transactions
    .map((transaction) => transaction.amount)
    .filter((amount) => amount < 0)
    .reduce((acc, transaction) => acc + transaction, 0);

  const balance = income + expense;

  const generateUniqueId = () => Math.floor(Math.random() * 1000000);

  // Create New Transaction
  const handleAddTransaction = (name, amount) => {
    setTransactions([
      ...transactions,
      {
        id: generateUniqueId(),
        name,
        amount,
      },
    ]);
  };

  // Removal of Transaction
  const handleDeleteTransaction = (id) => {
    console.log('id hehe ', id)
    const newA = transactions.filter((transaction) => transaction.id !== id);
    console.log('new a ', newA)
    // setTransactions(newA);
  };

  return (
    <>
      <Header />
      <div className="container">
        <Balance balance={+balance} />
        <IncomeExpense income={+income} expense={+expense} />

        <TransactionList
          transactions={transactions}
          deleteTransaction={handleDeleteTransaction}
        />
        <CreateTransaction addTransaction={handleAddTransaction} />
      </div>
    </>
  );
};

export default App;
