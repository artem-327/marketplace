import { useEffect } from 'react'
import { Container } from 'semantic-ui-react'
import { FormattedMessage } from 'react-intl'
import Router from 'next/router'
import PropTypes from 'prop-types'
// Components
import TablesHandlers from './TablesHandlersContainer'
import { DatagridProvider } from '../../datagrid'
// Services
import { getSafe } from '../../../utils/functions'
// Constants
import {
  tables,
  datagridConfig,
  editForms,
  addForms,
  addDwollaForms
} from '../constants'

const Admin = props => {
  useEffect(() => {
    return () => {
      const { currentEditForm, currentAddForm, currentAddDwolla, closePopup } = props
      if (currentEditForm || currentAddForm || currentAddDwolla) closePopup()
    }
  }, [])

  const renderContent = () => {
    const { currentEditForm, currentAddForm, currentTab, currentAddDwolla } = props
    return (
      <>
        {currentAddForm && addForms[currentTab]}
        {currentEditForm && editForms[currentTab]}
        {currentAddDwolla && addDwollaForms[currentTab] && Router.push('/dwolla-register/')}
        {tables[currentTab] || <p>This page is still under construction</p>}
      </>
    )
  }

  const getApiConfig = () => {
    const { currentTab } = props

    return datagridConfig[currentTab]
  }

  if (!getSafe(() => props.auth.identity.isAdmin, false))
    return <FormattedMessage id='global.accessDenied' defaultMessage='Access Denied!' />
  const { currentTab } = props

  return (
    <DatagridProvider apiConfig={getApiConfig()} preserveFilters skipInitLoad>
      <Container fluid className='flex stretched'>
        <>
          {currentTab !== 'admin-settings' && (
            <div style={{ padding: '20px 30px' }}>
              <TablesHandlers currentTab={currentTab} />
            </div>
          )}
          <div style={{ padding: '0 30px 20px 30px' }} className='flex stretched'>
            {renderContent()}
          </div>
        </>
      </Container>
    </DatagridProvider>
  )
}

Admin.propTypes = {
  currentEditForm: PropTypes.bool,
  currentAddForm: PropTypes.bool,
  currentAddDwolla: PropTypes.bool,
  currentTab: PropTypes.string,
  closePopup: PropTypes.func,
  auth: PropTypes.object
}

Admin.defaultValues = {
  currentEditForm: null,
  currentAddForm: null,
  currentAddDwolla: null,
  currentTab: '',
  closePopup: () => {},
  auth: {}
}

export default Admin
