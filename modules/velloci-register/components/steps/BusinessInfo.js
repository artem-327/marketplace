import PropTypes from 'prop-types'
import { Button, Grid, GridColumn, GridRow } from 'semantic-ui-react'
import { Checkbox, Dropdown, Input } from 'formik-semantic-ui-fixed-validation'
import { FormattedMessage, injectIntl } from 'react-intl'
import styled from 'styled-components'
import { Info } from 'react-feather'
import { companyTypeOptions, marketOptions } from '../../constants'
//Components
import {
  Rectangle,
  CustomDivContent,
  CustomDivInTitle,
  CustomDivTitle
} from '~/modules/cart/components/StyledComponents'
import { AddressForm } from '~/modules/address-form'
import { PhoneNumber } from '~/modules/phoneNumber'
import { Required } from '~/components/constants/layout'

const GridBusinessInfo = styled(Grid)`
  margin: 14px 16px !important;
`

const ColumnCustom = styled(Grid.Column)`
  .ui.input input,
  .phone-code,
  .phone-num {
    background: #fdfdfd !important;
  }
`

const DivLegalAddressTitle = styled.div`
  font-weight: bold;
`

const GridBusinessType = styled(Grid)`
  margin: 0px !important;
`

const GridRowBusinessType = styled(Grid.Row)`
  padding-bottom: 0px !important;
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

function BusinessInfo({ formikProps, intl: { formatMessage }, entityTypes, naicsCodes }) {
  return (
    <GridBusinessInfo className="business-info">
      <GridRow>
        <GridColumn>
          <DivRectangleBusinessType>
            <GridBusinessType>
              <GridRowBusinessType>
                <Grid.Column>
                  <Dropdown
                    options={entityTypes && entityTypes.data && entityTypes.data.length ? entityTypes.data : []}
                    fieldProps={{
                      'data-test': 'settings_velloci_registration_control_person_drpdwn'
                    }}
                    inputProps={{
                      placeholder: formatMessage({
                        id: 'velloci.businessInfo.kindBusiness.placeholder',
                        defaultMessage: 'Pick one'
                      }),
                      search: true,
                      selection: true,
                      loading: entityTypes && entityTypes.loading
                    }}
                    name='businessInfo.entityType'
                    label={
                      <>
                        {formatMessage({
                          id: 'velloci.businessInfo.kindBusiness',
                          defaultMessage: 'What kind of business are you opening this account for?'
                        })}
                        {<Required />}
                      </>
                    }
                  />
                </Grid.Column>
              </GridRowBusinessType>
              <GridRowBusinessType>
                <Grid.Column computer={8} tablet={8} mobile={16}>
                  <Input
                    name='businessInfo.legalBusinessName'
                    label={
                      <>
                        {formatMessage({
                          id: 'velloci.businessInfo.legalBusinessName',
                          defaultMessage: 'Legal Business Name'
                        })}
                        {<Required />}
                      </>
                    }
                    inputProps={{
                      placeholder: formatMessage({
                        id: 'velloci.businessInfo.legalBusinessName.placeholder',
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
                  <FormattedMessage id='velloci.businessInfo.tax' defaultMessage='Tax Identification Number' />
                  <Required />
                  <ButtonOrCustom widths={8}>
                    <Button
                      onClick={e => {
                        formikProps.setFieldValue('businessInfo.isEin', true)
                        formikProps.setFieldValue('businessInfo.isSsn', false)
                      }}
                      active={formikProps.values.businessInfo.isEin}
                      data-test='settings_velloci_registration_control_person_ein_btn'>
                      <FormattedMessage id='velloci.businessInfo.ein' defaultMessage='EIN' />
                    </Button>
                    <Button.Or text={formatMessage({ id: 'global.or', defaultMessage: 'or' })} />
                    <Button
                      onClick={e => {
                        formikProps.setFieldValue('businessInfo.isEin', false)
                        formikProps.setFieldValue('businessInfo.isSsn', true)
                      }}
                      active={formikProps.values.businessInfo.isSsn}
                      data-test='settings_velloci_registration_control_person_ssn_btn'>
                      <FormattedMessage id='velloci.businessInfo.ssn' defaultMessage='SSN' />
                    </Button>
                  </ButtonOrCustom>
                </Grid.Column>
              </GridRowBusinessType>
              <GridRowBusinessType columns={2}>
                <Grid.Column computer={8} tablet={8} mobile={16}>
                  <Input
                    name={formikProps.values.businessInfo.isEin ? 'businessInfo.ein' : 'businessInfo.ssn'}
                    inputProps={{
                      placeholder: formatMessage({
                        id: `velloci.businessInfo.${
                          formikProps.values.businessInfo.isEin ? 'ein' : 'ssn'
                        }.placeholder`,
                        defaultMessage: `Enter ${formikProps.values.businessInfo.isEin ? 'EIN' : 'SSN'}`
                      }),
                      type: 'text',
                      'data-test': `settings_velloci_registration_control_person_legal_${
                        formikProps.values.businessInfo.isEin ? 'ein' : 'ssn'
                      }_inpt`
                    }}
                  />
                </Grid.Column>
                <Grid.Column computer={5} tablet={5} mobile={16} textAlign='center' className="m-t-padding">
                  <SpanEstablishedLabel>
                    {formatMessage({
                      id: 'velloci.businessInfo.establishedUs',
                      defaultMessage: 'Established in the US?'
                    })}
                  </SpanEstablishedLabel>
                  <Checkbox
                    inputProps={{
                      toggle: true,
                      'data-test': 'settings_velloci_registration_control_person_legal_isEstablishedUs_chckbx'
                    }}
                    name='businessInfo.isEstablishedUs'
                  />
                </Grid.Column>
              </GridRowBusinessType>

              <GridRowBusinessType columns={2}>
                <Grid.Column computer={8} tablet={8} mobile={16}>
                  <Dropdown
                    options={naicsCodes.data}
                    fieldProps={{
                      'data-test': 'settings_velloci_registration_control_person_industry_type_drpdwn'
                    }}
                    inputProps={{
                      placeholder: formatMessage({
                        id: 'velloci.businessInfo.industryType.placeholder',
                        defaultMessage: 'Select industry type'
                      }),
                      search: true,
                      selection: true,
                      loading: naicsCodes?.loading,
                      disabled: naicsCodes?.loading
                    }}
                    name='businessInfo.naicsCode'
                    label={
                      <>
                        {formatMessage({
                          id: 'velloci.businessInfo.industryType',
                          defaultMessage: 'Your Industry Type'
                        })}
                        {<Required />}
                      </>
                    }
                  />
                </Grid.Column>
              </GridRowBusinessType>
            </GridBusinessType>
          </DivRectangleBusinessType>
        </GridColumn>
      </GridRow>
      <GridRow>
        <GridColumn>
          <Rectangle style={{ margin: '0px' }}>
            <CustomDivTitle>
              <Info size={20} style={{ color: '#2599d5' }} />
              <CustomDivInTitle style={{ color: '#2599d5' }}>
                <FormattedMessage id='velloci.businessInfo.infoTitle' defaultMessage='Why do you need this info?' />
              </CustomDivInTitle>
            </CustomDivTitle>
            <CustomDivContent style={{ color: '#848893', padding: '4px 30px' }}>
              <FormattedMessage
                id='velloci.businessInfo.infoContent'
                defaultMessage='In order to verify the business you are opening an account for, we need to collect this information. We never share this information.'
              />
            </CustomDivContent>
          </Rectangle>
        </GridColumn>
      </GridRow>
      <GridRow columns={2}>
        <ColumnCustom className="m-padding" computer={8} tablet={8} mobile={16}>
          <PhoneNumber
            name='businessInfo.phoneNumber'
            values={formikProps.values}
            label={
              <>
                <FormattedMessage id='velloci.businessInfo.phoneNumber' defaultMessage='Business Phone Number' />
                <Required />
              </>
            }
            setFieldValue={formikProps.setFieldValue}
            setFieldTouched={formikProps.setFieldTouched}
            errors={formikProps.errors}
            touched={formikProps.touched}
            isSubmitting={formikProps.isSubmitting}
            setErrors={formikProps.setErrors}
            placeholder={formatMessage({ id: 'global.phonePlaceholder', defaultMessage: '000 000 0000' })}
          />
        </ColumnCustom>
        <ColumnCustom className="m-t-padding" computer={8} tablet={8} mobile={16}>
          <Input
            name='businessInfo.email'
            label={
              <>
                {formatMessage({
                  id: 'velloci.businessInfo.emailAddress',
                  defaultMessage: 'Personal Phone Number'
                })}
                {<Required />}
              </>
            }
            inputProps={{
              placeholder: formatMessage({
                id: 'velloci.businessInfo.emailAddress.placeholder',
                defaultMessage: 'Enter your email address'
              }),
              type: 'text',
              'data-test': 'settings_velloci_registration_business_info_email_address_inpt'
            }}
          />
        </ColumnCustom>
      </GridRow>
      <GridRow>
        <ColumnCustom computer={8} laptop={8} mobile={16}>
          <Input
            name='businessInfo.url'
            label={formatMessage({
              id: 'velloci.businessInfo.url',
              defaultMessage: 'URL'
            })}
            inputProps={{
              placeholder: formatMessage({
                id: 'velloci.businessInfo.url.placeholder',
                defaultMessage: 'Enter your business URL'
              }),
              type: 'url',
              'data-test': 'settings_velloci_registration_business_info_url_inpt'
            }}
          />
        </ColumnCustom>
      </GridRow>
      <GridRow>
        <GridColumn>
          <DivLegalAddressTitle>
            <FormattedMessage id='velloci.businessInfo.legalAddress' defaultMessage='Business Address' />
          </DivLegalAddressTitle>

          <AddressForm
            prefix='businessInfo'
            values={formikProps.values}
            displayHeader={false}
            setFieldValue={formikProps.setFieldValue}
            required={true}
            additionalCountryInputProps={{ disabled: true }}
          />
        </GridColumn>
      </GridRow>
      <GridRow>
        <ColumnCustom>
          <Input
            name='businessInfo.dba'
            label={formatMessage({
              id: 'velloci.businessInfo.dbaName',
              defaultMessage: 'DBA Name (if applicable)'
            })}
            inputProps={{
              placeholder: formatMessage({
                id: 'velloci.businessInfo.dbaName.placeholder',
                defaultMessage: 'Business Name'
              }),
              type: 'text',
              'data-test': 'settings_velloci_registration_business_info_dba_name_inpt'
            }}
          />
          <Rectangle style={{ margin: '0px' }}>
            <CustomDivTitle>
              <Info size={20} style={{ color: '#2599d5' }} />
              <CustomDivInTitle style={{ color: '#2599d5' }}>
                <FormattedMessage id='velloci.businessInfo.meanTitle' defaultMessage='What does this mean?' />
              </CustomDivInTitle>
            </CustomDivTitle>
            <CustomDivContent style={{ color: '#848893', padding: '4px 30px' }}>
              <FormattedMessage
                id='velloci.businessInfo.meanContent'
                defaultMessage="Unless your business has a registered trade or fictitious business name with a government body, you don't need to worry about this step"
              />
            </CustomDivContent>
          </Rectangle>
        </ColumnCustom>
      </GridRow>
      <GridRow>
        <GridColumn>
          <Dropdown
              label={
                <>
                  <FormattedMessage id='company.companyType' defaultMessage='Company Type' />
                  <Required />
                </>
              }
              name='businessInfo.companyType'
              options={
                companyTypeOptions.map(option => ({
                  text: option.text,
                  value: option.value,
                  key: option.key
                }))
              }
              inputProps={{
                clearable: true,
                selection: true,
                search: true,
                placeholder: formatMessage({
                  id: 'company.selectIndustryType',
                  defaultMessage: 'Select Industry Type'
                }),
                'data-test': 'onboarding_business_info_company_type_drpdn'
              }}
            />
        </GridColumn>
      </GridRow>
      <GridRow>
        <GridColumn>
          <Dropdown
              label={
                <>
                  <FormattedMessage id='onboarding.markets' defaultMessage='Market(s)' />
                  <Required />
                </>
              }
              name='businessInfo.markets'
              options={
                marketOptions.map(option => ({
                  text: option.text,
                  value: option.value,
                  key: option.key
                }))
              }
              inputProps={{
                clearable: true,
                multiple: true,
                selection: true,
                search: true,
                placeholder: formatMessage({
                  id: 'company.selectIndustryType',
                  defaultMessage: 'Select Industry Type'
                }),
                'data-test': 'onboarding_business_info_markets_drpdn'
              }}
            />
        </GridColumn>
      </GridRow>
    </GridBusinessInfo>
  )
}

BusinessInfo.propTypes = {
  entityTypes: PropTypes.object,
  formikProps: PropTypes.object,
  naicsCodes: PropTypes.object
}

BusinessInfo.defaultProps = {
  entityType: {},
  formikProps: {},
  naicsCodes: {}
}

export default injectIntl(BusinessInfo)
