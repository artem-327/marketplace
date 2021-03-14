/* eslint-disable react-hooks/exhaustive-deps */
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl } from 'react-intl'
import { getSafe } from '~/utils/functions'

// Components
import { Form, Modal, FormGroup, FormField, Button as ButtonSemantic, Dimmer, Loader } from 'semantic-ui-react'
import { Button, Dropdown } from 'formik-semantic-ui-fixed-validation'
import { Formik } from 'formik'
import { errorMessages } from '~/constants/yupValidation'
import BasicButton from '../../../../components/buttons/BasicButton'

// Styles
import { InputHidden, PaperclipIcon } from './AddCertifications.styles'

// Services
import { SubmitFile } from './AddCertifications.services'
import { addAttachment, downloadAttachment, removeAttachment } from '../../../inventory/actions'

const AddCertifications = props => {
  const {
    intl: { formatMessage },
    documentTypesFederalOwnershipCertifications,
    documentTypesManagementCertifications,
    popupValues
  } = props

  return (
    <Formik
      initialValues={{ documentId: popupValues.docType ? popupValues.docType.id : '', file: '' }}
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
              <FormattedMessage
                id='company.federalOwnershipManagementCertifications'
                defaultMessage='Federal ownership / Management Certifications'
              />
            </Modal.Header>
            <Modal.Content>
              <Form>
                <FormGroup widths='equal'>
                  <FormField>
                    <label htmlFor='field_upload_file'>
                      <FormattedMessage
                        id='company.addYour'
                        defaultMessage='Add Your Certification'
                        values={{
                          name:
                            <strong>
                              {formatMessage({ id: 'company.certification', defaultMessage: 'Certification' })}
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
                <FormGroup widths='equal'>
                  <Dropdown
                    label={<FormattedMessage
                      id='company.federalOwnershipCertifications'
                      defaultMessage='Federal Ownership Certifications'
                    />}
                    name='documentId'
                    options={
                      documentTypesFederalOwnershipCertifications && documentTypesFederalOwnershipCertifications.length
                        ? documentTypesFederalOwnershipCertifications.map(type => (
                          { text: type.name, value: type.id, key: type.id })
                        ) : []
                    }
                    inputProps={{
                      disabled: popupValues.uploadedFile,
                      selection: true,
                      placeholder:
                        formatMessage({
                          id: 'company.selectFederalOwnershipCertifications',
                          defaultMessage: 'Select Federal Ownership Certifications'
                        }),
                      'data-test': 'company_form_select_federal_certification_drpdn'
                    }}
                  />
                </FormGroup>

                <FormGroup widths='equal'>
                  <Dropdown
                    label={<FormattedMessage
                      id='company.managementCertifications'
                      defaultMessage='Management Certifications'
                    />}
                    name='documentId'
                    options={
                      documentTypesManagementCertifications && documentTypesManagementCertifications.length
                        ? documentTypesManagementCertifications.map(type => (
                          { text: type.name, value: type.id, key: type.id })
                        ) : []
                    }
                    inputProps={{
                      disabled: popupValues.uploadedFile,
                      selection: true,
                      placeholder:
                        formatMessage({
                          id: 'company.selectManagementCertifications',
                          defaultMessage: 'Select Management Certifications'
                        }),
                      'data-test': 'company_form_select_management_certification_drpdn'
                    }}
                  />
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
                disabled={!values.file || !values.documentId}
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

AddCertifications.propTypes = {
  onClose: PropTypes.func,
  onUpload: PropTypes.func,
  popupValues: PropTypes.object
}

AddCertifications.defaultProps = {
  onClose: () => {},
  onUpload: () => {},
  popupValues: { docType: null, uploadedFile: null }
}

function mapStateToProps(state) {
  return {
    documentTypesFederalOwnershipCertifications:
      getSafe(() => state.businessTypes.documentTypesFederalOwnershipCertifications, []),
    documentTypesManagementCertifications: getSafe(() => state.businessTypes.documentTypesManagementCertifications, [])
  }
}

export default injectIntl(connect(mapStateToProps, {
  addAttachment, downloadAttachment, removeAttachment
})(AddCertifications))