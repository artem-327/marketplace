import {connect} from 'react-redux'
import Router from 'next/router'
import AddInventoryForm from './AddInventoryForm'
import * as Actions from '../actions'

function mapStateToProps(store) {
    return {
        ...store.forms.simpleAdd,
        edit: (Router.router && Router.router.query.type === 'edit' ? Router.router.query.id : false),
        fileIds: store.simpleAdd.fileIds,
        router: store.router,
        searchedProducts: store.simpleAdd.searchedProducts,
        searchedProductsFetched: store.simpleAdd.searchedProductsFetched,
        warehousesList: store.simpleAdd.warehouses
    }
}

export default connect(mapStateToProps, Actions)(AddInventoryForm)
