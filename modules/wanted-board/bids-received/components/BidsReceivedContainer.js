import React from 'react'
import { FormattedMessage, FormattedNumber } from 'react-intl'
import { Label } from 'semantic-ui-react'
import { connect } from 'react-redux'
import moment from 'moment/moment'

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
import { getProductName } from '../../constants/constants'

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

const StatusLabel = (status, type) => {
  if (!status || !type) return ''

  let text, backgroundColor
  if (status === 'NEW' && type === 'NORMAL') {
    text = <FormattedMessage id='wantedBoard.pendingOffer' defaultMessage='Pending Offer' />
    backgroundColor = '#2599d5'
  } else if ((status === 'REJECTED' && type === 'NORMAL') || (status === 'REJECTED' && type === 'COUNTER')) {
    text = <FormattedMessage id='wantedBoard.rejected' defaultMessage='Rejected' />
    backgroundColor = '#f16844'
  } else if (status === 'NEW' && type === 'COUNTER') {
    text = <FormattedMessage id='wantedBoard.pendingCounterOffer' defaultMessage='Pending Counter Offer' />
    backgroundColor = '#2599d5'
  } else if (
    (status === 'ACCEPTED_BY_BUYER' && type === 'NORMAL') ||
    (status === 'ACCEPTED_BY_SELLER' && type === 'COUNTER')
  ) {
    text = <FormattedMessage id='wantedBoard.accepted' defaultMessage='Accepted' />
    backgroundColor = '#84c225'
  }
  return <LabelStatus backgroundColor={backgroundColor}>{text}</LabelStatus>
}

const StatusType = fulfillmentType => {
  if (!fulfillmentType) return ''

  let text = <FormattedMessage id='wantedBoard.partial' defaultMessage='Partial' />
  let backgroundColor = '#2599d5'
  if (fulfillmentType === 'COMPLETE_IMMEDIATE') {
    text = <FormattedMessage id='wantedBoard.completeImmediate' defaultMessage='Complete immediate' />
  } else if (fulfillmentType === 'COMPLETE_SCHEDULE') {
    text = <FormattedMessage id='wantedBoard.completeSchedule' defaultMessage='Complete schedule' />
  }

  return <LabelStatus backgroundColor={backgroundColor}>{text}</LabelStatus>
}

const getNewestFulfillmentFromHistory = histories => {
  if (!histories || !histories.length) return

  const arrayTimestamps = histories.map(historie => (historie.updatedAt ? Date.parse(historie.updatedAt) : ''))

  const newestDate = getSafe(() => arrayTimestamps.length, '') ? Math.max.apply(Math, arrayTimestamps) : ''

  const i =
    newestDate && getSafe(() => arrayTimestamps.length, '') ? arrayTimestamps.findIndex(el => el === newestDate) : 0

  return getSafe(() => histories[i].fulfillmentType, '')
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
    isMerchant: getSafe(() => store.auth.identity.isMerchant, false),
    isCompanyAdmin: getSafe(() => store.auth.identity.isCompanyAdmin, false),
    editedId: store.wantedBoard.editWindowOpen === 'bids-received' ? store.wantedBoard.editedId : null,
    tutorialCompleted: getSafe(() => store.auth.identity.tutorialCompleted, false),
    loading: getSafe(() => store.wantedBoard.loading, false),
    openSidebar: getSafe(() => store.wantedBoard.openSidebar, false),
    sidebarValues: getSafe(() => store.wantedBoard.sidebarValues, null),
    rows: datagrid.rows.map(row => {
      const qtyPart = getSafe(() => row.unit.nameAbbreviation)
      const product = getProductName(row.element)
      const casNumber = casNumberAndName(getSafe(() => row.element.casProduct, null))
      const purchaseRequestOffers = row.purchaseRequestOffers.map(pro => {
        const condition = getSafe(() => pro.productOffer.conforming, null)
        const fulfillmentType = getNewestFulfillmentFromHistory(pro.histories)
        return {
          id: row.id + '_' + pro.id,
          clsName: 'tree-table nested-row',
          rawData: pro,
          product: getSafe(() => product, '...'),
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
              minimumFractionDigits={3}
              maximumFractionDigits={3}
              style='currency'
              currency={currency}
              value={pro.cfHistoryLastAveragePricePerUOM}
            />
          ),
          deliveredQuote: 'N/A',
          cfHistoryLastStatus: getSafe(() => pro.cfHistoryLastStatus, ''),
          cfHistoryLastType: getSafe(() => pro.cfHistoryLastType, ''),
          status: StatusLabel(
            getSafe(() => pro.cfHistoryLastStatus, ''),
            getSafe(() => pro.cfHistoryLastType, '')
          ),
          type: StatusType(fulfillmentType)
        }
      })
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
        assay: product ? (
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
