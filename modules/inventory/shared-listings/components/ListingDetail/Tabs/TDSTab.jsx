import { memo } from 'react'
import PropTypes from 'prop-types'
//Services
import { getTdsElements } from '../../../../../company-product-info/components/CompanyProductInfo.services'

const TDSTab = ({ row }) => {
  return <div>{getTdsElements(row?.elementsTdsFields)}</div>
}

TDSTab.propTypes = {}
TDSTab.defaultProps = {}

function areEqual(prevProps, nextProps) {
  return prevProps?.row?.id === nextProps?.row?.id
}

const MemoTDSTab = memo(TDSTab, areEqual)

export default MemoTDSTab
