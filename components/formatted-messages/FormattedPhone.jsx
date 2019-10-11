import React, { Component } from 'react'
import { string } from 'prop-types'
import { getSafe } from '~/utils/functions'
import {connect} from "react-redux";
import * as Actions from "../../modules/phoneNumber/actions";
import {injectIntl} from "react-intl";
import get from "lodash/get";

//import styled from 'styled-components'

function splitPhoneNumber(phone, phoneCountryCodes) {
  let filtered = phoneCountryCodes.filter(d => (    // filter possible country codes
    d.phoneCode === phone.replace('+', '').slice(0, d.phoneCode.length)
  ))

  let sorted = filtered.sort(function(a, b) {return b.phoneCode.length - a.phoneCode.length}) // sort by longest

  if (sorted.length > 0) {
    const p = phone.replace('+', '').slice(sorted[0].phoneCode.length)
    const phoneNumber =
      p.substr(0, 3) + ' ' +
      p.substr(3, 3) + ' ' +
      p.substr(6)

    return {
      phoneCountryCode: sorted[0].phoneCode,
      phoneNumber: phoneNumber.trim()
    }
  }
  else {
    return { phoneCountryCode: '', phoneNumber: phone }
  }
}

class FormattedPhone extends Component {
  render() {
    let { firstChar, value, empty, phoneCountryCodes } = this.props
    const phone = splitPhoneNumber(value, phoneCountryCodes)

    return (
      value.length
        ?
        (
          <span>
            {phone.phoneCountryCode.length
              ?
              (<>
                {firstChar}{phone.phoneCountryCode}{' '}
              </>)
              : ''
            }
            {phone.phoneNumber.length ?
              (<>
                {phone.phoneNumber}
              </>)
              : ''
            }
          </span>
        )
        :
        (<>{empty}</>)
    )
  }
}

FormattedPhone.propTypes = {
  value: string,
  firstChar: string,
  empty: string         // What to display if value is empty
}

FormattedPhone.defaultProps = {
  value: '',
  firstChar: '+',
  empty: ''
}

function mapStateToProps(state) {
  return {
    phoneCountryCodes: get(state, 'phoneNumber.phoneCountryCodes', [])
  }
}

export default connect(mapStateToProps, Actions)(injectIntl(FormattedPhone))