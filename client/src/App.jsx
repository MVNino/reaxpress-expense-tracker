import Balance from "./components/Balance";
import CreateTransaction from "./components/CreateTransaction";
import Header from "./components/Header";
import IncomeExpense from "./components/IncomeExpense";
import TransactionList from "./components/TransactionList";

const App = () => {
  return (
    <>
      <Header />
      <div className="container">
        <Balance />
        <IncomeExpense />

        <TransactionList />
        <CreateTransaction />
      </div>
    </>
  );
};

export default App;
