import React from 'react'
import { connect } from 'react-redux'
import * as Actions from '../../actions'
import { FormattedMessage, injectIntl } from 'react-intl'
import { errorMessages } from '~/constants/yupValidation'

import { Modal, FormGroup, FormField } from 'semantic-ui-react'
import { Form, Input, Button, Dropdown, Checkbox, TextArea } from 'formik-semantic-ui-fixed-validation'

import * as Yup from 'yup'
import { currencyId, currencySymbol } from '~/constants/index'
import { Required } from '~/components/constants/layout'
import styled from 'styled-components'
import { getSafe, removeEmpty } from '~/utils/functions'
import { withDatagrid } from '~/modules/datagrid'

const initialValuesAdd = {
  providerIdentifier: '',
  providerIdentifierName: '',
  identifierType: '',
  identifierValue: '',
  note: '',
  reinvoice: false
}

class AddEditLogisticProvider extends React.Component {
  componentDidMount() {
    this.props.getLogisticsProviders()
  }

  getInitialValues = () => {
    let { popupValues } = this.props
    return popupValues
      ? {
        note: popupValues.note || '',
        reinvoice: popupValues.reinvoice,
        providerIdentifierName: `${popupValues.name} (${popupValues.identifierValue})`
      } : initialValuesAdd
  }

  getValidationSchema = popupValues => {
    if (popupValues) {
      return Yup.object().shape({})
    } else {
      return Yup.object().shape({
        providerIdentifier: Yup.string(errorMessages.requiredMessage).required(errorMessages.requiredMessage)
      })
    }
  }

  render() {
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
    } = this.props

    let type = popupValues ? { id: 'edit', defaultMessage: 'Edit' } : { id: 'add', defaultMessage: 'Add' }

    return (
      <Modal open onClose={() => closePopup()}>
        <Modal.Header>
          {popupValues
            ? <FormattedMessage id='admin.editLogisticsProvider' defaultMessage='Edit Logistics Provider'/>
            : <FormattedMessage id='admin.addLogisticsProvider' defaultMessage='Add Logistics Provider'/>
          }
        </Modal.Header>
        <Modal.Content>
          <Form
            validationSchema={this.getValidationSchema(popupValues)}
            enableReinitialize={true}
            validateOnChange={false}
            validateOnBlur={false}
            initialValues={this.getInitialValues()}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                if (popupValues) {
                  const payload = {
                    note: values.note,
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
                    reinvoice: values.reinvoice

                  }
                  removeEmpty(payload)
                  await postNewLogisticsProvider(payload)
                  datagrid.loadData()
                }
              } catch {
              } finally {
                setSubmitting(false)
                closePopup()
              }
            }}
            render={props => {
              this.submitForm = props.submitForm
              return (
                <>
                  <FormGroup widths='equal' data-test='admin_logistics__inp'>
                    {popupValues
                      ? (
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
                      )
                      : (
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
                              <Required/>
                            </>}
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
                      )
                    }
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
                  </FormGroup>

                  <FormGroup widths='equal' data-test='admin_logistics__inp'>
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
                  </FormGroup>
                </>
              )
            }}
          />
        </Modal.Content>

        <Modal.Actions>
          <Button type='button' onClick={() => closePopup()}>
            {formatMessage({ id: 'global.cancel', defaultMessage: 'Cancel' })}
          </Button>
          <Button primary onClick={() => this.submitForm()} disabled={updating}>
            {formatMessage({ id: `global.${type.id}`, defaultMessage: type.defaultMessage })}
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

const mapStateToProps = state => {
  return {
    popupValues: state.admin.popupValues,
    logisticsProvidersFetching: state.admin.logisticsProvidersFetching,
    logisticsProviders: state.admin.logisticsProviders,
    updating: state.admin.updating
  }
}

export default withDatagrid(connect(mapStateToProps, Actions)(injectIntl(AddEditLogisticProvider)))