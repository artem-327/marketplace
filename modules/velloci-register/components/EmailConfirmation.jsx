import { Modal } from 'semantic-ui-react';
import { Button } from 'formik-semantic-ui-fixed-validation';
import { ButtonPrimary, HeadingContainer, HVCenteredContentContainer, StyledModal } from './styles';
import { FormattedMessage } from 'react-intl';
import TradePassLogo from '~/assets/images/blue-pallet/trade-pass-logo-only.svg';

export const EmailConfirmation = ({ activeStep, nextStep, onClose }) => {
    const handleClick = () => {
        nextStep(activeStep + 2) // skip over registration of BOs and go directly to Marketing Materials
        onClose();
    }

    return (
        <StyledModal open centered={true} size='small'>
            <Modal.Content>
                <Button style={{ border: 'none', position: 'absolute', top: '0', right: '0' }} onClick={() => handleClick()}>X</Button>
                <HVCenteredContentContainer style={{ margin: '2rem 0 2rem 0' }}>
                    <img style={{ width: '4rem', height: '4rem' }} src={TradePassLogo} alt="TradePass Logo" />
                </HVCenteredContentContainer>
                <HVCenteredContentContainer style={{ marginBlockEnd: '2rem' }}>
                    <HeadingContainer style={{ fontSize: '1.5rem' }}><FormattedMessage id='onboarding.email.sent' /></HeadingContainer>
                </HVCenteredContentContainer>
                <HVCenteredContentContainer style={{ marginBlockEnd: '4rem' }}>
                    <FormattedMessage id='onboarding.emails.sent.beneficial.owners' />
                </HVCenteredContentContainer>
                <HVCenteredContentContainer>
                    <ButtonPrimary onClick={() => handleClick()}>
                        <FormattedMessage id='global.next' />
                    </ButtonPrimary>
                </HVCenteredContentContainer>
            </Modal.Content>
        </StyledModal>
    )
}
