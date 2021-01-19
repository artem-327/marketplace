import React from 'react'
import { FormattedMessage, FormattedNumber } from 'react-intl'
import { connect } from 'react-redux'
import moment from 'moment/moment'

import { withDatagrid } from '~/modules/datagrid'
//import { applyFilter } from '~/modules/filter/actions'
import * as Actions from '../../actions'

import { FormattedUnit, FormattedAssay } from '~/components/formatted-messages'
import { currency } from '~/constants/index'
import { getSafe } from '~/utils/functions'
import { getLocaleDateFormat } from '~/components/date-format'
import { ArrayToFirstItem } from '~/components/formatted-messages'
import Listings from './Listings'
import { getProductName } from '../../constants/constants'

function mapStateToProps(store, { datagrid }) {
  return {
    ...store.wantedBoard,
    advancedFilters: store.filter.wantedBoardListings.appliedFilter,
    tutorialCompleted: getSafe(() => store.auth.identity.tutorialCompleted, false),
    openSidebar: getSafe(() => store.wantedBoard.openSidebar, false),
    rows: datagrid.rows.map(row => {
      const qtyPart = getSafe(() => row.unit.nameAbbreviation)
      const assay =
        getSafe(() => row.element.assayMin, null) || getSafe(() => row.element.assayMax, null) ? (
          <FormattedAssay
            min={getSafe(() => row.element.assayMin, null)}
            max={getSafe(() => row.element.assayMax, null)}
          />
        ) : (
          <FormattedMessage id='wantedBoard.any' defaultMessage='Any' />
        )

      return {
        id: row.id,
        rawData: row,
        product: getProductName(row.element),
        assay,
        packaging:
          row.packagingTypes && row.packagingTypes.length ? (
            <ArrayToFirstItem values={row.packagingTypes.map(d => d.name)} />
          ) : (
            <FormattedMessage id='wantedBoard.any' defaultMessage='Any' />
          ),
        manufacturer:
          row.manufacturers && row.manufacturers.length ? (
            <ArrayToFirstItem values={row.manufacturers.map(d => d.name)} />
          ) : (
            <FormattedMessage id='wantedBoard.any' defaultMessage='Any' />
          ),
        form:
          row.forms && row.forms.length ? (
            <ArrayToFirstItem values={row.forms.map(d => d.name)} />
          ) : (
            <FormattedMessage id='wantedBoard.any' defaultMessage='Any' />
          ),
        fobPrice: row.maximumPricePerUOM ? (
          <FormattedNumber
            minimumFractionDigits={2}
            maximumFractionDigits={2}
            style='currency'
            currency={currency}
            value={row.maximumPricePerUOM}
          />
        ) : (
          <FormattedMessage id='wantedBoard.any' defaultMessage='Any' />
        ),
        quantity: qtyPart ? (
          <FormattedUnit unit={qtyPart} separator='' value={row.quantity} />
        ) : (
          <FormattedMessage id='wantedBoard.any' defaultMessage='Any' />
        ),
        neededBy: row.neededAt ? (
          moment(row.neededAt).format(getLocaleDateFormat())
        ) : (
          <FormattedMessage id='wantedBoard.any' defaultMessage='Any' />
        ),
        createdAt: row.createdAt ? moment(row.createdAt).format(getLocaleDateFormat()) : 'N/A'
      }
    })
  }
}

export default withDatagrid(
  connect(mapStateToProps, {
    ...Actions
  })(Listings)
)
