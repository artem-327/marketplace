/* eslint-disable react-hooks/exhaustive-deps */
import { connect } from 'react-redux'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl } from 'react-intl'
import { getSafe } from '~/utils/functions'

// Components
import ErrorFocus from '../../../components/error-focus'
import { Required } from '~/components/constants/layout'
import { GridRow, GridColumn, Loader, Button as ButtonSemantic } from 'semantic-ui-react'
import { Input, Button, TextArea, Dropdown } from 'formik-semantic-ui-fixed-validation'
import { PhoneNumber } from '~/modules/phoneNumber'
import { AddressForm } from '~/modules/address-form'
import PictureUpload from '../../../components/picture-upload/PictureUpload'
import AddLegalDocumentation from './AddLegalDocumentation/AddLegalDocumentation'
import AddCertifications from './AddCertifications/AddCertifications'
import DocumentStatus from './DocumentStatus/DocumentStatus'

// Styles
import {
  GridStyled,
  GridRowGreyDescription,
  GridRowSectionDescription,
  GridRowCustomPadding,
  SpanGreyHeader,
  GridRowAddress,
  ButtonOrCustom,
  SegmentStyled,
  DimmerStyled,
  GridColumnTradePassId
} from './CompanyDetails.styles'

// Services
import { removeFile, updateFilesList } from './CompanyDetails.services'
//Actions
import * as Actions from '../actions'
import { removeAttachment } from '../../inventory/actions'
import { getNaicsCodes } from '../../velloci-register/actions'

const CompanyDetails = props => {
  const [openDocumentationPopup, setOpenDocumentationPopup] = useState(false)
  const [openCertificationsPopup, setOpenCertificationsPopup] = useState(false)

  const {
    intl: { formatMessage },
    values,
    setFieldValue,
    setFieldTouched,
    errors,
    touched,
    isSubmitting,
    selectLogo,
    removeLogo,
    companyLogo,
    companyId,
    hasLogo,
    loading,
    deleting,
    businessTypes,
    associations,
    naicsCodes,
    documentTypesAll,
    documentTypesFederalOwnershipCertifications,
    documentTypesManagementCertifications,
    documentTypesLoading,
    companyLegalDocs,
    companyLegalDocsLoading,
    managementCertificationsDocs,
    managementCertificationsDocsLoading,
    federalOwnershipDocs,
    federalOwnershipDocsLoading
  } = props

  // Similar to call componentDidMount:
  useEffect(() => {
    try {
      if (!getSafe(() => props.documentTypesAll.length, false)) props.getDocumentTypes()
      if (!getSafe(() => props.naicsCodes.data.length, false)) props.getNaicsCodes()
      if (!getSafe(() => props.businessTypes.length, false)) props.getBusinessTypes()
      if (!getSafe(() => props.associations.length, false)) props.getAssociations({ filters: [], pageSize: 50 })
    } catch (e) {
      console.error(e)
    }
  }, []) // If [] is empty then is similar as componentDidMount.

  return (
    <GridStyled>
      <DimmerStyled active={isSubmitting} inverted>
        <Loader />
      </DimmerStyled>
      <GridRowGreyDescription>
        <FormattedMessage
          id='company.companyFormDescription'
          defaultMessage='The following information will help other businesses find you and determine if you are compliant with their practices.'
        />
      </GridRowGreyDescription>

      <GridRow>
        <GridColumn width={5}>
          <PictureUpload
            hasPicture={hasLogo}
            picture={companyLogo}
            selectPicture={file => selectLogo(file)}
            removePicture={() => removeLogo()}
          />
        </GridColumn>
        <GridColumn width={11}>
          <GridStyled>
            <GridRow>
              <GridColumn width={16}>
                <TextArea
                  name='tagline'
                  label={formatMessage({
                    id: 'company.companySloganOrTagline',
                    defaultMessage: 'Company Slogan or Tagline'
                  })}
                  inputProps={{
                    placeholder: formatMessage({
                      id: 'company.enterCompanySloganOrTagline',
                      defaultMessage: 'Enter Company Slogan or Tagline'
                    })
                  }}
                />
              </GridColumn>
            </GridRow>
            <GridRow>
              <GridColumn width={16}>
                <Dropdown
                  label={<FormattedMessage id='company.tradeOrganizations' defaultMessage='Trade organizations' />}
                  name='associations'
                  options={
                    associations && associations.length
                      ? associations.map(assoc => ({ text: assoc.name, value: assoc.id, key: assoc.id }))
                      : []
                  }
                  inputProps={{
                    clearable: true,
                    loading: loading,
                    multiple: true,
                    selection: true,
                    search: true,
                    placeholder: formatMessage({
                      id: 'company.selectTradeOrganizations',
                      defaultMessage: 'Select Trade Organizations'
                    }),
                    'data-test': 'company_form_association_drpdn'
                  }}
                />
              </GridColumn>
            </GridRow>
            <GridRow>
              <GridColumnTradePassId width={16}>
                <Input
                  label={<FormattedMessage id='company.myTradePassId' defaultMessage='My TradePass ID' />}
                  name='vellociBusinessId'
                  inputProps={{
                    readOnly: true
                  }}
                />
              </GridColumnTradePassId>
            </GridRow>
          </GridStyled>
        </GridColumn>
      </GridRow>

      <GridRowSectionDescription>
        <FormattedMessage id='company.dbaName' defaultMessage='DBA Name' />
      </GridRowSectionDescription>
      <GridRow>
        <GridColumn width={8}>
          <Input
            label={
              <>
                <FormattedMessage
                  id='company.dbaNameIfApplicable'
                  defaultMessage={`DBA Name ${formatMessage({
                    id: 'company.ifApplicable',
                    defaultMessage: '(if applicable)'
                  })}`}
                  values={{
                    ifApplicable: (
                      <SpanGreyHeader>
                        {formatMessage({ id: 'company.ifApplicable', defaultMessage: '(if applicable)' })}
                      </SpanGreyHeader>
                    )
                  }}
                />
                <Required />
              </>
            }
            name='dba'
            inputProps={{
              placeholder: formatMessage({
                id: 'company.businessName',
                defaultMessage: 'Business Name'
              })
            }}
          />
        </GridColumn>
        <GridColumn width={8}>
          <PhoneNumber
            label={<FormattedMessage id='global.phone' defaultMessage='Phone' />}
            name='companyPhone'
            values={values}
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
            errors={errors}
            touched={touched}
            isSubmitting={isSubmitting}
            clearable
          />
        </GridColumn>
      </GridRow>

      <GridRowSectionDescription>
        <FormattedMessage id='company.websiteAndSocialMedia' defaultMessage='Website and Social Media' />
      </GridRowSectionDescription>
      {['website', 'socialLinkedin', 'socialFacebook', 'socialTwitter', 'socialInstagram'].map(el => (
        <GridRow>
          <GridColumn width={16}>
            <Input
              label={<FormattedMessage id={`company.${el}`} defaultMessage={el} />}
              name={el}
              inputProps={{
                placeholder: formatMessage({
                  id: `company.enter.${el}Url`,
                  defaultMessage: `Enter ${el} URL`
                })
              }}
            />
          </GridColumn>
        </GridRow>
      ))}

      <GridRowSectionDescription>
        <FormattedMessage id='company.businessContact' defaultMessage='Business Contact' />
      </GridRowSectionDescription>
      <GridRow>
        <GridColumn width={8}>
          <Input
            label={<FormattedMessage id='company.emailAddress' defaultMessage='Email Address' />}
            name='email'
            inputProps={{
              placeholder: formatMessage({ id: 'company.enterEmailAddress', defaultMessage: 'Enter Email Address' })
            }}
          />
        </GridColumn>
        <GridColumn width={8}>
          <PhoneNumber
            label={<FormattedMessage id='global.phone' defaultMessage='Phone' />}
            name='phone'
            values={values}
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
            errors={errors}
            touched={touched}
            isSubmitting={isSubmitting}
            clearable
          />
        </GridColumn>
      </GridRow>

      <GridRowSectionDescription>
        <FormattedMessage id='company.businessType' defaultMessage='Business Type' />
      </GridRowSectionDescription>
      <GridRow>
        <GridColumn width={16}>
          <Dropdown
            label={<FormattedMessage id='company.businessType' defaultMessage='Business Type' />}
            name='businessType'
            options={
              businessTypes && businessTypes.length
                ? businessTypes.map(type => ({ text: type.name, value: type.id, key: type.id }))
                : []
            }
            inputProps={{
              clearable: true,
              loading: loading,
              selection: true,
              placeholder: formatMessage({ id: 'company.pickOne', defaultMessage: 'Pick One' }),
              'data-test': 'company_form_businessType_drpdn'
            }}
          />
        </GridColumn>
      </GridRow>

      <GridRow>
        <GridColumn width={16}>
          <Input
            label={
              <>
                <FormattedMessage id='company.legalBusinessName' defaultMessage='Legal Business Name' />
                <Required />
              </>
            }
            name='name'
            inputProps={{
              placeholder: formatMessage({
                id: 'company.enterLegalBusinessName',
                defaultMessage: 'Enter Legal Business Name'
              })
            }}
          />
        </GridColumn>
      </GridRow>

      <GridRowCustomPadding value='7.5px 0 7px 0'>
        <GridColumn width={16}>
          <FormattedMessage id='company.taxIdNum' defaultMessage='Tax Identification Number' />
        </GridColumn>
      </GridRowCustomPadding>

      <GridRowCustomPadding value='0 0 3.5px 0'>
        <GridColumn width={16}>
          <ButtonOrCustom widths={8}>
            <ButtonSemantic
              onClick={() => setFieldValue('tinType', 'ein')}
              active={values.tinType === 'ein'}
              data-test='company_form_ein_btn'>
              <FormattedMessage id='company.ein' defaultMessage='EIN' />
            </ButtonSemantic>
            <ButtonSemantic.Or text={formatMessage({ id: 'company.or', defaultMessage: 'OR' })} />
            <ButtonSemantic
              onClick={() => setFieldValue('tinType', 'ssn')}
              active={values.tinType !== 'ein'}
              data-test='company_form_ssn_btn'>
              <FormattedMessage id='company.ssn' defaultMessage='SSN' />
            </ButtonSemantic>
          </ButtonOrCustom>
        </GridColumn>
      </GridRowCustomPadding>
      <GridRow>
        <GridColumn width={16}>
          <Input
            name='tin'
            inputProps={{
              placeholder:
                values.tinType === 'ein'
                  ? formatMessage({ id: 'company.enterEin', defaultMessage: 'Enter EIN' })
                  : formatMessage({ id: 'company.enterSsn', defaultMessage: 'Enter SSN' })
            }}
          />
        </GridColumn>
      </GridRow>

      <GridRow>
        <GridColumn width={16}>
          <Dropdown
            label={<FormattedMessage id='detailCompany.naics' defaultMessage='NAICS' />}
            name='naicsCode'
            options={naicsCodes.data}
            inputProps={{
              clearable: true,
              loading: naicsCodes.loading,
              selection: true,
              search: true,
              placeholder: formatMessage({ id: 'detailCompany.naics.placeholder', defaultMessage: 'Select NAICS' }),
              'data-test': 'company_form_naics_drpdn'
            }}
          />
        </GridColumn>
      </GridRow>

      <GridRowSectionDescription>
        <FormattedMessage id='company.yourLegalAddress' defaultMessage='Your Legal Address' />
      </GridRowSectionDescription>
      <GridRowAddress>
        <GridColumn width={16}>
          <AddressForm required displayHeader={false} values={values} setFieldValue={setFieldValue} noBorder />
        </GridColumn>
      </GridRowAddress>

      <GridRowSectionDescription>
        <FormattedMessage id='company.legalDocumentation' defaultMessage='Legal Documentation' />
      </GridRowSectionDescription>

      <SegmentStyled>
        <DimmerStyled active={deleting || documentTypesLoading || companyLegalDocsLoading} inverted>
          <Loader />
        </DimmerStyled>
        {[18, 19, 20, 21].map((docId, index) => {
          let uploadedFiles = companyLegalDocs.filter(el => el.documentType && el.documentType.id === docId)
          const docType = documentTypesAll.find(el => el.id === docId)
          uploadedFiles = uploadedFiles.length ? uploadedFiles : [undefined]
          return uploadedFiles.map((uploadedFile, fileIndex) => {
            return (
              <GridRowCustomPadding value='5px 0' key={index + '_' + fileIndex}>
                <GridColumn width={8}>
                  <DocumentStatus
                    item={docType}
                    fileIndex={fileIndex}
                    uploadedFile={uploadedFile}
                    loading={documentTypesLoading || companyLegalDocsLoading}
                    onClick={() => setOpenDocumentationPopup({ docType, uploadedFile })}
                    onRemove={() => removeFile(uploadedFile.id, props.getCompanyLegalDocs, props)}
                  />
                </GridColumn>
              </GridRowCustomPadding>
            )
          })
        })}
      </SegmentStyled>

      <GridRowSectionDescription>
        <FormattedMessage
          id='company.federalOwnershipCertifications'
          defaultMessage='Federal Ownership Certifications'
        />
      </GridRowSectionDescription>
      <SegmentStyled>
        <DimmerStyled
          active={
            deleting || documentTypesLoading || federalOwnershipDocsLoading || managementCertificationsDocsLoading
          }
          inverted>
          <Loader />
        </DimmerStyled>
        {documentTypesFederalOwnershipCertifications.map((docType, index) => {
          let uploadedFiles = federalOwnershipDocs.filter(el => el.documentType && el.documentType.id === docType.id)
          return uploadedFiles.map((uploadedFile, fileIndex) => {
            return (
              <GridRowCustomPadding value='5px 0' key={index + '_' + fileIndex}>
                <GridColumn width={8}>
                  <DocumentStatus
                    item={docType}
                    fileIndex={fileIndex}
                    uploadedFile={uploadedFile}
                    loading={documentTypesLoading || federalOwnershipDocsLoading}
                    onClick={() => setOpenCertificationsPopup({ docType, uploadedFile })}
                    onRemove={() => removeFile(uploadedFile.id, props.getFederalOwnershipDocs, props)}
                  />
                </GridColumn>
              </GridRowCustomPadding>
            )
          })
        })}

        {documentTypesManagementCertifications.map((docType, index) => {
          let uploadedFiles = managementCertificationsDocs.filter(
            el => el.documentType && el.documentType.id === docType.id
          )
          return uploadedFiles.map((uploadedFile, fileIndex) => {
            return (
              <GridRowCustomPadding value='5px 0' key={index + '_' + fileIndex}>
                <GridColumn width={8}>
                  <DocumentStatus
                    item={docType}
                    fileIndex={fileIndex}
                    uploadedFile={uploadedFile}
                    loading={documentTypesLoading || managementCertificationsDocsLoading}
                    onClick={() => setOpenCertificationsPopup({ docType, uploadedFile })}
                    onRemove={() => removeFile(uploadedFile.id, props.getManagementCertificationsDocs, props)}
                  />
                </GridColumn>
              </GridRowCustomPadding>
            )
          })
        })}
      </SegmentStyled>

      <GridRowCustomPadding value='5px 0'>
        <GridColumn width={8}>
          <Button basic onClick={() => setOpenCertificationsPopup({ docType: null, uploadedFile: null })}>
            <FormattedMessage id='company.add' defaultMessage='Add'>
              {text => text}
            </FormattedMessage>
          </Button>
        </GridColumn>
      </GridRowCustomPadding>

      {openDocumentationPopup && (
        <AddLegalDocumentation
          popupValues={openDocumentationPopup}
          onClose={() => setOpenDocumentationPopup(false)}
          onUpload={() => {
            setOpenDocumentationPopup(false)
            updateFilesList(props.getCompanyLegalDocs)
          }}
        />
      )}
      {openCertificationsPopup && (
        <AddCertifications
          popupValues={openCertificationsPopup}
          onClose={() => setOpenCertificationsPopup(false)}
          onUpload={() => {
            setOpenCertificationsPopup(false)
            updateFilesList(props.getManagementCertificationsDocs)
            updateFilesList(props.getFederalOwnershipDocs)
          }}
        />
      )}
      <ErrorFocus />
    </GridStyled>
  )
}

CompanyDetails.propTypes = {
  selectLogo: PropTypes.func,
  removeLogo: PropTypes.func,
  companyLogo: PropTypes.object,
  values: PropTypes.object,
  setFieldValue: PropTypes.func,
  setFieldTouched: PropTypes.func,
  errors: PropTypes.object,
  touched: PropTypes.object,
  isSubmitting: PropTypes.bool,
  companyId: PropTypes.number,
  hasLogo: PropTypes.bool
}

CompanyDetails.defaultProps = {
  selectLogo: () => {},
  removeLogo: () => {},
  companyLogo: null,
  hasLogo: false
}

function mapStateToProps(state) {
  return {
    businessTypes: getSafe(() => state.businessTypes.data, []),
    loading: getSafe(() => state.businessTypes.loading, false),
    deleting: getSafe(() => state.simpleAdd.updatingDatagrid, false),
    associations: getSafe(() => state.businessTypes.associations, []),
    documentTypesLoading: getSafe(() => state.businessTypes.documentTypesLoading, false),
    documentTypesAll: getSafe(() => state.businessTypes.documentTypesAll, []),
    documentTypesFederalOwnershipCertifications: getSafe(
      () => state.businessTypes.documentTypesFederalOwnershipCertifications,
      []
    ),
    documentTypesManagementCertifications: getSafe(() => state.businessTypes.documentTypesManagementCertifications, []),
    companyLegalDocs: getSafe(() => state.businessTypes.companyLegalDocs, []),
    companyLegalDocsLoading: getSafe(() => state.businessTypes.companyLegalDocsLoading, false),
    managementCertificationsDocs: getSafe(() => state.businessTypes.managementCertificationsDocs, []),
    managementCertificationsDocsLoading: getSafe(() => state.businessTypes.managementCertificationsDocsLoading, false),
    federalOwnershipDocs: getSafe(() => state.businessTypes.federalOwnershipDocs, []),
    federalOwnershipDocsLoading: getSafe(() => state.businessTypes.federalOwnershipDocsLoading, false),
    naicsCodes: state?.vellociRegister?.naicsCodes
  }
}

const mapDispatchToProps = {
  ...Actions,
  removeAttachment,
  getNaicsCodes
}

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(CompanyDetails))
