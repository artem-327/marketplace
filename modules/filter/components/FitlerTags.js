import React, { Component } from 'react'
import { func, array } from 'prop-types'

import { Icon, Popup, Grid, GridRow, GridColumn } from 'semantic-ui-react'
import { FormattedMessage } from 'react-intl'


import { FilterTag, PopupRow, WiderPopup } from '../constants/layout'


const TAGS_TO_DISPLAY = 3
const MAX_TAG_ENTITIES = 2

export default class FilterTags extends Component {

  tagMarkup = (filters) => {
    return filters.map((filter, i) => {
      let { valuesDescription } = filter
      if (valuesDescription instanceof Array) {
        if (valuesDescription.length > MAX_TAG_ENTITIES) {
          return (
            <WiderPopup position='bottom center' trigger={
              <FilterTag key={i} >
                <span>{filter.description}: ({valuesDescription.length})...
                  <Icon onClick={() => this.props.onClick(i)} name='delete' /></span>
              </FilterTag>
            }>
              <Grid verticalAlign='middle'>
                <PopupRow>
                  <GridColumn>
                    {valuesDescription.toString().replace(/,/g, ', ')}
                  </GridColumn>
                </PopupRow>
              </Grid>
            </WiderPopup>
          )
        }
      }

      else return (
        <FilterTag key={i}>
          <span>{filter.description}: {valuesDescription}
            <Icon onClick={() => this.props.onClick(i)} name='delete' /></span>
        </FilterTag>
      )
    })
  }

  render() {
    let { filters } = this.props
    if (filters.length === 0) return null
    let tagsToDisplay = []


    if (filters.length > TAGS_TO_DISPLAY) {
      tagsToDisplay = this.tagMarkup(filters.slice(0, TAGS_TO_DISPLAY))

      tagsToDisplay.push(
        <WiderPopup trigger={
          <FilterTag id='more' key={TAGS_TO_DISPLAY} >
            <span><FormattedMessage id='filterTags.andMore' values={{ count: filters.length - TAGS_TO_DISPLAY }} /></span>
          </FilterTag>
        }>
          <Grid verticalAlign='middle'>
            {filters.slice(TAGS_TO_DISPLAY).map((el) =>
              <PopupRow>
                <GridColumn computer={8}>
                  {el.description}:
                </GridColumn>
                <GridColumn computer={8}>
                  {el.valuesDescription.toString().replace(/,/g, ', ')}
                </GridColumn>
              </PopupRow>
            )}
          </Grid>
        </WiderPopup>
      )
    } else tagsToDisplay = this.tagMarkup(filters)

    return (
      <>
        {tagsToDisplay}
      </>
    )
  }
}

FilterTags.propTypes = {
  filter: array,
  onClick: func
}

FilterTags.defaultProps = {
  filters: [],
  onClick: () => { }
}