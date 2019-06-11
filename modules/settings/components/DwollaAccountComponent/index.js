import React from 'react'
import { connect } from 'react-redux'
import { Modal, FormGroup, Accordion, Icon } from 'semantic-ui-react'
import { FormattedMessage } from 'react-intl'
import {
  closeDwollaPopup,
  getCountries,
  getProvinces,
  postDwollaAccount
} from '../../actions'
import { Form, Input, Button, Dropdown } from 'formik-semantic-ui'
import * as Yup from 'yup'


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
    let country = this.props.countries.find(obj => obj.id === d.value);
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
              if(values.controller && values.controller.address && values.controller.address.country){
                values.controller.address.country += ''
              }
              if(values.controller && values.controller.passport && values.controller.passport.country){
                values.controller.passport.country += ''
              }
              if(values.controller && values.controller.address && values.controller.address.stateProvinceRegion){
                values.controller.address.stateProvinceRegion += ''
              }

              values.beneficialOwner.status = 'status'
              values.beneficialOwner.id = auth.identity.id +''

              closeDwollaPopup()
              postDwollaAccount(values)

              actions.setSubmitting(false)
            }}
          >

            <Accordion exclusive={false}>
              <FormGroup widths="equal">
                <Input label="Address 1" name="beneficialOwner.address.address1" />
                <Input label="Address 2" name="beneficialOwner.address.address2" />
                <Input label="Address 3" name="beneficialOwner.address.address3" />
              </FormGroup>

              <FormGroup widths="equal">
                <Input label="City" name="beneficialOwner.address.city" />
                <Input label="Birth" name="beneficialOwner.dateOfBirth" />
                <Dropdown label="Passport Country" name="beneficialOwner.passport.country" options={countriesDropDown}/>
                <Input label="Passport Number" name="beneficialOwner.passport.number" />
              </FormGroup>

              <FormGroup widths="equal">
                <Dropdown label="Country" name="beneficialOwner.address.country" options={countriesDropDown}
                    inputProps={{
                    search: true, onChange: (e, d) => {
                        this.handleCountry(e, d)
                    }
                }} />
                <Dropdown label="Province" name="beneficialOwner.address.stateProvinceRegion" options={provincesDropDown}
                        inputProps={{search: true, disabled: !this.state.hasProvinces, clearable: true}} />
              </FormGroup>

              <FormGroup widths="equal">
                <Input label="Postal Code" name="beneficialOwner.address.postalCode" />
                <Input label="First Name"  name="beneficialOwner.firstName" />
              </FormGroup>
              <FormGroup widths="equal">
                  <Input label="Last Name" name="beneficialOwner.lastName" />
                  <Input label="SSN" name="beneficialOwner.ssn" />
              </FormGroup>

              <Accordion.Title active={accordionActive.controllerAddress} onClick={this.handleAccordionChange} name='controllerAddress'>
                <h4>
                    <Icon color={accordionActive.controllerAddress && 'blue'} name={accordionActive.controllerAddress ? 'chevron up' : 'chevron down'} />
                    <FormattedMessage id='global.Controller' defaultMessage='Controller' />
                </h4>
              </Accordion.Title>
              <Accordion.Content active={accordionActive.controllerAddress}>
                <FormGroup widths="equal">
                  <Input label="Address 1" name="controller.address.address1" />
                  <Input label="Address 2" name="controller.address.address2" />
                  <Input label="Address 3" name="controller.address.address3" />
                </FormGroup>
                <FormGroup widths="equal">
                  <Input label="City" name="controller.address.city" />
                  <Input label="Postal Code" name="controller.address.postalCode" />
                  <Dropdown label="Country" name="controller.address.country" options={countriesDropDown}
                      inputProps={{
                      search: true, onChange: (e, d) => {
                          this.handleCountry(e, d)
                      }
                  }} />
                  <Dropdown label="Province" name="controller.address.stateProvinceRegion" options={provincesDropDown}
                          inputProps={{search: true, disabled: !this.state.hasProvinces, clearable: true}} />
                </FormGroup>
                <FormGroup widths="equal">
                    <Input label="First Name" name="controller.firstName" />
                    <Input label="Last Name" name="controller.lastName" />
                    <Dropdown label="Passport Country" name="controller.passport.country" options={countriesDropDown}/>
                    <Input label="Passport Number" name="controller.passport.number" />
                </FormGroup>
                <FormGroup widths="equal">
                    <Input label="SSN" name="controller.ssn" />
                    <Input label="Title" name="controller.title" />
                </FormGroup>
                <FormGroup widths="equal">
                  <Input label="Birth" name="controller.dateOfBirth" />
                </FormGroup>
              </Accordion.Content>
            </Accordion>
            <div style={{ textAlign: 'right' }}>
              <Button.Reset onClick={closeDwollaPopup}>Cancel</Button.Reset>
              <Button.Submit>Save</Button.Submit>
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
