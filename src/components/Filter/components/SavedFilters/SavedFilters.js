import React, {Component} from 'react'
import './SavedFilters.scss'
import SaveFilterItem from './SaveFilterItem'
import {Segment, Loader, Dimmer} from 'semantic-ui-react'
import styled from 'styled-components'
import {FormattedMessage} from 'react-intl'
import Axios from 'axios'

const CenteredSegment = styled(Segment)`
  vertical-align: middle;
  justify-content: center;
  flex: 1;
  height: 100%;
`

export default class SavedFilters extends Component {
  state = {
    savedFilters: []
  }
  componentDidMount() {
    Axios.get('/prodex/api/product-offers/broadcasted/datagrid/saved-filters').then(response =>
      this.setState({savedFilters: response.data})
    )
  }

  renderSaveItems(saved) {
    return saved.map((item, index) => {
      const {filterName} = item
      let final = []
      for (let key in item) {
        if (key === 'filterName' || key === 'id' || !item[key]) continue
        final.push({name: key, value: item[key]})
      }
      return (
        <SaveFilterItem
          id={item.id}
          deleteSaveFilter={this.props.deleteSaveFilter}
          fillFilter={this.props.fillFilter}
          filterFunc={this.props.filterFunc}
          filterName={filterName}
          index={index}
          key={index}
          toolTipContent={final}
        />
      )
    })
  }

  render() {
    let {saveFilters, fetching} = this.props
    if (fetching) {
      return (
        <CenteredSegment padded='very' raised basic>
          <Dimmer active inverted>
            <Loader inverted size='big' />
          </Dimmer>
        </CenteredSegment>
      )
    }

    if (this.state.savedFilters.length === 0) {
      return (
        <Segment basic padded>
          <FormattedMessage id='filter.noSavedFilters' defaultMessage='No saved filters available' />
        </Segment>
      )
    }

    return <ul className='saved-filters'>{this.renderSaveItems(this.state.savedFilters)}</ul>
  }
}
