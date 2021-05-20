import PropTypes from 'prop-types'
// @ts-ignore
import { FormattedMessage } from 'react-intl'
import classNames from 'classnames';
//Components
import { setupIndicatorSteps } from '../constants'
//Styles
import { Rectangle, Title, HorizontalRule, HVCenteredContentContainer, StepIncomplete, StepComplete, StepCurrent, Icons, IconRow } from './styles'
import TradePassLogo from '~/assets/images/blue-pallet/trade-pass-logo-only.svg';

const SetupIndicator = ({ activeStep }) => {
  if (!setupIndicatorSteps.length) {
    return null
  }

  return (
    <Rectangle>
      <Icons>
        {setupIndicatorSteps.map((val, i) => {
          const { text, type } = val;

          switch (type) {
            case 'heading':
              return (
                <Title>
                  <FormattedMessage id={text} defaultMessage='Title' />
                </Title>
              )
            case 'step':
              const { step } = val;
              const hidden = val?.hidden
              const tail = classNames({ 'tail': val?.tail });

              if (hidden) {
                return <></>
              }

              return (
                <>
                {step === activeStep &&
                  <IconRow key={`setup-indicator-${i}`}>
                    <StepCurrent className={tail} key={i} />
                    <span><FormattedMessage id={text} defaultMessage={text} /></span>
                  </IconRow>
                }
                {step > activeStep &&
                  <IconRow key={`setup-indicator-${i}`}>
                    <StepIncomplete className={tail} key={i} />
                    <span><FormattedMessage id={text} defaultMessage={text} /></span>
                  </IconRow>
                }
                {step < activeStep &&
                  <IconRow key={`setup-indicator-${i}`}>
                    <StepComplete className={tail} key={i} />
                    <span><FormattedMessage id={text} defaultMessage={text} /></span>
                  </IconRow>
                }
                {tail && <div style={{ padding: '.5rem 0' }}><HorizontalRule /></div>}
                </>
              )
          }
        })}
        <HVCenteredContentContainer><img style={{ padding: '1rem' }} src={TradePassLogo} alt="TradePass Logo" /></HVCenteredContentContainer>
      </Icons>
    </Rectangle>
  )
}

SetupIndicator.propTypes = {
  activeStep: PropTypes.number
}

SetupIndicator.defaultProps = {
  activeStep: 0
}

export default SetupIndicator
