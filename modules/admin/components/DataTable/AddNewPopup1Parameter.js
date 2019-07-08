import React from 'react'
import { connect } from 'react-redux'

import { Modal, FormGroup } from 'semantic-ui-react'

import { closeAddPopup, postNewRequest } from '../../actions'
import { Form, Input, Button } from 'formik-semantic-ui'
import * as Yup from 'yup'

import { withToastManager } from 'react-toast-notifications'

import { generateToastMarkup } from '~/utils/functions'
import { FormattedMessage } from 'react-intl'

const initialFormValues = {
    val0: ''
}

const formValidation = Yup.object().shape({
    val0: Yup.string().trim().min(1, "Too short").required("Required")
})

class AddNewPopup1Parameter extends React.Component {

    render() {
        const {
            closeAddPopup,
            currentTab,
            config,
            postNewRequest,
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
                                [config.edit[0].name]: values.val0.trim()
                            }

                            try {
                                await postNewRequest(config, data)

                                let formattedMsgId = `notifications.${config.formattedMessageName}Created`

                                toastManager.add(generateToastMarkup(
                                    <FormattedMessage id={`${formattedMsgId}.header`} />,
                                    <FormattedMessage id={`${formattedMsgId}.content`} values={{ name: values.val0 }} />
                                ), { appearance: 'success' })
                            }
                            catch (e) { console.error(e) }
                            finally {
                                setSubmitting(false)
                            }
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
    closeAddPopup,
    postNewRequest
};

const mapStateToProps = state => {
    let cfg = state.admin.config[state.admin.currentTab];
    return {
        config: cfg,
        currentTab: state.admin.currentTab,
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withToastManager(AddNewPopup1Parameter))
