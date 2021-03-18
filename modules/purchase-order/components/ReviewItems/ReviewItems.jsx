/* eslint-disable react-hooks/exhaustive-deps */
import { connect } from 'react-redux'
import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl, FormattedNumber } from 'react-intl'
import { Formik } from 'formik'
import { getSafe } from '~/utils/functions'
import { currency } from '~/constants/index'

//Components
import { GridColumn, Form } from 'semantic-ui-react'
import RowComponent from '../RowComponent/RowComponent'

import {
  GridExpandedSection,
  DivSectionCollapsedWrapper,
  DivSectionCollapsedRow,
  GridRowReviewItems,
  DivSectionName,
  DivSectionDescription
} from '../Checkout.styles'

import ItemComponent from './ItemComponent'

//Hooks
import { usePrevious } from '../../../../hooks'

// Services
import { getValidationScheme } from './ReviewItems.services'

// Global variable to store global state
let selfFormikProps = {} //TODO specify type

const ReviewItems = props => {
  // Stores previos values for compating with current value
  const prevIsExpanded = usePrevious(props.isExpanded)

  const {
    isExpanded,
    allAccepted,
    sectionState,
    onValueChange,
    setSummaryButtonCaption,
    cartItems,
    cartIsFetching,
    offerDetailIsFetching
  } = props

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
      header={<FormattedMessage id='checkout.header.reviewItems' defaultMessage='1. Review Items' />}
      onSubmitClick={() => props.onSubmitClick()}
      submitButtonDisabled={sectionState.errors || offerDetailIsFetching}
      submitButtonCaption={
        allAccepted ? (
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
          validateOnChange={false}
          initialValues={{ items: props.value }}
          validationSchema={getValidationScheme()}
          render={formikProps => {
            selfFormikProps = formikProps
            const { values, errors, submitForm } = formikProps
            return (
              <Form loading={offerDetailIsFetching || cartIsFetching}>
                {sectionState.accepted || isExpanded ? (
                  isExpanded ? (
                    <GridExpandedSection>
                      {cartItems.map((item, index) => (
                        <GridRowReviewItems key={index}>
                          <GridColumn>
                            <ItemComponent
                              {...props}
                              item={item}
                              index={index}
                              value={getSafe(() => values.items[index].quantity.toString(), '')}
                              onValueChange={async ({ val, price, validate }) => {
                                await formikProps.setFieldValue(`items[${index}].quantity`, val)
                                await formikProps.setFieldValue(`items[${index}].price`, price)

                                let newValues = values.items.slice()
                                newValues[index].quantity = val
                                newValues[index].price = price
                                let newErrors = {}
                                if (validate) {
                                  await formikProps.setFieldTouched(`items[${index}].quantity`, true, true)
                                  formikProps.validateForm().then(err => {
                                    newErrors = err
                                    if (newErrors) {
                                      submitForm() // to show errors
                                    }
                                    onValueChange({value: newValues, errors: !!newErrors.items || val === ''})
                                  })
                                }
                                onValueChange({value: newValues, errors: !!newErrors.items || val === ''})
                              }}
                            />
                          </GridColumn>
                        </GridRowReviewItems>
                      ))}
                    </GridExpandedSection>
                  ) : (
                    <DivSectionCollapsedWrapper>
                      {cartItems.map(item => (
                        <DivSectionCollapsedRow>
                          <DivSectionName>{item.productName}</DivSectionName>
                          <DivSectionDescription>{item.pkgAmount * item.packagingSize}</DivSectionDescription>
                          <DivSectionDescription>{item.packaging}</DivSectionDescription>
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
                      ))}
                    </DivSectionCollapsedWrapper>
                  )
                ) : null}
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

      return {
        ...item,
        productName: getSafe(() => item.productOffer.companyProduct.intProductName, ''),
        pkgAmount: item.pkgAmount,
        packagingSize: getSafe(() => item.productOffer.companyProduct.packagingSize, 1),
        packaging
      }
    })
  }
}

export default injectIntl(connect(mapStateToProps, {})(ReviewItems))
