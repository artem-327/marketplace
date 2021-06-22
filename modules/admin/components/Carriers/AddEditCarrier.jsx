import { FormattedMessage } from 'react-intl'
import { Modal, Grid, GridRow, GridColumn } from 'semantic-ui-react'
import { Form, Input, Button, Dropdown } from 'formik-semantic-ui-fixed-validation'
import PropTypes from 'prop-types'
// Components
import ErrorFocus from '../../../../components/error-focus'
import { PriceInput } from '../../../marketplace/constants/layout'
// Constants
import { INITIAL_VALUES, OPTIONS_YES_NO } from './AddEditCarrier.constants'
// Services
import { getInitValues, getValidationSchema, submitForm } from './AddEditCarrier.services'
// Styles
import { Required } from '../../../../components/constants/layout'

let formikPropsSelf = {}

const AddEditCarrier = props => {
  const {
    closePopup,
    intl: { formatMessage },
    popupValues,
    updating
  } = props

  const type = popupValues ? { id: 'edit', defaultMessage: 'Edit' } : { id: 'add', defaultMessage: 'Add' }

  return (
    <Modal open onClose={() => closePopup()}>
      <Modal.Header>
        {popupValues ? (
          <FormattedMessage id='admin.editCarrier' defaultMessage='Edit Carrier' />
        ) : (
          <FormattedMessage id='admin.addCarrier' defaultMessage='Add Carrier' />
        )}
      </Modal.Header>
      <Modal.Content>
        <Form
          initialValues={popupValues ? { ...INITIAL_VALUES, ...getInitValues(popupValues) } : INITIAL_VALUES}
          onSubmit={(values, actions) => submitForm(values, actions, props)}
          validationSchema={getValidationSchema()}
          render={formikProps => {
            formikPropsSelf = formikProps
            return (
              <Grid>
                <GridRow>
                  <GridColumn width={6}>
                    <Input
                      name='code'
                      label={
                        <>
                          {formatMessage({ id: 'carrier.code', defaultMessage: 'Code'})}
                          <Required />
                        </>
                      }
                      inputProps={{
                        disabled: popupValues,
                        placeholder: formatMessage({ id: 'carrier.enterCode', label: 'Enter Code' })
                      }}
                    />
                  </GridColumn>
                  <GridColumn width={6}>
                  <PriceInput
                    name='priceMarkup'
                    label={formatMessage({ id: 'carrier.priceMarkup', defaultMessage: 'Price Markup'})}
                    inputProps={{
                      placeholder: formatMessage({ id: 'carrier.enterPrice', label: 'Enter Price' }),
                      min: 0.001,
                      type: 'number'
                    }}
                    currencyLabel={'$'}
                    />
                  </GridColumn>
                  <GridColumn width={4}>
                    <Dropdown
                      name='blindShipmentSupport'
                      options={OPTIONS_YES_NO}
                      label={
                        formatMessage({
                          id: 'carrier.blindShipmentSupport',
                          defaultMessage: 'Blind Shipment Support'
                        })
                      }
                      inputProps={{
                        'data-test': 'admin_carrier_drpdn',
                        placeholder: formatMessage({
                          id: 'carrier.selectBlindShipmentSupport',
                          label: 'Select Blind Shipment Support'
                        })
                      }}
                    />
                  </GridColumn>
                </GridRow>
                <ErrorFocus />
              </Grid>
            )
          }}
        />
      </Modal.Content>
      <Modal.Actions>
        <Button type='button' onClick={() => closePopup()}>
          {formatMessage({ id: 'global.cancel', defaultMessage: 'Cancel' })}
        </Button>
        <Button primary onClick={() => formikPropsSelf.submitForm()} disabled={updating}>
          {formatMessage({ id: `global.${type.id}`, defaultMessage: type.defaultMessage })}
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

AddEditCarrier.propTypes = {
  closePopup: PropTypes.func,
  postNewCarrier: PropTypes.func,
  updateCarrier: PropTypes.func,
  popupValues: PropTypes.object,
  updating: PropTypes.bool,
  datagrid: PropTypes.object,
  intl: PropTypes.object
}

AddEditCarrier.defaultValues = {
  closePopup: () => {},
  postNewCarrier: () => {},
  updateCarrier: () => {},
  updating: false,
  popupValues: null,
  datagrid: {},
  intl: {}
}

export default AddEditCarrier