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
import MyOffers from './MyOffers'
import { Label } from 'semantic-ui-react'

const StyledStatusLabel = styled(Label)`
  font-size: 12px !important;
  height: 22px !important;
  font-weight: normal !important;
  font-stretch: normal;
  font-style: normal;
  //line-height: 1.33 !important;
  color: #ffffff !important;
  border-radius: 11px !important;

  padding: 0.3333em 1.16667em 0.16667em 1.16667em !important;

  &.REJECTED {
    background-color: #f16844 !important;
  }
  &.PURCHASED,
  &.ACCEPTED {
    background-color: #84c225 !important;
  }
`

const StatusLabel = val => {
  let text
  switch (val) {
    case 'ACCEPTED':
    case 'PURCHASED':
      text = <FormattedMessage id='wantedBoard.accepted' defaultMessage='Accepted' />
      break
    case 'REJECTED':
      text = <FormattedMessage id='wantedBoard.rejected' defaultMessage='Rejected' />
      break
    default:
      return null
  }
  return <StyledStatusLabel className={val}>{text}</StyledStatusLabel>
}

function mapStateToProps(store, { datagrid }) {
  return {
    ...store.wantedBoard,
    ...datagrid,
    editedId: store.wantedBoard.editWindowOpen === 'my-offers' ? store.wantedBoard.editedId : null,
    tutorialCompleted: getSafe(() => store.auth.identity.tutorialCompleted, false),
    rows: datagrid.rows.map(po => {
      const condition = getSafe(() => po.productOffer.conforming, null)
      return {
        id: po.id,
        rawData: po,
        product: getSafe(() => po.productOffer.companyProduct.echoProduct.name, ''),
        fobPrice: <FormattedNumber style='currency' currency={currency} value={po.pricePerUOM} />,
        manufacturer: getSafe(() => po.productOffer.companyProduct.echoProduct.manufacturer.name, ''),
        condition:
          condition === null ? (
            ''
          ) : condition ? (
            <FormattedMessage id='global.conforming' defaultMessage='Conforming' />
          ) : (
            <FormattedMessage id='global.nonConforming' defaultMessage='Non Conforming' />
          ),
        status: StatusLabel(po.status),
        hiddenActions: po.status === 'PURCHASED' || po.status === 'REJECTED' || po.status === 'ACCEPTED'
      }
    })
  }
}

export default withDatagrid(
  connect(mapStateToProps, {
    ...Actions
  })(MyOffers)
)
