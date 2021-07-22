import { useEffect } from 'react'
import { Form, Modal, FormGroup, Accordion, Segment, Header } from 'semantic-ui-react'
import { Formik } from 'formik'
import { Input, Button } from 'formik-semantic-ui-fixed-validation'
import { FormattedMessage } from 'react-intl'
import PropTypes from 'prop-types'
// Components
import { DateInput } from '../../../../components/custom-formik'
import { AddressForm } from '../../../address-form'
// Services
import { formValidation, initialFormValues } from './FormPopup.services'

/**
 * FormPopup Component
 * @category Admin Settings - Forms
 * @components
 */
const FormPopup = props => {
  useEffect(() => {
    if (!props.countries.length) props.getCountries()
  }, [])

  const {
    closeRegisterDwollaAccount,
    postDwollaAccount,
    popupValues
  } = props

  return (
    <Formik
      enableReinitialize
      initialValues={initialFormValues(popupValues)}
      validationSchema={formValidation}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={async (values, { setSubmitting }) => {
        let { address, ...rest } = values.dwollaController
        let payload = {
          dwollaController: {
            ...address,
            country: JSON.parse(address.country).countryId,
            ...rest
          }
        }

        await postDwollaAccount(payload, popupValues.id)
        setSubmitting(false)
      }}
      onReset={closeRegisterDwollaAccount}
      render={props => {
        let { setFieldValue, values, isSubmitting } = props

        return (
          <Modal closeIcon onClose={() => closeRegisterDwollaAccount()} open centered={false} size='small'>
            <Modal.Header>
              <FormattedMessage id='global.registerDwollaAcc' />
            </Modal.Header>
            <Segment basic padded>
              <Form loading={isSubmitting} onSubmit={props.handleSubmit}>
                <Accordion exclusive={false}>
                  <Modal.Content>

                    <Header>
                      <FormattedMessage id='global.Controller' defaultMessage='Controlling person' />
                    </Header>

                    <Accordion.Content active={true}>
                      <FormGroup widths='equal' data-test='admin_popup_company_dwolla_name_inp'>
                        <Input
                          inputProps={{ fluid: true }}
                          label={<FormattedMessage id='global.firstName2' defaultMessage='First Name' />}
                          name='dwollaController.firstName'
                        />
                        <Input
                          inputProps={{ fluid: true }}
                          label={<FormattedMessage id='global.lastName2' defaultMessage='Last Name' />}
                          name='dwollaController.lastName'
                        />
                        <Input
                          inputProps={{ fluid: true }}
                          label={<FormattedMessage id='global.title' defaultMessage='Job Title' />}
                          name='dwollaController.jobTitle'
                        />
                      </FormGroup>
                      <FormGroup widths='equal' data-test='admin_popup_company_dwolla_birth_inp'>
                        <DateInput
                          label={<FormattedMessage id='global.dateOfBirth2' defaultMessage='Birth' />}
                          name='dwollaController.dateOfBirth'
                          inputProps={{
                            fluid: true,
                            placeholder: <FormattedMessage id='date.standardFormat' defaultMessage='MM/DD/YYYY' />,
                            clearable: true,
                            'data-test': 'admin_popup_company_dwolla_birth_dtin'
                          }}
                          inputOnly
                          addSeparator
                        />
                        <Input
                          label={<FormattedMessage id='global.ssn2' defaultMessage='SSN' />}
                          name='dwollaController.ssn'
                        />
                      </FormGroup>

                      <AddressForm
                        values={values}
                        displayHeader={false}
                        setFieldValue={setFieldValue}
                        prefix='dwollaController'
                      />
                    </Accordion.Content>
                  </Modal.Content>
                </Accordion>
              </Form>
            </Segment>
            <Modal.Actions>
              <Button.Reset data-test='admin_popup_company_dwolla_cancel_btn' onClick={props.handleReset}>
                <FormattedMessage id='global.cancel' defaultMessage='Cancel' />
              </Button.Reset>
              <Button.Submit data-test='admin_popup_company_dwolla_save_btn' onClick={props.handleSubmit}>
                <FormattedMessage id='global.save' defaultMessage='Save' />
              </Button.Submit>
            </Modal.Actions>
          </Modal>
        )
      }}
    ></Formik>
  )
}

FormPopup.propTypes = {
  countries: PropTypes.array,
  getCountries: PropTypes.func,
  closeRegisterDwollaAccount: PropTypes.func,
  postDwollaAccount: PropTypes.func,
  popupValues: PropTypes.object
}

FormPopup.defaultValues = {
  countries: [],
  getCountries: () => {},
  closeRegisterDwollaAccount: () => {},
  postDwollaAccount: () => {},
  popupValues: null
}

export default FormPopup
