import React from 'react'
import { connect } from 'react-redux'

import { Form, FormGroup, Divider, Accordion, Icon, Header, Loader, Dimmer } from 'semantic-ui-react'
import { Formik } from 'formik'

import { postCompanyLogo, deleteCompanyLogo } from '~/modules/company-form/actions'
import { Input, Button, Checkbox, Dropdown } from 'formik-semantic-ui-fixed-validation'

import * as Yup from 'yup'
import { cloneDeep } from 'lodash'
import { FormattedMessage, injectIntl } from 'react-intl'
import styled from 'styled-components'

import { validationSchema } from '~/modules/company-form/constants'
import { provinceObjectRequired, errorMessages, minOrZeroLength } from '~/constants/yupValidation'
import { CompanyForm } from '~/modules/company-form/'
import { addressValidationSchema, phoneValidation, websiteValidationNotRequired } from '~/constants/yupValidation'
import { getSafe, deepSearch } from '~/utils/functions'
import { PhoneNumber } from '~/modules/phoneNumber'
import { Required } from '~/components/constants/layout'
import { withDatagrid } from '~/modules/datagrid'
import * as Actions from '../../../actions'
import ErrorFocus from '~/components/error-focus'

import { FlexSidebar, FlexContent, HighSegment, LabeledRow } from '~/modules/admin/constants/layout'

const StyledDiv = styled.div`
  border-radius: 4px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06);
  background-color: #ffffff;
  border: solid 1px #dee2e6;
  margin: 16px 0; 
`

const BottomButtons = styled.div`
  display: flex;
  position: relative;
  overflow: visible;
  padding: 20px 25px;
  box-shadow: 0 -1px 3px 0 rgba(0, 0, 0, 0.06), inset 0 1px 0 0 #dee2e6;
  text-align: right;

  .ui.button {
    display: inline-block;
    margin: 0 5px;
    align-items: center;
  }
`

const initialFormValues = {
  associations: [],
  businessType: {
    id: null
  },
  cin: '',
  dba: '',
  dunsNumber: '',
  enabled: false,
  name: '',
  phone: '',
  tin: '',
  website: ''
}

class GuestCompanyInfo extends React.Component {
  state = {
    companyLogo: null,
    shouldUpdateLogo: false
  }

  selectLogo = (logo, isNew = true) => {
    this.setState({ companyLogo: logo, shouldUpdateLogo: isNew })
  }

  removeLogo = () => {
    this.setState({ companyLogo: null, shouldUpdateLogo: true })
  }

  render() {
    const {
      popupValues,
      updateClientCompany,
      intl,
      postCompanyLogo,
      deleteCompanyLogo,
      handleVariableSave
    } = this.props

    const { selectLogo, removeLogo } = this
    let { companyLogo } = this.state
    const { formatMessage } = intl

    return (
      <Formik
        enableReinitialize
        initialValues={{ ...initialFormValues, ...popupValues }}
        validationSchema={validationSchema}
        onSubmit={async (values, actions) => {
          try {
            let newAssociations = []
            if (getSafe(() => values.associations[0].id, false)) {
              newAssociations = values.associations.map(assoc => assoc.id)
            } else {
              newAssociations = getSafe(() => values.associations, [])
            }
            let newValues = {
              associations: newAssociations,
              businessType: getSafe(() => values.businessType.id, null),
              cin: getSafe(() => values.cin, ''),
              dba: getSafe(() => values.dba, ''),
              dunsNumber: getSafe(() => values.dunsNumber, ''),
              enabled: getSafe(() => values.enabled, false),
              name: getSafe(() => values.name, ''),
              phone: getSafe(() => values.phone, ''),
              tin: getSafe(() => values.tin, ''),
              website: getSafe(() => values.website, '')
            }

            const { value } = await updateClientCompany(popupValues.id, newValues)
            handleVariableSave('companyEditValues', value)

            if (this.state.shouldUpdateLogo) {
              if (this.state.companyLogo) postCompanyLogo(value.id, companyLogo)
              else deleteCompanyLogo(popupValues.id)
            }
          } catch (err) {
            console.error(err)
          } finally {
            actions.setSubmitting(false)
          }
        }}
        render={props => {
          let { setFieldValue, values, setFieldTouched, errors, touched, isSubmitting } = props

          return (
            <Form>
              <StyledDiv>
                <div style={{ padding: '23px 30px' }}>
                  <Dimmer inverted active={isSubmitting}>
                    <Loader />
                  </Dimmer>
                  <CompanyForm
                    admin={false}
                    selectLogo={selectLogo}
                    removeLogo={removeLogo}
                    companyLogo={companyLogo}
                    values={values}
                    setFieldValue={setFieldValue}
                    setFieldTouched={setFieldTouched}
                    errors={errors}
                    touched={touched}
                    isSubmitting={isSubmitting}
                    enableAssociations
                    companyId={values.id}
                    hasLogo={values.hasLogo}
                  />
                </div>
                <BottomButtons>
                  <div style={{ width: '100%' }}>
                    <Button.Submit data-test='admin_popup_company_save_btn' onClick={props.handleSubmit}>
                      <FormattedMessage id='global.saveChanges' defaultMessage='Save Changes'>
                        {text => text}
                      </FormattedMessage>
                    </Button.Submit>
                  </div>
                </BottomButtons>
              </StyledDiv>
              <ErrorFocus />
            </Form>
          )
        }}
      />
    )
  }
}

const mapDispatchToProps = {
  postCompanyLogo,
  deleteCompanyLogo,
  ...Actions
}

const mapStateToProps = ({ manageGuests }) => {
  return {
    ...manageGuests,
    popupValues: manageGuests.companyEditValues,
  }
}

export default withDatagrid(connect(mapStateToProps, mapDispatchToProps)(injectIntl(GuestCompanyInfo)))






