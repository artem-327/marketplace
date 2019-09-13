import { connect } from 'react-redux'
import PhoneNumber from './PhoneNumber'
import * as Actions from '../actions'
import {injectIntl} from "react-intl";

function mapStateToProps({ phoneNumber }) {

  return {
    phoneCountryCodes: phoneNumber.phoneCountryCodes.map(d => {
      return {
        key: d.id,
        text: '+' + d.phoneCode,
        value: d.phoneCode,
        description: d.name,
      }
    }),
  }
}

export default connect(mapStateToProps, Actions)(injectIntl(PhoneNumber))