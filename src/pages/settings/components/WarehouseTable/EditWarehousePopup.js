// import React from 'react'
// import { connect } from 'react-redux'
// import { Control, Form } from 'react-redux-form'
// import { Modal, Button, FormField, FormGroup, Form as SForm } from 'semantic-ui-react'

// import { closeEditPopup, handleSubmitEditPopup } from '../../actions'

// function EditWarehousePopup(props) {
//   const { closeEditPopup, handleSubmitEditPopup, popupValues } = props
//   const [ address, city ]  = popupValues.address.split(',')

//   return (
//     <Modal open centered={false}>
//         <Modal.Header>Add new warehouse</Modal.Header>
//         <Modal.Content>
//           <Form
//             model="forms.settingsPopup.editWarehouse"
//             onSubmit={(value) => handleSubmitEditPopup(value, popupValues.branchId)}
//             component={SForm}
//           >
//             <FormGroup widths="equal">
//               <FormField label="Warehouse name" control={Control.text} model=".warehouseName" defaultValue={popupValues.warehouseName} />
//               <FormField label="Contact Name" control={Control.text} model=".contactName" defaultValue={popupValues.contactName} />
//             </FormGroup>
//             <FormGroup widths="equal">
//               <FormField label="Address" control={Control.text} model=".address" defaultValue={address} />
//               <FormField label="City" control={Control.text} model=".city" defaultValue={city} />
//             </FormGroup>
//             <FormGroup widths="equal">
//               <FormField label="Phone" control={Control.text} model=".phone" defaultValue={popupValues.phone} />
//               <FormField label="e-mail" control={Control.text} model=".email" defaultValue={popupValues.email} />
//             </FormGroup>
//           </Form>
//         </Modal.Content>
//         <Modal.Actions>
//           <Button onClick={closeEditPopup}>Cancel</Button>
//           <Button primary>Update Warehouse</Button>
//         </Modal.Actions>
//       </Modal>
//   )
// }

// const mapDispatchToProps = {
//   closeEditPopup,
//   handleSubmitEditPopup
// }

// const mapStateToProps = state => {
//   return {
// 		popupValues: state.settings.popupValues
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(EditWarehousePopup)

import React from "react";
import { connect } from "react-redux";

import { Modal, FormGroup } from "semantic-ui-react";

import { closeAddPopup, handleSubmitEditPopup } from "../../actions";
import { Form, Input, Button } from "formik-semantic-ui";
import * as Yup from "yup";

const formValidation = Yup.object().shape({
  warehouseName: Yup.string()
    .min(3, "Too short")
    .required("Required"),
  contactName: Yup.string()
    .min(3, "Too short")
    .required("Required"),
  address: Yup.string()
    .min(3, "Too short")
    .required("Required"),
  city: Yup.string()
    .min(3, "Too short")
    .required("Required"),
  phone: Yup.string()
    .min(3, "Too short")
    .required("Required"),
  email: Yup.string()
    .email("Invalid email")
    .required("Emails is required")
});

class EditWarehousePopup extends React.Component {
  render() {
    const { closeAddPopup, handleSubmitEditPopup, popupValues } = this.props;
    const [address, city] = popupValues.address.split(",");
    // const { middleName, email, id } = popupValues;
    const { warehouseName, contactName, phone, email, branchId } = popupValues;
    const initialFormValues = {
      warehouseName,
      contactName,
      address,
      city,
      phone,
      email
    };

    return (
      <Modal open centered={false}>
        <Modal.Header>Edit user profile</Modal.Header>
        <Modal.Content>
          <Form
            initialValues={initialFormValues}
            validationSchema={formValidation}
            onReset={closeAddPopup}
            onSubmit={(values, actions) => {
              handleSubmitEditPopup(values, branchId);
              actions.setSubmitting(false);
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
              <Input type="text" label="e-mail" name="email" />
            </FormGroup>
            <div style={{ textAlign: "right" }}>
              <Button.Reset onClick={closeAddPopup}>Cancel</Button.Reset>
              <Button.Submit>Save</Button.Submit>
            </div>
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
}

const mapDispatchToProps = {
  closeAddPopup,
  handleSubmitEditPopup
};
const mapStateToProps = state => {
  return {
    popupValues: state.settings.popupValues
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditWarehousePopup);
