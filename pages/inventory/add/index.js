import {connect} from 'react-redux';
import Router from 'next/router'
import AddInventory from './AddInventory';
import {bindActionCreators} from 'redux'
import {addAttachment, addProductOffer, getProductOffer, getWarehouses, linkAttachment, loadFile, searchProducts, setFileIds} from '~/modules/add/actions'

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


function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        addAttachment,
        addProductOffer,
        getProductOffer,
        getWarehouses,
        linkAttachment,
        loadFile,
        searchProducts,
        setFileIds,
        dispatch
    }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(AddInventory);
