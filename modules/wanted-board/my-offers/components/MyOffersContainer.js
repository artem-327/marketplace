import React from 'react'
import { FormattedNumber } from 'react-intl'
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
  
  &.Rejected {
    background-color: #f16844 !important;
  }
  &.Purchased {
    background-color: #84c225 !important;
  }
`

const StatusLabel = (val) => {
  if (!val) return null
  return (
    <StyledStatusLabel className={val}>
      {val}
    </StyledStatusLabel>
  )
}

function mapStateToProps(store, { datagrid }) {
  return {
    ...store.wantedBoard,
    ...datagrid,
    //rows: datagrid.rows.map(po => {
    rows: [].map(po => {
      return {
        id: po.id,
        rawData: po,
        product: '',
        fobPrice:
          po.pricingTiers.length > 1 ? (
            <>
              {' '}
              <FormattedNumber
                style='currency'
                currency={currency}
                value={po.pricingTiers[po.pricingTiers.length - 1].pricePerUOM}
              />{' '}
              - <FormattedNumber style='currency' currency={currency} value={po.pricingTiers[0].pricePerUOM} />{' '}
            </>
          ) : (
            <>
              {' '}
              <FormattedNumber
                style='currency'
                currency={currency}
                value={getSafe(() => po.pricingTiers[0].pricePerUOM, 0)}
              />{' '}
            </>
          ),
        manufacturer: '',
        //condition: getSafe(() => po.conforming, ''),
        condition: StatusLabel('Rejected'),
        status: StatusLabel('Purchased'),
      }
    })
  }
}

export default withDatagrid(
  connect(mapStateToProps, {
    ...Actions,
  })(MyOffers)
)
