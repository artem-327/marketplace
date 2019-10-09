import React, { Component } from 'react'
import { initGlobalBroadcast } from '~/modules/broadcast/actions'
import { connect } from 'react-redux'
import { Broadcast } from '~/modules/broadcast'
import { Segment } from 'semantic-ui-react'

class PriceBook extends Component {
  state = { loading: true }

  async componentDidMount() {
    await this.props.initGlobalBroadcast()
    this.setState({ loading: false })
  }
  render() {
    return (
      <Segment loading={this.state.loading} padded='very' basic>
        <Broadcast hideFobPrice isPrepared={!this.state.loading} asModal={false} />
      </Segment>
    )

  }
}



export default connect(null, { initGlobalBroadcast })(PriceBook)
