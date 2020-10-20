import React, { Component } from 'react'
//import MyProductsPage from './components/MyProducts'
import PriceBook from '~/modules/settings/components/PriceBook'
import { Container } from 'semantic-ui-react'

class GlobalPriceBook extends Component {
  render() {
    return (
      <Container fluid className='flex stretched'>
        <PriceBook />
      </Container>
    )
  }
}

export default GlobalPriceBook