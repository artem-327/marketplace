import React from 'react'
import PropTypes from 'prop-types'
import { CustomButton } from './styles'

const BasicButton = props => {
  return <CustomButton {...props}>{props.children}</CustomButton>
}

BasicButton.propTypes = {
  props: {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
    noBorder: PropTypes.bool
  }
}

BasicButton.defaultProps = {
  props: {
    children: '',
    noBorder: false
  }
}

export default BasicButton
