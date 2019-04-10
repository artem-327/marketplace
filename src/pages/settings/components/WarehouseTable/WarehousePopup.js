import React from 'react'
import { connect } from 'react-redux'

import { Modal, FormGroup } from 'semantic-ui-react'

import {
  closePopup,
  handlerSubmitWarehouseEditPopup,
  postNewWarehouseRequest
} from '../../actions'
import { Form, Input, Button, Dropdown } from 'formik-semantic-ui'
import * as Yup from 'yup'

const formValidation = Yup.object().shape({
  warehouseName: Yup.string()
    .min(3, 'Too short')
    .required('Required'),
  address: Yup.string()
    .min(3, 'Too short')
    .required('Required'),
  zip: Yup.string()
    .min(1, 'Too short')
    .required('Required'),
  country: Yup.string()
    .min(1, 'Too short')
    .required('Required')
})

class WarehousePopup extends React.Component {
  submitHandler = (values, actions) => {
    if (this.props.popupValues) {
      this.props.handlerSubmitWarehouseEditPopup(
        values,
        this.props.popupValues.branchId
      )
    } else {
      this.props.postNewWarehouseRequest(values)
    }
    actions.setSubmitting(false)
  }

  getInitialFormValues = () => {
    const { popupValues } = this.props

    const [address, city] =
      popupValues && popupValues.address
        ? popupValues.address.split(',')
        : ['', '']
    const {
      warehouseName = '',
      contactName = '',
      countryId = '',
      phone = '',
      email = '',
      zip = ''
    } = popupValues || {}
    return {
      warehouseName,
      contactName,
      address,
      city,
      phone,
      email,
      country: countryId,
      zip
    }
  }

  render() {
    const { closePopup, popupValues, country } = this.props
    const title = popupValues ? 'Edit' : 'Add'

    return (
      <Modal open centered={false}>
        <Modal.Header>{`${title} `} Warehouse</Modal.Header>
        <Modal.Content>
          <Form
            initialValues={this.getInitialFormValues()}
            validationSchema={formValidation}
            onReset={closePopup}
            onSubmit={this.submitHandler}
          >
            <FormGroup widths="equal">
              <Input type="text" label="Warehouse Name" name="warehouseName" />
              <Input type="text" label="Contact Name" name="contactName" />
            </FormGroup>
            <FormGroup widths="equal">
              <Input type="text" label="Address" name="address" />
              <Input type="text" label="City" name="city" />
            </FormGroup>
            <FormGroup widths="equal">
              <Input type="text" label="Zip" name="zip" />
              <Input type="text" label="Phone" name="phone" />
            </FormGroup>
            <FormGroup widths="equal">
              <Input type="text" label="Email" name="email" />
              <Dropdown label="Country" name="country" options={country} />
            </FormGroup>
            <div style={{ textAlign: 'right' }}>
              <Button.Reset onClick={closePopup}>Cancel</Button.Reset>
              <Button.Submit>Save</Button.Submit>
            </div>
          </Form>
        </Modal.Content>
      </Modal>
    )
  }
}

const mapDispatchToProps = {
  postNewWarehouseRequest,
  handlerSubmitWarehouseEditPopup,
  closePopup
}
const mapStateToProps = state => {
  return {
    popupValues: state.settings.popupValues,
    country: state.settings.country
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WarehousePopup)
