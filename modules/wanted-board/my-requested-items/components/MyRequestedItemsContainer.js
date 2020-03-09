import React from 'react'
import {FormattedMessage, FormattedNumber} from 'react-intl'
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
import { ArrayToFirstItem } from '~/components/formatted-messages'

function mapStateToProps(store, { datagrid }) {
  return {
    ...store.wantedBoard,
    ...datagrid,
    rows: datagrid.rows.map(row => {
      //const qtyPart = getSafe(() => row.....packagingUnit.nameAbbreviation)
      const qtyPart = 'LB'
      return {
        id: row.id,
        rawData: row,
        //productName: 'grouping nazev',
        product: getSafe(() => row.element.echoProduct.name, 'N/A'),
        casNumber: getSafe(() => row.element.casProduct.casNumber, 'N/A'),
        assay: (<FormattedAssay
          min={getSafe(() => row.element.assayMin, null)}
          max={getSafe(() => row.element.assayMax, null)}
        />),
        orderQuantity: qtyPart ? <FormattedUnit unit={qtyPart} separator=' ' value={row.pkgAmount} /> : 'N/A',
        orderFrequency: 'N/A',
        neededBy: row.neededAt ? moment(row.neededAt).format(getLocaleDateFormat()) : 'N/A',
        dealExpired: row.expiresAt ? moment(row.expiresAt).format(getLocaleDateFormat()) : 'N/A',
        manufacturer:
          row.manufacturers &&
          row.manufacturers.length
            ? (<ArrayToFirstItem values={row.manufacturers.map(d => d.name)}/>)
            : (<FormattedMessage id='wantedBoard.any' defaultMessage='Any' />),
        condition: typeof row.conditionConforming === 'undefined'
          ? 'N/A'
          : (row.conditionConforming
              ? (<FormattedMessage id='global.conforming' defaultMessage='Conforming' />)
              : (<FormattedMessage id='global.nonConforming' defaultMessage='Non Conforming' />)
          ),
        deliveryLocation: row.deliveryProvince
          ? row.deliveryProvince.name
          : (row.deliveryCountry
              ? row.deliveryCountry.name
              : 'N/A'
          ),
        packaging: row.packagingTypes && row.packagingTypes.length
          ? <ArrayToFirstItem values={row.packagingTypes.map(d => d.name)} />
          : 'N/A',
        deliveryPriceMax: row.maximumPricePerUOM
          ? <FormattedNumber style='currency' currency={currency} value={row.maximumPricePerUOM} />
          : 'N/A',
        measurement: 'LB',
        fobQuote: '',
        deliveredQuote: '',
      }
    })
  }
}

export default withDatagrid(
  connect(mapStateToProps, {
    ...Actions,
  })(MyRequestedItems)
)
