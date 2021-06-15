import { connect } from 'react-redux'
import { closePopup, updateTag, createTag } from '../../actions'
import TagsPopup from './TagsPopup'
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
