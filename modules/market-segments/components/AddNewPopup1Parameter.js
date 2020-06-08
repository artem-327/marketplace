import React from 'react'
import { connect } from 'react-redux'

import { Modal, FormGroup } from 'semantic-ui-react'

import { closeAddPopup, postNewRequest } from '../actions'
import { Form, Input, Button } from 'formik-semantic-ui-fixed-validation'
import * as Yup from 'yup'

import { FormattedMessage } from 'react-intl'
import { Required } from '~/components/constants/layout'
import ErrorFocus from '~/components/error-focus'

const initialFormValues = {
  val0: ''
}

const formValidation = Yup.object().shape({
  val0: Yup.string().trim().min(1, 'Too short').required('Required')
})

class AddNewPopup1Parameter extends React.Component {
  render() {
    const { closeAddPopup, postNewRequest } = this.props

    return (
      <Modal closeIcon onClose={() => closeAddPopup()} open centered={false}>
        <Modal.Header>
          <FormattedMessage id='global.add' defaultMessage='Add' />{' '}
          <FormattedMessage id='admin.marketSegment' defaultMessage='Market Segment'>
            {text => text}
          </FormattedMessage>
        </Modal.Header>
        <Modal.Content>
          <Form
            initialValues={initialFormValues}
            validationSchema={formValidation}
            onReset={closeAddPopup}
            onSubmit={async (values, { setSubmitting }) => {
              let data = {
                name: values.val0.trim()
              }

              try {
                await postNewRequest(data)
              } catch (e) {
                console.error(e)
              } finally {
                setSubmitting(false)
              }
            }}>
            <FormGroup widths='equal' data-test={`admin_add_market_segment_inp`}>
              <Input
                type='text'
                label={
                  <>
                    <FormattedMessage id='global.name' defaultMessage='Name'>
                      {text => text}
                    </FormattedMessage>
                    <Required />
                  </>
                }
                name='val0'
              />
            </FormGroup>

            <div style={{ textAlign: 'right' }}>
              <Button.Reset data-test={`admin_add_market_segment_cancel_btn`}>
                <FormattedMessage id='global.cancel' defaultMessage='Cancel'>
                  {text => text}
                </FormattedMessage>
              </Button.Reset>
              <Button.Submit data-test={`admin_add_market_segment_save_btn`}>
                <FormattedMessage id='global.save' defaultMessage='Save'>
                  {text => text}
                </FormattedMessage>
              </Button.Submit>
            </div>
            <ErrorFocus />
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

export default connect(null, mapDispatchToProps)(AddNewPopup1Parameter)
