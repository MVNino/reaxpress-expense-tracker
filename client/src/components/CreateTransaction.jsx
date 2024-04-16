import { useState } from "react";
import PropTypes from "prop-types";

const CreateTransaction = ({ addTransaction }) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);

  const onSubmitAddTransaction = () => {
    addTransaction(name, +amount);

    // Clear form
    setName("");
    setAmount("");
  };

  return (
    <>
      <h3>Add new transaction</h3>
      <form id="form" onSubmit={(e) => e.preventDefault()}>
        <div className="form-control">
          <label htmlFor="text">Name</label>
          <input
            type="text"
            id="text"
            placeholder="Enter name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label htmlFor="amount">
            Amount <br />
            (negative - expense, positive - income)
          </label>
          <input
            type="number"
            id="amount"
            placeholder="Enter amount..."
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <button className="btn" onClick={onSubmitAddTransaction}>
          Add transaction
        </button>
      </form>
    </>
  );
};

CreateTransaction.propTypes = {
  addTransaction: PropTypes.func,
};

export default CreateTransaction;
