import React, { Component } from 'react'
import { connect } from 'react-redux'

import { SearchState, IntegratedFiltering } from '@devexpress/dx-react-grid'
import {
	Grid,
	Table,
	TableHeaderRow, DragDropProvider,
	TableColumnReordering,
} from '@devexpress/dx-react-grid-bootstrap4'

import { EditDeleteFormatterProvider } from './BranchTableProviders'
import { getBranchesDataRequest } from '../../actions'

class BranchTable extends Component {
	state = {
		columns: [
			{ name: 'editDeleteBtn', title: ' ', width: 45, dropdown: true },
			{ name: 'warehouseName', title: 'Warehouse Name' },
			{ name: 'address', title: 'Adress', },
			{ name: 'contactName', title: 'Contact name' },
			{ name: 'phone', title: 'Phone' },
			{ name: 'email', title: 'E-mail' }
		]
	}

	componentDidMount() {
		this.props.getBranchesDataRequest()
	}

	render() {
		const {
			rows,
			filterValue,
			editDeleteColumns,
			editPopupBoolean,
			addNewWarehousePopup
		} = this.props

		const { columns } = this.state

		const GridRoot = props => <Grid.Root className="bootstrapiso" {...props} />
		const HeaderCells = props => <TableHeaderRow.Cell {...props} />
		const TableCells = props => <Table.Cell {...props} />

		return (
			<Grid
				rootComponent={GridRoot}
				rows={rows}
				columns={columns}
			>
				<DragDropProvider />
				<SearchState value={filterValue} />
				<IntegratedFiltering />
				<Table cellComponent={TableCells} />
				<TableHeaderRow cellComponent={HeaderCells} />
				<EditDeleteFormatterProvider
					for={editDeleteColumns}
					rows={rows}
				/>
				<TableColumnReordering defaultOrder={columns.map(c => c.name)} />
			</Grid>
		)
	}
}

const mapDispatchToProps = {
	getBranchesDataRequest
}

const mapStateToProps = state => {
	return {
		rows: state.settings.branchesRows,
		editDeleteColumns: state.settings.columnsForFormatter.editDeleteColumns,
		editPopupBoolean: state.settings.editPopupBoolean,
		addNewWarehousePopup: state.settings.addNewWarehousePopup,
		filterValue: state.settings.filterValue
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(BranchTable) 