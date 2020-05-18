import React from 'react'
import { connect } from 'react-redux'
import { Modal, FormGroup, Header } from 'semantic-ui-react'
import { withToastManager } from 'react-toast-notifications'
import moment from 'moment'
import { FormattedMessage, injectIntl } from 'react-intl'
import * as Yup from 'yup'
import Router from 'next/router'
import { Form, Input, Button, Dropdown, Checkbox, TextArea } from 'formik-semantic-ui-fixed-validation'

import { DateInput } from '~/components/custom-formik'
import { generateToastMarkup, getSafe } from '~/utils/functions'
import { errorMessages, minOrZeroLength } from '~/constants/yupValidation'
import { withDatagrid } from '~/modules/datagrid'
import { getLocaleDateFormat, getStringISODate } from '~/components/date-format'
import { closePopup, updateShippingQuote, createShippingQuote } from '../../actions'
import { Required } from '~/components/constants/layout'

const initialFormValues = {
  carrierName: '',
  quoteId: '',
  price: '',
  validityDate: ''
}

const formValidation = () =>
  Yup.lazy(values =>
    Yup.object().shape({
      carrierName: Yup.string()
        .trim()
        .min(3, errorMessages.minLength(3))
        .required(errorMessages.requiredMessage),
      quoteId: Yup.string()
        .trim()
        .min(3, errorMessages.minLength(3))
        .required(errorMessages.requiredMessage),
      price: Yup.number()
        .typeError(errorMessages.mustBeNumber)
        .required(errorMessages.requiredMessage)
    })
  )

class ShippingQuotesPopup extends React.Component {
  render() {
    const {
      closePopup,
      popupValues,
      rowId,
      updateShippingQuote,
      createShippingQuote,
      toastManager,
      intl: { formatMessage },
      datagrid
    } = this.props

    return (
      <Modal closeIcon onClose={() => closePopup()} open centered={false} size='small'>
        <Modal.Header>
          {popupValues ? (
            <FormattedMessage id='settings.editShippingQuote' defaultMessage='Edit Shipping Quote' />
          ) : (
            <FormattedMessage id='settings.addShippingQuote' defaultMessage='Add Shipping Quote' />
          )}
        </Modal.Header>
        <Modal.Content>
          <Form
            enableReinitialize
            initialValues={popupValues ? popupValues : initialFormValues}
            validationSchema={formValidation()}
            onReset={closePopup}
            onSubmit={async (values, { setSubmitting }) => {
              let payload = {
                carrierName: values.carrierName,
                quoteId: values.quoteId,
                price: Number(values.price),
                ...(values.validityDate !== '' && { validityDate: getStringISODate(values.validityDate) })
              }

              try {
                let response
                if (popupValues) response = await updateShippingQuote(rowId, payload)
                else response = await createShippingQuote(payload)

                datagrid.loadData()

                let status = popupValues ? 'shippingQuoteUpdated' : 'shippingQuoteCreated'

                toastManager.add(
                  generateToastMarkup(
                    <FormattedMessage id={`notifications.${status}.header`} />,
                    <FormattedMessage
                      id={`notifications.${status}.content`}
                      values={{ name: response.value.quoteId }}
                    />
                  ),
                  { appearance: 'success' }
                )
              } catch {
              } finally {
                setSubmitting(false)
                closePopup()
              }
            }}>
            {({ values, setFieldValue, setFieldTouched, errors, touched, isSubmitting }) => {
              return (
                <>
                  <FormGroup data-test='operations_shipping_quote_name_inp'>
                    <Input
                      type='text'
                      label={
                        <>
                          <FormattedMessage id='operations.carrierName' defaultMessage='Carrier Name'>
                            {text => text}
                          </FormattedMessage>
                          <Required />
                        </>
                      }
                      name='carrierName'
                      fieldProps={{ width: 8 }}
                    />
                    <Input
                      type='text'
                      label={
                        <>
                          <FormattedMessage id='operations.quoteId' defaultMessage='Quote Id'>
                            {text => text}
                          </FormattedMessage>
                          <Required />
                        </>
                      }
                      name='quoteId'
                      fieldProps={{ width: 8 }}
                    />
                  </FormGroup>
                  <FormGroup data-test='operations_shipping_quote_price_date_inp'>
                    <Input
                      type='number'
                      label={
                        <>
                          <FormattedMessage id='operations.price' defaultMessage='Price'>
                            {text => text}
                          </FormattedMessage>
                          <Required />
                        </>
                      }
                      name='price'
                      fieldProps={{ width: 8 }}
                    />
                    <DateInput
                      label={formatMessage({ id: 'operations.validityDate', defaultMessage: 'Validity Date' })}
                      name='validityDate'
                      inputProps={{ minDate: moment(), clearable: true }}
                      fieldProps={{ width: 8 }}
                    />
                  </FormGroup>
                  <div style={{ textAlign: 'right' }}>
                    <Button.Reset data-test='operations_shipping_quote_reset_btn'>
                      <FormattedMessage id='global.cancel' defaultMessage='Cancel'>
                        {text => text}
                      </FormattedMessage>
                    </Button.Reset>
                    <Button.Submit data-test='operations_shipping_quote_submit_btn'>
                      <FormattedMessage id='global.save' defaultMessage='Save'>
                        {text => text}
                      </FormattedMessage>
                    </Button.Submit>
                  </div>
                </>
              )
            }}
          </Form>
        </Modal.Content>
      </Modal>
    )
  }
}

const mapDispatchToProps = {
  closePopup,
  updateShippingQuote,
  createShippingQuote
}

const mapStateToProps = state => {
  const { popupValues } = state.operations
  let validityDate =
    popupValues && popupValues.validityDate ? moment(popupValues.validityDate).format(getLocaleDateFormat()) : ''

  return {
    rowId: getSafe(() => popupValues.id),
    popupValues: popupValues
      ? {
          carrierName: popupValues.carrierName,
          quoteId: popupValues.quoteId,
          price: popupValues.price,
          validityDate: validityDate
        }
      : null
  }
}

export default withDatagrid(
  injectIntl(connect(mapStateToProps, mapDispatchToProps)(withToastManager(ShippingQuotesPopup)))
)
