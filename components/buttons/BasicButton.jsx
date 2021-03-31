import PropTypes from 'prop-types'
import { CustomButton } from './BasicButton.styles'
/**
 * Basic Button from Semantic UI React.
 * @component
 * @see {@link https://react.semantic-ui.com/elements/button/} Button - Semantic UI React
 * @example
 * return (<CustomButton noBorder={true} >
 *   Cancel
 * </CustomButton>
 * )
 */
const BasicButton = props => {
  const { noBorder, margin, type, disabled, ...rest } = props
  return (
    <CustomButton $noBorder={noBorder} $margin={margin} type={type} disabled={disabled} {...rest}>
      {props.children}
    </CustomButton>
  )
}

BasicButton.propTypes = {
  /**
   * No borders around the Button.
   */
  noBorder: PropTypes.bool,
  textcolor: PropTypes.string,
  background: PropTypes.string,
  floatright: PropTypes.string,
  children: PropTypes.any,
  margin: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool
}

BasicButton.defaultProps = {
  noBorder: false,
  children: null,
  textcolor: '#20273a !important',
  floatright: null,
  background: '#ffffff !important',
  margin: null,
  type: 'button',
  disabled: false
}

export default BasicButton
