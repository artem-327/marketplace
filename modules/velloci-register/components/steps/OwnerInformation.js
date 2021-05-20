import PropTypes from 'prop-types'
import { Grid, GridColumn, GridRow, LabelGroup } from 'semantic-ui-react'
import { Checkbox } from 'formik-semantic-ui-fixed-validation'
import { FormattedMessage, injectIntl } from 'react-intl'
import styled from 'styled-components'
import { Info } from 'react-feather'
import { HeadingContainer, LeftCenteredContentContainer, PaddedListItem, StyledTextContainer } from '../styles'
//Components
import {
  Rectangle,
  CustomDivContent,
  CustomDivInTitle,
  CustomDivTitle
} from '~/modules/cart/components/StyledComponents'

const GridOwnerInformation = styled(Grid)`
  margin: 14px 16px !important;
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

function OwnerInformation({ formikProps, intl: { formatMessage }, countBeneficialOwners, numberBeneficialOwners }) {
  return (
    <GridOwnerInformation>
      <GridRow>
        <GridColumn>
          <StyledTextContainer style={{ paddingBlockEnd: '.5rem' }}>
            <FormattedMessage id='onboarding.outline.beneficial.ownership' />
          </StyledTextContainer>
          <Rectangle style={{ margin: '0px' }}>
            <CustomDivContent style={{ display: 'flex', color: '#848893', padding: '0px' }}>
              <div>
                <Info size={20} style={{ color: '#2599d5' }} />
              </div>
              <CustomDivInTitle>
                <FormattedMessage
                  id='velloci.ownerInformation.infoContent'
                  defaultMessage='This information is required under the Bank Secrecy Act and is intended to assist the government and law enforcement in the ongoing fight against money laundering and the financing of terrorism.'
                />
              </CustomDivInTitle>
            </CustomDivContent>
          </Rectangle>
        </GridColumn>
      </GridRow>
      <GridRow>
        <GridColumn>
          <HeadingContainer>
            <FormattedMessage
              id='velloci.ownerInformation.otherBeneficialOwners'
              defaultMessage='OTHER BENEFICIAL OWNERS'
            />
          </HeadingContainer>
        </GridColumn>
      </GridRow>
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
          <label>
            <FormattedMessage
              id='velloci.ownerInformation.otherBeneficialOwner'
              defaultMessage='Are there any other Beneficial Owners?'
            />
          </label>
          <DivCheckboxes>
            <Checkbox
              label={formatMessage({
                id: 'global.yes',
                defaultMessage: 'Yes'
              })}
              inputProps={{
                onChange: () => {
                  formikProps.setFieldValue('ownerInformation.isOtherBeneficialOwner', true)
                  formikProps.setFieldValue('ownerInformation.isNotOtherBeneficialOwner', false)
                },
                'data-test': 'settings_velloci_registration_owner_information_isOtherBeneficialOwner_chckbx'
              }}
              name='ownerInformation.isOtherBeneficialOwner'
            />
            <Checkbox
              label={formatMessage({
                id: 'global.no',
                defaultMessage: 'No'
              })}
              inputProps={{
                onChange: () => {
                  const { values, setFieldValue } = formikProps
                  const newPersonalInformation = values.verifyPersonalInformation.slice(0, 1)
                  setFieldValue('verifyPersonalInformation', newPersonalInformation)
                  setFieldValue('ownerInformation.isOtherBeneficialOwner', false)
                  setFieldValue('ownerInformation.isNotOtherBeneficialOwner', true)
                  countBeneficialOwners(0)
                },
                'data-test': 'settings_velloci_registration_owner_information_isNotOtherBeneficialOwner_chckbx'
              }}
              name='ownerInformation.isNotOtherBeneficialOwner'
            />
          </DivCheckboxes>
        </GridColumn>
      </GridRow>
      <GridRow>
        <GridColumn>
          <HeadingContainer>
            <FormattedMessage
              id='velloci.ownerInformation.completeNow'
              defaultMessage='COMPLETE NOW OR EMAIL BENEFICIAL OWNERS'
            />
          </HeadingContainer>
        </GridColumn>
      </GridRow>
      <GridRow>
        <GridColumn>
          <label>
            <FormattedMessage
              id='velloci.ownerInformation.wouldComplete'
              defaultMessage='Would you like to complete this form for the remaining beneficial owners or email them a link to complete?'
            />
          </label>
          <label>
            <FormattedMessage id='velloci.ownerInformation.needInfo' defaultMessage="Here is the info you'll need:" />
          </label>
        </GridColumn>
      </GridRow>
      <GridRow>
        <GridColumn>
          <LeftCenteredContentContainer>
            <ul style={{ padding: 0 }}>
                <PaddedListItem><span><FormattedMessage id='onboarding.legal.name' /></span></PaddedListItem>
                <PaddedListItem><span><FormattedMessage id='onboarding.contact.information' /></span></PaddedListItem>
                <PaddedListItem><span><FormattedMessage id='onboarding.income.type' /></span></PaddedListItem>
                <PaddedListItem><span><FormattedMessage id='onboarding.occupation' /></span></PaddedListItem>
                <PaddedListItem><span><FormattedMessage id='onboarding.ssn' /></span></PaddedListItem>
                <PaddedListItem><span><FormattedMessage id='order.address' /></span></PaddedListItem>
            </ul>
          </LeftCenteredContentContainer>
        </GridColumn>
      </GridRow>

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
                defaultMessage='No problem. Please select email and we will send them the form to fill separately. You may continue the KYC process for yourself and complete registration.'
              />
            </CustomDivContent>
          </Rectangle>
        </GridColumn>
      </GridRow>
    </GridOwnerInformation>
  )
}

OwnerInformation.propTypes = {
  formikProps: PropTypes.object,
  countBeneficialOwners: PropTypes.func
}

OwnerInformation.defaultProps = {
  formikProps: {},
  countBeneficialOwners: () => {}
}

export default injectIntl(OwnerInformation)
