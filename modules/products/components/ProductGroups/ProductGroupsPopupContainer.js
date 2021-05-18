import { connect } from 'react-redux'
import ProductGroupsPopup from './ProductGroupsPopup'
import { closePopup, putProductGroups, searchTags, postProductGroups, searchMarketSegments } from '../../actions'
import {
    makeGetRowId,
    makeGetPopupValues,
    makeGetSearchedTagsLoading,
    makeGetSearchedTags
} from '../../selectors'

const mapDispatchToProps = {
    closePopup,
    putProductGroups,
    searchTags,
    postProductGroups,
    searchMarketSegments
}

const makeMapStateToProps = () => {
    const getRowId = makeGetRowId()
    const getPopupValues = makeGetPopupValues()
    const getSearchedTagsLoading = makeGetSearchedTagsLoading()
    const getSearchedTags = makeGetSearchedTags()

    const mapStateToProps = state => {
        return {
            rowId: getRowId(state),
            popupValues: getPopupValues(state),
            searchedTagsLoading: getSearchedTagsLoading(state),
            searchedTags: getSearchedTags(state)
        }
    }
    return mapStateToProps
}

export default connect(makeMapStateToProps, mapDispatchToProps)(ProductGroupsPopup)  