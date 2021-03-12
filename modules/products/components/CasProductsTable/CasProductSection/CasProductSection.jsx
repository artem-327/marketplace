/* eslint-disable react-hooks/exhaustive-deps */
import { connect } from 'react-redux'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl } from 'react-intl'
import { getSafe } from '~/utils/functions'

// Components
//import ErrorFocus from '../../../components/error-focus'


// Hooks
//import { usePrevious } from '../../../hooks'

// Styles
import {
} from './CasProductSection.styles'

const CasProductSection = props => {
  const [tmp, set ] = useState(false)

  const {
  } = props

  // Similar to call componentDidMount:
  useEffect(() => {
  }, [])  // If [] is empty then is similar as componentDidMount.


  // This useEffect is used similar as componentDidUpdate
  // Could by used in previous (above) useEffect, but this approach is more clear
  useEffect(() => {

  }, [/* variableName */])


  return (
    <div>
      tmp CasProductSection
    </div>
  )
}

CasProductSection.propTypes = {
  itemsCount: PropTypes.number
}

CasProductSection.defaultProps = {
  itemsCount: 0
}

function mapStateToProps(store) {
  return {

  }
}

export default injectIntl(CasProductSection)
//export default injectIntl(connect(mapStateToProps, {  })(CasProductSection))