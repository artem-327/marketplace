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

const DivCheckboxes = styled.div`
  display: flex;
  padding: 10px 0px;
`

const RectangleWarning = styled(Rectangle)`
  border: solid 1px #3bbef6;
`

const StyledDiv = styled.div`
  border-radius: 4px;
  border: solid 1px #dee2e6;
  overflow: inherit !important;
  padding: 1rem;
`
function OwnerInformation({ formikProps, intl: { formatMessage }, countBeneficialOwners, numberBeneficialOwners }) {
  return (
    <GridOwnerInformation className="owner-information">
      <GridRow>
        <GridColumn>
          <StyledDiv>
            <Grid>
              <GridRow columns={2}>
                <GridColumn computer={10} tablet={10} mobile={16}>
                    <StyledTextContainer style={{ paddingBlockEnd: '.5rem' }}>
                      <FormattedMessage id='onboarding.outline.beneficial.ownership' />
                    </StyledTextContainer>
                    <CustomDivContent style={{ color: '#848893', padding: '0px' }}>
                      <p><FormattedMessage id='velloci.ownerInformation.additionalContent' /></p>
                      <p><FormattedMessage id='velloci.ownerInformation.infoContent' /></p>
                    </CustomDivContent>
                </GridColumn>
                <GridColumn className="m-t-padding" computer={6} tablet={6} mobile={16}>
                  <RectangleWarning style={{ margin: '0px' }}>
                    <CustomDivTitle>
                      <Info size={20} style={{ color: '#3bbef6', transform: 'rotate(180deg)' }} />
                      <CustomDivInTitle style={{ color: '#3bbef6' }}>
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
            </Grid>
          </StyledDiv>
        </GridColumn>
      </GridRow>
      <GridRow>
        <GridColumn>
          <HeadingContainer>
            <FormattedMessage id='velloci.ownerInformation.otherBeneficialOwners' />
          </HeadingContainer>
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
      <GridRow className="t-no-padding">
        <GridColumn>
          <HeadingContainer>
            <FormattedMessage
              id='velloci.ownerInformation.completeNow'
              defaultMessage='COMPLETE NOW OR EMAIL BENEFICIAL OWNERS'
            />
          </HeadingContainer>
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
      <GridRow className="no-padding">
        <GridColumn>
          <LeftCenteredContentContainer>
            <ul style={{ padding: 0 }}>
                <PaddedListItem><span><FormattedMessage id='onboarding.legal.name' /></span></PaddedListItem>
                <PaddedListItem><span><FormattedMessage id='onboarding.contact.information' /></span></PaddedListItem>
                <PaddedListItem><span><FormattedMessage id='onboarding.occupation' /></span></PaddedListItem>
                <PaddedListItem><span><FormattedMessage id='onboarding.ssn' /></span></PaddedListItem>
                <PaddedListItem><span><FormattedMessage id='order.address' /></span></PaddedListItem>
            </ul>
          </LeftCenteredContentContainer>
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
