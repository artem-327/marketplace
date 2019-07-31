import React, { Component } from 'react'
import './BroadcastRule.scss'
import BroadcastTargets from "./BroadcastTargets"
import Dropdown from "../../../../components/Dropdown/Dropdown"
import classnames from 'classnames'
import BroadcastAdd from "./BroadcastAdd"

class BroadcastRule extends Component {

  constructor(props) {
    super(props)
    this.state = {
      rawData: []
    }
  }

  activeBroadcastButton(active) {
    this.props.setActiveBroadcastButton(active)
  }

  submitBroadcastData() {

    let tmp = []
    Object.values(this.state.rawData).map((item) => {
      item.map((item1) => {
        tmp.push({ visibility: item1.visibility, company: item1.company, [item1.updateType]: item1.amount })
        return null
      })
      return null
    })

    this.props.addPopup(<BroadcastAdd getProductOffers={this.props.getProductOffers} active={value => this.activeBroadcastButton(value)} removePopup={this.props.removePopup} submitRules={this.props.submitRules} subjects={[{ productOffer: this.props.productOffersSelection }]} targets={tmp} />)
    this.setState({ isOpen: false })
  }

  closeBroadcastRule() {
    if (this.props.closeRowComponent) this.props.closeRowComponent()
  }

  render() {
    return (
      <div ref={this.props.brRef} className={classnames("broadcast-rule", { 'open': this.props.visible })}>
        <div>
          <div>
            <span className="left header-section">
              <h1 className='br-header'>CUSTOM BROADCAST</h1>
              <div className='br-target'>Broadcasting to: x/x</div>
              <i className="fas fa-times close-mark-br" onClick={() => this.closeBroadcastRule()} />
            </span>
          </div>
          <div>
            <span className="left">
              <Dropdown opns={this.props.selections}
                onChange={(type) => this.props.setFilter(type)}
                placeholder='Select filter'
                currentValue={this.props.currentSelected}
                data-test='my_inventory_broadcast_select_filter_drpdn'/>
            </span>
          </div>
        </div>
        <div>
          <BroadcastTargets targetGroups={this.props.targetGroups} filter={this.props.currentSelected} getData={(data) => this.setState({ rawData: data })} />
        </div>
        <div className="br-buttons-wr">
          <button className='button br-apply' onClick={() => this.submitBroadcastData()} data-test='my_inventory_broadcast_submit_btn' >Apply</button>
          <div className="clearfix" />
        </div>
      </div>
    )
  }
}
export default BroadcastRule