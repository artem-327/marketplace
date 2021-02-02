/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'

import PurchaseOrder from './PurchaseOrder'
import Checkout from './Checkout'


const TmpBoth = props => {

  useEffect(() => {

  }, [])

  const showOld = 1

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
      <Checkout {...props}>
        bla
      </Checkout>
      <div>
        {showOld === 1 && (<PurchaseOrder {...props} />)}
      </div>
    </div>
  )
}

export default TmpBoth