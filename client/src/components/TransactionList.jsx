import PropTypes from "prop-types";

const TransactionList = ({ transactions, deleteTransaction }) => {
  const onDeleteTransaction = (id) => {
    deleteTransaction(id);
  };

  return (
    <>
      <h3>History</h3>
      <ul id="list" className="list">
        {Array.isArray(transactions) &&
          transactions.map((transaction) => (
            <li
              className={transaction.amount > 0 ? "plus" : "minus"}
              key={transaction.id}
            >
              {transaction.name} <span>${transaction.amount}</span>
              <button
                className="delete-btn"
                onClick={onDeleteTransaction(transaction.id)}
              >
                x
              </button>
            </li>
          ))}
      </ul>
    </>
  );
};

TransactionList.defaultProps = {
  transactions: [],
};

TransactionList.propTypes = {
  transactions: PropTypes.array.isRequired,
  deleteTransaction: PropTypes.func,
};

export default TransactionList;
