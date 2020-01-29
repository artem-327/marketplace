import React from 'react'
import { FormattedNumber } from 'react-intl'
import { connect } from 'react-redux'
import moment from 'moment/moment'

import { getLocationString } from '~/src/utils/functions'
import { withDatagrid } from '~/modules/datagrid'
import { applyFilter } from '~/modules/filter/actions'
import Holds from './Holds'
import * as Actions from '../../actions'
import { FormattedUnit, FormattedAssay } from '~/components/formatted-messages'
import { currency } from '~/constants'
import { getSafe } from '~/utils/functions'
import { getLocaleDateFormat } from '~/components/date-format'

const rows = [
  {
    id: 1,
    productName: 'ABEX123',
    quantity: '20 Pkgs',
    expires: '2h 54m',
    pricelb: '$3.2108',
    subtotal: '$1.2108',
    status: 'true'
  },
  {
    id: 1,
    productName: 'ABEX123',
    quantity: '20 Pkgs',
    expires: '2h 54m',
    pricelb: '$3.2108',
    subtotal: '$1.2108',
    status: 'true'
  },
  {
    id: 1,
    productName: 'ABEX123',
    quantity: '20 Pkgs',
    expires: '2h 54m',
    pricelb: '$3.2108',
    subtotal: '$1.2108',
    status: 'true'
  }
]
//TODO
function mapStateToProps(store, { datagrid }) {
  return {
    ...datagrid,

    rows: rows.map(po => {
      return {
        ...po,
        id: po.id,
        productName: po.productName,
        quantity: po.quantity,
        expires: po.expires,
        pricelb: po.pricelb,
        subtotal: po.subtotal,
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
