import React, { Component } from 'react'
import { connect } from 'react-redux'
import ProdexGrid from '~/components/table'
import { getWarehousesDataRequest } from '../../actions'

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
			editDeleteColumns,
			editPopupBoolean,
			addNewWarehousePopup
		} = this.props

		const { columns } = this.state

		return (
			<ProdexGrid 
				filterValue={filterValue}
				columns={columns} 
				rows={rows} 
				rowActions={[
					{text: 'Edit', callback: (row) => console.log('Edit:', row)},
					{text: 'Delete', callback: (row) => console.log('Delete:', row)}
				]} 
			/>
		)

	}
}

const mapDispatchToProps = {
	getWarehousesDataRequest
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