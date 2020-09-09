import SubmitOfferPopup from './SubmitOfferPopup'
import { DatagridProvider } from '~/modules/datagrid'

export const SubmitOffer = props => {
  const urlApiConfig = {
    url: `/prodex//api/purchase-requests/id/${props.id}/matching-product-offers-datagrid`,
    searchToFilter: v =>
      v
        ? [
            //{ operator: 'LIKE', path: 'PurchaseRequestElement.companyGenericProduct.name', values: [`%${v}%`] },
            //{ operator: 'LIKE', path: 'PurchaseRequestElement.casProduct.casNumber', values: [`%${v}%`] }
          ]
        : []
  }
  return (
    <>
      <DatagridProvider apiConfig={urlApiConfig}>
        <SubmitOfferPopup {...props} />
      </DatagridProvider>
    </>
  )
}
