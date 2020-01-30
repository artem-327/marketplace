import React, { Component } from 'react'
import { Holds } from '~/modules/holds'
import securePage from '~/hocs/securePage'

//TODO
class HoldsPage extends Component {
  render() {
    return (
      <>
        <Holds />
      </>
    )
  }
}

export default securePage(HoldsPage)
