import React from 'react'
import { connect } from 'react-redux'

import { Form, Modal, FormGroup, Accordion, Icon, Segment, Header } from 'semantic-ui-react'

import { Formik } from 'formik'
import { closeRegisterDwollaAccount, updateCompany, createCompany, getCountries, getPrimaryBranchProvinces, getMailingBranchProvinces, postDwollaAccount } from '../../actions'
import { addZip, getZipCodes } from '~/modules/zip-dropdown/actions'
import { ZipDropdown } from '~/modules/zip-dropdown'
import { Input, Button, Dropdown } from 'formik-semantic-ui'
import { DateInput } from '~/components/custom-formik'
import * as Yup from 'yup'
// debug purposes only
import { FormattedMessage, injectIntl } from 'react-intl'

import { validationSchema } from '~/modules/company-form/constants'
import { errorMessages } from '~/constants/yupValidation'





import { AddressForm } from '~/modules/address-form'
import { addressValidationSchema } from '~/modules/address-form/constants'

const formValidationNew = Yup.object().shape({

  // beneficialOwner: Yup.object().shape({
  //   address: Yup.object().shape({
  //     address1: Yup.string().trim().min(3, 'Enter at least 2 characters').required('Enter at least 2 characters'),
  //     address2: Yup.string().trim().min(3, 'Enter at least 2 characters'),
  //     address3: Yup.string().trim().min(3, 'Enter at least 2 characters'),
  //     city: Yup.string().trim().min(3, 'Enter at least 2 characters').required('Enter at least 2 characters'),
  //     country: Yup.string().required(),
  //     postalCode: Yup.string().required(),
  //     stateProvinceRegion: Yup.string().trim(),
  //   }),
  //   dateOfBirth: Yup.string().trim().min(3, 'Too short').required('Required'),
  //   firstName: Yup.string().trim().min(3, 'Too short').required('Required'),
  //   // "id": "string",
  //   lastName: Yup.string().trim().min(3, 'Too short').required('Required'),
  //   passport: Yup.object().shape({
  //     country: Yup.string().required(),
  //     number: Yup.string().required(),
  //   }),
  //   ssn: Yup.string().trim().min(3, 'Too short').required('Required'),
  //   // "status": "string"
  // }),
  dwollaController: Yup.object().shape({
    firstName: Yup.string().trim().min(3, errorMessages.minLength(3)).required(errorMessages.requiredMessage),
    lastName: Yup.string().trim().min(3, errorMessages.minLength(3)).required(errorMessages.requiredMessage),
    jobTitle: Yup.string().trim().min(3, errorMessages.minLength(3)),
    dateOfBirth: Yup.string().required(errorMessages.requiredMessage),
    ssn: Yup.string().trim().min(8, errorMessages.minDigits(8)).required(errorMessages.requiredMessage),
    address: addressValidationSchema()

    //   streetAddress: Yup.string().trim().min(3, 'Enter at least 2 characters').required('Required field'),
    // city: Yup.string().trim().min(3, 'Enter at least 2 characters').required('Required field'),
    // country: Yup.string().required('Required field'),
    // province: Yup.string(),
    // zip: Yup.string()
  })
})

// "dwollaController": {
//   "city": "string",
//   "country": 0,
//   "dateOfBirth": "string",
//   "firstName": "string",
//   "jobTitle": "string",
//   "lastName": "string",
//   "province": 0,
//   "ssn": "string",
//   "streetAddress": "string",
//   "zip": "string"
// }

class AddNewPopupCasProducts extends React.Component {
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
    this.props.getCountries()
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
      countriesDropDown,
      primaryBranchProvinces,
      mailingBranchProvinces,
      auth,
      zip,
    } = this.props

    let { accordionActive } = this.state

    const initialFormValues = {
      dwollaController: {
        ...(popupValues.primaryUser ? {
          firstName: popupValues.primaryUser.name.split(' ')[0],
          lastName: popupValues.primaryUser.name.split(' ')[1],
          address: {
            city: popupValues.primaryUser.homeBranch.address.city,
            streetAddress: popupValues.primaryUser.homeBranch.address.streetAddress,
            zip: popupValues.primaryUser.homeBranch.address.zip.id,
            country: popupValues.primaryUser.homeBranch.address.country.id
          }
        } : {
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
            <Modal open centered={false} size='small'>
              <Modal.Header><FormattedMessage id='global.registerDwollaAcc' /></Modal.Header>
              <Segment basic padded>
                <Form loading={isSubmitting} onSubmit={props.handleSubmit}>
                  <Accordion exclusive={false}>
                    <Modal.Content>
                      {/* <FormGroup widths='equal'>
                        <Input label={<FormattedMessage id='global.address1' defaultMessage='Address1' />} name='beneficialOwner.address.address1' />
                        <Input label={<FormattedMessage id='global.address2' defaultMessage='Address2' />} name='beneficialOwner.address.address2' />
                        <Input label={<FormattedMessage id='global.address3' defaultMessage='Address3' />} name='beneficialOwner.address.address3' />
                      </FormGroup>
                      <FormGroup widths='equal'>
                        <Input label={<FormattedMessage id='global.city' defaultMessage='City' />} name='beneficialOwner.address.city' />
                        <Input label={<FormattedMessage id='global.dateOfBirth' defaultMessage='Birth' />} name='beneficialOwner.dateOfBirth' />
                      </FormGroup>
                      <FormGroup widths='equal'>
                        <Dropdown label="Passport Country" name="beneficialOwner.passport.country" options={countriesDropDown} />
                        <Input label="Passport Number" name="beneficialOwner.passport.number" />
                      </FormGroup>
                      <FormGroup widths='equal'>
                        <Dropdown label={<FormattedMessage id='global.country' defaultMessage='Country' />} name='beneficialOwner.address.country' options={countriesDropDown}
                          inputProps={{
                            search: true, onChange: (e, d) => {
                              this.handlePrimaryBranchCountry(e, d)
                            }
                          }} />
                        <Dropdown label="State/Province" name="beneficialOwner.address.stateProvinceRegion" options={primaryBranchProvinces}
                          inputProps={{ search: true, disabled: !this.state.primaryBranchHasProvinces, clearable: true }} />
                      </FormGroup>
                      <FormGroup widths='equal'>
                        <Input label={<FormattedMessage id='global.postalCode' defaultMessage='Postal Code' />} name='beneficialOwner.address.postalCode' />
                        <Input label={<FormattedMessage id='global.firstName' defaultMessage='First Name' />} name='beneficialOwner.firstName' />
                      </FormGroup>
                      <FormGroup widths='equal'>
                        <Input label={<FormattedMessage id='global.lastName' defaultMessage='Last Name' />} name='beneficialOwner.lastName' />
                        <Input label={<FormattedMessage id='global.ssn' defaultMessage='SSN' />} name='beneficialOwner.ssn' />
                      </FormGroup> */}

                      {/* <Accordion.Title active={accordionActive.controllerAddress} onClick={this.handleAccordionChange} name='controllerAddress'>
                        <h4>
                          <Icon color={accordionActive.controllerAddress && 'blue'} name={accordionActive.controllerAddress ? 'chevron down' : 'chevron right'} />
                          <FormattedMessage id='global.Controller' defaultMessage='Controlling person' />
                        </h4>
                      </Accordion.Title> */}

                      <Header>
                        <FormattedMessage id='global.Controller' defaultMessage='Controlling person' />
                      </Header>

                      <Accordion.Content active={accordionActive.controllerAddress}>
                        <FormGroup widths='equal'>
                          <Input label={<FormattedMessage id='global.firstName2' defaultMessage='First Name' />} name='dwollaController.firstName' />
                          <Input label={<FormattedMessage id='global.lastName2' defaultMessage='Last Name' />} name='dwollaController.lastName' />
                          <Input label={<FormattedMessage id='global.title' defaultMessage='Job Title' />} name='dwollaController.jobTitle' />
                        </FormGroup>
                        <FormGroup widths='equal'>
                          <DateInput label={<FormattedMessage id='global.dateOfBirth2' defaultMessage='Birth' />} name='dwollaController.dateOfBirth' />
                          <Input label={<FormattedMessage id='global.ssn2' defaultMessage='SSN' />} name='dwollaController.ssn' />
                        </FormGroup>

                        <AddressForm values={values} displayHeader={false} setFieldValue={setFieldValue} prefix='dwollaController' />
                        {/* <FormGroup widths='equal'>
                          <Input label={<FormattedMessage id='global.address4' defaultMessage='Street address' />} name='dwollaController.streetAddress' />
                          <Input label={<FormattedMessage id='global.city2' defaultMessage='City' />} name='dwollaController.city' />
                        </FormGroup>
                        <FormGroup widths='equal'>
                          <ZipDropdown label="Zip" name="dwollaController.zip" options={zip.codes}
                            inputProps={{ search: true, clearable: true }} />
                          <Dropdown label={<FormattedMessage id='global.country2' defaultMessage='Country' />} name='dwollaController.country' options={countriesDropDown}
                            inputProps={{
                              search: true,
                              onChange: (e, d) => {
                                this.handleMailingBranchCountry(e, d)
                              }
                            }} />
                          <Dropdown label="State/Province" name="dwollaController.province" options={mailingBranchProvinces}
                            inputProps={{ search: true, disabled: !this.state.mailingBranchHasProvinces, clearable: true }} />
                        </FormGroup> */}
                      </Accordion.Content>
                    </Modal.Content>
                  </Accordion>

                </Form>
              </Segment>
              <Modal.Actions>
                <Button.Reset onClick={props.handleReset}><FormattedMessage id='global.cancel' defaultMessage='Cancel' /></Button.Reset>
                <Button.Submit onClick={props.handleSubmit}><FormattedMessage id='global.save' defaultMessage='Save' /></Button.Submit>
              </Modal.Actions>
            </Modal>
          )
        }}>
      </Formik>
    )
  }
}

const mapDispatchToProps = {
  closeRegisterDwollaAccount,
  updateCompany,
  createCompany,
  getCountries,
  getPrimaryBranchProvinces,
  getMailingBranchProvinces,
  postDwollaAccount,
  addZip,
  getZipCodes
}

const mapStateToProps = ({ admin, zip, auth }) => {
  return {
    ...admin,
    zip,
    config: admin.config[admin.currentTab],
    auth,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(AddNewPopupCasProducts))