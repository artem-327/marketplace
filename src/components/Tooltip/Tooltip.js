import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './tooltip.scss'
import classnames from 'classnames'
import {FormattedMessage} from 'react-intl'

class Tooltip extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isVisible: false
    }
  }

  showTip(type) {
    this.setState({isVisible: type})
  }

  render() {
    return (
      <div className={'tooltip-component ' + this.props.className}>
        <span className='tooltip-icon' onMouseEnter={() => this.showTip(true)} onMouseLeave={() => this.showTip(false)}>
          i
        </span>
        <label className={classnames({show: this.state.isVisible})}>
          <FormattedMessage
            id='addInventory.infoLabel'
            defaultMessage={
              'By clicking Save Mapping; CAS Name, CAS Number, Product Name and Product Number will be mapped' +
              ' in our system. Next time you enter this product these fields will be pre-populated for you.'
            }
          />
          {this.props.content}
        </label>
      </div>
    )
  }
}

Tooltip.propTypes = {
  content: PropTypes.string,
  className: PropTypes.string
}

export default Tooltip
