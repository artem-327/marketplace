import React from 'react'
import './404.scss'
import '../../styles/flexboxgrid.scss'
import {FormattedMessage} from 'react-intl'

const NoMatch = () => (
  <div class='row center-xs middle-xs wrapper'>
    <div class='col-xs-8 hash'>
      #404
      <span class='lost'>
        <FormattedMessage id='notFound' defaultMessage='... think we are lost, sir !' />
      </span>
    </div>
  </div>
)

export default NoMatch
