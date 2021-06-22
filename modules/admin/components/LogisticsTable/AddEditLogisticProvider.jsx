import { useEffect } from 'react'
import { FormattedMessage } from 'react-intl'
import { Modal, FormField, Grid, GridRow, GridColumn, Popup, Icon } from 'semantic-ui-react'
import { Form, Input, Button, Dropdown, Checkbox, TextArea } from 'formik-semantic-ui-fixed-validation'
// Services
import { removeEmpty } from '../../../../utils/functions'
import { getValidationSchema, getInitialValues } from './AddEditLogisticProvider.services'
// Styles
import { GridColumnEmail } from '../../styles'
import { Required } from '../../../../components/constants/layout'

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
                  reinvoice: values.reinvoice
                }
                removeEmpty(payload)
                const { value } = await updateLogisticsProvider(popupValues.id, payload)
                datagrid.updateRow(value.id, () => value)
              } else {
                const parsed = JSON.parse(values.providerIdentifier)
                const payload = {
                  identifierType: parsed.type,
                  identifierValue: parsed.value,
                  note: values.note,
                  email: values.email,
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
          render={props => {
            submitForm = props.submitForm
            return (
              <Grid>
                <GridRow>
                  <GridColumn width={7}>
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

                  <GridColumnEmail width={6}>
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

                  <GridColumn width={3}>
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

export default AddEditLogisticProvider
