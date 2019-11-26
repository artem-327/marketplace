import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './ThreeDotsMenu.scss'
import { FormattedMessage } from 'react-intl'
class ThreeDotsMenu extends Component {
  renderLinks() {
    if (!this.props.links) return
    let links = this.props.links.map((link, index) => {
      return (
        <li
          key={index}
          onClick={e => link.action(this.props.id, this.props.callback, e)}
          data-test={`ThreeDotsMenu_index_${index}_action`}>
          <FormattedMessage id={'dataTable.' + link.label} defaultMessage={link.label} />
        </li>
      )
    })
    return <span className='submenu-links'>{links}</span>
  }
  render() {
    console.log('links', this.props.links)
    return this.props.isOpen ? <ul className='three-dots-menu'>{this.renderLinks()}</ul> : null
  }
}

ThreeDotsMenu.propTypes = {
  isOpen: PropTypes.bool,
  links: PropTypes.array,
  id: PropTypes.any,
  callback: PropTypes.func
}

export default ThreeDotsMenu
