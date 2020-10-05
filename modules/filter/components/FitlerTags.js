import React, { Component } from 'react'
import { func, array, shape, number, arrayOf, object } from 'prop-types'
import { connect } from 'react-redux'

import { Icon, Grid, GridColumn } from 'semantic-ui-react'
import { FormattedMessage } from 'react-intl'

import { FilterTag, PopupRow, WiderTooltip } from '../constants/layout'
import { groupFilters } from '../constants/filter'
import { string } from 'postcss-selector-parser'
import { getSafe } from '~/utils/functions'

const TAGS_TO_DISPLAY = 3
const MAX_TAG_ENTITIES = 2

class FilterTags extends Component {
  constructor(props) {
    super(props)
    this.myRef = React.createRef()
    this.state = {
      hasOverflowingChildren: false
    }
  }

  componentDidUpdate() {
    if (this.myRef && this.myRef.current && this.myRef.current.offsetHeight) {
      const hasOverflowingChildren =
        this.myRef.current.offsetHeight < this.myRef.current.scrollHeight ||
        this.myRef.current.offsetWidth < this.myRef.current.scrollWidth

      if (typeof hasOverflowingChildren === 'boolean' && hasOverflowingChildren !== this.state.hasOverflowingChildren) {
        this.setState({ hasOverflowingChildren })
      }
    }
  }

  removeFilter = filter => {
    let { datagrid, appliedFilter, filterType } = this.props

    if (datagrid.savedFilters[filterType] && datagrid.savedFilters[filterType].filters) {
      filter.indexes.forEach((index, i) => {
        datagrid.savedFilters[filterType].filters.splice(index - i, 1)
        appliedFilter.filters.splice(index - i, 1)
      })
      datagrid.setFilter({filters:
        datagrid.savedFilters[filterType].filters
      }, true, filterType)
    }
  }

  tagMarkup = filters => {
    return filters.map((filter, i) => {
      let { tagDescription, description } = filter
      if (
        (true || tagDescription instanceof Array && tagDescription.length > MAX_TAG_ENTITIES) ||
        (typeof tagDescription === 'string' && this.state.hasOverflowingChildren)
      ) {
        return (
          <WiderTooltip
            key={i}
            position='bottom center'
            trigger={
              <FilterTag>
                <div className='description'>
                  {filter && tagDescription && typeof tagDescription === 'string'
                    ? tagDescription.replace(/,/g, ', ')
                    : tagDescription}
                </div>
                <Icon onClick={() => this.removeFilter(filter)} name='delete' data-test='filter_tags_remove_filter' />
              </FilterTag>
            }>
            <Grid verticalAlign='middle'>
              <PopupRow>
                <GridColumn>{`${description}: ${tagDescription.toString().replace(/,/g, ', ')}`}</GridColumn>
              </PopupRow>
            </Grid>
          </WiderTooltip>
        )
      } else {
        return (
          <FilterTag key={i} ref={this.myRef}>
            <div className='description'>
              {filter && tagDescription && typeof tagDescription === 'string'
                ? tagDescription.replace(/,/g, ', ')
                : tagDescription}
            </div>
            <Icon onClick={() => this.removeFilter(filter)} name='delete' data-test='filter_tags_remove_filter' />
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
        <WiderTooltip
          key={TAGS_TO_DISPLAY}
          disabled={!!!filters[0].description}
          hoverable
          trigger={
            <FilterTag key={TAGS_TO_DISPLAY}>
              <span>
                <FormattedMessage id='filterTags.andMore' values={{ count: filters.length - TAGS_TO_DISPLAY }} />
              </span>
            </FilterTag>
          }>
          <Grid verticalAlign='middle'>
            {filters.slice(TAGS_TO_DISPLAY).map((el, i) => {
              if (el.description && el.valuesDescription)
                return (
                  <PopupRow key={i}>
                    <GridColumn computer={7}>{el.description}:</GridColumn>
                    <GridColumn computer={7}>{el.valuesDescription.toString().replace(/,/g, ', ')}</GridColumn>
                    <GridColumn computer={2}>
                      <Icon
                        onClick={() => this.removeFilter(el)}
                        name='delete'
                        style={{ cursor: 'pointer' }}
                        data-test='filter_tags_remove_filter'
                      />
                    </GridColumn>
                  </PopupRow>
                )
            })}
          </Grid>
        </WiderTooltip>
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

function mapStateToProps(store, props) {
  const { filterType } = props
  return {
    appliedFilter: filterType && store.filter[filterType] ? store.filter[filterType].appliedFilter : [],
    params: store.filter.params,
    filterType
  }
}

export default connect(mapStateToProps, null)(FilterTags)
