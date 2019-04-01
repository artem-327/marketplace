import React, { Component } from 'react' 
import { connect } from 'react-redux' 
import ProdexTable from '~/components/table'
import { getProductsCatalogRequest } from '../../actions' 

class ProductCatalogTable extends Component {
	state = {		
		columns: [
			{ name: 'productName', title: 'Product Name'},
			{ name: 'productNumber', title: 'Product Number' },
			{ name: 'productId', title: 'Product ID' },
			{ name: 'packagingType', title: 'Packaging Type' },
			{ name: 'packagingSize', title: 'Packaging Size' }
		]
	}	

	componentDidMount() {
		this.props.getProductsCatalogRequest() 
	}
	
	render() {
		const {			 
			rows,
			filterValue,
		} = this.props 

		const { columns } = this.state 


		return (					
			<ProdexTable 
				rows={rows}
				columns={columns}
				filterValue={filterValue}
			/>	
		) 		
	}
}

const mapDispatchToProps = {   
	getProductsCatalogRequest
} 

const mapStateToProps = state => {
  return {
		rows: state.settings.productsCatalogRows,
		filterValue: state.settings.filterValue
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCatalogTable) 