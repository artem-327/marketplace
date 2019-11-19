import React, { Component } from 'react'
import './BroadcastTargets.scss'
import Radio from '../../../../components/Radio/Radio'

class BroadcastConfig extends Component {
  changeRadio(value) {
    this.props.changeBrConfig(this.props.id, value)
  }

  changeUpdateType(value) {
    this.props.changeUpdateType(this.props.id, value)
  }

  changeAmount(e) {
    this.props.changeAmount(this.props.id, e.target.value)
  }

  render() {
    let brOpns = this.props.item
      ? [
          { value: 'include', label: 'Include' },
          { value: 'exclude', label: 'Exclude' }
        ]
      : [
          { value: 'include', label: 'Include' },
          { value: 'exclude', label: 'Exclude' },
          { value: 'custom', label: 'Custom' }
        ]
    return (
      <div className='br-config'>
        <div className='br-config-divider'>
          <span className='br-config-header'>Broadcast</span>
          <Radio
            onChange={value => this.changeRadio(value)}
            name={this.props.name + 'status'}
            className='br-config-radio'
            opns={brOpns}
            checked={this.props.value}
            data-test='my_inventory_broadcast_config_rad'
          />
        </div>
        <div className='br-config-divider price' data-test='my_inventory_broadcast_amount_inp'>
          <span className='br-config-header'>Mark Up/Down</span>
          <input value={this.props.amount} onChange={e => this.changeAmount(e)} />
          <Radio
            onChange={value => this.changeUpdateType(value)}
            name={this.props.name + 'mark'}
            className='small br-config-radio'
            opns={[
              { value: 'priceMultiplication', label: '%' },
              { value: 'priceAddition', label: '$' }
            ]}
            checked={this.props.updateType}
            data-test='my_inventory_broadcast_price_rad'
          />
        </div>
      </div>
    )
  }
}
export default BroadcastConfig
