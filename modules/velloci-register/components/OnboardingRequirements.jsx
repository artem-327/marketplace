import { FormattedMessage } from 'react-intl';
import { HVCenteredContentContainer, HorizontalRule, OnboardingContainerDiv, PaddedListItem, TimeHeading } from './styles';
import { Grid, GridColumn, GridRow} from 'semantic-ui-react'

const DividerRow = () => (
    <GridRow>
        <GridColumn>
            <HorizontalRule />
        </GridColumn>
    </GridRow>
)

const OnboardingRequirements = () => (
    <OnboardingContainerDiv>
        <h2><FormattedMessage id='onboarding.what.you.need' /></h2>
        <Grid columns='equal' padded stackable>
            <DividerRow />
            <GridRow>
                <GridColumn>
                    <h4><FormattedMessage id='onboarding.setup.indicator.business.verification' /></h4>
                    <p><FormattedMessage id='onboarding.business.verification.info' /></p>
                </GridColumn>
                <GridColumn>
                    <HVCenteredContentContainer>
                        <ul>
                            <PaddedListItem><span><FormattedMessage id='onboarding.w9' /></span></PaddedListItem>
                            <PaddedListItem><span><FormattedMessage id='onboarding.setup.indicator.business.information' /></span></PaddedListItem>
                            <PaddedListItem><span><FormattedMessage id='onboarding.entity.type' /></span></PaddedListItem>
                        </ul>
                    </HVCenteredContentContainer>
                </GridColumn>
                <GridColumn className="time-indicator">
                    <HVCenteredContentContainer>
                        <TimeHeading>7 <span><FormattedMessage id='onboarding.minutes' /></span></TimeHeading>
                    </HVCenteredContentContainer>
                </GridColumn>
            </GridRow>
            <DividerRow />
            <GridRow>
                <GridColumn>
                    <h4><FormattedMessage id='onboarding.setup.indicator.ownership.verification' /></h4>
                    <p><FormattedMessage id='onboarding.ownership.verification.info' /></p>
                </GridColumn>
                <GridColumn>
                    <HVCenteredContentContainer>
                        <ul>
                            <PaddedListItem><span><FormattedMessage id='velloci.personalInfo.businessRole' /></span></PaddedListItem>
                            <PaddedListItem><span><FormattedMessage id='onboarding.ssn' /></span></PaddedListItem>
                            <PaddedListItem><span><FormattedMessage id='velloci.personalInfo.homeAddress' /></span></PaddedListItem>
                        </ul>
                    </HVCenteredContentContainer>
                </GridColumn>
                <GridColumn className="time-indicator">
                    <HVCenteredContentContainer>
                        <TimeHeading>2 <span><FormattedMessage id='onboarding.minutes' /></span></TimeHeading>
                    </HVCenteredContentContainer>
                </GridColumn>
            </GridRow>
            <DividerRow />
            <GridRow>
                <GridColumn>
                    <h4><FormattedMessage id='onboarding.business.profile' /></h4>
                    <p><FormattedMessage id='onboarding.business.profile.info' /></p>
                </GridColumn>
                <GridColumn>
                    <HVCenteredContentContainer>
                        <ul>
                            <PaddedListItem><span><FormattedMessage id='onboarding.company.logo' /></span></PaddedListItem>
                            <PaddedListItem><span><FormattedMessage id='onboarding.setup.indicator.certificate.of.insurance' /></span></PaddedListItem>
                            <PaddedListItem><span><FormattedMessage id='onboarding.setup.indicator.risk.tolerance' /></span></PaddedListItem>
                        </ul>
                    </HVCenteredContentContainer>
                </GridColumn>
                <GridColumn className="time-indicator">
                    <HVCenteredContentContainer>
                        <TimeHeading>10 <span><FormattedMessage id='onboarding.minutes' /></span></TimeHeading>
                    </HVCenteredContentContainer>
                </GridColumn>
            </GridRow>
        </Grid>
    </OnboardingContainerDiv>
)

export default OnboardingRequirements;
