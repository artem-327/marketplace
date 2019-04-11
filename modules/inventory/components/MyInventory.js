import React, { Component } from "react"
import { Container, Menu, Header } from "semantic-ui-react"
import SubMenu from '~/src/components/SubMenu'
import {FormattedMessage} from 'react-intl'
import ProdexGrid from '~/components/table'

export default class MyInventory extends Component {
  state = {
    columns: [
      { name: 'selection', title: ' ' },
      { name: 'productName', title: 'Product Name' },
      { name: 'productNumber', title: 'Product Number' },
      { name: 'warehouse', title: 'Warehouse' },
      { name: 'available', title: 'Available' },
      { name: 'packaging', title: 'Packaging' },
      { name: 'pkgAmount', title: 'Pkg. Size' },
      { name: 'quantity', title: 'Quantity' },
      { name: 'cost', title: 'Cost' },
      { name: 'fobPrice', title: 'FOB Price' },
      { name: 'manufacturer', title: 'MFR.' },
      { name: 'broadcast', title: 'Broadcast' }
    ]
  }

  componentDidMount() {
    this.props.getMyProductOffers()
  }

  render() {
    const {
      rows
    } = this.props
    const { columns } = this.state
    let number = 0 // TODO: selected rows

    return (
      <>
        <Container fluid>
          <Menu secondary>
            <Menu.Item header>
              <Header as='h1' size='medium'>
                <FormattedMessage id='myInventory.myInventory'
                                  defaultMessage='MY INVENTORY' />
              </Header>
            </Menu.Item>
            {number ? (
              <Menu.Item>
                <Header as='h3' size='small' color='grey'>
                  <FormattedMessage id='myInventory.smallHeader'
                                    defaultMessage={number + ' products offerings selected'}
                                    values={{number: number}} />
                </Header>
              </Menu.Item>
            ) : ''}

            <Menu.Menu position='right'>
              <Menu.Item>
                <SubMenu/>
              </Menu.Item>
            </Menu.Menu>
          </Menu>
        </Container>
        <ProdexGrid
          columns={columns}
          rows={rows}
        />
      </>
    )
  }
}