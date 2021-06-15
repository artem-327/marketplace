import { useEffect, useState } from 'react'
import { Modal, FormGroup, Header } from 'semantic-ui-react'
import { withToastManager } from 'react-toast-notifications'
import moment from 'moment'
import { FormattedMessage, injectIntl } from 'react-intl'
import * as Yup from 'yup'
import { Form, Input, Button, Dropdown } from 'formik-semantic-ui-fixed-validation'
import PropTypes from 'prop-types'
import { DateInput } from '../../../../components/custom-formik'
import { generateToastMarkup, uniqueArrayByKey } from '../../../../utils/functions'
import { errorMessages, dateValidation } from '../../../../constants/yupValidation'
import { getStringISODate } from '../../../../components/date-format'
import { Required } from '../../../../components/constants/layout'
import ErrorFocus from '../../../../components/error-focus'
import { debounce } from 'lodash'

const initialFormValues = {
  carrierName: '',
  quoteId: '',
  price: '',
  validityDate: '',
  shippingQuoteRequestId: ''
}

const formValidation = () =>
  Yup.lazy(values =>
    Yup.object().shape({
      validityDate: dateValidation(false).concat(
        Yup.string().test(
          'min-date',
          errorMessages.mustBeInFuture,
          val => !val || moment('00:00:00', 'hh:mm:ss').diff(getStringISODate(val), 'days') <= -1
        )
      ),
      carrierName: Yup.string().trim().min(3, errorMessages.minLength(3)),
      quoteId: Yup.string().trim().min(3, errorMessages.minLength(3)).required(errorMessages.requiredMessage),
      price: Yup.number().typeError(errorMessages.mustBeNumber).required(errorMessages.requiredMessage)
    })
  )

const ShippingQuotesPopup = props => {
  const [selectedOption, setSelectedOption] = useState(null)

  const handleSearch = debounce(text => {
    props.searchManualQuoteRequest(text)
  }, 250)

  useEffect(() => {
    const { popupValues } = props

    if (popupValues) {
      setSelectedOption(popupValues.options)
    }
  }, [])

  const {
    closePopup,
    popupValues,
    createShippingQuote,
    toastManager,
    intl: { formatMessage },
    datagrid,
    updateDatagrid,
    searchedManQuotRequests,
    searchedManQuotRequestsLoading
  } = props

  let allManQuotRequestsOptions = searchedManQuotRequests.slice()
  if (selectedOption) {
    allManQuotRequestsOptions.push(selectedOption)
    allManQuotRequestsOptions = uniqueArrayByKey(allManQuotRequestsOptions, 'id')
  }

  const formatedSearchedManQuotRequests = allManQuotRequestsOptions.map(val => ({
    key: val.id,
    value: val.id,
    text: `${val.id} - ${val.requestingCompany.name}`,
    content: (
      <Header
        content={`${val.id} - ${val.requestingCompany.name}`}
        subheader={val.requestingUser.name}
        style={{ fontSize: '14px' }}
      />
    )
  }))

  return (
    <Modal closeIcon onClose={() => closePopup()} open centered={false} size='small'>
      <Modal.Header>
        <FormattedMessage id='settings.addShippingQuote' defaultMessage='Add Shipping Quote' />
      </Modal.Header>
      <Modal.Content>
        <Form
          enableReinitialize
          initialValues={{ ...initialFormValues, shippingQuoteRequestId: popupValues ? popupValues.options.id : '' }}
          validationSchema={formValidation()}
          onReset={closePopup}
          onSubmit={async (values, { setSubmitting }) => {
            let payload = {
              carrierName: values.carrierName,
              quoteId: values.quoteId,
              price: Number(values.price),
              ...(values.validityDate !== '' && { validityDate: getStringISODate(values.validityDate) }),
              ...(values.shippingQuoteRequestId !== '' && { shippingQuoteRequestId: values.shippingQuoteRequestId })
            }

            try {
              const response = await createShippingQuote(payload)

              if (updateDatagrid) datagrid.loadData()

              toastManager.add(
                generateToastMarkup(
                  <FormattedMessage id={`notifications.shippingQuoteCreated.header`} />,
                  <FormattedMessage
                    id={`notifications.shippingQuoteCreated.content`}
                    values={{ name: response.value.quoteId }}
                  />
                ),
                { appearance: 'success' }
              )
            } catch (err) {
              console.error(err.message)
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
                      <FormattedMessage id='operations.carrierName' defaultMessage='Carrier Name' />
                    }
                    name='carrierName'
                    fieldProps={{ width: 8 }}
                  />
                  <Input
                    type='text'
                    label={
                      <>
                        <FormattedMessage id='operations.quoteId' defaultMessage='Quote Id' />
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
                        <FormattedMessage id='operations.price' defaultMessage='Price' />
                        <Required />
                      </>
                    }
                    name='price'
                    fieldProps={{ width: 8 }}
                  />
                  <DateInput
                    label={formatMessage({ id: 'operations.validityDate', defaultMessage: 'Validity Date' })}
                    name='validityDate'
                    inputProps={{
                      clearable: true
                    }}
                    fieldProps={{ width: 8 }}
                  />
                </FormGroup>
                <FormGroup>
                  <Dropdown
                    label={
                      <FormattedMessage id='operations.shippingRequest' defaultMessage='Shipping Request' />
                    }
                    name='shippingQuoteRequestId'
                    options={formatedSearchedManQuotRequests}
                    inputProps={{
                      loading: searchedManQuotRequestsLoading,
                      'data-test': 'operations_shipping_quote_shipping_request_drpdn',
                      size: 'large',
                      minCharacters: 1,
                      icon: 'search',
                      search: options => options,
                      selection: true,
                      clearable: true,
                      onSearchChange: (e, { searchQuery }) =>
                        searchQuery.length > 0 && handleSearch(searchQuery),
                      onChange: (e, { value }) => {
                        if (value) {
                          const selectedOption = allManQuotRequestsOptions.find(el => el.id === value)
                          setSelectedOption(selectedOption)
                        } else {
                          setSelectedOption(null)
                        }
                      }
                    }}
                    fieldProps={{ width: 8 }}
                  />
                </FormGroup>
                <div style={{ textAlign: 'right' }}>
                  <Button.Reset data-test='operations_shipping_quote_reset_btn'>
                    <FormattedMessage id='global.cancel' defaultMessage='Cancel' />
                  </Button.Reset>
                  <Button.Submit data-test='operations_shipping_quote_submit_btn'>
                    <FormattedMessage id='global.save' defaultMessage='Save' />
                  </Button.Submit>
                </div>
                <ErrorFocus />
              </>
            )
          }}
        </Form>
      </Modal.Content>
    </Modal>
  )
}

ShippingQuotesPopup.propTypes = {
  updateDatagrid: PropTypes.bool
}

ShippingQuotesPopup.defaultProps = {
  updateDatagrid: true
}

export default injectIntl(withToastManager(ShippingQuotesPopup))
