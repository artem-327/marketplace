import React, {Component} from 'react'
import Layout from '~/components/Layout'
import securePage from '~/hocs/securePage'
import {AddInventory} from '~/modules/inventory'

class Index extends Component {

  render() {
    return (
      <AddInventory />
    )
  }
}

export default Index