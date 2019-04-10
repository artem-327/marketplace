import React from 'react'
import { connect } from 'react-redux'

import { Modal, FormGroup } from 'semantic-ui-react'

import { closeAddPopup, handlerSubmitWarehouseEditPopup } from '../../actions'
import { Form, Input, Button, Dropdown } from 'formik-semantic-ui'
import * as Yup from 'yup'

const formValidation = Yup.object().shape({
  warehouseName: Yup.string()
    .min(3, 'Too short')
    .required('Required'),
  address: Yup.string()
    .min(3, 'Too short')
    .required('Required'),
  city: Yup.string()
    .min(3, 'Too short')
    .required('Required'),
  phone: Yup.string()
    .min(3, 'Too short')
    .required('Required'),
  country: Yup.string()
    .min(1, 'Too short')
    .required('Required')
})

class EditWarehousePopup extends React.Component {
  render() {
    const {
      closeAddPopup,
      handlerSubmitWarehouseEditPopup,
      popupValues,
      country
    } = this.props
    const [address, city] = popupValues.address.split(',')
    const {
      warehouseName,
      contactName,
      countryId,
      phone,
      email,
      id: branchId
    } = popupValues
    const initialFormValues = {
      warehouseName,
      contactName,
      address,
      city,
      phone,
      email,
      country: countryId
    }

    return (
      <Modal open centered={false}>
        <Modal.Header>Edit Warehouse</Modal.Header>
        <Modal.Content>
          <Form
            initialValues={initialFormValues}
            validationSchema={formValidation}
            onReset={closeAddPopup}
            onSubmit={(values, actions) => {
              handlerSubmitWarehouseEditPopup(values, branchId)
              actions.setSubmitting(false)
            }}
          >
            <FormGroup widths="equal">
              <Input type="text" label="Warehouse name" name="warehouseName" />
              <Input type="text" label="Contact Name" name="contactName" />
            </FormGroup>
            <FormGroup widths="equal">
              <Input type="text" label="Address" name="address" />
              <Input type="text" label="City" name="city" />
            </FormGroup>
            <FormGroup widths="equal">
              <Input type="text" label="Phone" name="phone" />
              <Input type="text" label="E-mail" name="email" />
            </FormGroup>
            <FormGroup>
              <Dropdown label="Country" name="country" options={country} />
            </FormGroup>
            <div style={{ textAlign: 'right' }}>
              <Button.Reset onClick={closeAddPopup}>Cancel</Button.Reset>
              <Button.Submit>Save</Button.Submit>
            </div>
          </Form>
        </Modal.Content>
      </Modal>
    )
  }
}

const mapDispatchToProps = {
  closeAddPopup,
  handlerSubmitWarehouseEditPopup
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
)(EditWarehousePopup)
