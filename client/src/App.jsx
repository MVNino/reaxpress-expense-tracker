import { useEffect, useState } from "react";
import Balance from "./components/Balance";
import CreateTransaction from "./components/CreateTransaction";
import Header from "./components/Header";
import IncomeExpense from "./components/IncomeExpense";
import TransactionList from "./components/TransactionList";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [transactionIsUpdated, setTransactionIsUpdated] = useState(false);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const getTasks = async () => {
      const transactionList = await fetchExpenses();

      setTransactions(transactionList.map((item) => item));
      setTransactionIsUpdated(true);
    };

    getTasks();
  }, []);

  const fetchExpenses = async () => {
    const response = await fetch("http://localhost:3000/api/expenses");

    const { data } = await response.json();

    return data;
  };

  if (transactionIsUpdated) {
    const incomeComputed = transactions
      .map((transaction) => transaction.amount)
      .filter((amount) => amount > 0)
      .reduce((acc, transaction) => acc + transaction, 0);

    setIncome(incomeComputed);

    const expenseComputed = transactions
      .map((transaction) => transaction.amount)
      .filter((amount) => amount < 0)
      .reduce((acc, transaction) => acc + transaction, 0);

    setExpense(expenseComputed);

    setBalance(incomeComputed + expenseComputed);

    setTransactionIsUpdated(false);
  }
  const generateUniqueId = () => Math.floor(Math.random() * 1000000);

  // Create New Transaction
  const handleAddTransaction = async (name, amount) => {
    const response = await fetch("http://localhost:3000/api/expenses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, amount }),
    });

    const data = await response.json();

    if (data) {
      setTransactions([
        ...transactions,
        {
          id: generateUniqueId(),
          name,
          amount,
        },
      ]);

      setTransactionIsUpdated(true);

      toast("Transaction added!");
    }
  };

  // Removal of Transaction
  const handleDeleteTransaction = async (id) => {
    const response = await fetch(`http://localhost:3000/api/expenses/${id}`, {
      method: "DELETE",
    });

    const data = await response.json();

    if (data) {
      const newTransactionArray = transactions.filter(
        (transaction) => transaction.id !== id
      );

      setTransactions(newTransactionArray);

      setTransactionIsUpdated(true);

      toast("Transaction deleted!");
    }
  };

  return (
    <>
      <ToastContainer />
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
