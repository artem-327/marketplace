import { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { Form, Grid, GridColumn, GridRow } from 'semantic-ui-react'
import { Button, Dropdown, Input, TextArea } from 'formik-semantic-ui-fixed-validation'
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
import { getInitialFormValues, handleSubmit } from '~/modules/settings/components/CompanyDetailsPage/CompanyDetailsPage.services'
import { validationSchema } from '../../../company-form/components/CompanyDetails.services'
import { PhoneNumber } from '~/modules/phoneNumber'
import { HeadingContainer } from '../styles'

const GridFormationDocument = styled(Grid)`
  margin: 14px 16px !important;
`

const MarketingMaterial = props => {
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
            onSubmit={(values, actions) => handleSubmit(values, actions, props, state)}
            validationSchema={validationSchema}
        >
            {formikProps => {
                const { errors, setFieldTouched, setFieldValue, isSubmitting, submitForm, touched, values } = formikProps

                return (
                    <Form>
                        <GridFormationDocument className="marketing-material">
                            <Grid>
                                <GridRow>
                                    <GridColumn>
                                        <FormattedMessage id='company.companyFormDescription' />
                                    </GridColumn>
                                </GridRow>
                                <GridRow>
                                    <GridColumn computer={10} tablet={16} mobile={16}>
                                        <FormattedMessage id='onboarding.add.company.logo' />
                                        <PictureUpload
                                            companyLogo={companyLogo}
                                            hasLogo={hasLogo}
                                            hasPicture={hasLogo}
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
                                            defaultMessage: 'Enter Legal Business Name'
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
                                            label={<FormattedMessage id='company.emailAddress' defaultMessage='Email Address' />}
                                            name='email'
                                            inputProps={{
                                            placeholder: formatMessage({ id: 'company.enterEmailAddress', defaultMessage: 'Enter Email Address' })
                                            }}
                                        />
                                    </GridColumn>
                                </GridRow>
                                <GridRow>
                                    <GridColumn computer={10} tablet={16} mobile={16}>
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
                                <GridRow>
                                    <GridColumn computer={10} tablet={16} mobile={16}>
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
                            <GridRow>
                                <GridColumn mobile={16}>
                                    <Button className="btn-save btn-primary-color" basic onClick={() => submitForm()}>
                                        <FormattedMessage id='global.save' />
                                    </Button>
                                </GridColumn>
                            </GridRow>
                        </GridFormationDocument>
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
