import React from 'react'
import { FormattedNumber } from 'react-intl'
import { connect } from 'react-redux'
import moment from 'moment/moment'

import { withDatagrid } from '~/modules/datagrid'
import { applyFilter } from '~/modules/filter/actions'
import Holds from './Holds'
import * as Actions from '../actions'
import { FormattedUnit, FormattedAssay } from '~/components/formatted-messages'
import { currency } from '~/constants'
import { getSafe } from '~/utils/functions'
import { getLocaleDateFormat } from '~/components/date-format'
import { getProductOffer } from '~/modules/purchase-order/actions'
import { sidebarChanged } from '~/src/modules/cart'
import { openPopup, closePopup } from '~/modules/company-product-info/actions'

function mapStateToProps(store, { datagrid }) {
  return {
    ...datagrid,

    rows: datagrid.rows.map(po => {
      const unit = getSafe(() => po.productOffer.companyProduct.packagingUnit.nameAbbreviation, null)
      return {
        ...po,
        id: po.id,
        intProductName: getSafe(() => po.productOffer.companyProduct.intProductName, ''),
        pkgsHeld: po.pkgsHeld ? <FormattedUnit unit={unit} separator=' ' value={po.pkgsHeld} /> : null,
        expirationTime: po.expirationTime ? moment(po.expirationTime).format(getLocaleDateFormat()) : null,
        holdPricePerUOM: po.holdPricePerUOM ? (
          <FormattedNumber style='currency' currency={currency} value={po.holdPricePerUOM} />
        ) : null,
        holdPriceSubtotal: po.holdPriceSubtotal ? (
          <FormattedNumber style='currency' currency={currency} value={po.holdPriceSubtotal} />
        ) : null,
        status: po.status
      }
    })
  }
}

export default withDatagrid(
  connect(mapStateToProps, {
    ...Actions
  })(Holds)
)
