/* eslint-disable react-hooks/exhaustive-deps */
import { connect } from 'react-redux'
import { useEffect } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Info } from 'react-feather'
import { getSafe } from '~/utils/functions'
import styled from 'styled-components'
// Components
import { Button as ButtonSemantic, Form, Grid, GridColumn, GridRow } from 'semantic-ui-react'
import { ErrorMessage } from 'formik'
import { Button, Dropdown } from 'formik-semantic-ui-fixed-validation'
import {
    Rectangle,
    CustomDivInTitle,
    CustomDivTitle
  } from '~/modules/cart/components/StyledComponents'
// Styles
import { InputHidden, PaperclipIcon } from '../../../settings/components/Insurance/InsurancePopup/InsurancePopup.styles'
// Services
import { SubmitFile } from '../../../settings/components/Insurance/InsurancePopup/InsurancePopup.services'
import {
  closePopup,
  getInsuranceDocumentsTypes,
  getInsuranceDocuments,
  uploadInsuranceDocument
} from '~/modules/settings/actions'

const StyledGrid = styled(Grid)`
  margin: 14px 16px !important;
`

const InfoSpan = styled('span')`
  font-size: .8rem;
`

const CustomDivContent = styled.div`
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  color: #848893;
  padding: .5rem;
`

const ulStyles = {
    margin: '0',
    padding: '0 0 0 .5rem',
    listStyleType: 'disc'
}

export const isFileEmpty = file => {
    let arr = []
    for (const prop in file) {
        arr.push(prop)
    }

    return arr.length === 0
}

const CertificateOfInsurance = props => {
  const {
    activeStep,
    coiDocumentUploaded,
    formikProps,
    intl: { formatMessage },
    insuranceDocumentsTypes,
    insuranceDocumentsTypesLoading,
    getInsuranceDocumentsTypes,
    nextStep,
    popupValues,
    updateCoiDocumentUploaded
  } = props

  useEffect(() => {
    if (!insuranceDocumentsTypes.length) getInsuranceDocumentsTypes()
  }, [])

    const { values, setFieldValue, isSubmitting, handleSubmit, errors } = formikProps
    const fileName = values?.certificateOfInsurance?.file
        ? getSafe(() => values?.certificateOfInsurance?.file?.name, null)
        : ''

    return (
            <Form className="coi">
                <StyledGrid>
                    <GridRow>
                        <GridColumn width={16}>
                            <label htmlFor='field_upload_file'>
                                <FormattedMessage
                                    id='insurance.subTitle'
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
                        </GridColumn>
                    </GridRow>
                    <GridRow>
                        <GridColumn computer={12} tablet={12} mobile={16}>
                            <ButtonSemantic
                                as='label'
                                basic
                                className="full-width"
                                data-test='certificate-of-insurance-browse-files'
                                icon
                                role='button'
                            >
                                <PaperclipIcon size='15' />
                                <FormattedMessage id='company.browseFileHere' defaultMessage='Browse file here' />
                                <InputHidden
                                    name='certificateOfInsurance.file'
                                    error={errors.file}
                                    type='file'
                                    onChange={e => setFieldValue('certificateOfInsurance.file', e.currentTarget.files[0])}
                                />
                            </ButtonSemantic>
                            {fileName && <p className="file-name" style={{ margin: '.5rem 0 0 0' }}>{fileName}</p>}
                            <ErrorMessage name='certificateOfInsurance.file'>
                                {() => {
                                    if (!coiDocumentUploaded) {
                                        return (
                                            <p style={{ color: '#9f3a38', margin: '.5rem 0 0 0' }}>
                                                <FormattedMessage id='onboarding.coi.document.mandatory' />
                                            </p>
                                        )
                                    } else {
                                        return (
                                            <p style={{ color: '#9f3a38' }}>
                                                <FormattedMessage id='global.required' />    
                                            </p>
                                        )
                                    }
                                }}
                            </ErrorMessage>
                        </GridColumn>
                        <GridColumn computer={4} tablet={4} mobile={16}>
                            <Rectangle className="coi-info">
                                <CustomDivTitle>
                                    <Info size={20} style={{ color: '#3bbef6' }} />
                                    <CustomDivInTitle style={{ color: '#3bbef6' }}>
                                        <FormattedMessage id='velloci.formationDocument.requiredTitle' />
                                    </CustomDivInTitle>
                                </CustomDivTitle>
                                <CustomDivContent style={{ color: '#848893' }}>
                                    <ul style={ulStyles}>
                                        <li><InfoSpan><FormattedMessage id='onboarding.general.liability.coi' /></InfoSpan></li>
                                    </ul>
                                </CustomDivContent>
                            </Rectangle>
                        </GridColumn>
                    </GridRow>
                    <GridRow>
                        <GridColumn computer={12} tablet={12} mobile={16}> 
                            <Dropdown
                                label={<FormattedMessage
                                id='insurance.insuranceType'
                                defaultMessage='Insurance Type'
                                />}
                                name='certificateOfInsurance.documentId'
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
                                'data-test': 'certificate-of-insurance-dropdown'
                                }}
                            />
                        </GridColumn>
                        <GridColumn computer={4} tablet={4} mobile={16}>
                            <Rectangle className="coi-info">
                                <CustomDivTitle>
                                    <Info size={20} style={{ color: '#3bbef6' }} />
                                    <CustomDivInTitle style={{ color: '#3bbef6' }}>
                                        <FormattedMessage id='onboarding.optional.files' />
                                    </CustomDivInTitle>
                                </CustomDivTitle>
                                <CustomDivContent style={{ color: '#848893' }}>
                                    <ul style={ulStyles}>
                                        <li><InfoSpan><FormattedMessage id='onboarding.transportation.insurance' /></InfoSpan></li>
                                        <li><InfoSpan><FormattedMessage id='onboarding.property.insurance.coi' /></InfoSpan></li>
                                        <li><InfoSpan><FormattedMessage id='onboarding.professional.liability.insurance' /></InfoSpan></li>
                                        <li><InfoSpan><FormattedMessage id='onboarding.other.forms.of.insurance' /></InfoSpan></li>
                                    </ul>
                                </CustomDivContent>
                            </Rectangle>
                        </GridColumn>
                    </GridRow>
                    <GridRow>
                        <GridColumn width={16}>
                            <Button
                                id="coi-upload"
                                className="s-full-width btn-primary-color"
                                data-test='certificate-of-insurance-add-another'
                                disabled={!values?.certificateOfInsurance?.documentId || isFileEmpty(values?.certificateOfInsurance?.file)}
                                onClick={() => {
                                    if (values?.certificateOfInsurance?.documentId === 'INSURANCE_GENERAL_LIABILITY') {
                                        updateCoiDocumentUploaded(true)
                                    }
                                    SubmitFile(
                                        formikProps?.values?.certificateOfInsurance,
                                        { setSubmitting: formikProps?.setSubmitting },
                                        {
                                            closePopup: props?.closePopup,
                                            intl: props?.intl,
                                            uploadInsuranceDocument: props?.uploadInsuranceDocument,
                                            getInsuranceDocuments: props?.getInsuranceDocuments
                                        }
                                    )
                                    formikProps.resetForm()
                                    formikProps?.setFieldValue('certificateOfInsurance.file', '')
                                    formikProps?.setFieldValue('certificateOfInsurance.documentId', '')
                                }}
                            >
                                <FormattedMessage id='onboarding.setup.indicator.add.another' />
                            </Button>
                        </GridColumn>
                    </GridRow>
                </StyledGrid>
            </Form>
    )
}

function mapStateToProps(state) {
  return {
    coiDocumentUploaded: state?.vellociRegister?.coiDocumentUploaded,
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
})(CertificateOfInsurance))

