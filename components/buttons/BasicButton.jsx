import PropTypes from 'prop-types'
import { CustomButton } from './styles'
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
  noBorder: PropTypes.bool
}

BasicButton.defaultProps = {
  noBorder: false
}

export default BasicButton
