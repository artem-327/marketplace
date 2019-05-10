import React, {Component} from 'react'
import Layout from '~/components/Layout'
import securePage from '~/hocs/securePage'
import {MyInventory} from '~/modules/inventory/my'

class Index extends Component {

  render() {
    return (
      <MyInventory />
    )
  }
}

export default Index