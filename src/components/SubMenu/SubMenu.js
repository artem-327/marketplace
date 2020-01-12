import './submenu.scss'

import React, { Component } from 'react'
import { arrayOf, shape, string, bool, func } from 'prop-types'
import filterIconClose from '../../images/subMenu/filter-icon-transparent.png'
import filterIconOpen from '../../images/subMenu/filter-icon-transparent-active.png'
import classNames from 'classnames'

export default class SubMenu extends Component {
  toggleFilter = () => {
    this.props.toggleFilter(null, this.props.filterType)
    this.props.clearAutocompleteData()
  }

  renderFilterButton() {
    let filterIcon = this.props.filterOpen ? filterIconOpen : filterIconClose
    let filterClass = this.props.filterOpen ? 'opened' : 'closed'

    return (
      <div
        className={classNames('submenu-filter', filterClass)}
        onClick={() => this.toggleFilter()}
        data-test='SubMenu_filter_toggle'>
        <img src={filterIcon} className={filterClass} alt='open filter' />
        Filters
      </div>
    )
  }

  render() {
    return <div className='submenu'>{this.renderFilterButton()}</div>
  }
}

SubMenu.propTypes = {
  links: arrayOf(
    shape({
      label: string,
      url: string,
      class: string,
      exact: bool
    })
  ),
  search: bool,
  filter: bool,
  filterType: string,
  clearAutocompleteData: func
}

SubMenu.defaultProps = {
  filterType: null,
  clearAutocompleteData: () => {}
}
