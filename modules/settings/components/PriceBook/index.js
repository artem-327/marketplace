import React, { Component } from 'react'
import { openGlobalBroadcast } from '~/modules/broadcast/actions'
import { connect } from 'react-redux'
import { Broadcast } from '~/modules/broadcast'



class PriceBook extends Component {
  async componentDidMount() {
    await this.props.openGlobalBroadcast()
  }
  render() {
    return <Broadcast />
  }
}



export default connect(null, { openGlobalBroadcast })(PriceBook)
