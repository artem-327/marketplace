import { connect } from 'react-redux'
// Components
import TagsPopup from './TagsPopup'
// Actions
import { closePopup, updateTag, createTag } from '../../actions'
// Selectors
import { makeGetPopupValuesId, makeGetPopupValuesName } from '../../selectors'

const mapDispatchToProps = {
    closePopup,
    updateTag,
    createTag
}

const mapStateToProps = state => {
    const getPopupValuesId = makeGetPopupValuesId()
    const getPopupValuesName = makeGetPopupValuesName()

    return {
        rowId: getPopupValuesId(state),
        popupValues: getPopupValuesName(state)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TagsPopup)
