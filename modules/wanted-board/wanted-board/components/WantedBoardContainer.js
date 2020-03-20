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
import { ArrayToFirstItem } from '~/components/formatted-messages'
import WantedBoard from './WantedBoard'


function mapStateToProps(store, { datagrid }) {

  return {
    ...store.wantedBoard,
    ...datagrid,
    type: store.wantedBoard.wantedBoardType,
    rows: datagrid.rows.map(row => {
      const qtyPart = getSafe(() => row.unit.nameAbbreviation)
      return {
        id: row.id,
        rawData: row,
        product: getSafe(() => row.element.echoProduct.name,
          <FormattedMessage id='wantedBoard.any' defaultMessage='Any' />
        ),
        casNumber: getSafe(() => row.element.casProduct.casNumber, 'N/A'),
        assay:
          <FormattedAssay
            min={getSafe(() => row.element.assayMin, null)}
            max={getSafe(() => row.element.assayMax, null)}
          />,
        packaging: row.packagingTypes && row.packagingTypes.length
          ? <ArrayToFirstItem values={row.packagingTypes.map(d => d.name)} />
          : <FormattedMessage id='wantedBoard.any' defaultMessage='Any' />,
        manufacturer: row.manufacturers && row.manufacturers.length
          ? <ArrayToFirstItem values={row.manufacturers.map(d => d.name)}/>
          : <FormattedMessage id='wantedBoard.any' defaultMessage='Any' />,
        form: row.forms && row.forms.length
          ? <ArrayToFirstItem values={row.forms.map(d => d.name)}/>
          : <FormattedMessage id='wantedBoard.any' defaultMessage='Any' />,
        fobPrice: row.maximumPricePerUOM
          ? <FormattedNumber
            style='currency'
            currency={currency}
            value={row.maximumPricePerUOM }
          />
          : <FormattedMessage id='wantedBoard.any' defaultMessage='Any' />,
        quantity: qtyPart
          ? <FormattedUnit unit={qtyPart} separator='' value={row.quantity} />
          : <FormattedMessage id='wantedBoard.any' defaultMessage='Any' />,
        neededBy: row.neededAt
          ? moment(row.neededAt).format(getLocaleDateFormat())
          : <FormattedMessage id='wantedBoard.any' defaultMessage='Any' />,
      }
    })
  }
}

export default withDatagrid(
  connect(mapStateToProps, {
    ...Actions,
  })(WantedBoard)
)
