import React from 'react'
import { FormattedNumber } from 'react-intl'
import { connect } from 'react-redux'
import moment from 'moment/moment'
import { Label } from 'semantic-ui-react'

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

const momentDurationFormatSetup = require('moment-duration-format')
momentDurationFormatSetup(moment)

function getDurationTime(expTime) {
  if (expTime && typeof moment.duration.format === 'function' && typeof moment.duration.fn.format === 'function') {
    const expirationTime = moment(expTime)
    const today = moment()
    const difference = moment.duration(expirationTime.diff(today))
    const durationFormat = difference.format('D[d] H[h] m[m]')
    return durationFormat
  }
  return null
}
function getStyleLabel(status) {
  let labelColor = {
    backgroundColor: '#f8f9fb',
    color: '#848893',
    fontSize: 'x-small',
    fontWeight: 400
  }
  if (status === 'APPROVED' || status === 'ON-HOLD') {
    labelColor.backgroundColor = '#84c225'
    labelColor.color = '#ffffff'
  }
  if (status === 'REJECTED' || status === 'EXPIRED' || status === 'CANCELED') {
    labelColor.backgroundColor = '#f16844'
    labelColor.color = '#ffffff'
  }
  return labelColor
}

function mapStateToProps(store, { datagrid }) {
  return {
    ...datagrid,
    isMerchant: getSafe(() => store.auth.identity.isMerchant, false),
    isAdmin: getSafe(() => store.auth.identity.isAdmin, false),
    isProductOfferManager: getSafe(() => store.auth.identity.isProductOfferManager, false),
    rows: datagrid.rows.map(po => {
      const unit = getSafe(() => po.productOffer.companyProduct.packagingUnit.nameAbbreviation, null)
      return {
        ...po,
        id: po.id,
        intProductName: getSafe(() => po.productOffer.companyProduct.intProductName, ''),
        pkgsHeld: po.pkgsHeld ? <FormattedUnit unit={unit} separator=' ' value={po.pkgsHeld} /> : null,
        expirationTime: po.expirationTime ? getDurationTime(po.expirationTime) : null,
        holdPricePerUOM: po.holdPricePerUOM ? (
          <FormattedNumber style='currency' currency={currency} value={po.holdPricePerUOM} />
        ) : null,
        holdPriceSubtotal: po.holdPriceSubtotal ? (
          <FormattedNumber style='currency' currency={currency} value={po.holdPriceSubtotal} />
        ) : null,
        status: po.status ? (
          <Label circular style={getStyleLabel(po.status)}>
            {po.status[0].toUpperCase() + po.status.slice(1).toLowerCase()}
          </Label>
        ) : null
      }
    })
  }
}

export default withDatagrid(
  connect(mapStateToProps, {
    ...Actions
  })(Holds)
)
