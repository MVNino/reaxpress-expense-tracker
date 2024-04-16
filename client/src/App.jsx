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
      name: 'iPhone 15',
      amount: -600,
    },{
      id: 2,
      name: 'Macbook Air',
      amount: -800,
    },{
      id: 3,
      name: 'Withdraw money',
      amount: 1600,
    },
  ]);

  

  return (
    <>
      <Header />
      <div className="container">
        <Balance />
        <IncomeExpense />

        <TransactionList transactions={transactions} />
        <CreateTransaction />
      </div>
    </>
  );
};

export default App;
