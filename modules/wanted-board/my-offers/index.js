import MyOffersContainer from './components/MyOffersContainer'
import { DatagridProvider } from '~/modules/datagrid'

export const MyOffers = props => {
  const urlApiConfig = { url: '/prodex/api/product-offers/broadcasted/datagrid/' }
  return (
    <>
      <DatagridProvider apiConfig={urlApiConfig}>
        <MyOffersContainer {...props} />
      </DatagridProvider>
    </>
  )
}