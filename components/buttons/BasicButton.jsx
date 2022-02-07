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
 * //testing em git
 */
const BasicButton = props => {
  const { className, noBorder, margin, type, disabled, onClick, ...rest } = props
  return (
    <CustomButton
      className={className}
      $noBorder={noBorder}
      $margin={margin}
      type={type}
      disabled={disabled}
      onClick={onClick}
      {...rest}
      data-test={props['data-test'] ? props['data-test'] : 'component-basicbutton'}
      >
      {props.children}
    </CustomButton>
  )
}

BasicButton.propTypes = {
  /**
   * No borders around the Button.
   */
  noBorder: PropTypes.bool,
  className: PropTypes.string,
  textcolor: PropTypes.string,
  background: PropTypes.string,
  floatright: PropTypes.string,
  children: PropTypes.any,
  margin: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func
}

BasicButton.defaultProps = {
  className: '',
  noBorder: false,
  children: null,
  textcolor: '#20273a !important',
  floatright: null,
  background: '#ffffff !important',
  margin: null,
  type: 'button',
  disabled: false,
  onClick: () => {}
}

export default BasicButton
