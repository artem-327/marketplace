import React from 'react'
import PropTypes from 'prop-types'
import './SummaryTable.scss'
import { Button } from 'semantic-ui-react'
import { FormattedMessage } from 'react-intl'

const SummaryTable = ({ hasButton, children, title, handleContinue }) => {
  return (
    <div className='summary-table'>
      <header>
        <h2>{title}</h2>
        <i className='info'></i>
      </header>
      <main className='summary-main'>{children}</main>
      {hasButton && (
        <footer>
          <Button
            size='large'
            primary
            fluid
            attached='bottom'
            onClick={handleContinue}
            data-test='cart_summary_continue_btn'>
            {hasButton === true ? <FormattedMessage id='global.continue' defaultMessage='Continue' /> : hasButton}
          </Button>
        </footer>
      )}
    </div>
  )
}

export default SummaryTable

SummaryTable.propTypes = {
  hasButton: PropTypes.bool,
  children: PropTypes.node,
  title: PropTypes.string
}
