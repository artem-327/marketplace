import React from 'react'
import { connect } from 'react-redux'

import { Modal, FormGroup } from 'semantic-ui-react'

import { closeAddPopup, postNewRequest } from '../../actions'
import { Form, Input, Button, Dropdown } from 'formik-semantic-ui'
import * as Yup from 'yup'
import { withToastManager } from 'react-toast-notifications'

import { generateToastMarkup } from '~/utils/functions'
import { FormattedMessage } from 'react-intl';

const initialFormValues = {
    val0: '',
    val1: '',
    val2: '',
}

const formValidation = Yup.object().shape({
    val0: Yup.string().trim().min(1, "Too short").required("Required"),
    val1: Yup.string().trim().min(1, "Too short").required("Required"),
    val2: Yup.number().required("Required")
})

class AddNewUnitOfMeasurePopup extends React.Component {
    render() {
        const {
            closeAddPopup,
            currentTab,
            config,
            postNewRequest,
            measureOptions,
            toastManager
        } = this.props

        return (
            <Modal open centered={false}>
                <Modal.Header>Add {config.addEditText}</Modal.Header>
                <Modal.Content>
                    <Form
                        initialValues={initialFormValues}
                        validationSchema={formValidation}
                        onReset={closeAddPopup}
                        onSubmit={async (values, { setSubmitting }) => {
                            let data = {
                                [config.edit[0].name]: values.val0.trim(),
                                [config.edit[1].name]: values.val1.trim(),
                                [config.edit[2].name]: values.val2,
                            }
                            await postNewRequest(config, data)

                            toastManager.add(generateToastMarkup(
                                <FormattedMessage id='notifications.unitOfMeasurementCreated.header' />,
                                <FormattedMessage id='notifications.unitOfMeasurementCreated.content' values={{ name: values.val0 }} />
                            ), {
                                    appearance: 'success'
                                }
                            )

                            setSubmitting(false)
                        }}
                    >
                        <FormGroup widths="equal">
                            <Input type={config.edit[0].type} label={config.edit[0].title} name="val0" />
                        </FormGroup>
                        <FormGroup widths="equal">
                            <Input type={config.edit[1].type} label={config.edit[1].title} name="val1" />
                        </FormGroup>
                        <FormGroup widths="equal">
                            <Dropdown label={config.edit[2].title} options={measureOptions} name="val2" />
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
    postNewRequest
};

const mapStateToProps = state => {
    let cfg = state.admin.config[state.admin.currentTab];
    return {
        config: cfg,
        currentTab: state.admin.currentTab,
        measureOptions: state.admin.measureTypes.map(d => {
            return {
                id: d.id,
                text: d.name,
                value: d.id,
            }
        })
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withToastManager(AddNewUnitOfMeasurePopup))
