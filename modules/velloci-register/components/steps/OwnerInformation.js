import React from 'react'
import PropTypes from 'prop-types'
import { Grid, GridColumn, GridRow } from 'semantic-ui-react'
import { Input, Checkbox } from 'formik-semantic-ui-fixed-validation'
import { FormattedMessage, injectIntl } from 'react-intl'
import styled from 'styled-components'
import { Info, UploadCloud } from 'react-feather'

import {
  Rectangle,
  CustomDivContent,
  CustomDivInTitle,
  CustomDivTitle
} from '~/modules/cart/components/StyledComponents'
import UploadAttachment from '~/modules/inventory/components/upload/UploadAttachment'

const GridOwnerInformation = styled(Grid)`
  margin: 14px 16px !important;
`

const DivLegalAddressTitle = styled.div`
  padding-bottom: 6px;
`

const StyledUploadIcon = styled(UploadCloud)`
  width: 48px;
  height: 40px;
  object-fit: contain;
  color: #dee2e6;
`

const CustomDiv = styled.div`
  padding: 1em;
`

const CustomA = styled.a`
  font-weight: bold;
  color: #2599d5;
`

const GridRowTitle = styled.div`
  background-color: #f8f9fb;
  color: #848893;
  font-size: 14px;
  padding: 16px 30px !important;
  margin-left: -16px;
  margin-right: -16px;
  width: 756px;
  font-weight: 500;
`

const DivCheckboxes = styled.div`
  display: flex;
  padding: 10px 0px;
  .field {
    padding-right: 20px !important;
  }
  label {
    color: #848893 !important;
  }
`

const RectangleWarning = styled(Rectangle)`
  border: solid 1px #ff9d42;
`

const DivCategories = styled.div`
  border-left: solid 2px #2599d5;
  width: 110px;
  padding-left: 6px;
  color: #848893;
`

const GridColumnCategories = styled(GridColumn)`
  display: flex !important;
`

const GridRowCategories = styled(GridRow)`
  padding-top: 0px !important;
`

function OwnerInformation({ formikProps, intl: { formatMessage } }) {
  return (
    <GridOwnerInformation>
      <GridRow>
        <GridColumn>
          <Rectangle style={{ margin: '0px' }}>
            <CustomDivTitle>
              <Info size={20} style={{ color: '#2599d5' }} />
              <CustomDivInTitle>
                <FormattedMessage
                  id='velloci.ownerInformation.requiredTitle'
                  defaultMessage='Required information under the Bank Secrecy Act'
                />
              </CustomDivInTitle>
            </CustomDivTitle>
            <CustomDivContent style={{ color: '#848893', padding: '4px 30px' }}>
              <FormattedMessage
                id='velloci.ownerInformation.infoContent'
                defaultMessage='This information is required under the Bank Secrecy Act and is intended to assist the government and law enforcement int the ongoing fight against money laundering and the financing of terrorism.'
              />
            </CustomDivContent>
          </Rectangle>
        </GridColumn>
      </GridRow>

      <GridRowTitle>
        <GridColumn>
          <FormattedMessage id='velloci.ownerInformation.controlPerson' defaultMessage='CONTROL PERSON' />
        </GridColumn>
      </GridRowTitle>
      <GridRow>
        <GridColumn>
          <lable>
            <FormattedMessage
              id='velloci.ownerInformation.beneficialOwner'
              defaultMessage='Are you the beneficial owner?'
            />
          </lable>
          <DivCheckboxes>
            <Checkbox
              label={formatMessage({
                id: 'global.yes',
                defaultMessage: 'Yes'
              })}
              inputProps={{
                onChange: () => {
                  formikProps.setFieldValue('isBeneficialOwner', true)
                  formikProps.setFieldValue('isNotBeneficialOwner', false)
                },
                radio: true,
                'data-test': 'settings_velloci_registration_owner_information_isBeneficialOwner_chckbx'
              }}
              name='isBeneficialOwner'
            />
            <Checkbox
              label={formatMessage({
                id: 'global.no',
                defaultMessage: 'No'
              })}
              inputProps={{
                onChange: () => {
                  formikProps.setFieldValue('isBeneficialOwner', false)
                  formikProps.setFieldValue('isNotBeneficialOwner', true)
                },
                radio: true,
                'data-test': 'settings_velloci_registration_owner_information_isNotBeneficialOwner_chckbx'
              }}
              name='isNotBeneficialOwner'
            />
          </DivCheckboxes>
        </GridColumn>
      </GridRow>
      <GridRowTitle>
        <GridColumn>
          <FormattedMessage
            id='velloci.ownerInformation.otherBeneficialOwners'
            defaultMessage='OTHER BENEFICIAL OWNERS'
          />
        </GridColumn>
      </GridRowTitle>
      <GridRow>
        <GridColumn>
          <RectangleWarning style={{ margin: '0px' }}>
            <CustomDivTitle>
              <Info size={20} style={{ color: '#ff9d42', transform: 'rotate(180deg)' }} />
              <CustomDivInTitle>
                <FormattedMessage
                  id='velloci.ownerInformation.noOne25Title'
                  defaultMessage='What if no one owns greater than 25%?'
                />
              </CustomDivInTitle>
            </CustomDivTitle>
            <CustomDivContent style={{ color: '#848893', padding: '4px 30px' }}>
              <FormattedMessage
                id='velloci.ownerInformation.noOne25Content'
                defaultMessage='In that case, there may not be a beneficial owner listed.'
              />
            </CustomDivContent>
          </RectangleWarning>
        </GridColumn>
      </GridRow>
      <GridRow>
        <GridColumn>
          <lable>
            <FormattedMessage
              id='velloci.ownerInformation.otherBeneficialOwner'
              defaultMessage='Are there any other beneficial owner?'
            />
          </lable>
          <DivCheckboxes>
            <Checkbox
              label={formatMessage({
                id: 'global.yes',
                defaultMessage: 'Yes'
              })}
              inputProps={{
                onChange: () => {
                  formikProps.setFieldValue('isOtherBeneficialOwner', true)
                  formikProps.setFieldValue('isNotOtherBeneficialOwner', false)
                },
                radio: true,
                'data-test': 'settings_velloci_registration_owner_information_isOtherBeneficialOwner_chckbx'
              }}
              name='isOtherBeneficialOwner'
            />
            <Checkbox
              label={formatMessage({
                id: 'global.no',
                defaultMessage: 'No'
              })}
              inputProps={{
                onChange: () => {
                  formikProps.setFieldValue('isOtherBeneficialOwner', false)
                  formikProps.setFieldValue('isNotOtherBeneficialOwner', true)
                },
                radio: true,
                'data-test': 'settings_velloci_registration_owner_information_isNotOtherBeneficialOwner_chckbx'
              }}
              name='isNotOtherBeneficialOwner'
            />
          </DivCheckboxes>
        </GridColumn>
      </GridRow>
      <GridRowTitle>
        <GridColumn>
          <FormattedMessage
            id='velloci.ownerInformation.completeNow'
            defaultMessage='COMPLETE NOW OR EMAIL BENEFICIAL OWNERS'
          />
        </GridColumn>
      </GridRowTitle>
      <GridRow>
        <GridColumn>
          <lable>
            <FormattedMessage
              id='velloci.ownerInformation.wouldComplete'
              defaultMessage='Would you like to complete this form for the remaining beneficial owners or email them a link to complete?'
            />
          </lable>
          <lable>
            <FormattedMessage id='velloci.ownerInformation.needInfo' defaultMessage="Here is the info you'll need:" />
          </lable>
        </GridColumn>
      </GridRow>

      <GridRow style={{ display: 'flex !important' }}>
        <GridColumnCategories>
          <DivCategories>
            <FormattedMessage id='velloci.ownerInformation.legalName' defaultMessage='Legal Name' />
          </DivCategories>

          <DivCategories>
            <FormattedMessage id='velloci.ownerInformation.incomeType' defaultMessage='Income Type' />
          </DivCategories>

          <DivCategories>
            <FormattedMessage id='velloci.ownerInformation.ssn' defaultMessage='SSN' />
          </DivCategories>
        </GridColumnCategories>
      </GridRow>
      <GridRowCategories style={{ display: 'flex !important' }}>
        <GridColumnCategories>
          <DivCategories>
            <FormattedMessage id='velloci.ownerInformation.contactInfo' defaultMessage='Contact Info' />
          </DivCategories>

          <DivCategories>
            <FormattedMessage id='velloci.ownerInformation.occupation' defaultMessage='Occupation' />
          </DivCategories>

          <DivCategories>
            <FormattedMessage id='velloci.ownerInformation.address' defaultMessage='Address' />
          </DivCategories>
        </GridColumnCategories>
      </GridRowCategories>

      <GridRow>
        <GridColumn>
          <Rectangle style={{ margin: '0px' }}>
            <CustomDivTitle>
              <Info size={20} style={{ color: '#2599d5' }} />
              <CustomDivInTitle>
                <FormattedMessage
                  id='velloci.ownerInformation.obtainInfoTitle'
                  defaultMessage="Can't Obtain this Information"
                />
              </CustomDivInTitle>
            </CustomDivTitle>
            <CustomDivContent style={{ color: '#848893', padding: '4px 30px' }}>
              <FormattedMessage
                id='velloci.ownerInformation.obtainInfoContent'
                defaultMessage='No problem. Please select email and we will send them a link to complete the process.'
              />
            </CustomDivContent>
          </Rectangle>
        </GridColumn>
      </GridRow>
    </GridOwnerInformation>
  )
}

OwnerInformation.propTypes = {
  formikProps: PropTypes.object
}

export default injectIntl(OwnerInformation)
