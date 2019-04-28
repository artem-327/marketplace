import React from 'react'
import { connect } from 'react-redux'

import { Modal, FormGroup, Divider } from 'semantic-ui-react'

import { closePopup, updateCompany, createCompany, getCountries, getPrimaryBranchProvinces, getMailingBranchProvinces } from '../../actions'
import { Form, Input, Button, Checkbox, Dropdown } from 'formik-semantic-ui'
import * as Yup from 'yup'

// debug purposes only
import JSONPretty from 'react-json-pretty'

const initialFormValues = {
  name: '',
  nacdMember: true,
  phone: '',
  website: '',
  mailingBranch: {
    name: '',
    accessorials: [],
    address: {
      city: '',
      country: '',
      province: '',
      streetAddress: '',
      zip: ''
    },
    contactEmail: '',
    contactName: '',
    contactPhone: '',
    warehouse: true
  },
  primaryBranch: {
    name: '',
    accessorials: [],
    address: {
      city: '',
      country: '',
      province: '',
      streetAddress: '',
      zip: ''
    },
    contactEmail: '',
    contactName: '',
    contactPhone: '',
    warehouse: true
  },
  primaryMerchant: {
    email: '',
    firstname: '',
    lastname: '',
    middlename: '',
  }
}

const formValidationEdit = Yup.object().shape({
  name: Yup.string().min(2, 'Name should has at least 2 characters').required()
})

const formValidationNew = Yup.object().shape({
  name: Yup.string().min(2, 'Name should has at least 2 characters').required(),
  //nacdMember: Yup.bool().required(),
  //phone: Yup.string().min(9, 'Enter valid phone number').required(),
  //website: Yup.string().required(),
  // primaryBranch: Yup.object().shape({
  //   name: Yup.string().required(),
  //   address: Yup.object().shape({
  //     city: Yup.string().required(),
  //     country: Yup.number().required(),
  //     streetAddress: Yup.string().required(),
  //     zip: Yup.string().required()
  //   }),
  //   contactEmail: Yup.string().email().required(),
  //   contactName: Yup.string().required(),
  //   contactPhone: Yup.string().required(),
  //   warehouse: Yup.bool().required()
  // })
})

const removeEmpty = (obj) =>
  Object.entries(obj).forEach(([key, val]) => {
    if (val && typeof val === 'object') removeEmpty(val)
    else if (val == null || val === '') delete obj[key]
  })

class AddNewPopupCasProducts extends React.Component {
  state = {
    initialState: {...initialFormValues},
    primaryBranchHasProvinces: false,
    mailingBranchHasProvinces: false
  }

  componentDidMount() {
    this.props.getCountries()
  }

  handlePrimaryBranchCountry = (e, d) => {
    let country = this.props.countries.find(obj => obj.id == d.value);
    if (country.hasProvinces) {
      //! ! tady smazat primaryBranch.address.province
      this.setState({
        //...this.state,
        initialState: {
          ...this.state.initialState,
          primaryBranch: {
            ...this.state.initialState.primaryBranch,
            address: {
              ...this.state.initialState.primaryBranch.address,
              province: ''}}}});
      this.props.getPrimaryBranchProvinces(country.id)
    }
    else {
      //! ! tady smazat primaryBranch.address.province
    }
    this.setState({primaryBranchHasProvinces: country.hasProvinces})
  }

  handleMailingBranchCountry = (e, d) => {
    let country = this.props.countries.find(obj => obj.id == d.value);
    if (country.hasProvinces) {
      //! ! tady smazat mailingBranch.address.province
      this.props.getMailingBranchProvinces(country.id)
    }
    else {
      //! ! tady smazat mailingBranch.address.province
    }
    this.setState({mailingBranchHasProvinces: country.hasProvinces})
  }



  render() {
    const {
      closePopup,
      popupValues,
      updateCompany,
      createCompany,
      countriesDropDown,
      primaryBranchProvinces,
      mailingBranchProvinces,
      zipCodes,
      config,
    } = this.props

    const {
      initialState,
    } = this.state

    return (
      <Modal open centered={false} size="small">
        <Modal.Header>{popupValues ? ('Edit') : ('Add')} { config.addEditText }</Modal.Header>
        <Modal.Content>
          <Form
            enableReinitialize
            initialValues={{...initialState, ...popupValues}}
            validationSchema={popupValues ? formValidationNew : formValidationEdit}
            onReset={closePopup}
            onSubmit={async (values, actions) => {
              if (popupValues) {
                let {primaryBranch, ...newValues} = values
                await updateCompany(popupValues.id, newValues)
              } 
              else {
                console.log('!!!!!!! create company !! 1', values);//! !
                removeEmpty(values);
                console.log('!!!!!!! create company !! 2', values);//! !
                //! !await createCompany(values)
              }

              actions.setSubmitting(false)
            }}
          >
            {({ values, errors, setFieldValue }) => (
              <>
            <FormGroup widths="equal">
              <Input label="Company name" name="name" />
            </FormGroup>
            <FormGroup widths="equal">
              <Input label="Phone Number" name="phone" />
              <Input label="Web" name="website" />
            </FormGroup>
            <FormGroup widths="equal">
              <Checkbox label="NACD Member" name="nacdMember" />
            </FormGroup>
            
            {!popupValues && <>
              <Divider />
              <h4>Primary Branch</h4>
              <FormGroup widths="equal">
                <Input label="Name" name="primaryBranch.name" />
              </FormGroup>
              <FormGroup widths="equal">
                <Input label="Contact Email" name="primaryBranch.contactEmail" />
                <Input label="Contact Name" name="primaryBranch.contactName" />
                <Input label="Contact Phone" name="primaryBranch.contactPhone" />
              </FormGroup>
              <FormGroup widths="equal">
                <Checkbox label="Warehouse" name="primaryBranch.warehouse" />
              </FormGroup>
              <h5>Address</h5>
              <FormGroup widths="equal">
                <Input label="Street" name="primaryBranch.address.streetAddress" />
                <Input label="City" name="primaryBranch.address.city" />
              </FormGroup>
              <FormGroup widths="equal">
                <Dropdown label="Zip" name="primaryBranch.address.zip" inputProps={{search: true}} options={zipCodes} />
                <Dropdown label="Country" name="primaryBranch.address.country" options={countriesDropDown}
                          inputProps={{search: true, onChange:  this.handlePrimaryBranchCountry}} />
                <Dropdown label="Province" name="primaryBranch.address.province" options={primaryBranchProvinces}
                          inputProps={{search: true, disabled: !this.state.primaryBranchHasProvinces}} />
              </FormGroup>
              <Divider />
              <h4>Mailing Branch</h4>
              <FormGroup widths="equal">
                <Input label="Name" name="mailingBranch.name" />
              </FormGroup>
              <FormGroup widths="equal">
                <Input label="Contact Email" name="mailingBranch.contactEmail" />
                <Input label="Contact Name" name="mailingBranch.contactName" />
                <Input label="Contact Phone" name="mailingBranch.contactPhone" />
              </FormGroup>
              <FormGroup widths="equal">
                <Checkbox label="Warehouse" name="mailingBranch.warehouse" />
              </FormGroup>
              <h5>Address</h5>
              <FormGroup widths="equal">
                <Input label="Street" name="mailingBranch.address.streetAddress" />
                <Input label="City" name="mailingBranch.address.city" />
              </FormGroup>
              <FormGroup widths="equal">
                <Dropdown label="Zip" name="mailingBranch.address.zip" inputProps={{search: true}} options={zipCodes} />
                <Dropdown label="Country" name="mailingBranch.address.country" options={countriesDropDown}
                          inputProps={{search: true, onChange:  this.handleMailingBranchCountry}} />
                <Dropdown label="Province" name="mailingBranch.address.province" options={mailingBranchProvinces}
                          inputProps={{search: true, disabled: !this.state.mailingBranchHasProvinces}} />
              </FormGroup>
              <Divider />
              <h4>Primary Merchant</h4>
              <FormGroup widths="equal">
                <Input label="Email" name="primaryMerchant.email" />
              </FormGroup>
              <FormGroup widths="equal">
                <Input label="First Name" name="primaryMerchant.firstname" />
                <Input label="Middle Name" name="primaryMerchant.middlename" />
                <Input label="Last Name" name="primaryMerchant.lastname" />
              </FormGroup>
            </>}

            <div style={{ textAlign: 'right' }}>
              <Button.Reset>Cancel</Button.Reset>
              <Button.Submit>Save</Button.Submit>
            </div>
            <JSONPretty data={values} />
            </>)}
          </Form>
        </Modal.Content>
      </Modal>
    )
  }
}

const mapDispatchToProps = {
  closePopup,
  updateCompany,
  createCompany,
  getCountries,
  getPrimaryBranchProvinces,
  getMailingBranchProvinces
}

const mapStateToProps = ({admin}) => {
  return {
    ...admin,
    config: admin.config[admin.currentTab]
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNewPopupCasProducts)