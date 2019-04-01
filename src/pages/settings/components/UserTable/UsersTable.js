import React, { Component } from 'react'
import { connect } from 'react-redux'
import ProdexGrid from '~/components/table'

import { getUsersDataRequest } from '../../actions'

class UsersTable extends Component {
	state = {
		columns: [
			{ name: 'userName', title: 'User Name' },
			{ name: 'title', title: 'Title' },
			{ name: 'email', title: 'E-mail' },
			{ name: 'phone', title: 'Phone' },
			{ name: 'homeBranch', title: 'Home Branch' },
			{ 
				name: 'permissions', 
				title: 'Permissions', 
				options: [
					{ text: 'Admin', value: 'admin' },
					{ text: 'User', value: 'user' } 
				]
			}
		]
	}

	componentDidMount() {
		this.props.getUsersDataRequest()
	}

	render() {
		const {
			rows,
			filterValue,
		} = this.props

		const { columns } = this.state

		return (
			<ProdexGrid 
				filterValue={filterValue}
				columns={columns} 
				rows={rows} 
				rowActions={[
					{text: 'Edit', callback: (row) => {}},
					{text: 'Delete', callback: (row) => {}}
				]}
			/>
		)
	}
}

const mapDispatchToProps = {
	getUsersDataRequest
}

const mapStateToProps = state => {
	return {
		rows: state.settings.usersRows,
		filterValue: state.settings.filterValue
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersTable) 