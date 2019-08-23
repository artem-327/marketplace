import { connect } from 'react-redux'
import PhoneNumber from './PhoneNumber'
import * as Actions from '../actions'
import {injectIntl} from "react-intl";

function mapStateToProps({ phoneNumber }) {

  return {
    phoneCountryCodes: phoneNumber.phoneCountryCodes.map(d => {
      return {
        id: d.id,
        text: '' + d.id + ' ' + d.name,
        value: '' + d.id,
        //description: d.name
      }
    }),
  }
}

export default connect(mapStateToProps, Actions)(injectIntl(PhoneNumber))