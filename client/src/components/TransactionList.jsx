const TransactionList = (props) => {
  const { transactions } = props;
  console.log("props : ", props);

  return (
    <>
      <h3>History</h3>
      <ul id="list" className="list">
        {Array.isArray(transactions) &&
          transactions.map((transaction) => (
            <li className="minus" key={transaction.id}>
              {transaction.name} <span>-${transaction.amount}</span>
              <button className="delete-btn">x</button>
            </li>
          ))}
      </ul>
    </>
  );
};

export default TransactionList;
