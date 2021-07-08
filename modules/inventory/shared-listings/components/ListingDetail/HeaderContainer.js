import { memo } from 'react'
import { connect } from 'react-redux'
// Components
import Header from './Header'
// Actions
import { updateMarkUp, getSharedProductOffer } from '../../../actions'
// Selectors
import { makeGetLoadingMarkup } from '../../../selectors'

const makeMapStateToProps = () => {
    const getLoadingMarkup = makeGetLoadingMarkup()
    const mapStateToProps = (store) => {
        return {
            loadingMarkup: getLoadingMarkup(store)
        }
    }
    return mapStateToProps
}

const areEqual = (prevProps, nextProps) => {
    return (
        prevProps?.row?.id === nextProps?.row?.id &&
        prevProps?.values?.priceMultiplier === nextProps?.values?.priceMultiplier &&
        prevProps?.loadingMarkup === nextProps?.loadingMarkup
    )
}

const MemoHeader = memo(Header, areEqual)

export default connect(makeMapStateToProps, { updateMarkUp, getSharedProductOffer })(MemoHeader)
