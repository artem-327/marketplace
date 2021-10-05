import { FormattedMessage } from 'react-intl'
import Logo from '../../../assets/images/blue-pallet/tradepass.svg'
import { TradePassLogo } from '../../../components/constants/layout'
import { OnboardingContainerDiv } from './styles'

const TradePass = () => (
    <OnboardingContainerDiv>
        <TradePassLogo src={Logo} />
        <FormattedMessage id='onboarding.what.is.tradepass' />
    </OnboardingContainerDiv>
);

export default TradePass;