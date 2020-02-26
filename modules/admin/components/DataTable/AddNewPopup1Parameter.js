import React from 'react'
import { connect } from 'react-redux'

import { Modal, FormGroup } from 'semantic-ui-react'

import { closeAddPopup, postNewRequest } from '../../actions'
import { Form, Input, Button } from 'formik-semantic-ui-fixed-validation'
import * as Yup from 'yup'

import { FormattedMessage } from 'react-intl'

const initialFormValues = {
  val0: ''
}

const formValidation = Yup.object().shape({
  val0: Yup.string()
    .trim()
    .min(1, 'Too short')
    .required('Required')
})

class AddNewPopup1Parameter extends React.Component {
  render() {
    const { closeAddPopup, currentTab, config, postNewRequest } = this.props

    return (
      <Modal closeIcon onClose={() => closeAddPopup()} open centered={false}>
        <Modal.Header>
          <FormattedMessage id='global.add' defaultMessage='Add' /> {config.addEditText}
        </Modal.Header>
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
              } catch (e) {
                console.error(e)
              } finally {
                setSubmitting(false)
              }
            }}>
            <FormGroup widths='equal' data-test={`admin_add_${config.formattedMessageName}_inp`}>
              <Input type={config.edit[0].type} label={config.edit[0].title} name='val0' />
            </FormGroup>

            <div style={{ textAlign: 'right' }}>
              <Button.Reset data-test={`admin_add_${config.formattedMessageName}_cancel_btn`}>
                <FormattedMessage id='global.cancel' defaultMessage='Cancel'>
                  {text => text}
                </FormattedMessage>
              </Button.Reset>
              <Button.Submit data-test={`admin_add_${config.formattedMessageName}_save_btn`}>
                <FormattedMessage id='global.save' defaultMessage='Save'>
                  {text => text}
                </FormattedMessage>
              </Button.Submit>
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
}

const mapStateToProps = state => {
  let cfg = state.admin.config[state.admin.currentTab.name]
  return {
    config: cfg,
    currentTab: state.admin.currentTab
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNewPopup1Parameter)
