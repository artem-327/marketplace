import { connect } from 'react-redux'
import { withDatagrid } from '../../datagrid'
import BidsRowDetail from './BidsRowDetail'
// Services
import * as Actions from '../actions'
// Actions
import { getSafe } from '../../../utils/functions'
// Selectors
import { makeGetIsSending, makeGetLoading } from '../selectors'

const makeMapStateToProps = () => {
    const getIsSending = makeGetIsSending()
    const getLoading = makeGetLoading()

    const mapStateToProps = (store, params) => {
        const { popupValues } = params
        const productOffer = getSafe(() => popupValues.productOffer, null)
        const companyProduct = getSafe(() => productOffer.companyProduct, null)
    
        const priceUnit = getSafe(() => companyProduct.packagingUnit.nameAbbreviation, '')
    
        return {
            popupValues,
            productOffer,
            isSending: getIsSending(store),
            loading: getLoading(store),
            productName: getSafe(() => companyProduct.intProductName, 'N/A'),
            listFobPriceUnit: priceUnit ? `/${priceUnit}` : '',
            packagingType: getSafe(() => companyProduct.packagingType.name, ''),
            packagingUnit: getSafe(() => companyProduct.packagingUnit.nameAbbreviation, ''),
            packagingSize: getSafe(() => companyProduct.packagingSize, 1)
        }
    }
    return mapStateToProps
}

export default withDatagrid(connect(makeMapStateToProps, Actions)(BidsRowDetail))