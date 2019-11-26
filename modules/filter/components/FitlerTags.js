import React, { Component } from 'react'
import { func, array, shape, number, arrayOf, object } from 'prop-types'
import { connect } from 'react-redux'

import { Icon, Grid, GridColumn } from 'semantic-ui-react'
import { FormattedMessage } from 'react-intl'

import { FilterTag, PopupRow, WiderPopup } from '../constants/layout'
import { groupFilters } from '../constants/filter'
import { string } from 'postcss-selector-parser'

const TAGS_TO_DISPLAY = 3
const MAX_TAG_ENTITIES = 2

class FilterTags extends Component {
  removeFilter = filter => {
    let { datagrid, appliedFilter } = this.props

    filter.indexes.forEach((index, i) => {
      datagrid.filters.splice(index - i, 1)
      appliedFilter.filters.splice(index - i, 1)
    })

    datagrid.setFilter(datagrid.filters)
  }

  tagMarkup = filters => {
    return filters.map((filter, i) => {
      let { tagDescription } = filter

      if (tagDescription instanceof Array && tagDescription.length > MAX_TAG_ENTITIES) {
        return (
          <WiderPopup
            position='bottom center'
            trigger={
              <FilterTag key={i}>
                <span>
                  {' '}
                  {filter.description} ({tagDescription.length})...
                  <Icon onClick={() => this.removeFilter(filter)} name='delete' data-test='filter_tags_remove_filter' />
                </span>
              </FilterTag>
            }>
            <Grid verticalAlign='middle'>
              <PopupRow>
                <GridColumn>{tagDescription.toString().replace(/,/g, ', ')}</GridColumn>
              </PopupRow>
            </Grid>
          </WiderPopup>
        )
        // {tagDescription.toString().replace(/,/g, ', ')}
      } else {
        return (
          <FilterTag key={i}>
            <span>
              {tagDescription}
              <Icon onClick={() => this.removeFilter(filter)} name='delete' data-test='filter_tags_remove_filter' />
            </span>
          </FilterTag>
        )
      }
    })
  }

  render() {
    let { appliedFilter } = this.props

    if (!appliedFilter.filters || appliedFilter.filters.length === 0) return null
    let filters = groupFilters(appliedFilter.filters, this.props.params)

    if (!filters || filters.length === 0) return null
    let tagsToDisplay = []

    if (filters instanceof Array && filters.length > TAGS_TO_DISPLAY) {
      tagsToDisplay = this.tagMarkup(filters.slice(0, TAGS_TO_DISPLAY))

      tagsToDisplay.push(
        <WiderPopup
          disabled={!!!filters[0].description}
          trigger={
            <FilterTag key={TAGS_TO_DISPLAY}>
              <span>
                <FormattedMessage id='filterTags.andMore' values={{ count: filters.length - TAGS_TO_DISPLAY }} />
              </span>
            </FilterTag>
          }>
          <Grid verticalAlign='middle'>
            {filters.slice(TAGS_TO_DISPLAY).map(el => {
              if (el.description && el.valuesDescription)
                return (
                  <PopupRow>
                    <GridColumn computer={8}>{el.description}:</GridColumn>
                    <GridColumn computer={8}>{el.valuesDescription.toString().replace(/,/g, ', ')}</GridColumn>
                  </PopupRow>
                )
            })}
          </Grid>
        </WiderPopup>
      )
    } else tagsToDisplay = this.tagMarkup(filters)

    return <>{tagsToDisplay}</>
  }
}

FilterTags.propTypes = {
  filter: array,
  onClick: func,
  filters: arrayOf(
    shape({
      description: string,
      indexes: arrayOf(number),
      tagDescription: arrayOf(string),
      valuesDescription: arrayOf(string)
    })
  ),
  datagrid: object.isRequired
}

FilterTags.defaultProps = {
  filters: []
}

function mapStateToProps(store) {
  return {
    appliedFilter: store.filter.filter.appliedFilter,
    params: store.filter.filter.params
  }
}

export default connect(mapStateToProps, null)(FilterTags)
