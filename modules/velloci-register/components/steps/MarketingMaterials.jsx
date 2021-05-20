import { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { Form, Grid, GridColumn, GridRow } from 'semantic-ui-react'
import { Button } from 'formik-semantic-ui-fixed-validation'
import styled from 'styled-components'
import { FormattedMessage, injectIntl } from 'react-intl'
import PictureUpload from '~/components/picture-upload/PictureUpload'
import { makeGetCompany } from '~/modules/auth/selectors'
import { getSafe } from '~/utils/functions'
import { getIdentity, updateCompanyDetails } from '~/modules/auth/actions'
import {
    deleteCompanyLogo,
    getCompanyLogo,
    postCompanyLogo,
    getCompanyLegalDocs,
    getManagementCertificationsDocs,
    getFederalOwnershipDocs
  } from '~/modules/company-form/actions'
import { Formik } from 'formik'
import { getInitialFormValues, logoUpload } from '~/modules/settings/components/CompanyDetailsPage/CompanyDetailsPage.services'

const GridFormationDocument = styled(Grid)`
  margin: 14px 16px !important;
`

const MarketingMaterial = props => {
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

    return (
        <Formik
            initialValues={getInitialFormValues(props.company.id)}
            onSubmit={(values, actions) => logoUpload(props.company.id, actions, props, state)}
        >
            {formikProps => {
                const { values, isSubmitting, submitForm } = formikProps

                return (
                    <Form>
                        <GridFormationDocument>
                            <Grid>
                                <GridRow>
                                    <GridColumn>
                                        <FormattedMessage id='company.companyFormDescription' />
                                    </GridColumn>
                                </GridRow>
                                <GridRow>
                                    <GridColumn width={10}>
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
                                    <GridColumn>
                                        <Button basic disabled={isSubmitting} onClick={() => submitForm()}>
                                            click me dawg
                                        </Button>
                                    </GridColumn>
                                </GridRow>
                            </Grid>
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
        getCompanyLegalDocs,
        getManagementCertificationsDocs,
        getFederalOwnershipDocs
    })(MarketingMaterial)
)
