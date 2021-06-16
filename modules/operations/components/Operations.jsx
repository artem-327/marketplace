import { useEffect } from 'react'
import { Container, Grid } from 'semantic-ui-react'
import { FormattedMessage } from 'react-intl'
// Components
import TablesHandlers from './TablesHandlersContainer'
// Services
import { getSafe } from '../../../utils/functions'
import { DatagridProvider } from '../../datagrid'
import { getApiConfig, renderContent } from './Operations.services'
// Styles
import { CustomGridColumn } from '../styles'

const Operations = props => {
  useEffect(() => {
    const { isOpenPopup, closePopup } = props
    if (isOpenPopup) closePopup()
  }, [])

  const { currentTab, orderDetailData } = props

  if (
    !(
      getSafe(() => props.auth.identity.isAdmin, false) ||
      getSafe(() => props.auth.identity.isOperator, false) ||
      (getSafe(() => props.auth.identity.isOrderOperator, false) && currentTab === 'orders')
    )
  )
    return <FormattedMessage id='global.accessDenied' defaultMessage='Access Denied!' />

  const displayPage = !!orderDetailData

  return (
    <DatagridProvider apiConfig={getApiConfig(props)} preserveFilters skipInitLoad>
      <Container fluid className='flex stretched'>
        {displayPage ? (
          renderContent(props)
        ) : (
          <>
            <Container fluid>
              <TablesHandlers currentTab={currentTab} />
            </Container>

            <Grid columns='equal' className='flex stretched' style={{ margin: '0', padding: '0' }}>
              <Grid.Row style={{ margin: '0', padding: '0 0 10px 0' }}>
                <CustomGridColumn className='flex stretched'>{renderContent(props)}</CustomGridColumn>
              </Grid.Row>
            </Grid>
          </>
        )}
      </Container>
    </DatagridProvider>
  )
}

export default Operations
