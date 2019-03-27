import React from 'react';
import PropTypes from "prop-types"
import "./SummaryTable.scss"
import Button from '../../../../components/Button/Button'
import {FormattedMessage} from 'react-intl';

const SummaryTable = ({hasButton, children, title, handleContinue}) => {
  return (
    <div className="summary-table">
      <header>
        <h2>{title}</h2>
        <i className="info"></i>
      </header>
      <main className="summary-main">
        {children}
      </main>
      {hasButton && <footer>
        <Button
            size="large"
            color="blue"
            rounded="down"
            onClick={handleContinue}>
                <FormattedMessage
                    id='global.continue'
                    defaultMessage='Continue'
                />
        </Button>
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
