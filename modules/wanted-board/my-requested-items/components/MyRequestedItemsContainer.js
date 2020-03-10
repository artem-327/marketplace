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
      const productName = getSafe(() => row.element.echoProduct.name, null)
      //const qtyPart = getSafe(() => row.....packagingUnit.nameAbbreviation)
      const qtyPart = 'lb'
      return {
        id: row.id,
        rawData: row,
        //productName: 'grouping nazev',
        product: getSafe(() => row.element.echoProduct.name,
          <FormattedMessage id='wantedBoard.any' defaultMessage='Any' />
        ),
        casNumber: getSafe(() => row.element.casProduct.casNumber, 'N/A'),
        assay: productName
          ? 'N/A'
          : (<FormattedAssay
          min={getSafe(() => row.element.assayMin, null)}
          max={getSafe(() => row.element.assayMax, null)}
        />),
        orderQuantity: qtyPart
          ? <FormattedUnit unit={qtyPart} separator=' ' value={row.pkgAmount} />
          : <FormattedMessage id='wantedBoard.any' defaultMessage='Any' />,
        orderFrequency: <FormattedMessage id='wantedBoard.any' defaultMessage='Any' />,
        neededBy: row.neededAt
          ? moment(row.neededAt).format(getLocaleDateFormat())
          : <FormattedMessage id='wantedBoard.any' defaultMessage='Any' />,
        dealExpired: row.expiresAt
          ? moment(row.expiresAt).format(getLocaleDateFormat())
          : <FormattedMessage id='wantedBoard.any' defaultMessage='Any' />,
        manufacturer:
          row.manufacturers && row.manufacturers.length
            ? (<ArrayToFirstItem values={row.manufacturers.map(d => d.name)}/>)
            : (<FormattedMessage id='wantedBoard.any' defaultMessage='Any' />),
        condition: typeof row.conditionConforming === 'undefined'
          ? <FormattedMessage id='wantedBoard.any' defaultMessage='Any' />
          : (row.conditionConforming
              ? (<FormattedMessage id='global.conforming' defaultMessage='Conforming' />)
              : (<FormattedMessage id='global.nonConforming' defaultMessage='Non Conforming' />)
          ),
        deliveryLocation: row.deliveryProvince
          ? row.deliveryProvince.name
          : (row.deliveryCountry
              ? row.deliveryCountry.name
              : <FormattedMessage id='wantedBoard.any' defaultMessage='Any' />
          ),
        packaging: row.packagingTypes && row.packagingTypes.length
          ? <ArrayToFirstItem values={row.packagingTypes.map(d => d.name)} />
          : <FormattedMessage id='wantedBoard.any' defaultMessage='Any' />,
        deliveryPriceMax: row.maximumPricePerUOM
          ? <FormattedNumber style='currency' currency={currency} value={row.maximumPricePerUOM} />
          : <FormattedMessage id='wantedBoard.any' defaultMessage='Any' />,
        measurement: 'lb',
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
