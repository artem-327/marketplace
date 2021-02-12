/* eslint-disable react-hooks/exhaustive-deps */
import { connect } from 'react-redux'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl, FormattedNumber } from 'react-intl'
import { Formik } from 'formik'
import { getSafe } from "~/utils/functions"
import { currency } from '~/constants/index'

//Components
import {
  GridColumn,
  GridRow,
  Form
} from 'semantic-ui-react'
import RowComponent from '../RowComponent/RowComponent'
import {
  GridExpandedSection,
  DivSectionCollapsedWrapper,
  DivSectionCollapsedRow,
  DivSectionName,
  DivSectionDescription
} from '../Checkout.styles'

import ItemComponent from './ItemComponent'

//Hooks
import { usePrevious } from "../../../../hooks"

// Services
import { getValidationScheme } from './ReviewItems.services'


// Global variable to store global state
let selfFormikProps = {} //TODO specify type

const ReviewItems = props => {
  // Stores previos values for compating with current value
  const prevIsExpanded  = usePrevious(props.isExpanded)

  const {
    isExpanded,
    allAccepted,
    sectionState,
    onValueChange,
    setSummaryButtonCaption,
    initValues,
    cartItems,
  } = props

  // Similar to call componentDidMount:
  useEffect(() => {

  }, [])  // If [] is empty then is similar as componentDidMount.


  // This useEffect is used similar as componentDidUpdate
  // Could by used in previous (above) useEffect, but this approach is more clear
  useEffect(() => {
    if (isExpanded && !prevIsExpanded) {
      setSummaryButtonCaption(
        <FormattedMessage id='checkout.button.confirmItems' defaultMessage='Confirm Items'>
          {text => text}
        </FormattedMessage>
      )
    }
  }, [isExpanded])

  return (
    <RowComponent
      {...props}
      header={<FormattedMessage id='checkout.header.reviewItems' defaultMessage='1. Review Items'/>}
      onSubmitClick={() => props.onSubmitClick()}
      submitButtonCaption={allAccepted
        ? (
          <FormattedMessage id='checkout.button.placeOrder' defaultMessage='Place Order'>
            {text => text}
          </FormattedMessage>
        ) : (
          <FormattedMessage id='checkout.button.confirmItems' defaultMessage='Confirm Items'>
            {text => text}
          </FormattedMessage>
        )
      }
      content={
        <Formik
          onSubmit={values => {}}
          enableReinitialize
          validateOnChange={true}
          initialValues={{items: initValues}}
          validationSchema={getValidationScheme()}
          render={formikProps => {
            selfFormikProps = formikProps
            const { values, errors } = formikProps

            return (
              <Form>
                {
                  (sectionState.accepted || isExpanded)
                    ? (
                      isExpanded
                        ? (
                          <GridExpandedSection>
                            {cartItems.map((item, index) =>
                              <GridRow>
                                <GridColumn>
                                  <ItemComponent
                                    {...props}
                                    item={item}
                                    index={index}
                                    value={getSafe(() => values.items[index].quantity.toString(), '')}
                                    onValueChange={(val) => {
                                      formikProps.setFieldValue(`items[${index}].quantity`, val)
                                      formikProps.setFieldTouched(`items[${index}].quantity`, true, true)
                                      let newValues = values.items.slice()
                                      newValues[index].quantity = val
                                      onValueChange({ value: newValues, errors })
                                    }}
                                  />
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
              </Form>
            )
          }}
        />
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
    }),
    initValues: props.cartItems.map(item => ({
      id: item.id,
      quantity: item.pkgAmount.toString(),
      minPkg: item.productOffer.minPkg,
      splitPkg: item.productOffer.splitPkg
    }))
  }
}

export default injectIntl(connect(mapStateToProps, {  })(ReviewItems))