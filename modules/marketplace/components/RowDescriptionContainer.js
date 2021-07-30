import { connect } from 'react-redux'
// Components
import RowDescription from './RowDescription'
// Services
import { getSafe } from '../../../utils/functions'
// Selectors
import { makeGetCurrentUserId } from '../selectors'

const makeMapStateToProps = () => {
    const getCurrentUserId = makeGetCurrentUserId()

    const mapStateToProps = (store, { productOffer }) => {
        const companyProduct = getSafe(() => productOffer.companyProduct, null)
        const priceUnit = getSafe(() => companyProduct.packagingUnit.nameAbbreviation, '')
    
        return {
            currentUserId: getCurrentUserId(store),
            productName: getSafe(() => companyProduct.intProductName, 'N/A'),
            listFobPriceUnit: priceUnit ? `/${priceUnit}` : '',
            packagingType: getSafe(() => companyProduct.packagingType.name, ''),
            packagingUnit: getSafe(() => companyProduct.packagingUnit.nameAbbreviation, ''),
            packagingSize: getSafe(() => companyProduct.packagingSize, 1)
        }
    }
    return mapStateToProps
}

export default connect(makeMapStateToProps, {  })(RowDescription)