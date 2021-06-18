import { useEffect, useState } from 'react'
import { Modal, FormGroup, Header } from 'semantic-ui-react'
import { withToastManager } from 'react-toast-notifications'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Form, Input, Button, Dropdown } from 'formik-semantic-ui-fixed-validation'
import PropTypes from 'prop-types'
// Components
import { DateInput } from '../../../../components/custom-formik'
import ErrorFocus from '../../../../components/error-focus'
import { Required } from '../../../../components/constants/layout'
// Services
import { generateToastMarkup, uniqueArrayByKey } from '../../../../utils/functions'
import { getStringISODate } from '../../../../components/date-format'
import { initialFormValues, formValidation, handleSearch } from './ShippingQuotes.services'

const ShippingQuotesPopup = props => {
  const [selectedOption, setSelectedOption] = useState(null)

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
                        searchQuery.length > 0 && handleSearch(searchQuery, props),
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
  updateDatagrid: PropTypes.bool,
  searchedManQuotRequestsLoading: PropTypes.bool,
  popupValues: PropTypes.object,
  intl: PropTypes.object,
  datagrid: PropTypes.object,
  searchedManQuotRequests: PropTypes.array,
  toastManager: PropTypes.any,
  createShippingQuote: PropTypes.func,
  closePopup: PropTypes.func,
  searchManualQuoteRequest: PropTypes.func
}

ShippingQuotesPopup.defaultProps = {
  updateDatagrid: true,
  searchedManQuotRequestsLoading: false,
  popupValues: null,
  intl: {},
  datagrid: {},
  searchedManQuotRequests: [],
  toastManager: null,
  createShippingQuote: () => {},
  closePopup: () => {},
  searchManualQuoteRequest: () => {}
}

export default injectIntl(withToastManager(ShippingQuotesPopup))
