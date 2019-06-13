import React, { Component } from 'react'
import { func, array, bool } from 'prop-types'
import { Accordion, Segment, Grid, GridRow, GridColumn, Icon } from 'semantic-ui-react'

import { SavedFilterItem, SavedFilterTitle, SavedFiltersSegment } from '../constants/layout'

export default class SavedFilters extends Component {
  state = {
    accordion: {}
  }
  componentDidMount() {
    this.props.getSavedFilters()
  }

  toggleAccordion = (id) => {
    let { accordion } = this.state
    let active = !!accordion[id]
    this.setState({ accordion: { ...this.state.accordion, [id]: !active } })
  }

  getTitle = (name, id) => {
    
    return (
      <SavedFilterTitle onClick={() => this.toggleAccordion(id)}>
        <Grid>
          <GridRow>
            <GridColumn computer={10}>
              {name}
            </GridColumn>
            <GridColumn computer={2}>
              <Icon className='thick' name={!!this.state.accordion[id] ? 'bell' : 'bell outline'} color={!!this.state.accordion[id] ? 'yellow' : 'black'} />
            </GridColumn>
            <GridColumn computer={2}>
              <Icon name='add square' />
            </GridColumn>
            <GridColumn computer={2}>
              <Icon name='add square' />
            </GridColumn>
          </GridRow>
        </Grid>
      </ SavedFilterTitle>
    )
  }

  render() {
    console.log(this.props)
    return (
      <SavedFiltersSegment basic>
        <Accordion>
          {this.props.savedFilters.map((filter) => (
            <SavedFilterItem>
              {this.getTitle(filter.name, filter.id)}
            </SavedFilterItem>
          ))}
        </Accordion>
      </SavedFiltersSegment>
    )
  }
}

SavedFilters.propTypes = {
  getSavedFilters: func,
  savedFilters: array,
  savedFiltersLoading: bool
}

SavedFilters.defaultProps = {
  getSavedFilters: () => alert('getSavedFilters not implemented!'),
  savedFilters: [],
  savedFiltersLoading: false
}