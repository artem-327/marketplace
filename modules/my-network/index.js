//Components
import TableContainer from './components/TableContainer'
import { DatagridProvider } from '../datagrid'
import Tutorial from '../tutorial/Tutorial'
import TableHandler from './components/TableHandler'
//Styles
import { ContainerCustom } from './MyNetwork.styles'
/**
 * @category My Network
 * @component
 */
const MyNetwork = props => {
  const getApiConfig = () => ({
    method: 'GET',
    url: '/prodex/api/tradepass/connections',
    params: {
      pageSize: 50,
      sortBy: 'DATE',
      sortDir: 'DESC'
    }
  })

  return (
    <>
      {<Tutorial isTutorial={false} isBusinessVerification={true} />}
      <DatagridProvider apiConfig={getApiConfig()} preserveFilters={true} skipInitLoad={false}>
        <div id='page' className='flex stretched scrolling'>
          <ContainerCustom fluid>
            <TableHandler />
          </ContainerCustom>
          <ContainerCustom fluid paddingTop={0} className='flex stretched'>
            <TableContainer />
          </ContainerCustom>
        </div>
      </DatagridProvider>
    </>
  )
}

export default MyNetwork
