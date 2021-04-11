/* eslint-disable react-hooks/exhaustive-deps */
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl } from 'react-intl'
import { getSafe } from '~/utils/functions'
import { useEffect, useState } from 'react'

// Components
import { Form, Modal, FormGroup, FormField, Button as ButtonSemantic, Dimmer, Loader } from 'semantic-ui-react'
import { Button, Dropdown } from 'formik-semantic-ui-fixed-validation'
import { Formik } from 'formik'
import { errorMessages } from '~/constants/yupValidation'
import BasicButton from '../../../../../components/buttons/BasicButton'

// Styles
import { InputHidden, PaperclipIcon } from './InsurancePopup.styles'

// Services
import { SubmitFile } from './InsurancePopup.services'
import {
  closePopup,
  getInsuranceDocumentsTypes,
  getInsuranceDocuments,
  uploadInsuranceDocument
} from '../../../actions'

const InsurancePopup = props => {
  const {
    intl: { formatMessage },
    insuranceDocumentsTypes,
    insuranceDocumentsTypesLoading,
    getInsuranceDocumentsTypes,
    popupValues
  } = props

  useEffect(() => {
    if (!insuranceDocumentsTypes.length) getInsuranceDocumentsTypes()
  }, [])  // If [] is empty then is similar as componentDidMount.

  return (
    <Formik
      initialValues={{ documentId: popupValues?.file_type ? popupValues.file_type : '', file: '' }}
      validationSchema={{}}
      onSubmit={(values, actions) => SubmitFile(values, actions, props)}
    >
      {formikProps => {
        const { values, setFieldValue, isSubmitting, handleSubmit, errors } = formikProps
        const fileName = values.file
          ? getSafe(() => values.file.name, null)
          : ''

        return (
          <Modal closeIcon onClose={() => props.closePopup()} open centered size='small'>
            <Dimmer active={isSubmitting} inverted>
              <Loader />
            </Dimmer>
            <Modal.Header>
              <FormattedMessage
                id='insurance.insurance'
                defaultMessage='Insurance'
              />
            </Modal.Header>
            <Modal.Content>
              <Form>
                <FormGroup widths='equal'>
                  <FormField>
                    <label htmlFor='field_upload_file'>
                      <FormattedMessage
                        id='insurance.addYour'
                        defaultMessage='Add Your Insurance'
                        values={{
                          name:
                            <strong>
                              {
                                values.documentId
                                  ? (
                                    values.documentId
                                      .replace(/INSURANCE_/g, '')
                                      .toLowerCase()
                                      .split('_')
                                      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                                      .join(' ')
                                  ) : ''
                              }
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
                      id='insurance.insuranceType'
                      defaultMessage='Insurance Type'
                    />}
                    name='documentId'
                    options={
                      insuranceDocumentsTypes && insuranceDocumentsTypes.length
                        ? insuranceDocumentsTypes.map(type => {
                          const description = type
                            .replace(/INSURANCE_/g, '')
                            .toLowerCase()
                            .split('_')
                            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                            .join(' ')
                          return ({ text: description, value: type, key: type })
                        }) : []
                    }
                    inputProps={{
                      disabled: !!popupValues?.file_type,
                      selection: true,
                      loading: insuranceDocumentsTypesLoading,
                      placeholder:
                        formatMessage({
                          id: 'insurance.selectInsuranceType',
                          defaultMessage: 'Select Insurance Type'
                        }),
                      'data-test': 'company_form_select_federal_certification_drpdn'
                    }}
                  />
                </FormGroup>
              </Form>
            </Modal.Content>
            <Modal.Actions>
              <BasicButton
                noBorder
                onClick={() => props.closePopup()}
                data-test='company_form_add_legal_document_reset_btn'>
                <FormattedMessage id='global.cancel' defaultMessage='Cancel'>
                  {text => text}
                </FormattedMessage>
              </BasicButton>
              <Button.Submit
                disabled={!values.file || !values.documentId}
                onClick={handleSubmit}
                data-test='company_form_add_legal_document_submit_btn'>
                <FormattedMessage id='global.upload' defaultMessage='Upload'>
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

InsurancePopup.propTypes = {
  onUpload: PropTypes.func
}

InsurancePopup.defaultProps = {
  onUpload: () => {}
}

function mapStateToProps(state) {
  return {
    popupValues: state.settings.popupValues,
    insuranceDocumentsTypes: state.settings.insuranceDocumentsTypes,
    insuranceDocumentsTypesLoading: state.settings.insuranceDocumentsTypesLoading
  }
}

export default injectIntl(connect(mapStateToProps, {
  closePopup,
  getInsuranceDocumentsTypes,
  getInsuranceDocuments,
  uploadInsuranceDocument
})(InsurancePopup))
