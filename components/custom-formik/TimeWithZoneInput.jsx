
import { FormattedMessage, injectIntl } from 'react-intl'
const timezone = require('moment-timezone')
import PropTypes from 'prop-types'

// Components
import ErrorFocus from '../error-focus'
import { Required } from '../constants/layout'

const TimeWithZoneInput = props => {

  console.log('!!!!!!!!!! aaaaa aaaaa', timezone.tz.names())

  return (
    <div>
      bla
    </div>
  )
}

export default injectIntl(TimeWithZoneInput)