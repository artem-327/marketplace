import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
// Components
import BidsRowDetail from './BidsRowDetail'
// Services
import * as Actions from '../actions'
import { getSafe } from '../../../utils/functions'
import { withDatagrid } from '../../datagrid'
// Selectors
import { makeGetIsSending, makeGetLoading } from '../selectors'

const makeMapStateToProps = () => {
    const getIsSending = makeGetIsSending()
    const getLoading = makeGetLoading()

    const mapStateToProps = (store, props) => {
        const { popupValues } = props
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

export default withDatagrid(injectIntl(connect(makeMapStateToProps, Actions)(BidsRowDetail)))