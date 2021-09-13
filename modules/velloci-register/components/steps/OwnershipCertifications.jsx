/* eslint-disable react-hooks/exhaustive-deps */
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl } from 'react-intl'
import { getSafe } from '~/utils/functions'
import styled from 'styled-components'
import Router from 'next/router'

// Components
import { Form, Grid, GridColumn, GridRow, Button as ButtonSemantic } from 'semantic-ui-react'
import { Button, Dropdown } from 'formik-semantic-ui-fixed-validation'
import { Formik } from 'formik'
import { Modal } from '../Modal'

// Styles
import { InputHidden, PaperclipIcon } from '../../../../modules/company-form/components/AddCertifications/AddCertifications.styles'

// Services
import { SubmitFile } from '../../../../modules/company-form/components/AddCertifications/AddCertifications.services'
import { addAttachment, downloadAttachment, removeAttachment } from '../../../inventory/actions'

const StyledGrid = styled(Grid)`
  margin: 14px 16px !important;
`

const OwnershipCertifications = props => {
  const {
    applicationSubmitted,
    intl: { formatMessage },
    documentTypesFederalOwnershipCertifications,
    documentTypesManagementCertifications,
    popupValues
  } = props

  return (
    <Formik
      initialValues={{ documentId: popupValues.docType ? popupValues.docType.id : '', file: '' }}
      validationSchema={{}}
      onSubmit={(values, actions) => {
          SubmitFile(values, actions, props)
          actions?.resetForm()
      }}
    >
      {formikProps => {
        const { values, setFieldValue, handleSubmit, errors } = formikProps
        const fileName = values.file
          ? getSafe(() => values.file.name, null)
          : getSafe(() => popupValues.uploadedFile.name, null)

        return (
              <Form className="ownership-certifications">
                  {applicationSubmitted &&
                    <Modal
                        buttonText='onboarding.browse'
                        handleClick={() => Router.push('/settings/bank-accounts')}
                        subTitle='onboarding.verifying.identity'
                        title='onboarding.congratulations'
                    >
                        <p style={{ textAlign: 'center' }}><FormattedMessage id='onboarding.verification.submit.text' /></p>
                    </Modal>
                  }
                  <StyledGrid>
                    <GridRow>
                        <GridColumn>
                            <FormattedMessage id='onboarding.setup.indicator.ownership.certifications.info' />
                        </GridColumn>
                    </GridRow>
                    <GridRow>
                        <GridColumn computer={8} tablet={8} mobile={16}>
                            <ButtonSemantic className="btn-browse-files" basic icon as='label'>
                                <PaperclipIcon size='15' />
                                <FormattedMessage id='company.browseFileHere' defaultMessage='Browse file here' />
                                <InputHidden
                                    name='file'
                                    error={errors.file}
                                    type='file'
                                    onChange={e => setFieldValue('file', e.currentTarget.files[0])}
                                />
                            </ButtonSemantic>
                            {fileName && <p className="file-name" style={{ margin: '.5rem 0' }}>{fileName}</p>}
                        </GridColumn>
                    </GridRow>
                    <GridRow>
                        <GridColumn>
                            <Dropdown
                                label={<FormattedMessage id='company.federalOwnershipCertifications' defaultMessage='Federal Ownership Certifications' />}
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
                        </GridColumn>
                    </GridRow>
                    <GridRow>
                        <GridColumn>
                            <Dropdown
                                label={<FormattedMessage id='company.managementCertifications' defaultMessage='Management Certifications'/>}
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
                        </GridColumn>
                    </GridRow>
                    <GridRow>
                        <GridColumn>
                            <Button.Submit className="btn-save s-full-width btn-primary-color" disabled={!values.file || !values.documentId} onClick={handleSubmit} data-test='company_form_add_legal_document_submit_btn'>
                                <FormattedMessage id='onboarding.setup.indicator.add.another' />
                            </Button.Submit>
                        </GridColumn>
                    </GridRow>
                  </StyledGrid>
              </Form>
        )
      }}
    </Formik>
  )
}

OwnershipCertifications.propTypes = {
  onClose: PropTypes.func,
  onUpload: PropTypes.func,
  popupValues: PropTypes.object
}

OwnershipCertifications.defaultProps = {
  onClose: () => {},
  onUpload: () => {},
  popupValues: { docType: null, uploadedFile: null }
}

function mapStateToProps(state) {
  return {
    documentTypesFederalOwnershipCertifications:
      getSafe(() => state.simpleAdd.documentTypesFederalOwnershipCertifications, []),
    documentTypesManagementCertifications: getSafe(() => state.simpleAdd.documentTypesManagementCertifications, []),
    applicationSubmitted: state?.vellociRegister?.applicationSubmitted
  }
}

export default injectIntl(connect(mapStateToProps, {
  addAttachment, downloadAttachment, removeAttachment
})(OwnershipCertifications))
