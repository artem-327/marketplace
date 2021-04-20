import PropTypes from 'prop-types'
import { Grid, GridColumn, GridRow, Button } from 'semantic-ui-react'
import { Input, Dropdown, Checkbox } from 'formik-semantic-ui-fixed-validation'
import { FormattedMessage, injectIntl } from 'react-intl'
import styled from 'styled-components'
//Components
import {
  Rectangle,
  CustomDivContent,
  CustomDivInTitle,
  CustomDivTitle
} from '~/modules/cart/components/StyledComponents'
import { Required } from '~/components/constants/layout'

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

const ButtonOrCustom = styled(Button.Group)`
  .ui.button {
    background-color: #ffffff !important;
    color: #20273a !important;
    font-weight: bold !important;
  }
  .ui.active.button {
    background-color: #20273a !important;
    color: #ffffff !important;
  }
`

const DivBusinessTypeTitle = styled.div`
  font-weight: bold;
`

const DivRectangleBusinessType = styled.div`
  border-radius: 4px;
  border: solid 1px #dee2e6;
  background-color: #f8f9fb;
  padding-bottom: 16px;
  overflow: inherit !important;
`

const SpanEstablishedLabel = styled.span`
  color: #848893;
`

const DivRectangle = styled(Rectangle)`
  margin: 0px;
  background-color: #f8f9fb;
  border: solid 1px #dee2e6;
`

function ControlPerson({ formikProps, intl: { formatMessage }, entityTypes, naicsCodes }) {
  return (
    <GridControlPerson>
      <GridRow>
        <GridColumn>
          <DivRectangle>
            <CustomDivTitle>
              <CustomDivInTitle>
                <FormattedMessage
                  id='velloci.controlPerson.infoTitle'
                  defaultMessage='Please confirm that you will be the control person'
                />
              </CustomDivInTitle>
            </CustomDivTitle>
            <CustomDivContent style={{ color: '#848893', padding: '10px' }}>
              <FormattedMessage
                id='velloci.controlPerson.infoContent'
                defaultMessage='A control person is a single individual with significant responsibility to control, manage or direct legal entity customer, including an executive Officer or senior manager (e.g. a Chief Executive Officer, Chief Financial Officer, Chief Operating Officer, Managing Member, General Partner, President, Vice President or Treasurer); or any other individual who regularly performs similar functions.'
              />
              <br />
              <br />
              <FormattedMessage
                id='velloci.controlPerson.infoContent2'
                defaultMessage='If this does not apply to you, you will not be able to continue. Please get the person who will be the Control Person  of this account to continue.'
              />
            </CustomDivContent>
          </DivRectangle>
        </GridColumn>
      </GridRow>
      <GridRow>
        <GridColumn>
          <CheckboxControlPerson
            inputProps={{
              'data-test': 'settings_velloci_registration_control_person_chckb'
            }}
            label={formatMessage({
              id: 'velloci.controlPerson.checkboxLabel',
              defaultMessage: 'I will be the Control Person of this bank account'
            })}
            name='controlPerson.isControlPerson'
          />
        </GridColumn>
      </GridRow>

      <DivBusinessTypeTitle>
        <FormattedMessage id='velloci.controlPerson.businessType' defaultMessage='Business Type' />
      </DivBusinessTypeTitle>

      <GridRow>
        <GridColumn>
          <DivRectangleBusinessType>
            <GridControlPersonBusinessType>
              <GridRowBusinessType>
                <Grid.Column>
                  <Dropdown
                    options={entityTypes && entityTypes.data && entityTypes.data.length ? entityTypes.data : []}
                    fieldProps={{
                      'data-test': 'settings_velloci_registration_control_person_drpdwn'
                    }}
                    inputProps={{
                      placeholder: formatMessage({
                        id: 'velloci.controlPerson.kindBusiness.placeholder',
                        defaultMessage: 'Pick one'
                      }),
                      search: true,
                      selection: true,
                      loading: entityTypes && entityTypes.loading
                    }}
                    name='controlPerson.entityType'
                    label={
                      <>
                        {formatMessage({
                          id: 'velloci.controlPerson.kindBusiness',
                          defaultMessage: 'What kind of business are you opening this account for?'
                        })}
                        {<Required />}
                      </>
                    }
                  />
                </Grid.Column>
              </GridRowBusinessType>
              <GridRowBusinessType>
                <Grid.Column width={8}>
                  <Input
                    name='controlPerson.legalBusinessName'
                    label={
                      <>
                        {formatMessage({
                          id: 'velloci.controlPerson.legalBusinessName',
                          defaultMessage: 'Legal Business Name'
                        })}
                        {<Required />}
                      </>
                    }
                    inputProps={{
                      placeholder: formatMessage({
                        id: 'velloci.controlPerson.legalBusinessName.placeholder',
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
                  <FormattedMessage id='velloci.controlPerson.tax' defaultMessage='Tax Identification Number' />
                  <Required />
                  <ButtonOrCustom widths={8}>
                    <Button
                      onClick={e => {
                        formikProps.setFieldValue('controlPerson.isEin', true)
                        formikProps.setFieldValue('controlPerson.isSsn', false)
                      }}
                      active={formikProps.values.controlPerson.isEin}
                      data-test='settings_velloci_registration_control_person_ein_btn'>
                      <FormattedMessage id='velloci.controlPerson.ein' defaultMessage='EIN' />
                    </Button>
                    <Button.Or text={formatMessage({ id: 'global.or', defaultMessage: 'or' })} />
                    <Button
                      onClick={e => {
                        formikProps.setFieldValue('controlPerson.isEin', false)
                        formikProps.setFieldValue('controlPerson.isSsn', true)
                      }}
                      active={formikProps.values.controlPerson.isSsn}
                      data-test='settings_velloci_registration_control_person_ssn_btn'>
                      <FormattedMessage id='velloci.controlPerson.ssn' defaultMessage='SSN' />
                    </Button>
                  </ButtonOrCustom>
                </Grid.Column>
              </GridRowBusinessType>
              <GridRowBusinessType columns={2}>
                <Grid.Column width={8}>
                  <Input
                    name={formikProps.values.controlPerson.isEin ? 'controlPerson.ein' : 'controlPerson.ssn'}
                    inputProps={{
                      placeholder: formatMessage({
                        id: `velloci.controlPerson.${
                          formikProps.values.controlPerson.isEin ? 'ein' : 'ssn'
                        }.placeholder`,
                        defaultMessage: `Enter ${formikProps.values.controlPerson.isEin ? 'EIN' : 'SSN'}`
                      }),
                      type: 'text',
                      'data-test': `settings_velloci_registration_control_person_legal_${
                        formikProps.values.controlPerson.isEin ? 'ein' : 'ssn'
                      }_inpt`
                    }}
                  />
                </Grid.Column>
                <Grid.Column width={5} textAlign='center'>
                  <SpanEstablishedLabel>
                    {formatMessage({
                      id: 'velloci.controlPerson.establishedUs',
                      defaultMessage: 'Established in the US?'
                    })}
                  </SpanEstablishedLabel>
                  <Checkbox
                    inputProps={{
                      toggle: true,
                      'data-test': 'settings_velloci_registration_control_person_legal_isEstablishedUs_chckbx'
                    }}
                    name='controlPerson.isEstablishedUs'
                  />
                </Grid.Column>
              </GridRowBusinessType>

              <GridRowBusinessType columns={2}>
                <Grid.Column width={8}>
                  <Dropdown
                    options={naicsCodes.data}
                    fieldProps={{
                      'data-test': 'settings_velloci_registration_control_person_industry_type_drpdwn'
                    }}
                    inputProps={{
                      placeholder: formatMessage({
                        id: 'velloci.controlPerson.industryType.placeholder',
                        defaultMessage: 'Select industry type'
                      }),
                      search: true,
                      selection: true,
                      loading: naicsCodes?.loading,
                      disabled: naicsCodes?.loading
                    }}
                    name='controlPerson.naicsCode'
                    label={
                      <>
                        {formatMessage({
                          id: 'velloci.controlPerson.industryType',
                          defaultMessage: 'Your Industry Type'
                        })}
                        {<Required />}
                      </>
                    }
                  />
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
  formikProps: PropTypes.object,
  entityTypes: PropTypes.object,
  naicsCodes: PropTypes.object
}

ControlPerson.defaultProps = {
  formikProps: {},
  entityTypes: {},
  naicsCodes: { data: [] }
}

export default injectIntl(ControlPerson)
