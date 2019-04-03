import React, { Component } from 'react'
import { connect } from 'react-redux'
import ProdexTable from '~/components/table'

import { getBranchesDataRequest, openEditPopup, deleteWarehouse } from '../../actions'

class BranchTable extends Component {
	state = {
		columns: [
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
			filterValue
		} = this.props

		const { columns } = this.state

		return (
			<ProdexTable 
				columns={columns}
				rows={rows}
				filterValue={filterValue}
				rowActions={[
					{text: 'Edit', callback: (row) => openEditPopup(row)},
					{text: 'Delete', callback: (row) => deleteWarehouse(row.id)}
				]} 
			/>
		)
	}
}

const mapDispatchToProps = {
	getBranchesDataRequest,
	openEditPopup, 
	deleteWarehouse
}

const mapStateToProps = state => {
	return {
		rows: state.settings.branchesRows,
		filterValue: state.settings.filterValue
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(BranchTable) 