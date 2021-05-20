import { FormattedMessage } from 'react-intl'
import Logo from '../../../assets/images/nav/logo-bluepallet.svg'
import { TradePassLogo } from '../../../components/constants/layout'
import { OnboardingContainerDiv } from './styles'

const TradePass = () => (
    <OnboardingContainerDiv>
        <TradePassLogo src={Logo} />
        <FormattedMessage id='onboarding.what.is.tradepass' defaultMessage='' />
    </OnboardingContainerDiv>
);

export default TradePass;