import React, { Component } from "react"
import { Container, Menu, Header, Checkbox } from "semantic-ui-react"
import SubMenu from '~/src/components/SubMenu'
import {FormattedMessage} from 'react-intl'
import Router from 'next/router'
import ProdexGrid from '~/components/table'
import Filter from '~/src/components/Filter'

export default class MyInventory extends Component {
  state = {
    columns: [
      { name: 'productName', title: 'Product Name', width: 250 },
      { name: 'productNumber', title: 'Product Number' },
      { name: 'warehouse', title: 'Warehouse', width: 180 },
      { name: 'available', title: 'Available', width: 80 },
      { name: 'packaging', title: 'Packaging' },
      { name: 'pkgAmount', title: 'Pkg. Size' },
      { name: 'quantity', title: 'Quantity' },
      { name: 'cost', title: 'Cost' },
      { name: 'fobPrice', title: 'FOB Price' },
      { name: 'manufacturer', title: 'MFR.', width: 220 },
      { name: 'broadcast', title: 'Broadcast', width: 120 }
    ],
    selectedRows: []
  }

  componentDidMount() {
    this.props.getMyProductOffers()
  }

  getRows = () => {
    const {rows} = this.props

    return rows.map(r => ({
      ...r,
      broadcast: (
        <div style={{float: 'right'}}>
          <Checkbox toggle checked={r.broadcasted} onChange={() => alert('Changed:'+r.productName)} />
        </div>
      )
    }))
  }

  render() {
    const {
      loading
    } = this.props
    const { columns, selectedRows } = this.state
    const rows = this.getRows()

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
            {selectedRows.length > 0 ? (
              <Menu.Item>
                <Header as='h3' size='small' color='grey'>
                  <FormattedMessage id='myInventory.smallHeader'
                                    defaultMessage={selectedRows.length + ' products offerings selected'}
                                    values={{number: selectedRows.length}} />
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
          tableName="my_inventory_grid"
          loading={loading}
          columns={columns}
          rows={rows}
          rowSelection
          groupBy={['productNumber']}
          getChildGroups={rows =>
            _(rows)
              .groupBy('productName')
              .map(v => ({
                key: `${v[0].productName}_${v[0].productNumber}_${v.length}`,
                childRows: v
              }))
              .value()
          }
          renderGroupLabel={({row: {value}}) => {
            const [name, number, count] = value.split('_')
            return (
              <span>
                <span style={{color: '#2599d5'}}>{number}</span>&nbsp;&nbsp; {name} <span className="right">Product offerings: {count}</span>
              </span>
            )
          }}
          onSelectionChange={selectedRows => this.setState({selectedRows})}
          rowActions={[
            { text: 'Edit listing', callback: (row) => Router.push(`/inventory/edit/${row.id}`) },
            { text: 'Custom broadcast', callback: (row) => {} },
            { text: 'Delete listing', callback: (row) => { this.props.deleteProductOffer(row.id)} }
          ]}
        />
        <Filter
          chemicalName
          productAgeFilter
          date
          assay
          quantity
          price
          package
          condition
          productGrade
          form
          filterFunc={(filter) => { this.props.getMyProductOffers({ ...filter }) }}
          {...this.props}
        />
      </>
    )
  }
}