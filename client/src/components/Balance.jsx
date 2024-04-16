import PropTypes from "prop-types";

const Balance = ({ balance }) => {
  return (
    <>
      <h4>Your Balance</h4>
      <h1 id="balance">${balance}</h1>
    </>
  );
};

Balance.propTypes = {
  balance: PropTypes.number.isRequired,
};

export default Balance;
