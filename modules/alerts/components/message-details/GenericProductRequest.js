import React, { Component } from 'react'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { FormattedMessage } from 'react-intl'
import { withToastManager } from 'react-toast-notifications'
import moment from 'moment'
import { generateToastMarkup, getSafe } from '~/utils/functions'
import * as Actions from '../../actions'
import styled from 'styled-components'
import { Label } from 'semantic-ui-react'



class GenericProductRequest extends Component {
  render() {
    const { row } = this.props
    return (
      <div>
        GenericProductRequest Row detail test in div
        {' '}
        <div style={{ color: '#802020' }}>
          {row.id}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {

  }
}

export default connect(mapStateToProps, { ...Actions })(injectIntl(withToastManager(GenericProductRequest)))