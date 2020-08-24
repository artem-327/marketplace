import React from 'react'
import PropTypes from 'prop-types'
import { Grid, GridColumn, GridRow, Segment, Header, Form, Button, Icon, Popup } from 'semantic-ui-react'
import { Input, Dropdown, Checkbox } from 'formik-semantic-ui-fixed-validation'
import { FormattedMessage, injectIntl } from 'react-intl'
import styled from 'styled-components'

import { Required } from '~/components/constants/layout'
import {
  Rectangle,
  CustomDivContent,
  CustomDivInTitle,
  CustomDivTitle,
  InfoIcon
} from '~/modules/cart/components/StyledComponents'

const GridControlPerson = styled(Grid)`
  margin: 14px 16px !important;
`

const GridControlPersonBusinessType = styled(Grid)`
  margin: 0px !important;
`

const GridRowBusinessType = styled(Grid.Row)`
  padding-bottom: 0px !important;
`

const CheckboxControlPerson = styled(Checkbox)`
  .ui.checkbox input.hidden + label {
    color: #848893 !important;
  }
`

const DivBusinessTypeTitle = styled.div`
  font-weight: bold;
`

const DivRectangleBusinessType = styled.div`
  height: 320px;
  border-radius: 4px;
  border: solid 1px #dee2e6;
  background-color: #f8f9fb;
`
//REMOVE me if you know options for the dropdown
const options = [
  { key: 1, text: '1. kind of business', value: 1 },
  { key: 2, text: '2. kind of business', value: 2 },
  { key: 3, text: '3. kind of business', value: 3 },
  { key: 4, text: '4. kind of business', value: 4 }
]

function ControlPerson({ formikProps, intl: { formatMessage } }) {
  console.log('formikProps====================================')
  console.log(formikProps)
  console.log('====================================')
  return (
    <GridControlPerson>
      <GridRow>
        <GridColumn>
          <Rectangle style={{ margin: '0px', backgroundColor: '#ddf1fc' }}>
            <CustomDivTitle style={{ color: '#2599d5' }}>
              <CustomDivInTitle>
                <FormattedMessage
                  id='settings.vellociRegistration.controlPerson.infoTitle'
                  defaultMessage='Please confirm that you will be the control person'
                />
              </CustomDivInTitle>
            </CustomDivTitle>
            <CustomDivContent style={{ color: '#848893', padding: '10px' }}>
              <FormattedMessage
                id='settings.vellociRegistration.controlPerson.infoContent'
                defaultMessage='A control person is a single individual with significant responsibility to constrol manage or direct legal entity customer, including an executive ocer or senior manager (e.g. a Chief Executive Ocer, Chief Financial Ocer, Chief Operating Ocer, Managing Member, General Partner, President, Vice President or Treasurer); or any other individual who regulary performs similar functions.'
              />
              <br />
              <br />
              <FormattedMessage
                id='settings.vellociRegistration.controlPerson.infoContent2'
                defaultMessage='If this does not apply to you, you will not be able to continue. Please get the person who will be the Control Person  of this account to continue.'
              />
            </CustomDivContent>
          </Rectangle>
        </GridColumn>
      </GridRow>
      <GridRow>
        <GridColumn>
          <CheckboxControlPerson
            inputProps={{
              'data-test': 'settings_velloci_registration_control_person_chckb'
            }}
            label={formatMessage({
              id: 'settings.vellociRegistration.controlPerson.checkboxLabel',
              defaultMessage: 'I will be the Control Person of this bank account'
            })}
            name='isControlPerson'
          />
        </GridColumn>
      </GridRow>

      <DivBusinessTypeTitle>
        <FormattedMessage id='settings.vellociRegistration.controlPerson.businessType' defaultMessage='Business Type' />
      </DivBusinessTypeTitle>

      <GridRow>
        <GridColumn>
          <DivRectangleBusinessType>
            <GridControlPersonBusinessType>
              <GridRowBusinessType>
                <Grid.Column>
                  <Dropdown
                    options={options}
                    fieldProps={{
                      'data-test': 'settings_velloci_registration_control_person_drpdwn'
                    }}
                    inputProps={{
                      placeholder: formatMessage({
                        id: 'settings.vellociRegistration.controlPerson.kindBusiness.placeholder',
                        defaultMessage: 'Pick one'
                      }),
                      search: true,
                      selection: true
                    }}
                    name='kindBusiness'
                    label={formatMessage({
                      id: 'settings.vellociRegistration.controlPerson.kindBusiness',
                      defaultMessage: 'What kind of business are you opening this account for?'
                    })}
                  />
                </Grid.Column>
              </GridRowBusinessType>
              <GridRowBusinessType>
                <Grid.Column width={8}>
                  <Input
                    name='legalBusinessName'
                    label={formatMessage({
                      id: 'settings.vellociRegistration.controlPerson.legalBusinessName',
                      defaultMessage: 'Legal Business Name'
                    })}
                    inputProps={{
                      placeholder: formatMessage({
                        id: 'settings.vellociRegistration.controlPerson.legalBusinessName.placeholder',
                        defaultMessage: 'Enter Business Name'
                      }),
                      type: 'text',
                      'data-test': 'settings_velloci_registration_control_person_legal_business_name_inpt'
                    }}
                  />
                </Grid.Column>
              </GridRowBusinessType>
              <GridRowBusinessType>
                <Grid.Column width={8}>
                  <FormattedMessage
                    id='settings.vellociRegistration.controlPerson.tax'
                    defaultMessage='Tax Identification Number'
                  />
                  <Button.Group widths={8}>
                    <Button
                      onClick={e => {
                        e.preventDefault()
                        formikProps.setValues('ein', true)
                        formikProps.setValues('ssn', false)
                      }}
                      active={formikProps.values.ein}
                      data-test='settings_velloci_registration_control_person_ein_btn'>
                      <FormattedMessage id='settings.vellociRegistration.controlPerson.ein' defaultMessage='EIN' />
                    </Button>
                    <Button.Or text={formatMessage({ id: 'global.or', defaultMessage: 'or' })} />
                    <Button
                      onClick={e => {
                        e.preventDefault()
                        formikProps.setValues('ein', false)
                        formikProps.setValues('ssn', true)
                      }}
                      active={formikProps.values.ssn}
                      data-test='settings_velloci_registration_control_person_ssn_btn'>
                      <FormattedMessage id='settings.vellociRegistration.controlPerson.ssn' defaultMessage='SSN' />
                    </Button>
                  </Button.Group>
                </Grid.Column>
              </GridRowBusinessType>
            </GridControlPersonBusinessType>
          </DivRectangleBusinessType>
        </GridColumn>
      </GridRow>
    </GridControlPerson>
  )
}

ControlPerson.propTypes = {
  formikProps: PropTypes.object
}

export default injectIntl(ControlPerson)
