import React from 'react'
import { connect } from 'react-redux'
import { Header, Modal, FormGroup, Accordion, Icon } from 'semantic-ui-react'
import { FormattedMessage } from 'react-intl'
import {
  closeDwollaPopup,
  getCountries,
  getProvinces,
  postDwollaAccount
} from '../../actions'
import { Form, Input, Button, Dropdown } from 'formik-semantic-ui'
import * as Yup from 'yup'
import styled from "styled-components";


const AccordionHeader = styled(Header)`
  font-size: 18px;
  font-weight: bolder;
  > i {
    font-weight: bolder;
  }
`

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

const formValidation = Yup.object().shape({

  beneficialOwner: Yup.object().shape({
    address: Yup.object().shape({
      address1: Yup.string().trim().min(3, 'Enter at least 2 characters').required('Enter at least 2 characters'),
      address2: Yup.string().trim().min(3, 'Enter at least 2 characters'),
      address3: Yup.string().trim().min(3, 'Enter at least 2 characters'),
      city: Yup.string().trim().min(3, 'Enter at least 2 characters').required('Enter at least 2 characters'),
      country: Yup.string().required(),
      postalCode: Yup.string().required(),
      stateProvinceRegion: Yup.string().trim(),
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
  dwollaController: Yup.object().shape({
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

class BankAccountsPopup extends React.Component {
    state = {
      hasProvinces: this.props.hasProvinces,
      accordionActive: {
          controllerAddress: false
      }
    }

  componentDidMount(){
      this.props.countriesDropDown.length < 1  && this.props.getCountries()
  }

  handleCountry = (e, d) => {
    let country = this.props.countries.find(obj => obj.id === d.value)
    if (country.hasProvinces) {
      this.props.getProvinces(country.id)
    }
    this.setState({hasProvinces: country.hasProvinces})
  }

  handleAccordionChange = (e, { name }) => {
    let { accordionActive } = this.state
    accordionActive[name] = !accordionActive[name]
    this.setState({ accordionActive })
  }

  render() {
    const {
      closeDwollaPopup,
      countriesDropDown,
      provincesDropDown,
      postDwollaAccount,
      auth
    } = this.props
    const { accordionActive } = this.state

    return (
      <Modal open centered={false}>
        <Modal.Header>
          Register Dwolla Account
        </Modal.Header>
        <Modal.Content>
          <Form
            initialValues={initialFormValues}
            enableReinitialize
            validationSchema={formValidation}
            onReset={closeDwollaPopup}
            onSubmit={(values, actions) => {
              values.beneficialOwner.address.country += ''
              values.beneficialOwner.passport.country += ''
              values.beneficialOwner.address.stateProvinceRegion += ''
              if(values.dwollaController && values.dwollaController.address && values.dwollaController.address.country){
                values.dwollaController.address.country += ''
              }
              if(values.dwollaController && values.dwollaController.passport && values.dwollaController.passport.country){
                values.dwollaController.passport.country += ''
              }
              if(values.dwollaController && values.dwollaController.address && values.dwollaController.address.stateProvinceRegion){
                values.dwollaController.address.stateProvinceRegion += ''
              }

              values.beneficialOwner.status = 'status'
              values.beneficialOwner.id = auth.identity.id +''

              closeDwollaPopup()
              postDwollaAccount(values)

              actions.setSubmitting(false)
            }}
          >

            <Accordion exclusive={false}>
              <FormGroup widths="equal" data-test='settings_dwolla_beneficialOwner_address123_inp'>
                <Input label="Address 1" name="beneficialOwner.address.address1" />
                <Input label="Address 2" name="beneficialOwner.address.address2" />
                <Input label="Address 3" name="beneficialOwner.address.address3" />
              </FormGroup>

              <FormGroup widths="equal" data-test='settings_dwolla_beneficialOwner_addressDatePassport_inp'>
                <Input label="City" name="beneficialOwner.address.city" />
                <Input label="Birth" name="beneficialOwner.dateOfBirth" />
                <Dropdown label="Passport Country" name="beneficialOwner.passport.country" options={countriesDropDown} inputProps={{ 'data-test': 'settings_dwolla_account_beneficialOwner_passport_country_drpdn' }} />
                <Input label="Passport Number" name="beneficialOwner.passport.number" />
              </FormGroup>

              <FormGroup widths="equal">
                <Dropdown label="Country" name="beneficialOwner.address.country" options={countriesDropDown}
                    inputProps={{
                      'data-test': 'settings_dwolla_account_beneficialOwner_address_country_drpdn',
                      search: true, onChange: (e, d) => {
                        this.handleCountry(e, d)
                    }
                }} />
                <Dropdown label="State/Province" name="beneficialOwner.address.stateProvinceRegion" options={provincesDropDown}
                        inputProps={{search: true, disabled: !this.state.hasProvinces, clearable: true, 'data-test': 'settings_dwolla_account_beneficialOwner_address_province_drpdn'}} />
              </FormGroup>

              <FormGroup widths="equal" data-test='settings_dwolla_beneficialOwner_namePostal_inp'>
                <Input label="Postal Code" name="beneficialOwner.address.postalCode" />
                <Input label="First Name"  name="beneficialOwner.firstName" />
              </FormGroup>
              <FormGroup widths="equal" data-test='settings_dwolla_beneficialOwner_nameSsn_inp'>
                  <Input label="Last Name" name="beneficialOwner.lastName" />
                  <Input label="SSN" name="beneficialOwner.ssn" />
              </FormGroup>

              <Accordion.Title active={accordionActive.controllerAddress} onClick={this.handleAccordionChange} name='controllerAddress'>
                <AccordionHeader as='h4'>
                    <Icon color={accordionActive.controllerAddress && 'blue'} name={accordionActive.controllerAddress ? 'chevron down' : 'chevron right'} />
                    <FormattedMessage id='global.controller' defaultMessage='Controlling Person' />
                </AccordionHeader>
              </Accordion.Title>
              <Accordion.Content active={accordionActive.controllerAddress}>
                <FormGroup widths="equal" data-test='settings_dwolla_dwollaController_address123_inp'>
                  <Input label="Address 1" name="dwollaController.address.address1" />
                  <Input label="Address 2" name="dwollaController.address.address2" />
                  <Input label="Address 3" name="dwollaController.address.address3" />
                </FormGroup>
                <FormGroup widths="equal" data-test='settings_dwolla_dwollaController_address_inp'>
                  <Input label="City" name="dwollaController.address.city" />
                  <Input label="Postal Code" name="dwollaController.address.postalCode" />
                  <Dropdown label="Country" name="dwollaController.address.country" options={countriesDropDown}
                      inputProps={{
                        'data-test': 'settings_dwolla_account_dwollaController_address_country_drpdn',
                        search: true, onChange: (e, d) => {
                          this.handleCountry(e, d)
                      }
                  }} />
                  <Dropdown label="State/Province" name="dwollaController.address.stateProvinceRegion" options={provincesDropDown}
                          inputProps={{search: true, disabled: !this.state.hasProvinces, clearable: true, 'data-test': 'settings_dwolla_account_dwollaController_address_province_drpdn'}} />
                </FormGroup>
                <FormGroup widths="equal" data-test='settings_dwolla_dwollaController_name_inp'>
                    <Input label="First Name" name="dwollaController.firstName" />
                    <Input label="Last Name" name="dwollaController.lastName" />
                    <Dropdown label="Passport Country" name="dwollaController.passport.country" options={countriesDropDown} inputProps={{ 'data-test': 'settings_dwolla_account_dwollaController_passport_country_drpdn' }} />
                    <Input label="Passport Number" name="dwollaController.passport.number" />
                </FormGroup>
                <FormGroup widths="equal" data-test='settings_dwolla_dwollaController_ssnTitle_inp'>
                    <Input label="SSN" name="dwollaController.ssn" />
                    <Input label="Title" name="dwollaController.title" />
                </FormGroup>
                <FormGroup widths="equal" data-test='settings_dwolla_dwollaController_dateOfBirth_inp'>
                  <Input label="Birth" name="dwollaController.dateOfBirth" />
                </FormGroup>
              </Accordion.Content>
            </Accordion>
            <div style={{ textAlign: 'right' }}>
              <Button.Reset onClick={closeDwollaPopup} data-test='settings_dwolla_account_reset_btn'>Cancel</Button.Reset>
              <Button.Submit data-test='settings_dwolla_account_submit_btn'>Save</Button.Submit>
            </div>
          </Form>
        </Modal.Content>
      </Modal>
    )
  }
}

const mapDispatchToProps = {
  closeDwollaPopup,
  getCountries,
  getProvinces,
  postDwollaAccount
}
const mapStateToProps = state => {
  return {
    auth: state.auth,
    hasProvinces: state.settings.hasProvinces,
    provincesDropDown: state.settings.provincesDropDown,
    popupValues: state.settings.popupValues,
    countries: state.settings.countries,
    countriesDropDown: state.settings.countriesDropDown,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BankAccountsPopup)
