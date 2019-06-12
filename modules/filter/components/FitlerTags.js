import React, { Component } from 'react'
import { object, func } from 'prop-types'

import { FilterTag } from '../constants/layout'
import { Icon } from 'semantic-ui-react'

export default class FilterTags extends Component {
  render() {
    try {
      var { filters } = this.props.filter
    } catch (_) {
      return null
    }

    if (filters.length === 0) return null

    return (
      <>
        {filters.map((el, i) =>
          <FilterTag key={i} onClick={() => this.props.onClick(i)}>
            <span>{el.description}: {el.valuesDescription.toString().replace(/,/g, ', ')}<Icon name='delete' /></span>
          </FilterTag>
        )}
      </>
    )
  }
}

FilterTags.propTypes = {
  filter: object,
  onClick: func
}

FilterTags.defaultProps = {
  filter: {
    filters: []
  },
  onClick: () => { }
}