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
  return <CustomButton {...props}>{props.children}</CustomButton>
}

BasicButton.propTypes = {
  /**
   * No borders around the Button.
   */
  noBorder: PropTypes.bool,
  textColor: PropTypes.string,
  background: PropTypes.string,
  floatRight: PropTypes.string,
  children: PropTypes.any
}

BasicButton.defaultProps = {
  noBorder: false,
  children: null,
  textColor: '#20273a !important',
  floatRight: null,
  background: '#ffffff !important'
}

export default BasicButton
