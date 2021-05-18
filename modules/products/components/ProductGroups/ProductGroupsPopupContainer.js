import { connect } from 'react-redux'
import ProductGroupsPopup from './ProductGroupsPopup'
import { closePopup, putProductGroups, searchTags, postProductGroups, searchMarketSegments } from '../../actions'
import { getSafe } from '../../../../utils/functions'

const mapDispatchToProps = {
    closePopup,
    putProductGroups,
    searchTags,
    postProductGroups,
    searchMarketSegments
}

const mapStateToProps = state => {
    const { popupValues } = state.productsAdmin

    return {
        rowId: getSafe(() => popupValues.id),
        popupValues: getSafe(() => popupValues, ''),
        searchedTagsLoading: state.productsAdmin.searchedTagsLoading,
        searchedTags: getSafe(() => state.productsAdmin.searchedTags.length, false)
        ? state.productsAdmin.searchedTags.map(d => ({
            key: d.id,
            text: d.name,
            value: d.id
            }))
        : []
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductGroupsPopup)  