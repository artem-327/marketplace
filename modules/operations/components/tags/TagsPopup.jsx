import { Modal, FormGroup } from 'semantic-ui-react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Form, Input, Button } from 'formik-semantic-ui-fixed-validation'
import PropTypes from 'prop-types'
// Components
import { Required } from '../../../../components/constants/layout'
import ErrorFocus from '../../../../components/error-focus'
// Services
import { formValidation, initialFormValues } from './Tags.services'
import { withDatagrid } from '../../../datagrid'

const TagsPopup = props => {
  const {
    closePopup,
    popupValues,
    rowId,
    updateTag,
    createTag,
    intl: { formatMessage }
  } = props

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
            try {
              if (popupValues) await updateTag(rowId, values.name)
              else await createTag(values.name)
              closePopup()
            } catch (err) {
              console.error(err)
            } finally {
              setSubmitting(false)
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
                        <FormattedMessage id='operations.name' defaultMessage='Name' />
                        <Required />
                      </>
                    }
                    name='name'
                    fieldProps={{ width: 8 }}
                  />
                </FormGroup>

                <div style={{ textAlign: 'right' }}>
                  <Button.Reset data-test='operations_tag_reset_btn'>
                    <FormattedMessage id='global.cancel' defaultMessage='Cancel' />
                  </Button.Reset>
                  <Button.Submit data-test='operations_tag_submit_btn'>
                    <FormattedMessage id='global.save' defaultMessage='Save' />
                  </Button.Submit>
                </div>
                <ErrorFocus />
              </>
            )
          }}
        </Form>
      </Modal.Content>
    </Modal>
  )
}

TagsPopup.propTypes = {
  popupValues: PropTypes.object,
  rowId: PropTypes.number,
  closePopup: PropTypes.func,
  updateTag: PropTypes.func,
  createTag: PropTypes.func,
  intl: PropTypes.func
}

TagsPopup.defaultValues = {
  popupValues: null,
  rowId: null,
  closePopup: () => {},
  updateTag: () => {},
  createTag: () => {},
  intl: () => {}
}

export default withDatagrid(injectIntl(TagsPopup))
