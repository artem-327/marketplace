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

import WantedBoard from './WantedBoard'


function mapStateToProps(store, { datagrid }) {
  return {
    ...store.wantedBoard,
    ...datagrid,
    rows: datagrid.rows.map(po => {
      return {
        id: po.id,
        rawData: po,
        product: 'jmeno produktu',
        assayMin: 'text assayMin',
        assayMax: 'text assayMax',
        packaging: 'text packaging',
        manufacturer: 'text manufacturer',
        form: 'text form',
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
        quantity: 'text quantity',
        neededBy: 'text neededBy'
      }
    })
  }
}

export default withDatagrid(
  connect(mapStateToProps, {
    ...Actions,
  })(WantedBoard)
)
