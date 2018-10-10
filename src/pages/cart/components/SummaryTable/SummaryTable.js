import React from 'react';
import PropTypes from "prop-types"
import "./SummaryTable.css"
import Button from '../../../../components/Button/Button'

const SummaryTable = ({hasButton, children, title}) => {
  return (
    <div className="summary-table">
      <header>
        <h1>{title}</h1>
        <i className="fas fa-info-circle"></i>
      </header>
      <main className="summary-main">
        {children}
      </main>
      {hasButton && <footer>
        <Button size="large" color="blue" rounded="down">Continue</Button>
      </footer>}
    </div>
  );
};

export default SummaryTable;


SummaryTable.propTypes = {
  hasButton: PropTypes.bool,
  children: PropTypes.node,
  title: PropTypes.string
}
