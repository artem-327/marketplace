/* eslint-disable react-hooks/exhaustive-deps */
import { connect } from 'react-redux'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl, FormattedNumber } from 'react-intl'
import { getSafe, getPrice } from "~/utils/functions"
import { currency } from '~/constants/index'

//Components
import {
  Container as SemanticContainer,
  Image,
  Header,
  Button,
  Icon,
  Grid,
  GridColumn,
  GridRow,
  Segment,
  Popup,
  Message,
  Divider
} from 'semantic-ui-react'
import RowComponent from '../RowComponent/RowComponent'
import {
  DivSectionCollapsedWrapper,
  DivSectionCollapsedRow,
  DivSectionName,
  DivSectionDescription,



} from '../Checkout.styles'

import {
  GridItemDetail,
  GridColumnLeftDivider,
  GridRowHeader,
  IconTrash2,
  DivHeader,


} from './ItemComponent.styles'

//Hooks
import { usePrevious } from "../../../../hooks"



//Services
//import ErrorFocus from '../../../components/error-focus'
//import {
//} from './Checkout.services'

const ItemComponent = props => {
  // Stores previos values for compating with current value

  const [edited, setEdited] = useState(false)

  const {


    item
  } = props

  // Similar to call componentDidMount:
  useEffect(() => {

  }, [])  // If [] is empty then is similar as componentDidMount.


  // This useEffect is used similar as componentDidUpdate
  // Could by used in previous (above) useEffect, but this approach is more clear
  /*
  useEffect(() => {


  }, [isExpanded])
  */


  console.log('!!!!!!!!!! render ItemComponent', item)
  //console.log('!!!!!!!!!! render props', props)

  const pkgAmount = item.pkgAmount
  const pricePerUOM = getPrice(pkgAmount, item.productOffer.pricingTiers)

  return (
    <GridItemDetail>
      <GridRowHeader>
          <DivHeader>
            {item.productName}
          </DivHeader>
          <IconTrash2 size='18' onClick={() => console.log('!!!!!!!!!! onDelete')}/>
      </GridRowHeader>
      <GridRow>
        <GridColumn width={3}>
          <DivSectionDescription>
            <FormattedMessage id='checkout.reviewItems.packaging' defaultMessage='Packaging'/>
          </DivSectionDescription>
        </GridColumn>
        <GridColumn width={5}>
          <DivSectionName>
            {`${item.packagingSize} ${item.packaging}`}
          </DivSectionName>
        </GridColumn>
        <GridColumnLeftDivider width={4}>
          <DivSectionDescription>
            <FormattedMessage id='checkout.reviewItems.location' defaultMessage='Location'/>
          </DivSectionDescription>
        </GridColumnLeftDivider>
        <GridColumn width={4}>
          <DivSectionName>
            {item.locationStr}
          </DivSectionName>
        </GridColumn>
      </GridRow>
      <GridRow>
        <GridColumn width={3}>
          <DivSectionDescription>
            <FormattedMessage id='checkout.reviewItems.price' defaultMessage='Price'/>
          </DivSectionDescription>
        </GridColumn>
        <GridColumn width={5}>
          <DivSectionName>
            <FormattedNumber
              minimumFractionDigits={2}
              maximumFractionDigits={2}
              style='currency'
              currency={currency}
              value={pkgAmount * pricePerUOM * item.packagingSize}
            />
            {' ('}
            <FormattedNumber
              minimumFractionDigits={3}
              maximumFractionDigits={3}
              style='currency'
              currency={currency}
              value={pricePerUOM}
            />
            {`/${props.packageWeightUnit})`}
          </DivSectionName>
        </GridColumn>
        <GridColumnLeftDivider width={4}>
          <DivSectionDescription>
            <FormattedMessage id='checkout.reviewItems.shippingInformation' defaultMessage='Shipping Information'/>
          </DivSectionDescription>
        </GridColumnLeftDivider>
        <GridColumn width={4}>
          <DivSectionName>
            d
          </DivSectionName>
        </GridColumn>
      </GridRow>
      <GridRow>
        <GridColumn width={3}>
          <DivSectionDescription>
            <FormattedMessage id='checkout.reviewItems.quantity' defaultMessage='Quantity'/>
          </DivSectionDescription>
        </GridColumn>
        <GridColumn width={5}>
          <DivSectionName>
            {pkgAmount}
          </DivSectionName>
        </GridColumn>
        <GridColumnLeftDivider width={4}>
          <DivSectionDescription>
            <FormattedMessage id='checkout.reviewItems.leadTime' defaultMessage='Lead Time'/>
          </DivSectionDescription>
        </GridColumnLeftDivider>
        <GridColumn width={4}>
          <DivSectionName>
            <FormattedMessage
              id='checkout.reviewItems.days'
              defaultMessage={`${props.leadTime} days`}
              values={{ days: props.leadTime}}
            />
          </DivSectionName>
        </GridColumn>
      </GridRow>
      <GridRow>
        <GridColumn width={3}>
          <DivSectionDescription>
            <FormattedMessage id='checkout.reviewItems.grossWeight' defaultMessage='grossWeight'/>
          </DivSectionDescription>
        </GridColumn>
        <GridColumn width={5}>
          <DivSectionName>
            {`${props.packageWeight}${props.packageWeightUnit} ?`}
          </DivSectionName>
        </GridColumn>
        <GridColumnLeftDivider width={4}>
          <DivSectionDescription>
            <FormattedMessage id='checkout.reviewItems.paymentTerms' defaultMessage='Payment Terms'/>
          </DivSectionDescription>
        </GridColumnLeftDivider>
        <GridColumn width={4}>
          <DivSectionName>
            {props.cfPaymentTerms}
          </DivSectionName>
        </GridColumn>
      </GridRow>
    </GridItemDetail>
  )
}

ItemComponent.propTypes = {
//  itemsCount: PropTypes.number
}

ItemComponent.defaultProps = {
//  itemsCount: 0
}

function mapStateToProps(store, { item }) {
  return {
    minPkg: getSafe(() => item.productOffer.minPkg, 1),
    splitPkg: getSafe(() => item.productOffer.splitPkg, 1),
    leadTime: getSafe(() => item.productOffer.leadTime, ''),
    packageWeightUnit: getSafe(() => item.productOffer.companyProduct.packageWeightUnit.nameAbbreviation, ''),
    packageWeight: getSafe(() => item.productOffer.companyProduct.packageWeight, 0),
    cfPaymentTerms: getSafe(() => item.productOffer.cfPaymentTerms, '')
  }
}

export default injectIntl(connect(mapStateToProps, {  })(ItemComponent))