import { Modal as SemanticModal } from 'semantic-ui-react';
import { Button } from 'formik-semantic-ui-fixed-validation';
import { ButtonPrimary, HeadingContainer, HVCenteredContentContainer, StyledModal } from './styles';
import { FormattedMessage } from 'react-intl';
import TradePassLogo from '~/assets/images/blue-pallet/trade-pass-logo-only.svg';

export const Modal = props => {
    const { buttonText, children, handleClick, title } = props
    const subTitle = props?.subTitle

    return (
        <StyledModal open centered={true} size='small'>
            <SemanticModal.Content>
                <Button style={{ border: 'none', position: 'absolute', top: '0', right: '0' }} onClick={() => handleClick()}>X</Button>
                <HVCenteredContentContainer style={{ margin: '2rem 0 2rem 0' }}>
                    <img style={{ width: '4rem', height: '4rem' }} src={TradePassLogo} alt="TradePass Logo" />
                </HVCenteredContentContainer>
                {title &&
                    <HVCenteredContentContainer
                        data-test="modal-title"
                        style={{ marginBlockEnd: '.5rem' }}
                    >
                        <HeadingContainer style={{ fontSize: '1.5rem' }}>
                            <FormattedMessage id={title} />
                        </HeadingContainer>
                    </HVCenteredContentContainer>
                }
                {subTitle &&
                    <HVCenteredContentContainer style={{ marginBlockEnd: '2rem' }}>
                        <HeadingContainer style={{ color: '#989898', fontSize: '1.15rem', fontWeight: 'lighter' }}>
                            <FormattedMessage id={subTitle} />
                        </HeadingContainer>
                    </HVCenteredContentContainer>
                }
                {children}
                <HVCenteredContentContainer>
                    <ButtonPrimary data-test="modal-button" onClick={() => handleClick()}>
                        <FormattedMessage id={buttonText} />
                    </ButtonPrimary>
                </HVCenteredContentContainer>
            </SemanticModal.Content>
        </StyledModal>
    )
}
