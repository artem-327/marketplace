import React, { Component } from 'react'
import { required } from '../../../../utils/validation'
import RemoteComboBox from '../../../../components/ComboBox/RemoteComboBox'

class AddCompany extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      location: {}
    }
  }

  render() {
    return (
      <div className=''>
        <div className='admin-add-input office'>
          <input
            placeholder='Office name'
            onChange={e => this.setState({ text: e.target.value })}
            value={this.state.text}
          />
          <RemoteComboBox
            items={this.props.locations}
            api={text => this.props.fetchLocation(text)}
            dataFetched={this.props.locationsFetched}
            limit={5}
            placeholder='Location'
            className='location-admin-add'
            isFetching={this.props.isFetchingLocation}
            getObject={location => this.setState({ location: location })}
            validators={{ required }}
          />
          <button onClick={() => this.props.addItem({ name: this.state.text, location: this.state.location })}>
            Add
          </button>
        </div>
      </div>
    )
  }
}

export default AddCompany
