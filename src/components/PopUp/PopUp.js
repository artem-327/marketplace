import PropTypes from 'prop-types'
import React, {Component} from 'react'
import './popup.scss'
import classNames from 'classnames'

class PopUp extends Component {
  constructor(props) {
    super(props)
    this.isVisible = this.isVisible.bind(this)
    this.state = {
      isOpen: false,
      component: null
    }
  }

  componentWillMount() {
    this.isVisible(this.props.components)
  }

  componentWillReceiveProps(nextProps) {
    this.isVisible(nextProps.components)
  }

  isVisible(popups) {
    this.setState({
      isOpen: popups.length !== 0,
      component: popups[popups.length - 1]
    })
  }

  closePopup(event) {
    if (event.target === event.currentTarget) {
      this.props.removePopup()
    }
  }

  render() {
    let {isOpen, component} = this.state
    let specialClass =
      typeof component !== 'undefined' && typeof component.props.className !== 'undefined'
        ? component.props.className
        : null
    return isOpen ? (
      <div
        className={classNames('popup-wr', specialClass)}
        onClick={e => {
          this.closePopup(e)
        }}
        data-test='PopUp_close_popup'>
        <div className='popup'>{component}</div>
      </div>
    ) : null
  }
}

PopUp.propTypes = {
  components: PropTypes.arrayOf(PropTypes.node)
}

export default PopUp
