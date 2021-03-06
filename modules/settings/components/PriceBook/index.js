import { Component } from 'react'
import { initGlobalBroadcast } from '~/modules/broadcast/actions'
import { connect } from 'react-redux'

import { Segment } from 'semantic-ui-react'
import styled from 'styled-components'

import { Broadcast } from '~/modules/broadcast'

const ScrollableSegment = styled(Segment)`
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  border-radius: 4px !important;
  padding: 30px !important;
`

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
      <ScrollableSegment padded basic>
        <Broadcast hideFobPrice isPrepared={!this.state.loading} asModal={false} />
      </ScrollableSegment>
    )
  }
}

export default connect(null, { initGlobalBroadcast })(PriceBook)
