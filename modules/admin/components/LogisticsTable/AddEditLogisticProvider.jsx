import { useEffect } from 'react'
import { FormattedMessage } from 'react-intl'
import { Modal, FormField, Grid, GridRow, GridColumn, Popup, Icon } from 'semantic-ui-react'
import { Form, Input, Button, Dropdown, Checkbox, TextArea } from 'formik-semantic-ui-fixed-validation'
import { PhoneNumber } from '../../../phoneNumber'
import PropTypes from 'prop-types'
// Services
import { removeEmpty } from '../../../../utils/functions'
import { getValidationSchema, getInitialValues } from './AddEditLogisticProvider.services'
// Styles
import { GridColumnEmail } from '../../styles'
import { Required } from '../../../../components/constants/layout'

/**
 * AddEditLogisticProvider Component
 * @category Admin Settings - Logistics
 * @components
 */
const AddEditLogisticProvider = props => {
  let submitForm

  useEffect(() => {
    props.getLogisticsProviders()
  }, [])

  const {
    closePopup,
    intl: { formatMessage },
    popupValues,
    logisticsProviders,
    logisticsProvidersFetching,
    postNewLogisticsProvider,
    updateLogisticsProvider,
    datagrid,
    updating
  } = props

  let type = popupValues ? { id: 'edit', defaultMessage: 'Edit' } : { id: 'add', defaultMessage: 'Add' }
  let labelMultipleEmail = (
    <span style={{ color: 'orange', fontSize: '10px' }}>
      <FormattedMessage
        id='validation.multipleEmails'
        defaultMessage={'Divide by semicolon ; (user1@gmail.com;user2@gmail.com)'}
      />
    </span>
  )
  return (
    <Modal open onClose={() => closePopup()}>
      <Modal.Header>
        {popupValues ? (
          <FormattedMessage id='admin.editLogisticsProvider' defaultMessage='Edit Logistics Provider' />
        ) : (
          <FormattedMessage id='admin.addLogisticsProvider' defaultMessage='Add Logistics Provider' />
        )}
      </Modal.Header>
      <Modal.Content>
        <Form
          validationSchema={getValidationSchema(popupValues)}
          enableReinitialize={true}
          validateOnChange={false}
          validateOnBlur={false}
          initialValues={getInitialValues(popupValues)}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              if (popupValues) {
                const payload = {
                  note: values.note,
                  email: values.email,
                  phone: values.phone,
                  reinvoice: values.reinvoice
                }
                removeEmpty(payload)
                const { value } = await updateLogisticsProvider(popupValues.id, payload)
                // datagrid.updateRow(value.id, () => value)
                datagrid.loadData()
              } else {
                const parsed = JSON.parse(values.providerIdentifier)
                const payload = {
                  identifierType: parsed.type,
                  identifierValue: parsed.value,
                  note: values.note,
                  email: values.email,
                  phone: values.phone,
                  reinvoice: values.reinvoice
                }
                removeEmpty(payload)
                await postNewLogisticsProvider(payload)
                datagrid.loadData()
              }
              closePopup()
            } catch {
            } finally {
              setSubmitting(false)
            }
          }}
          render={formikProps => {
            submitForm = formikProps.submitForm
            return (
              <Grid>
                <GridRow>
                  <GridColumn width={8}>
                    {popupValues ? (
                      <Input
                        name='providerIdentifierName'
                        label={formatMessage({
                          id: 'logistics.label.logisticsProvider',
                          defaultMessage: 'Logistics Provider'
                        })}
                        inputProps={{
                          readOnly: true
                        }}
                      />
                    ) : (
                      <Dropdown
                        name='providerIdentifier'
                        options={logisticsProviders.map((provider, index) => ({
                          key: provider.identifier.value,
                          text: `${provider.name} (${provider.identifier.value})`,
                          value: JSON.stringify(provider.identifier)
                        }))}
                        label={
                          <>
                            {formatMessage({
                              id: 'logistics.label.logisticsProvider',
                              defaultMessage: 'Logistics Provider'
                            })}
                            <Required />
                          </>
                        }
                        inputProps={{
                          search: true,
                          'data-test': 'admin_logistics_provider_drpdn',
                          placeholder: formatMessage({
                            id: 'logistics.placeholder.logisticsProvider',
                            label: 'Select Logistics Provider'
                          }),
                          loading: logisticsProvidersFetching
                        }}
                      />
                    )}
                  </GridColumn>

                  <GridColumnEmail width={8}>
                    <Input
                      type='text'
                      label={
                        <>
                          {formatMessage({ id: 'global.email', defaultMessage: 'E-mail' })}
                          <Popup
                            content={
                              <FormattedMessage
                                id='logistics.emailInfo'
                                defaultMessage='When generated, BOL will be sent to provided email addresses. If kept empty, BOL will not be sent automatically.'
                              />
                            }
                            trigger={<Icon name='info circle' color='blue' style={{ marginLeft: '5px' }} />}
                          />
                        </>
                      }
                      name='email'
                      inputProps={{
                        placeholder: formatMessage({
                          id: 'global.enterEmailAddress',
                          defaultMessage: 'Enter Email Addresses'
                        })
                      }}
                    />
                    {labelMultipleEmail}
                  </GridColumnEmail>
                </GridRow>

                <GridRow>
                  <GridColumn width={8}>
                    <FormField style={{ marginTop: '32px', marginLeft: '30px' }}>
                      <Checkbox
                        style={{ marginTop: '20px' }}
                        label={formatMessage({
                          id: 'admin.admin',
                          defaultMessage: 'Re-Invoice'
                        })}
                        name='reinvoice'
                        inputProps={{ 'data-test': 'admin_logistics_provider_reinvoice_chckb' }}
                      />
                    </FormField>
                  </GridColumn>
                  <GridColumn width={8}>
                    <PhoneNumber
                      name='phone'
                      values={formikProps.values}
                      label={<FormattedMessage id='global.phone' defaultMessage='Phone' />}
                      setFieldValue={formikProps.setFieldValue}
                      setFieldTouched={formikProps.setFieldTouched}
                      errors={formikProps.errors}
                      touched={formikProps.touched}
                      isSubmitting={formikProps.isSubmitting}
                      placeholder={formatMessage({ id: 'global.phonePlaceholder', defaultMessage: '000 000 0000' })}
                      clearable={true}
                    />
                  </GridColumn>
                </GridRow>

                <GridRow data-test='admin_logistics__inp'>
                  <GridColumn>
                    <TextArea
                      name='note'
                      label={formatMessage({ id: 'global.notes', defaultMessage: 'Notes' })}
                      inputProps={{
                        placeholder: formatMessage({
                          id: 'global.placeholder.notes',
                          defaultMessage: 'Write notes here'
                        })
                      }}
                    />
                  </GridColumn>
                </GridRow>
              </Grid>
            )
          }}
        />
      </Modal.Content>

      <Modal.Actions>
        <Button type='button' onClick={() => closePopup()}>
          {formatMessage({ id: 'global.cancel', defaultMessage: 'Cancel' })}
        </Button>
        <Button primary onClick={() => submitForm()} disabled={updating}>
          {formatMessage({ id: `global.${type.id}`, defaultMessage: type.defaultMessage })}
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

AddEditLogisticProvider.propTypes = {
  getLogisticsProviders: PropTypes.func,
  closePopup: PropTypes.func,
  postNewLogisticsProvider: PropTypes.func,
  updateLogisticsProvider: PropTypes.func,
  logisticsProviders: PropTypes.array,
  logisticsProvidersFetching: PropTypes.bool,
  updating: PropTypes.bool,
  popupValues: PropTypes.object,
  datagrid: PropTypes.object,
  intl: PropTypes.object
}

AddEditLogisticProvider.defaultValues = {
  getLogisticsProviders: () => {},
  closePopup: () => {},
  postNewLogisticsProvider: () => {},
  updateLogisticsProvider: () => {},
  logisticsProviders: [],
  logisticsProvidersFetching: false,
  updating: false,
  popupValues: null,
  datagrid: {},
  intl: {}
}

export default AddEditLogisticProvider
