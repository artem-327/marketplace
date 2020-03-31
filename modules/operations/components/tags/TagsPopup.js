import React from 'react'
import { connect } from 'react-redux'
import { Modal, FormGroup, Header } from 'semantic-ui-react'
import { withToastManager } from 'react-toast-notifications'
import { FormattedMessage, injectIntl } from 'react-intl'
import * as Yup from 'yup'
import { Form, Input, Button } from 'formik-semantic-ui-fixed-validation'

import { generateToastMarkup, getSafe } from '~/utils/functions'
import { errorMessages } from '~/constants/yupValidation'
import { withDatagrid } from '~/modules/datagrid'
import { closePopup, updateTag, createTag } from '../../actions'
import { Required } from '~/components/constants/layout'

const formValidation = () =>
  Yup.lazy(values =>
    Yup.object().shape({
      name: Yup.string()
        .trim()
        .min(3, errorMessages.minLength(3))
        .required(errorMessages.requiredMessage)
    })
  )

class TagsPopup extends React.Component {
  render() {
    const {
      closePopup,
      popupValues,
      rowId,
      updateTag,
      createTag,
      toastManager,
      intl: { formatMessage },
      datagrid
    } = this.props

    const initialFormValues = {
      name: getSafe(() => popupValues.name, false) ? popupValues.name : ''
    }

    return (
      <Modal closeIcon onClose={() => closePopup()} open centered={false} size='small'>
        <Modal.Header>
          {popupValues ? (
            <FormattedMessage id='operations.editTag' defaultMessage='Edit Tag' />
          ) : (
            <FormattedMessage id='operations.addTag' defaultMessage='Add Tag' />
          )}
        </Modal.Header>
        <Modal.Content>
          <Form
            enableReinitialize
            initialValues={popupValues ? popupValues : initialFormValues}
            validationSchema={formValidation()}
            onReset={closePopup}
            onSubmit={async (values, { setSubmitting }) => {
              let payload = {
                name: values.name
              }

              try {
                let response
                if (popupValues) response = await updateTag(rowId, payload)
                else response = await createTag(payload)

                let status = popupValues ? 'tagUpdated' : 'tagCreated'

                toastManager.add(
                  generateToastMarkup(
                    <FormattedMessage id={`notifications.${status}.header`} />,
                    <FormattedMessage
                      id={`notifications.${status}.content`}
                      values={{ name: response.value.quoteId }}
                    />
                  ),
                  { appearance: 'success' }
                )
              } catch (err) {
                //TODO delete when ednpoints will exist
                toastManager.add(
                  generateToastMarkup(
                    <FormattedMessage id={`notifications.error`} defaultMessage='Error' />,
                    <FormattedMessage
                      id={`notifications.error`}
                      defaultMessage='Endpoint update or create tag does not exist yet.'
                    />
                  ),
                  { appearance: 'error' }
                )
              } finally {
                setSubmitting(false)
                closePopup()
              }
            }}>
            {({ values, setFieldValue, setFieldTouched, errors, touched, isSubmitting }) => {
              return (
                <>
                  <FormGroup data-test='operations_tag_name_inp'>
                    <Input
                      type='text'
                      label={
                        <>
                          <FormattedMessage id='operations.name' defaultMessage='Name'>
                            {text => text}
                          </FormattedMessage>
                          <Required />
                        </>
                      }
                      name='name'
                      fieldProps={{ width: 8 }}
                    />
                  </FormGroup>

                  <div style={{ textAlign: 'right' }}>
                    <Button.Reset data-test='operations_tag_reset_btn'>
                      <FormattedMessage id='global.cancel' defaultMessage='Cancel'>
                        {text => text}
                      </FormattedMessage>
                    </Button.Reset>
                    <Button.Submit data-test='operations_tag_submit_btn'>
                      <FormattedMessage id='global.save' defaultMessage='Save'>
                        {text => text}
                      </FormattedMessage>
                    </Button.Submit>
                  </div>
                </>
              )
            }}
          </Form>
        </Modal.Content>
      </Modal>
    )
  }
}

const mapDispatchToProps = {
  closePopup,
  updateTag,
  createTag
}

const mapStateToProps = state => {
  const { popupValues } = state.operations

  return {
    rowId: getSafe(() => popupValues.id),
    popupValues: popupValues
      ? {
          name: popupValues.name
        }
      : null
  }
}

export default withDatagrid(injectIntl(connect(mapStateToProps, mapDispatchToProps)(withToastManager(TagsPopup))))
