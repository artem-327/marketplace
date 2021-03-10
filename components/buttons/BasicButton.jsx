import PropTypes from 'prop-types'
import { CustomButton } from './BasicButton.styles'
/**
 * Basic Button from Semantic UI React.
 * @component
 * @see {@link https://react.semantic-ui.com/elements/button/} Button - Semantic UI React
 * @example
 * return (<CustomButton noborder={true} >
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
  noborder: PropTypes.bool,
  textcolor: PropTypes.string,
  background: PropTypes.string,
  floatright: PropTypes.string,
  children: PropTypes.any
}

BasicButton.defaultProps = {
  noborder: false,
  children: null,
  textcolor: '#20273a !important',
  floatright: null,
  background: '#ffffff !important'
}

export default BasicButton
