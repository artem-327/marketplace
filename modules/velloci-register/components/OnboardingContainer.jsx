import { useState } from 'react';
import { FormattedMessage } from 'react-intl'
import Layout from 'components/Layout'
import OnboardingRequirements from './OnboardingRequirements';
import TradePass from './TradePass';
import { ButtonPrimary, OnboardingModule } from './styles';
import { Grid } from 'semantic-ui-react'

const OnboardingContainer = ({ children }) => {
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);
    const buttonText = 'onboarding.get.verified';

    return (
        <>
            <OnboardingModule>
                {!show &&
                    <>
                        <TradePass />
                        <OnboardingRequirements />
                        <Grid centered>
                            <ButtonPrimary onClick={handleClick}>
                                <FormattedMessage id={buttonText} defaultMessage='' />
                            </ButtonPrimary>
                        </Grid>
                    </>
                }
            </OnboardingModule>
            {show && <Layout title='Account Setup' currentModule='registration'>{children}</Layout>}
        </>
    )
}

export default OnboardingContainer;
