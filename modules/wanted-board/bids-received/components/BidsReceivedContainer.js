import React from 'react'
import { FormattedMessage, FormattedNumber } from 'react-intl'
import { Label } from 'semantic-ui-react'
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

import BidsReceived from './BidsReceived'
import { ArrayToFirstItem } from '~/components/formatted-messages'
import styled from 'styled-components'

const StyledArrayToFirstItem = styled(ArrayToFirstItem)`
  .ui.label.bordered.right {
    color: #848893;
    border-radius: 2px;
    background-color: rgba(27, 52, 84, 0.15);
  }
`
const LabelStatus = styled.div`
  font-size: 12px;
  padding: 5px 5px 5px 10px;
  background-color: ${props => (props.backgroundColor ? props.backgroundColor : '#2599d5')};
  height: 22px;
  border-radius: 11px;
  color: #ffffff;
  text-align: center;
  width: fit-content;
  padding: 1px 10px;
`

const StatusLabel = val => {
  if (!val) return ''

  let text, backgroundColor
  switch (val) {
    case 'NEW':
      text = <FormattedMessage id='global.new' defaultMessage='New' />
      backgroundColor = '#2599d5'
      break
    case 'ACCEPTED':
    case 'PURCHASED':
      text = <FormattedMessage id='wantedBoard.accepted' defaultMessage='Accepted' />
      backgroundColor = '#84c225'
      break
    case 'REJECTED':
      text = <FormattedMessage id='wantedBoard.rejected' defaultMessage='Rejected' />
      backgroundColor = '#f16844'
      break
    default:
      return null
  }
  return <LabelStatus backgroundColor={backgroundColor}>{text}</LabelStatus>
}

function mapStateToProps(store, { datagrid }) {
  const casNumberAndName = casProduct => {
    if (!casProduct || !getSafe(() => casProduct.casNumber, false) || !getSafe(() => casProduct.casIndexName, false))
      return 'N/A'
    else return `${casProduct.casNumber} ${casProduct.casIndexName}`
  }
  return {
    ...store.wantedBoard,
    clientCompany: getSafe(() => store.auth.identity.clientCompany, false),
    type: store.wantedBoard.myRequestedItemsType,
    editedId: store.wantedBoard.editWindowOpen === 'bids-received' ? store.wantedBoard.editedId : null,
    tutorialCompleted: getSafe(() => store.auth.identity.tutorialCompleted, false),
    loading: getSafe(() => store.wantedBoard.loading, false),
    openSidebar: getSafe(() => store.wantedBoard.openSidebar, false),
    sidebarValues: getSafe(() => store.wantedBoard.sidebarValues, null),
    rows: datagrid.rows.map(row => {
      const productName = getSafe(() => row.element.productGroup.name, null)
      const qtyPart = getSafe(() => row.unit.nameAbbreviation)
      const product = getSafe(() => row.element.productGroup.name, null)
      const casNumber = casNumberAndName(getSafe(() => row.element.casProduct, null))
      const purchaseRequestOffers = row.purchaseRequestOffers
        .map(pro => {
          const condition = getSafe(() => pro.productOffer.conforming, null)

          return {
            id: row.id + '_' + pro.id,
            clsName: 'tree-table nested-row',
            rawData: pro,
            product: getSafe(() => productName, '...'),
            casNumber: getSafe(
              () => pro.productOffer.companyProduct.productGroup.elements[0].casProduct.casNumber,
              '...'
            ),
            orderQuantity: '',
            orderFrequency: '',
            neededBy: '',
            dealExpired: '',
            manufacturer: getSafe(() => pro.productOffer.companyProduct.companyGenericProduct.manufacturer.name, ''),
            condition:
              condition === null ? (
                <FormattedMessage id='wantedBoard.any' defaultMessage='Any' />
              ) : condition ? (
                <FormattedMessage id='global.conforming' defaultMessage='Conforming' />
              ) : (
                <FormattedMessage id='global.nonConforming' defaultMessage='Non Conforming' />
              ),
            deliveryLocation: '',
            packaging: getSafe(() => pro.productOffer.companyProduct.packagingType.name, ''),
            measurement: getSafe(() => pro.productOffer.companyProduct.packagingUnit.nameAbbreviation, ''),
            deliveryPriceMax: 'N/A',
            fobQuote: (
              <FormattedNumber
                minimumFractionDigits={2}
                maximumFractionDigits={2}
                style='currency'
                currency={currency}
                value={pro.pricePerUOM}
              />
            ),
            deliveredQuote: 'N/A',
            status: StatusLabel(getSafe(() => pro.status, ''))
          }
        })
        .filter(el => el.rawData.status === 'NEW')
      const offersLength = purchaseRequestOffers.length
      return {
        id: row.id,
        clsName: 'tree-table root-row',
        rawData: row,
        root: true,
        treeRoot: true,
        offer: false,
        product: product ? product : <FormattedMessage id='wantedBoard.any' defaultMessage='Any' />,
        casNumber: casNumber ? casNumber : <FormattedMessage id='wantedBoard.any' defaultMessage='Any' />,
        assay: productName ? (
          'N/A'
        ) : (
          <FormattedAssay
            min={getSafe(() => row.element.assayMin, null)}
            max={getSafe(() => row.element.assayMax, null)}
          />
        ),
        orderQuantity: qtyPart ? (
          <FormattedUnit unit={qtyPart} separator=' ' value={row.quantity} />
        ) : (
          <FormattedMessage id='wantedBoard.any' defaultMessage='Any' />
        ),
        orderFrequency: <FormattedMessage id='wantedBoard.any' defaultMessage='Any' />,
        neededBy: row.neededAt ? (
          moment(row.neededAt).format(getLocaleDateFormat())
        ) : (
          <FormattedMessage id='wantedBoard.any' defaultMessage='Any' />
        ),
        dealExpired: row.expiresAt ? (
          moment(row.expiresAt).format(getLocaleDateFormat())
        ) : (
          <FormattedMessage id='wantedBoard.any' defaultMessage='Any' />
        ),
        manufacturer:
          row.manufacturers && row.manufacturers.length ? (
            <StyledArrayToFirstItem values={row.manufacturers.map(d => d.name)} />
          ) : (
            <FormattedMessage id='wantedBoard.any' defaultMessage='Any' />
          ),
        condition:
          typeof row.conditionConforming === 'undefined' ? (
            <FormattedMessage id='wantedBoard.any' defaultMessage='Any' />
          ) : row.conditionConforming ? (
            <FormattedMessage id='global.conforming' defaultMessage='Conforming' />
          ) : (
            <FormattedMessage id='global.nonConforming' defaultMessage='Non Conforming' />
          ),
        deliveryLocation: row.deliveryProvince ? (
          row.deliveryProvince.name
        ) : row.deliveryCountry ? (
          row.deliveryCountry.name
        ) : (
          <FormattedMessage id='wantedBoard.any' defaultMessage='Any' />
        ),
        packaging:
          row.packagingTypes && row.packagingTypes.length ? (
            <StyledArrayToFirstItem values={row.packagingTypes.map(d => d.name)} />
          ) : (
            <FormattedMessage id='wantedBoard.any' defaultMessage='Any' />
          ),
        deliveryPriceMax: row.maximumPricePerUOM ? (
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
        measurement: qtyPart,
        fobQuote: '',
        deliveredQuote: '',
        purchaseRequestOffers,
        ownerBranch: getSafe(() => row.ownerBranch.deliveryAddress.cfName, '')
      }
    }) //.filter(row => row.purchaseRequestOffers.length !== 0)
  }
}

export default withDatagrid(
  connect(mapStateToProps, {
    ...Actions
  })(BidsReceived)
)
