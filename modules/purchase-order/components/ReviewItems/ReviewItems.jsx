/* eslint-disable react-hooks/exhaustive-deps */
import { connect } from 'react-redux'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl, FormattedNumber } from 'react-intl'
import { getSafe } from "~/utils/functions"
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
  GridExpandedSection,
  DivSectionExpandedRow,



  DivSectionCollapsedWrapper,
  DivSectionCollapsedRow,
  DivSectionName,
  DivSectionDescription,



} from '../Checkout.styles'

import ItemComponent from './ItemComponent'


//Hooks
import { usePrevious } from "../../../../hooks"



//Services
//import ErrorFocus from '../../../components/error-focus'
//import {
//} from './Checkout.services'

const ReviewItems = props => {
  // Stores previos values for compating with current value
  const prevIsExpanded  = usePrevious(props.isExpanded)
  const [edited, setEdited] = useState(false)

  const {
    id, // temporary
    isExpanded,
    sectionState,
    onChangeSubmitButton,


    cartItems,
  } = props

  // Similar to call componentDidMount:
  useEffect(() => {

  }, [])  // If [] is empty then is similar as componentDidMount.


  // This useEffect is used similar as componentDidUpdate
  // Could by used in previous (above) useEffect, but this approach is more clear
  useEffect(() => {


    if (isExpanded && !prevIsExpanded) {
      onChangeSubmitButton({
        caption: (
          <FormattedMessage id='checkout.button.confirmItems' defaultMessage='Confirm Items'>
            {text => text}
          </FormattedMessage>
        ),
        submitFunction: () => props.onSubmitClick()
      })
    }
  }, [isExpanded])


  //console.log('!!!!!!!!!! render cartItems', cartItems)
  //console.log('!!!!!!!!!! render props', props)

  return (
    <RowComponent
      {...props}
      header={<FormattedMessage id='checkout.header.reviewItems' defaultMessage='1. Review Items'/>}
      onSubmitClick={() => {
        console.log('!!!!!!!!!! ReviewItems onSubmitClick')
        props.onSubmitClick()
      }}
      submitButtonCaption={
        <FormattedMessage id='checkout.button.confirmItems' defaultMessage='Confirm Items'>
          {text => text}
        </FormattedMessage>
      }
      content={
        (sectionState.accepted || isExpanded)
          ? (
            isExpanded
              ? (
                <GridExpandedSection>
                  {cartItems.map(item =>
                    <GridRow>
                      <GridColumn>
                        <ItemComponent item={item}/>
                      </GridColumn>
                    </GridRow>
                  )}
                </GridExpandedSection>
              ) : (
                <DivSectionCollapsedWrapper>
                  {cartItems.map(item =>
                    <DivSectionCollapsedRow>
                      <DivSectionName>
                        {item.productName}
                      </DivSectionName>
                      <DivSectionDescription>
                        {item.pkgAmount * item.packagingSize}
                      </DivSectionDescription>
                      <DivSectionDescription>
                        {item.packaging}
                      </DivSectionDescription>
                      <DivSectionDescription>
                        <FormattedNumber
                          minimumFractionDigits={2}
                          maximumFractionDigits={2}
                          style='currency'
                          currency={currency}
                          value={item.cfPriceSubtotal}
                        />
                      </DivSectionDescription>
                    </DivSectionCollapsedRow>
                  )}
                </DivSectionCollapsedWrapper>
              )
          ) : null
      }
    />
  )
}

ReviewItems.propTypes = {
  itemsCount: PropTypes.number
}

ReviewItems.defaultProps = {
  itemsCount: 0
}

function mapStateToProps(store, props) {
  return {
    cartItems: props.cartItems.map(item => {
      const packagingType = getSafe(() => item.productOffer.companyProduct.packagingType.name, '')
      const packagingUnit = getSafe(() => item.productOffer.companyProduct.packagingUnit.nameAbbreviation, '')
      const packaging = `${packagingUnit} ${packagingType}`

      return ({
        ...item,
        productName: getSafe(() => item.productOffer.companyProduct.intProductName, ''),
        pkgAmount: item.pkgAmount,
        packagingSize: getSafe(() => item.productOffer.companyProduct.packagingSize, 1),
        packaging
      })
    })
  }
}

export default injectIntl(connect(mapStateToProps, {  })(ReviewItems))