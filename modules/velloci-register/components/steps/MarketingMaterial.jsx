import { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import * as Yup from 'yup'
import { Form, Grid, GridColumn, GridRow } from 'semantic-ui-react'
import { Dropdown, Input, TextArea } from 'formik-semantic-ui-fixed-validation'
import styled from 'styled-components'
import { FormattedMessage, injectIntl } from 'react-intl'
import PictureUpload from '~/components/picture-upload/PictureUpload'
import { Required } from '~/components/constants/layout'
import { makeGetCompany } from '~/modules/auth/selectors'
import { getSafe } from '~/utils/functions'
import { getIdentity, updateCompanyDetails } from '~/modules/auth/actions'
import {
    deleteCompanyLogo,
    getAssociations,
    getBusinessTypes,
    getCompanyLogo,
    postCompanyLogo,
    getCompanyLegalDocs,
    getManagementCertificationsDocs,
    getFederalOwnershipDocs
  } from '~/modules/company-form/actions'
import { Formik } from 'formik'
import FormRectangle from '../FormRectangle'
import { getInitialFormValues, handleSubmit } from '~/modules/settings/components/CompanyDetailsPage/CompanyDetailsPage.services'
import { PhoneNumber } from '~/modules/phoneNumber'
import { HeadingContainer, DivRectangleForm } from '../styles'
import { titleIds, subtitleIds } from '../../constants'
import ErrorFocus from '../../../../components/error-focus'

import {
    errorMessages,
    websiteValidation,
    websiteValidationNotRequired,
    phoneValidation,
    tagValidate
  } from '~/constants/yupValidation'

const validationSchema = Yup.object().shape({
    name: Yup.string(<FormattedMessage id='validation.required' defaultMessage='Required' />)
        .trim()
        .min(2, <FormattedMessage id='validation.minLength' values={{ min: 2 }} />)
        .required(),
    website: websiteValidation(),
    socialLinkedin: websiteValidationNotRequired(),
    socialFacebook: websiteValidationNotRequired(),
    socialTwitter: tagValidate(),
    socialInstagram: tagValidate(),
    phone: phoneValidation(10).required(errorMessages.requiredMessage),
    email: Yup.string().trim().email(errorMessages.invalidEmail).required(errorMessages.required),
    tagline: Yup.string().trim().max(100, errorMessages.maxLength(100))
})

const GridFormationDocument = styled(Grid)`
  margin: 14px 16px !important;
`

const MarketingMaterial = props => {
    const children = props?.children
    const activeStep = props?.activeStep
    const nextStep = props?.nextStep
    const formatMessage = props?.intl?.formatMessage
    const associations = props?.associations
    const businessTypes = props?.businessTypes
    const [companyLogo, setCompanyLogo] = useState(null)
    const [shouldUpdateLogo, setShouldUpdateLogo] = useState(false)
    const { companyId, hasLogo, getCompanyLogo } = props;

    const state = { companyLogo, setCompanyLogo, shouldUpdateLogo, setShouldUpdateLogo }

    useEffect(async () => {
        if (hasLogo && getCompanyLogo && companyId) {
          try {
            const companyLogo = await getCompanyLogo(companyId)
            if (companyLogo.value.data.size) setCompanyLogo(companyLogo.value.data)
          } catch (e) {
            console.error(e)
          }
        }
      }, [])

    useEffect(() => {
        try {
            if (!getSafe(() => props.businessTypes.length, false)) props.getBusinessTypes()
            if (!getSafe(() => props.associations.length, false)) props.getAssociations({ filters: [], pageSize: 50 })
        } catch (e) {
            console.log(e)
        }
    }, [])

    return (
        <Formik
            initialValues={getInitialFormValues(props.company)}
            onSubmit={(values, actions) => {
                handleSubmit(values, actions, props, state)
                nextStep(activeStep + 1)
            }}
            validationSchema={validationSchema}
        >
            {formikProps => {
                const { errors, setFieldTouched, setFieldValue, isSubmitting, submitForm, touched, values } = formikProps

                return (
                    <Form className="form-sub-section marketing-material">
                        {children}
                        <DivRectangleForm className="border">
                            <GridFormationDocument className="marketing-material">
                                <Grid>
                                    <GridRow>
                                        <GridColumn>
                                            <FormattedMessage id='company.companyFormDescription' />
                                        </GridColumn>
                                    </GridRow>
                                    <GridRow>
                                        <GridColumn computer={10} tablet={16} mobile={16}>
                                            <PictureUpload
                                                bottomCaption={null}
                                                companyLogo={companyLogo}
                                                hasLogo={hasLogo}
                                                hasPicture={hasLogo}
                                                label={<FormattedMessage id='onboarding.add.company.logo' />}
                                                picture={companyLogo}
                                                removePicture={() => {
                                                    setCompanyLogo(null)
                                                    setShouldUpdateLogo(true)
                                                }}
                                                selectPicture={(logo, isNew = true) => {
                                                    setCompanyLogo(logo)
                                                    setShouldUpdateLogo(isNew)
                                                }}
                                                values={values}
                                                {...props}
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
                                                defaultMessage: 'Enter Legal Business Name',
                                                'data-test': 'marketing-material-business-name'
                                            })
                                            }}
                                        />
                                        </GridColumn>
                                    </GridRow>
                                    <GridRow>
                                        <GridColumn computer={10} tablet={16} mobile={16}>
                                            <TextArea
                                                name='tagline'
                                                label={<FormattedMessage id='company.companySloganOrTagline' defaultMessage='Company Slogan or Tagline' />}
                                                inputProps={{
                                                    placeholder: formatMessage({
                                                        id: 'onboarding.company.slogan.or.tagline.example',
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
                                                // loading: loading,
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
                                        <GridColumn computer={10} tablet={16} mobile={16}>
                                            <Input
                                                label={
                                                    <>
                                                        <FormattedMessage id='company.emailAddress' defaultMessage='Email Address' />
                                                        <Required />
                                                    </>
                                                }
                                                name='email'
                                                inputProps={{
                                                    placeholder: formatMessage({ id: 'company.enterEmailAddress', defaultMessage: 'Enter Email Address' }),
                                                    'data-test': 'marketing-material-email-address'
                                                }}
                                            />
                                        </GridColumn>
                                    </GridRow>
                                    <GridRow>
                                        <GridColumn computer={10} tablet={16} mobile={16}>
                                            <PhoneNumber
                                                label={
                                                    <>
                                                        <FormattedMessage id='global.companyPhone' />
                                                        <Required />
                                                    </>
                                                }
                                                name='phoneNumber'
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
                                    <GridRow>
                                        <GridColumn>
                                            <HeadingContainer>
                                                <FormattedMessage id='onboarding.social.media' />
                                            </HeadingContainer>
                                        </GridColumn>
                                    </GridRow>
                                </Grid>
                                {['website', 'socialLinkedin', 'socialFacebook', 'socialTwitter', 'socialInstagram'].map(el => (
                                    <GridRow>
                                        <GridColumn width={16}>
                                            <Input
                                            label={
                                                <>
                                                    <FormattedMessage id={`company.${el}`} defaultMessage={el} />
                                                    {el === 'website' && <Required />}
                                                </>
                                            }
                                            name={el}
                                            inputProps={{
                                                placeholder: formatMessage({
                                                    id: `company.enter.${el}Url`,
                                                    defaultMessage: `Enter ${el} URL`,
                                                    'data-test': `marketing-material-${el}`    
                                                })
                                            }}
                                            />
                                        </GridColumn>
                                    </GridRow>
                                ))}
                                <GridRow className="m-t-padding">
                                    <GridColumn mobile={16}>
                                        <FormRectangle
                                            beneficialOwnersNotified={props?.emailPopup?.beneficialOwnersNotified}
                                            formikProps={formikProps}
                                            title={titleIds[activeStep]}
                                            subtitle={subtitleIds[activeStep]}
                                            prevStep={props.prevStep}
                                            submitForm={submitForm}
                                            activeStep={activeStep}
                                            finalStep={props?.finalStep}
                                            numberBeneficialOwners={props.numberBeneficialOwners}
                                            countBeneficialOwners={props.countBeneficialOwners}
                                            isLoadingSubmitButton={props.isLoadingSubmitButton}
                                            openEmailPopup={props.openEmailPopup}
                                            nextStep={props.nextStep}
                                            mainContainer={props?.mainContainer}
                                            selfFormikProps={formikProps}
                                        />
                                        <ErrorFocus />
                                    </GridColumn>
                                </GridRow>
                            </GridFormationDocument>
                        </DivRectangleForm>
                    </Form>
                )
            }}
        </Formik>
    )
}

const makeMapStateToProps = () => {
    const getCompany = makeGetCompany()
  
    const mapStateToProps = state => {
      const { settings, auth } = state
      return {
        ...settings,
        businessTypes: getSafe(() => state.businessTypes.data, []),
        associations: getSafe(() => state.businessTypes.associations, []),
        isCompanyAdmin: auth.identity ? auth.identity.isCompanyAdmin : false,
        company: getCompany(state),
        isProductCatalogAdmin: getSafe(() => auth.identity.isProductCatalogAdmin, false),
        isUserAdmin: getSafe(() => auth.identity.isUserAdmin, false),
        tutorialCompleted: getSafe(() => auth.identity.tutorialCompleted, false),
        documentsOwner: getSafe(() => settings.documentsOwner, []),
        isClientCompanyAdmin: getSafe(() => auth.identity.isClientCompanyAdmin, false),
        companyId: getSafe(() => auth.identity.company.id, false),
        companyName: getSafe(() => auth.identity.company.name, false),
        hasLogo: getSafe(() => auth.identity.company.hasLogo, false)
      }
    }
    return mapStateToProps
}
  
export default injectIntl(
    connect(makeMapStateToProps, {
        deleteCompanyLogo,
        getCompanyLogo,
        postCompanyLogo,
        getIdentity,
        updateCompanyDetails,
        getAssociations,
        getCompanyLegalDocs,
        getManagementCertificationsDocs,
        getFederalOwnershipDocs,
        getBusinessTypes
    })(MarketingMaterial)
)
