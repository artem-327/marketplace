import { useState } from 'react';
import { FormattedMessage } from 'react-intl'
import OnboardingRequirements from './OnboardingRequirements';
import TradePass from './TradePass';
import { ButtonPrimary, OnboardingModule } from './styles';
import { Grid } from 'semantic-ui-react'

const OnboardingContainer = ({ children }) => {
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);
    const buttonText = 'onboarding.get.verified';

    return (
        <OnboardingModule className="onboarding-container">
            {!show &&
                <>
                    <TradePass />
                    <OnboardingRequirements />
                    <Grid centered>
                        <ButtonPrimary onClick={handleClick}>
                            <FormattedMessage id={buttonText} />
                        </ButtonPrimary>
                    </Grid>
                </>
            }
            {show && children}
        </OnboardingModule>
    )
}

export default OnboardingContainer;
