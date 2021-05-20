import PropTypes from 'prop-types'
// @ts-ignore
import { FormattedMessage } from 'react-intl'
import classNames from 'classnames';
//Components
import { setupIndicatorSteps } from '../constants'
//Styles
import { Rectangle, Title, HorizontalRule, HVCenteredContentContainer, StepIncomplete, StepComplete, StepCurrent, Icons, IconRow } from './styles'
import TradePassLogo from '../../../assets/images/blue-pallet/trade-pass-logo-only.svg';

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
              const decorative = classNames({ 'tail': val?.end });

              return (
                <>
                {step === activeStep &&
                  <IconRow key={`setup-indicator-${i}`}>
                    <StepCurrent className={decorative} key={i} />
                    <span><FormattedMessage id={text} defaultMessage={text} /></span>
                  </IconRow>
                }
                {step > activeStep &&
                  <IconRow key={`setup-indicator-${i}`}>
                    <StepIncomplete className={decorative} key={i} />
                    <span><FormattedMessage id={text} defaultMessage={text} /></span>
                  </IconRow>
                }
                {step < activeStep &&
                  <IconRow key={`setup-indicator-${i}`}>
                    <StepComplete className={decorative} key={i} />
                    <span><FormattedMessage id={text} defaultMessage={text} /></span>
                  </IconRow>
                }
                </>
              )
          }
        })}
        <HorizontalRule />
        <HVCenteredContentContainer><img src={TradePassLogo} /></HVCenteredContentContainer>
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
