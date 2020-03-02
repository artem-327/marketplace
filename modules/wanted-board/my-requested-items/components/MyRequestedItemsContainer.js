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

import MyRequestedItems from './MyRequestedItems'


function mapStateToProps(store, { datagrid }) {
  return {
    ...store.wantedBoard,
    ...datagrid,
    rows: datagrid.rows.map(po => {
      return {
        id: po.id,
        rawData: po,
        productName: 'grouping nazev',
        product: 'jmeno produktu',
        casNumber: 'text casNumber',
        assay: 'text assay',
        orderQuantity: 'text orderQuantity',
        orderFrequency: 'text orderFrequency',
        neededBy: 'text neededBy',
        dealExpired: 'text dealExpired',
        manufacturer: 'text manufacturer',
        condition: getSafe(() => po.conforming),
        deliveryLocation: 'text deliveryLocation',
        packaging: 'text packaging',
        deliveryPriceMax: 'text deliveryPriceMax',
        measurement: 'text measurement',
        fobQuote: 'text fobQuote',
        deliveredQuote: 'text deliveredQuote',
      }
    })
  }
}

export default withDatagrid(
  connect(mapStateToProps, {
    ...Actions,
  })(MyRequestedItems)
)
