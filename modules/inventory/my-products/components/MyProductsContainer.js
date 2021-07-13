import { connect } from 'react-redux'
import Router from 'next/router'
import { injectIntl } from 'react-intl'
// Components
import MyProducts from './MyProducts'
import { withDatagrid } from '../../../datagrid'
// Actions
import * as Actions from '../../../settings/actions'
import { openPopup, handleProductCatalogUnmappedValue, handleVariableSave } from '../../actions'
// Services
import { getSafe } from '../../../../utils/functions'
import { getMappedRows } from './MyProducts.services'
// Selectors
import { makeGetEditedId, makeGetLoading, makeGetIsOpenImportPopup, makeGetIsOpenPopup, makeGetTutorialCompleted, makeGetMyProductsFilters } from '../../selectors'

const makeMapStateToProps = () => {
    const getEditedId = makeGetEditedId()
    const getLoading = makeGetLoading()
    const getIsOpenImportPopup = makeGetIsOpenImportPopup()
    const getIsOpenPopup = makeGetIsOpenPopup()
    const getTutorialCompleted = makeGetTutorialCompleted()
    const getMyProductsFilters = makeGetMyProductsFilters()

    const mapStateToProps = (state, { datagrid }) => {
        return {
            ...state.simpleAdd,
            myProductsFilters: getMyProductsFilters(state),
            editedId: getEditedId(state),
            loading: getLoading(state),
            isOpenImportPopup: getIsOpenImportPopup(state),
            isOpenPopup: getIsOpenPopup(state),
            rows: getMappedRows(datagrid),
            action: getSafe(() => Router.router.query.action, null), // ! ! ?
            actionId: getSafe(() => Router.router.query.id, null), // ! ! ?
            tutorialCompleted: getTutorialCompleted(state)
        }
    }
    return mapStateToProps
}

export default withDatagrid(
    connect(makeMapStateToProps, {
    ...Actions,
    openPopup,
    handleProductCatalogUnmappedValue,
    handleVariableSave
    })(injectIntl(MyProducts))
)
