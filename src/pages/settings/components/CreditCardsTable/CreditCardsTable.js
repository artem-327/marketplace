// import React, { Component } from 'react'
// import { connect } from 'react-redux'

// import { SearchState, IntegratedFiltering } from '@devexpress/dx-react-grid'
// import {
//   Grid,
//   Table,
// 	TableHeaderRow
// } from '~/components/dx-grid-semantic-ui/plugins'

// import { 	EditDeleteFormatterProvider } from './CreditCardsTableProviders'
// import { getCreditCardsDataRequest } from '../../actions'

// class CreditCardsTable extends Component {
// 	state = {
// 		columns: [
// 			{ name: 'editDeleteBtn', title: ' ' },
// 			{ name: 'last4', title: 'last4'},
// 			{ name: 'expirationMonthYear', title: 'ExpirationMonth / ExpirationYear' }
// 		]
// 	}

// 	componentDidMount() {
// 		this.props.getCreditCardsDataRequest()
// 	}

// 	render() {
// 		const {
// 			rows,
// 			filterValue,
// 			editDeleteColumns,
// 			editPopupBoolean,
// 			addNewWarehousePopup
// 		} = this.props

// 		const { columns } = this.state

// 		const GridRoot = props => <Grid.Root {...props} className={ editPopupBoolean || addNewWarehousePopup ? 'hide' : 'col-xs-10 main-table' } />
// 		const HeaderCells = props => <TableHeaderRow.Cell {...props} className={ 'columns-title-cell' } />
// 		const TableCells = props => <Table.Cell {...props} className={ 'columns-rows-cell' } />

// 		return (
// 			<Grid
// 				rootComponent={ GridRoot }
// 				rows={ rows }
// 				columns={ columns }
// 			>
// 				<SearchState
// 					value={ filterValue }
// 				/>
// 				<IntegratedFiltering />
// 				<Table
// 					cellComponent={ TableCells }
// 				/>
// 				<TableHeaderRow
// 					cellComponent={ HeaderCells }
// 				/>
// 				<EditDeleteFormatterProvider
// 					for={ editDeleteColumns }
// 					rows={ rows }
// 				/>
// 			</Grid>
// 		)
// 	}
// }

// const mapDispatchToProps = {
// 	getCreditCardsDataRequest
// }

// const mapStateToProps = state => {
//   return {
// 		rows: state.settings.creditCardsRows,
// 		editPopupBoolean: state.settings.editPopupBoolean,
// 		addNewWarehousePopup: state.settings.addNewWarehousePopup,
// 		filterValue: state.settings.filterValue
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(CreditCardsTable)

import React, { Component } from 'react'
import { connect } from 'react-redux'
import ProdexTable from '~/components/table'
import { Confirm } from 'semantic-ui-react'
import {
  openPopup,
  //   getProductsCatalogRequest,
  //   getBankAccountsDataRequest,
  getBankAccountsDataRequest,
  handleOpenConfirmPopup,
  closePopup,
  deleteConfirmation
} from '../../actions'

class ProductCatalogTable extends Component {
  state = {
    columns: [
      { name: 'accountNumber', title: 'Account Number' },
      { name: 'accountHolderName', title: 'Account Name' },
      { name: 'currency', title: 'Currency' }

      //   { name: 'editDeleteBtn', title: ' ' },
      //   { name: 'accountNumber', title: 'Account Number' },
      //   { name: 'accountHolderName', title: 'Account Holder Name' },
      //   { name: 'currency', title: 'Currency' }
    ]
  }

  componentDidMount() {
    this.props.getBankAccountsDataRequest()
  }

  render() {
    const {
      rows,
      filterValue,
      confirmMessage,
      openPopup,
      handleOpenConfirmPopup,
      closePopup,
      deleteConfirmation
    } = this.props

    const { columns } = this.state

    return (
      <React.Fragment>
        <Confirm
          size="tiny"
          content="Do you really want to delete this product?"
          open={confirmMessage}
          onCancel={closePopup}
          onConfirm={deleteConfirmation}
        />
        <ProdexTable
          rows={rows}
          columns={columns}
          filterValue={filterValue}
          rowActions={[
            { text: 'Edit', callback: row => openPopup(row) },
            {
              text: 'Delete',
              callback: row => handleOpenConfirmPopup(row.id)
            }
          ]}
        />
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = {
  openPopup,
  //   getProductsCatalogRequest,
  getBankAccountsDataRequest,
  //   getCreditCardsDataRequest,
  handleOpenConfirmPopup,
  closePopup,
  deleteConfirmation
}

const mapStateToProps = state => {
  return {
    rows: state.settings.bankAccountsRows,
    filterValue: state.settings.filterValue,
    confirmMessage: state.settings.confirmMessage
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductCatalogTable)
