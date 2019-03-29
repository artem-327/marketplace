import React, { Component } from 'react'
import { connect } from 'react-redux'
import ProdexGrid from '~/components/table'
import { getWarehousesDataRequest, openEditPopup, deleteWarehouse } from '../../actions'

class WarehouseTable extends Component {

	state = {
		columns: [
			{ name: 'editDeleteBtn', title: ' ', dropdown: true, width: 45 },
			{ name: 'warehouseName', title: 'Warehouse Name' },
			{ name: 'address', title: 'Address' },
			{ name: 'contactName', title: 'Contact Name' },
			{ name: 'phone', title: 'Phone' },
			{ name: 'email', title: 'E-mail' }
		]
	}

	componentDidMount() {
		this.props.getWarehousesDataRequest();
	}

	setTextInputRef = element => {
		this.textInput = element
	}

	render() {
		const {
			rows,
			filterValue,
			openEditPopup,
			deleteWarehouse
		} = this.props

		const { columns } = this.state

		return (
			<ProdexGrid 
				filterValue={filterValue}
				columns={columns} 
				rows={rows} 
				rowActions={[
					{text: 'Edit', callback: (row) => openEditPopup(row)},
					{text: 'Delete', callback: (row) => deleteWarehouse(row.id)}
				]} 
			/>
		)

	}
}

const mapDispatchToProps = {
	getWarehousesDataRequest,
	openEditPopup,
	deleteWarehouse
}

const mapStateToProps = state => {
	return {
		rows: state.settings.warehousesRows,
		editDeleteColumns: state.settings.columnsForFormatter.editDeleteColumns,
		editPopupBoolean: state.settings.editPopupBoolean,
		addNewWarehousePopup: state.settings.addNewWarehousePopup,
		filterValue: state.settings.filterValue
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(WarehouseTable) 