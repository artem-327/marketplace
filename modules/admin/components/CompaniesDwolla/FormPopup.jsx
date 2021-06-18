import { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Modal, FormGroup, Accordion, Icon, Segment, Header } from 'semantic-ui-react'
import { Formik } from 'formik'
import {
  closeRegisterDwollaAccount,
  getPrimaryBranchProvinces,
  getMailingBranchProvinces,
  postDwollaAccount
} from '../../actions'
import { getCountries } from '../../../global-data/actions'
import { addZip, getZipCodes } from '../../../zip-dropdown/actions'
import { Input, Button, Dropdown } from 'formik-semantic-ui-fixed-validation'
import { DateInput } from '../../../../components/custom-formik'
import * as Yup from 'yup'
// debug purposes only
import { FormattedMessage, injectIntl } from 'react-intl'
import { errorMessages, addressValidationSchema, dateValidation } from '../../../../constants/yupValidation'
import { AddressForm } from '../../../address-form'

const formValidationNew = Yup.object().shape({
  dwollaController: Yup.object().shape({
    firstName: Yup.string().trim().min(3, errorMessages.minLength(3)).required(errorMessages.requiredMessage),
    lastName: Yup.string().trim().min(3, errorMessages.minLength(3)).required(errorMessages.requiredMessage),
    jobTitle: Yup.string().trim().min(3, errorMessages.minLength(3)),
    dateOfBirth: dateValidation(false).concat(Yup.string().required(errorMessages.requiredMessage)),
    ssn: Yup.string().trim().min(8, errorMessages.minDigits(8)).required(errorMessages.requiredMessage),
    address: addressValidationSchema()
  })
})

class AddNewPopupCasProducts extends Component {
  state = {
    primaryBranchHasProvinces: false,
    mailingBranchHasProvinces: false,
    accordionActive: {
      companyAdmin: true,
      billingAddress: true,
      controllerAddress: true
    }
  }

  componentDidMount() {
    if (!this.props.countries.length) this.props.getCountries()
  }

  handlePrimaryBranchCountry = (e, d) => {
    let country = this.props.countries.find(obj => obj.id == d.value)
    if (country.hasProvinces) {
      this.props.getPrimaryBranchProvinces(country.id)
    }
    this.setState({ primaryBranchHasProvinces: country.hasProvinces })
  }

  handleMailingBranchCountry = (e, d) => {
    let country = this.props.countries.find(obj => obj.id == d.value)
    if (country.hasProvinces) {
      this.props.getMailingBranchProvinces(country.id)
    }
    this.setState({ mailingBranchHasProvinces: country.hasProvinces })
  }

  handleAccordionChange = (e, { name }) => {
    let { accordionActive } = this.state
    accordionActive[name] = !accordionActive[name]
    this.setState({ accordionActive })
  }

  render() {
    const {
      closeRegisterDwollaAccount,
      postDwollaAccount,
      popupValues,
      countriesDropdown,
      primaryBranchProvinces,
      mailingBranchProvinces,
      auth,
      zip
    } = this.props

    let { accordionActive } = this.state

    const initialFormValues = {
      dwollaController: {
        ...(popupValues.primaryUser
          ? {
              firstName: popupValues.primaryUser.name.split(' ')[0],
              lastName: popupValues.primaryUser.name.split(' ')[1],
              address: {
                city: popupValues.primaryUser.homeBranch.address.city,
                streetAddress: popupValues.primaryUser.homeBranch.address.streetAddress,
                zip: popupValues.primaryUser.homeBranch.address.zip.id,
                country: popupValues.primaryUser.homeBranch.address.country.id
              }
            }
          : {
              firstName: '',
              lastName: '',
              address: {
                city: '',
                streetAddress: '',
                zip: '',
                country: ''
              }
            }),
        ssn: '',
        dateOfBirth: ''
      }
    }

    return (
      <Formik
        enableReinitialize
        initialValues={initialFormValues}
        validationSchema={formValidationNew}
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

                      <Accordion.Content active={accordionActive.controllerAddress}>
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
                            inputProps={{ 'data-test': 'admin_popup_company_dwolla_birth_dtin' }}
                            inputOnly
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
        }}></Formik>
    )
  }
}

const mapDispatchToProps = {
  closeRegisterDwollaAccount,
  getCountries,
  getPrimaryBranchProvinces,
  getMailingBranchProvinces,
  postDwollaAccount,
  addZip,
  getZipCodes
}

const mapStateToProps = ({ admin, zip, auth, globalData }) => {
  return {
    ...admin,
    zip,
    auth,
    countries: globalData.countries,
    countriesDropdown: globalData.countriesDropdown
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(AddNewPopupCasProducts))
