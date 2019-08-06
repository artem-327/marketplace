import './submenu.scss'

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import filterIconClose from '../../images/subMenu/filter-icon-transparent.png'
import filterIconOpen from '../../images/subMenu/filter-icon-transparent-active.png'
import classNames from 'classnames'


export default class SubMenu extends Component {

  toggleFilter = () => {
    this.props.toggleFilter(!this.props.filterOpen)
  }

  renderFilterButton() {
    let filterIcon = this.props.filterOpen ? filterIconOpen : filterIconClose
    let filterClass = this.props.filterOpen ? 'opened' : 'closed'

    return (
      <div className={classNames('submenu-filter', filterClass)} onClick={() => this.toggleFilter()} data-test='SubMenu_filter_toggle'>
        <img src={filterIcon} className={filterClass} alt='open filter' />Filters
      </div>
    )
  }

  render() {
    return (
      <div className='submenu'>
        {this.renderFilterButton()}
      </div>
    )
  }
}

SubMenu.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      url: PropTypes.string,
      class: PropTypes.string,
      exact: PropTypes.bool,
    })
  ),
  search: PropTypes.bool,
  filter: PropTypes.bool
}

