import React from 'react'
import { connect } from 'react-redux'

import { Modal, FormGroup } from 'semantic-ui-react'

import { closeAddPopup /*! ! , postNewRequest*/ } from '../../actions'
import { Form, Input, Button } from 'formik-semantic-ui'
import * as Yup from 'yup'


const initialFormValues = {
    warehouseName: '',
    contactName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    email: ''
}

const formValidation = Yup.object().shape({
    warehouseName: Yup.string().min(3, "Too short").required("Required"),
    contactName: Yup.string().min(3, "Too short").required("Required"),
    email: Yup.string().email("Invalid email").required("Email is required")
})

class AddNewPopup extends React.Component {

        render() {
        console.log('YYYYYYYY AddNewPopup - props - ', this.props);
        console.log('YYYYYY AddNewPopup - state 1 - ', this.state);
        const {
            closeAddPopup,
            currentTab,
            config,
            //! !postNewWarehouseRequest
        } = this.props

        return (
            <Modal open centered={false}>
                <Modal.Header>Add new { currentTab }</Modal.Header>
                <Modal.Content>
                    <Form
                        initialValues={initialFormValues}
                        validationSchema={formValidation}
                        onReset={closeAddPopup}
                        onSubmit={(values, actions) => {
                            postNewRequest(values)

                        }}
                    >
                        <FormGroup widths="equal">
                            <Input type="text" label="Name" name="name" />
                        </FormGroup>

                        <div style={{ textAlign: 'right' }}>
                            <Button.Reset>Cancel</Button.Reset>
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
    //! !postNewRequest
};

const mapStateToProps = state => {
    let cfg = state.admin.config[state.admin.currentTab];
    return {
        config: cfg,
        currentTab: state.admin.currentTab,
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddNewPopup)
