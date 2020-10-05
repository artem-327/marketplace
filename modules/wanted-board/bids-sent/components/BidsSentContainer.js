import React from 'react'
import { FormattedMessage, FormattedNumber } from 'react-intl'
import { connect } from 'react-redux'
import moment from 'moment/moment'

import { getLocationString } from '~/src/utils/functions'
import { withDatagrid } from '~/modules/datagrid'
//import { applyFilter } from '~/modules/filter/actions'
import * as Actions from '../../actions'

import { FormattedUnit, FormattedAssay } from '~/components/formatted-messages'
import { currency } from '~/constants/index'
import { getSafe } from '~/utils/functions'
import { getLocaleDateFormat } from '~/components/date-format'
import styled from 'styled-components'
import BidsSent from './BidsSent'
import { Label } from 'semantic-ui-react'

const LabelStatus = styled.div`
  font-size: 12px;
  padding: 5px 5px 5px 10px;
  background-color: ${props => (props.backgroundColor ? props.backgroundColor : '#2599d5')};
  height: 22px;
  border-radius: 11px;
  color: #ffffff;
  text-align: center;
  width: fit-content;
  padding: 1px 10px;
`

const StatusLabel = (status, type) => {
  if (!status) return ''

  let text, backgroundColor
  if (status === 'NEW' && type === 'NORMAL') {
    text = <FormattedMessage id='wantedBoard.pendingOffer' defaultMessage='Pending Offer' />
    backgroundColor = '#2599d5'
  } else if (status === 'REJECTED' && type === 'NORMAL') {
    text = <FormattedMessage id='wantedBoard.rejected' defaultMessage='Rejected' />
    backgroundColor = '#f16844'
  } else if (status === 'NEW' && type === 'COUNTER') {
    text = <FormattedMessage id='wantedBoard.pendingCounterOffer' defaultMessage='Pending Counter Offer' />
    backgroundColor = '#2599d5'
  } else if (
    (status === 'ACCEPTED_BY_BUYER' && type === 'NORMAL') ||
    (status === 'ACCEPTED_BY_SELLER' && type === 'COUNTER ')
  ) {
    text = <FormattedMessage id='wantedBoard.accepted' defaultMessage='Accepted' />
    backgroundColor = '#84c225'
  }
  //OLD
  // switch (status) {
  //   case 'NEW':
  //     text = <FormattedMessage id='global.new' defaultMessage='New' />
  //     backgroundColor = '#2599d5'
  //     break
  //   case 'ACCEPTED':
  //   case 'PURCHASED':
  //     text = <FormattedMessage id='wantedBoard.accepted' defaultMessage='Accepted' />
  //     backgroundColor = '#84c225'
  //     break
  //   case 'REJECTED':
  //     text = <FormattedMessage id='wantedBoard.rejected' defaultMessage='Rejected' />
  //     backgroundColor = '#f16844'
  //     break
  //   default:
  //     return null
  // }
  return <LabelStatus backgroundColor={backgroundColor}>{text}</LabelStatus>
}

function mapStateToProps(store, { datagrid }) {
  return {
    ...store.wantedBoard,
    editedId: store.wantedBoard.editWindowOpen === 'bids-sent' ? store.wantedBoard.editedId : null,
    tutorialCompleted: getSafe(() => store.auth.identity.tutorialCompleted, false),
    rows: datagrid.rows.map(po => {
      const condition = getSafe(() => po.productOffer.conforming, null)
      return {
        id: po.id,
        rawData: po,
        product: getSafe(() => po.productOffer.companyProduct.companyGenericProduct.name, ''),
        fobPrice: (
          <FormattedNumber
            minimumFractionDigits={2}
            maximumFractionDigits={2}
            style='currency'
            currency={currency}
            value={po.cfHistoryLastAveragePricePerUOM} //OLD po.pricePerUOM
          />
        ),
        manufacturer: getSafe(() => po.productOffer.companyProduct.companyGenericProduct.manufacturer.name, ''),
        condition:
          condition === null ? (
            ''
          ) : condition ? (
            <FormattedMessage id='global.conforming' defaultMessage='Conforming' />
          ) : (
            <FormattedMessage id='global.nonConforming' defaultMessage='Non Conforming' />
          ),
        status: StatusLabel(
          getSafe(() => po.cfHistoryLastStatus, ''),
          getSafe(() => po.cfHistoryLastType, '')
        ), //OLD new  StatusLabel(getSafe(() => po.status, '')),
        hiddenActions: po.status === 'PURCHASED' || po.status === 'REJECTED' || po.status === 'ACCEPTED',
        cfHistoryLastType: getSafe(() => po.purchaseRequest.cfHistoryLastType, 'COUNTER') // REMOVE counter
      }
    })
  }
}

export default withDatagrid(
  connect(mapStateToProps, {
    ...Actions
  })(BidsSent)
)
