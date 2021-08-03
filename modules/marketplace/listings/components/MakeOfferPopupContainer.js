import { connect } from 'react-redux'
// Components
import MakeOfferPopup from './MakeOfferPopup'
// Actions
import * as Actions from '../../actions'
// Services
import { withDatagrid } from '../../../datagrid'
// Selectors
import { 
    makeGetPopupValues,
    makeGetUpdating,
    makeGetProductName,
    makeGetListFobPriceUnit,
    makeGetPackagingType,
    makeGetPackagingUnit,
    makeGetPackagingSize
} from '../../selectors'

const makeMapStateToProps = () => {
    const getPopupValues = makeGetPopupValues()
    const getUpdating = makeGetUpdating()
    const getProductName = makeGetProductName()
    const getListFobPriceUnit = makeGetListFobPriceUnit()
    const getPackagingType = makeGetPackagingType()
    const getPackagingUnit = makeGetPackagingUnit()
    const getPackagingSize = makeGetPackagingSize()

    const mapStateToProps = store => {
        return {
            popupValues: getPopupValues(store),
            updating: getUpdating(store),
            productName: getProductName(store),
            listFobPriceUnit: getListFobPriceUnit(store),
            packagingType: getPackagingType(store),
            packagingUnit: getPackagingUnit(store),
            packagingSize: getPackagingSize(store)
        }
    }
    return mapStateToProps
}

export default withDatagrid(connect(makeMapStateToProps, Actions)(MakeOfferPopup))