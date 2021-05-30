/* eslint-disable react-hooks/exhaustive-deps */
import { connect } from 'react-redux'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl } from 'react-intl'
import { getSafe } from '~/utils/functions'
import { Formik } from 'formik'

// Components
import { Dimmer, Loader, Form } from 'semantic-ui-react'
import CompanyDetails from '../../../company-form/components/CompanyDetails'
import { Input, Button, Checkbox, TextArea } from 'formik-semantic-ui-fixed-validation'

// Styles
import { DivPage, DivPageHeaderRow, DivPageBottomButtons, DivContent } from './CompanyDetailsPage.styles'

// Services
import { getInitialFormValues, handleSubmit } from './CompanyDetailsPage.services'
import { validationSchema } from '../../../company-form/components/CompanyDetails.services'
import {
  deleteCompanyLogo,
  getCompanyLogo,
  postCompanyLogo,
  getCompanyLegalDocs,
  getManagementCertificationsDocs,
  getFederalOwnershipDocs
} from '../../../company-form/actions'
import { updateCompanyDetails } from '~/modules/auth/actions'
import { getIdentity } from '~/modules/auth/actions'
//Selectors
import { makeGetCompany } from '../../../auth/selectors'

let formikPropsSelf = {}

const CompanyDetailsPage = props => {
  const [companyLogo, setCompanyLogo] = useState(null)
  const [shouldUpdateLogo, setShouldUpdateLogo] = useState(false)

  const { hasLogo, companyId } = props

  const state = { companyLogo, setCompanyLogo, shouldUpdateLogo, setShouldUpdateLogo }

  // Similar to call componentDidMount:
  useEffect(async () => {
    if (hasLogo && props.getCompanyLogo && props.companyId) {
      try {
        const companyLogo = await props.getCompanyLogo(props.companyId)
        if (companyLogo.value.data.size) setCompanyLogo(companyLogo.value.data)
      } catch (e) {
        console.error(e)
      }
    }
    props.getCompanyLegalDocs()
    props.getManagementCertificationsDocs()
    props.getFederalOwnershipDocs()
  }, []) // If [] is empty then is similar as componentDidMount.

  return (
    <Formik
      onSubmit={(values, actions) => handleSubmit(values, actions, props, state)}
      initialValues={getInitialFormValues(props.company)}
      validationSchema={validationSchema}>
      {formikProps => {
        formikPropsSelf = formikProps
        const { values, errors, setFieldValue, setFieldTouched, touched, isSubmitting, submitForm } = formikProps

        return (
          <DivPage>
            <Form>
              <DivPageHeaderRow>
                <FormattedMessage id='company.companyDetails' defaultMessage='Company Details' />
              </DivPageHeaderRow>
              <DivContent>
                <CompanyDetails
                  selectLogo={(logo, isNew = true) => {
                    setCompanyLogo(logo)
                    setShouldUpdateLogo(isNew)
                  }}
                  removeLogo={() => {
                    setCompanyLogo(null)
                    setShouldUpdateLogo(true)
                  }}
                  companyLogo={companyLogo}
                  values={values}
                  setFieldValue={setFieldValue}
                  setFieldTouched={setFieldTouched}
                  errors={errors}
                  touched={touched}
                  isSubmitting={isSubmitting}
                  companyId={companyId}
                  hasLogo={hasLogo}
                />
              </DivContent>
              <DivPageBottomButtons>
                <Button basic disabled={isSubmitting} onClick={() => submitForm()}>
                  <FormattedMessage id='global.save'>{text => text}</FormattedMessage>
                </Button>
              </DivPageBottomButtons>
            </Form>
          </DivPage>
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
  })(CompanyDetailsPage)
)
