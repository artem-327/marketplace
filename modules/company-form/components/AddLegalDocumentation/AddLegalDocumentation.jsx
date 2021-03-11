/* eslint-disable react-hooks/exhaustive-deps */
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl } from 'react-intl'
import { getSafe } from '~/utils/functions'

// Components
import { Form, Modal, FormGroup, FormField, Button as ButtonSemantic, Dimmer, Loader } from 'semantic-ui-react'
import { Button, Dropdown } from 'formik-semantic-ui-fixed-validation'
import { Formik } from 'formik'
import BasicButton from '../../../../components/buttons/BasicButton'

// Styles
import { InputHidden, PaperclipIcon } from './AddLegalDocumentation.styles'

// Services
import { SubmitFile } from './AddLegalDocumentation.services'
import { addAttachment, downloadAttachment, removeAttachment } from '../../../inventory/actions'

const AddLegalDocumentation = props => {
  const { popupValues } = props

  return (
    <Formik
      initialValues={{ file: '' }}
      validationSchema={{}}
      onSubmit={(values, actions) => SubmitFile(values, actions, props)}
    >
      {formikProps => {
        const { values, setFieldValue, isSubmitting, handleSubmit, errors } = formikProps
        const fileName = values.file
          ? getSafe(() => values.file.name, null)
          : getSafe(() => popupValues.uploadedFile.name, null)

        return (
          <Modal closeIcon onClose={() => props.onClose()} open centered size='small'>
            <Dimmer active={isSubmitting} inverted>
              <Loader />
            </Dimmer>
            <Modal.Header>
              <FormattedMessage id='company.legalDocumentation' defaultMessage='Legal Documentation'/>
            </Modal.Header>
            <Modal.Content>
              <Form>
                <FormGroup widths='equal'>
                  <FormField name='file'>
                    <label htmlFor='field_upload_file'>
                      <FormattedMessage
                        id='company.addYour'
                        defaultMessage='Add Your Certification'
                        values={{
                          name:
                            <strong>
                              {getSafe(() => popupValues.docType.name, '')}
                            </strong>
                        }}
                      />
                    </label>
                    <ButtonSemantic basic icon as='label'>
                      <PaperclipIcon size='15' />
                      <FormattedMessage id='company.browseFileHere' defaultMessage='Browse file here'>
                        {text => text}
                      </FormattedMessage>
                      <InputHidden
                        name='file'
                        error={errors.file}
                        type='file'
                        onChange={e => setFieldValue('file', e.currentTarget.files[0])}
                      />
                    </ButtonSemantic>
                    {fileName}
                  </FormField>
                </FormGroup>
              </Form>
            </Modal.Content>
            <Modal.Actions>
              <BasicButton
                noBorder
                onClick={() => props.onClose()}
                data-test='company_form_add_legal_document_reset_btn'>
                <FormattedMessage id='global.cancel' defaultMessage='Cancel'>
                  {text => text}
                </FormattedMessage>
              </BasicButton>
              <Button.Submit
                disabled={!values.file}
                onClick={handleSubmit}
                data-test='company_form_add_legal_document_submit_btn'>
                <FormattedMessage id='global.save' defaultMessage='Save'>
                  {text => text}
                </FormattedMessage>
              </Button.Submit>

            </Modal.Actions>
          </Modal>
        )
      }}
    </Formik>
  )
}

AddLegalDocumentation.propTypes = {
  onClose: PropTypes.func,
  onUpload: PropTypes.func,
  popupValues: PropTypes.object
}

AddLegalDocumentation.defaultProps = {
  onClose: () => {},
  onUpload: () => {},
  popupValues: { docType: null, uploadedFile: null }
}

function mapStateToProps(store) {
  return { }
}

export default injectIntl(connect(mapStateToProps, {
  addAttachment, downloadAttachment, removeAttachment
})(AddLegalDocumentation))