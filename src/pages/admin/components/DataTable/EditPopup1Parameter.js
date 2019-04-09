import React from 'react'
import { connect } from 'react-redux'

import { Modal, FormGroup } from 'semantic-ui-react'

import { closeEditPopup , putEditedDataRequest } from '../../actions'
import { Form, Input, Button } from 'formik-semantic-ui'
import * as Yup from 'yup'

const formValidation = Yup.object().shape({
    val0: Yup.string().min(1, "Too short").required("Required"),
})

class EditPopup1Parameter extends React.Component {

    render() {
        const {
            closeEditPopup,
            currentTab,
            config,
            popupValues,
            putEditedDataRequest
        } = this.props

        const { id } = popupValues;

        const initialFormValues = {
            val0: popupValues[config.edit[0].name],
        }

        return (
            <Modal open centered={false}>
                <Modal.Header>Edit { currentTab }</Modal.Header>
                <Modal.Content>
                    <Form
                        initialValues={initialFormValues}
                        validationSchema={formValidation}
                        onReset={closeEditPopup}
                        onSubmit={(values, actions) => {
                            let data = {
                                [config.edit[0].name]: values.val0,
                            }

                            putEditedDataRequest(config, id, data)
                            actions.setSubmitting(false);
                        }}
                    >
                        <FormGroup widths="equal">
                            <Input type={config.edit[0].type} label={config.edit[0].title} name="val0" />
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
    closeEditPopup,
    putEditedDataRequest
};

const mapStateToProps = state => {
    let cfg = state.admin.config[state.admin.currentTab];
    return {
        config: cfg,
        currentTab: state.admin.currentTab,
        popupValues: state.admin.popupValues
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditPopup1Parameter)
