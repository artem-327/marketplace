import React from 'react'
import './threeDots.scss'
import PropTypes from 'prop-types'

const ThreeDots = props => {
  return (
    <div className='open-menu'>
      <span className={'threeDots ' + (props.className || '')} />
    </div>
  )
}

ThreeDots.propTypes = {
  className: PropTypes.string
}

export default ThreeDots
