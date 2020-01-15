import React, { Component } from 'react'
import { initGlobalBroadcast } from '~/modules/broadcast/actions'
import { connect } from 'react-redux'
import { Broadcast } from '~/modules/broadcast'
import { Segment } from 'semantic-ui-react'

class PriceBook extends Component {
  state = { loading: true }

  async componentDidMount() {
    try {
      await this.props.initGlobalBroadcast()
    } catch (err) {
      console.error(err)
    }
    this.setState({ loading: false })
  }
  render() {
    return (
      <Segment padded='very' basic>
        <Broadcast hideFobPrice isPrepared={!this.state.loading} asModal={false} />
      </Segment>
    )
  }
}

export default connect(null, { initGlobalBroadcast })(PriceBook)
