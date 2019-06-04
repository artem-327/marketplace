import React from 'react'
import { connect } from 'react-redux'

import { Form, Modal, FormGroup, Accordion, Icon, Segment } from 'semantic-ui-react'

import { Formik } from 'formik'
import { closeRegisterDwollaAccount, updateCompany, createCompany, getCountries, getPrimaryBranchProvinces, getMailingBranchProvinces, postDwollaAccount } from '../../actions'
import { addZip, getZipCodes } from '~/modules/zip-dropdown/actions'
import { Input, Button, Dropdown } from 'formik-semantic-ui'
import * as Yup from 'yup'
// debug purposes only
import { FormattedMessage, injectIntl } from 'react-intl'
import { validationSchema } from '~/modules/company-form/constants'

const initialFormValues = {
  beneficialOwner: {
    address: {
      address1: '',
      city: '',
      country: '',
      postalCode: '',
      stateProvinceRegion: ''
    },
    dateOfBirth: '',
    firstName: '',
    lastName: '',
    passport: {
      country: '',
      number: ''
    },
    ssn: ''
  }
}

const formValidationNew = Yup.object().shape({

  beneficialOwner: Yup.object().shape({
    address: Yup.object().shape({
      address1: Yup.string().trim().min(3, 'Enter at least 2 characters').required('Enter at least 2 characters'),
      address2: Yup.string().trim().min(3, 'Enter at least 2 characters'),
      address3: Yup.string().trim().min(3, 'Enter at least 2 characters'),
      city: Yup.string().trim().min(3, 'Enter at least 2 characters').required('Enter at least 2 characters'),
      country: Yup.string().required(),
      postalCode: Yup.string().required(),
      stateProvinceRegion: Yup.string().trim().required('Required'),
    }),
    dateOfBirth: Yup.string().trim().min(3, 'Too short').required('Required'),
    firstName: Yup.string().trim().min(3, 'Too short').required('Required'),
    // "id": "string",
    lastName: Yup.string().trim().min(3, 'Too short').required('Required'),
    passport: Yup.object().shape({
      country: Yup.string().required(),
      number: Yup.string().required(),
    }),
    ssn: Yup.string().trim().min(3, 'Too short').required('Required'),
    // "status": "string"
  }),
  controller: Yup.object().shape({
    address: Yup.object().shape({
      address1: Yup.string().trim().min(3, 'Enter at least 2 characters'),
      address2: Yup.string().trim().min(3, 'Enter at least 2 characters'),
      address3: Yup.string().trim().min(3, 'Enter at least 2 characters'),
      city: Yup.string().trim().min(3, 'Enter at least 2 characters'),
      country: Yup.string(),
      postalCode: Yup.string(),
      stateProvinceRegion: Yup.string().trim(),
    }),
    dateOfBirth: Yup.string().trim().min(3, 'Too short'),
    firstName: Yup.string().trim().min(3, 'Too short'),
    lastName: Yup.string().trim().min(3, 'Too short'),
    passport: Yup.object().shape({
      country: Yup.string().required(),
      number: Yup.string().required(),
    }),
    ssn: Yup.string().trim().min(3, 'Too short'),
    title: Yup.string().trim().min(3, 'Too short')
  })
})

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
    let country = this.props.countries.find(obj => obj.id == d.value);
    if (country.hasProvinces) {
      this.props.getPrimaryBranchProvinces(country.id)
    }
    this.setState({ primaryBranchHasProvinces: country.hasProvinces })
  }

  handleMailingBranchCountry = (e, d) => {
    let country = this.props.countries.find(obj => obj.id == d.value);
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
      popupValues,
      countriesDropDown,
      primaryBranchProvinces,
      mailingBranchProvinces,
      auth,
    } = this.props

    let { accordionActive } = this.state

    return (
      <Formik
        enableReinitialize
        initialValues= {initialFormValues}
        validationSchema={formValidationNew}
        onSubmit={(values, actions) => {
            values.beneficialOwner.address.country += ''
            values.beneficialOwner.passport.country += ''
            values.beneficialOwner.address.stateProvinceRegion += ''
            if(values.controller && values.controller.address && values.controller.address.country){
              values.controller.address.country += ''
            }
            if(values.controller && values.controller.passport && values.controller.passport.country){
              values.controller.passport.country += ''
            }

            values.beneficialOwner.status = 'status'
            values.beneficialOwner.id = auth.identity.id +''

            closeRegisterDwollaAccount()
            postDwollaAccount(values)
            actions.setSubmitting(false)
        }}
        onReset={closeRegisterDwollaAccount}
        render={props => {
          let { setFieldValue, values, isSubmitting } = props

          return (
            <Modal open centered={false} size='small'>
              <Modal.Header>Register Dwolla Account</Modal.Header>
              <Segment basic>
                <Form loading={isSubmitting}>
                  <Accordion exclusive={false}>
                    <Modal.Content>
                      <FormGroup widths='equal'>
                        <Input label={<FormattedMessage id='global.address1' defaultMessage='Address1' />} name='beneficialOwner.address.address1' />
                        <Input label={<FormattedMessage id='global.address2' defaultMessage='Address2' />} name='beneficialOwner.address.address2' />
                        <Input label={<FormattedMessage id='global.address3' defaultMessage='Address3' />} name='beneficialOwner.address.address3' />
                      </FormGroup>
                      <FormGroup widths='equal'>
                        <Input label={<FormattedMessage id='global.city' defaultMessage='City' />} name='beneficialOwner.address.city' />
                        <Input label={<FormattedMessage id='global.dateOfBirth' defaultMessage='Birth' />} name='beneficialOwner.dateOfBirth' />
                      </FormGroup>
                      <FormGroup widths='equal'>
                        <Dropdown label="Passport Country" name="beneficialOwner.passport.country" options={countriesDropDown}/>
                        <Input label="Passport Number" name="beneficialOwner.passport.number" />
                      </FormGroup>
                      <FormGroup widths='equal'>
                        <Dropdown label={<FormattedMessage id='global.country' defaultMessage='Country' />} name='beneficialOwner.address.country' options={countriesDropDown}
                          inputProps={{
                          search: true, onChange: (e, d) => {
                              this.handlePrimaryBranchCountry(e, d)
                          }
                        }} />
                        <Dropdown label="Province" name="beneficialOwner.address.stateProvinceRegion" options={primaryBranchProvinces}
                          inputProps={{search: true, disabled: !this.state.primaryBranchHasProvinces, clearable: true}} />
                      </FormGroup>
                      <FormGroup widths='equal'>
                        <Input label={<FormattedMessage id='global.postalCode' defaultMessage='Postal Code' />} name='beneficialOwner.address.postalCode' />
                        <Input label={<FormattedMessage id='global.firstName' defaultMessage='First Name' />} name='beneficialOwner.firstName' />
                      </FormGroup>
                      <FormGroup widths='equal'>
                        <Input label={<FormattedMessage id='global.lastName' defaultMessage='Last Name' />} name='beneficialOwner.lastName' />
                        <Input label={<FormattedMessage id='global.ssn' defaultMessage='SSN' />} name='beneficialOwner.ssn' />
                      </FormGroup>

                      <Accordion.Title active={accordionActive.controllerAddress} onClick={this.handleAccordionChange} name='controllerAddress'>
                        <h4>
                            <Icon color={accordionActive.controllerAddress && 'blue'} name={accordionActive.controllerAddress ? 'chevron up' : 'chevron down'} />
                            <FormattedMessage id='global.Controller' defaultMessage='Controller' />
                        </h4>
                      </Accordion.Title>

                      <Accordion.Content active={accordionActive.controllerAddress}>
                        <FormGroup widths='equal'>
                          <Input label={<FormattedMessage id='global.address4' defaultMessage='Address1' />} name='controller.address.address1' />
                          <Input label={<FormattedMessage id='global.address5' defaultMessage='Address2' />} name='controller.address.address2' />
                          <Input label={<FormattedMessage id='global.address6' defaultMessage='Address3' />} name='controller.address.address3' />
                          
                        </FormGroup>
                        <FormGroup widths='equal'>
                          <Input label={<FormattedMessage id='global.city2' defaultMessage='City' />} name='controller.address.city' />
                          <Input label={<FormattedMessage id='global.postalCode2' defaultMessage='Postal Code' />} name='controller.address.postalCode' />
                          <Dropdown label={<FormattedMessage id='global.country2' defaultMessage='Country' />} name='controller.address.country' options={countriesDropDown}
                                inputProps={{
                                search: true, onChange: (e, d) => {
                                  this.handleMailingBranchCountry(e, d)
                                }
                            }} />
                          <Dropdown label="Province" name="controller.address.stateProvinceRegion" options={mailingBranchProvinces}
                            inputProps={{search: true, disabled: !this.state.mailingBranchHasProvinces, clearable: true}} />
                        </FormGroup>
                        <FormGroup widths='equal'>
                            <Input label={<FormattedMessage id='global.firstName2' defaultMessage='First Name' />} name='controller.firstName' />
                            <Input label={<FormattedMessage id='global.lastName2' defaultMessage='Last Name' />} name='controller.lastName' />
                        </FormGroup>
                        <FormGroup widths='equal'>
                          <Dropdown label="Passport Country" name="controller.passport.country" options={countriesDropDown}/>
                          <Input label="Passport Number" name="controller.passport.number" />
                        </FormGroup>
                        <FormGroup widths='equal'>
                            <Input label={<FormattedMessage id='global.ssn2' defaultMessage='SSN' />} name='controller.ssn' />
                            <Input label={<FormattedMessage id='global.title' defaultMessage='Title' />} name='controller.title' />
                        </FormGroup>
                        <FormGroup widths='equal'>
                          <Input label={<FormattedMessage id='global.dateOfBirth2' defaultMessage='Birth' />} name='controller.dateOfBirth' />
                        </FormGroup>
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