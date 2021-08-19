import { useEffect, useState } from 'react'
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
import { GA_TRACK_QUERY } from '../../../constants'
import {
  tables,
  editForms,
  addForms,
  addDwollaForms
} from '../constants'

/**
 * Admin Component
 * @category Admin Settings
 * @components
 */
const Admin = props => {
  const [gaSearch, setGaSearch] = useState('')

  useEffect(() => {
    return () => {
      const { currentEditForm, currentAddForm, currentAddDwolla, closePopup } = props
      if (currentEditForm || currentAddForm || currentAddDwolla) closePopup()
    }
  }, [])

  /**
   * Render Content
   * @category Admin Settings
   * @method
   */
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

  /**
   * datagridConfig constant is used in ./ components / Admin
   * @category Admin
   * @constant
   */
  const datagridConfig = {
    conditions: {
      url: gaSearch ? `/prodex/api/product-conditions/datagrid?${GA_TRACK_QUERY}=${encodeURIComponent(gaSearch)}` : `/prodex/api/product-conditions/datagrid`,
      searchToFilter: v => {
        setGaSearch(getSafe(() => v.searchInput, ''))
        return v && v.searchInput ? [{ operator: 'LIKE', path: 'ProductCondition.name', values: [`%${v.searchInput}%`] }] : []
      }
    },
    'nmfc-numbers': {
      url: gaSearch ? `/prodex/api/nmfc-numbers/datagrid?${GA_TRACK_QUERY}=${encodeURIComponent(gaSearch)}` : `/prodex/api/nmfc-numbers/datagrid`,
      searchToFilter: v => {
        setGaSearch(getSafe(() => v.searchInput, ''))
        let filters = []
        if (v && v.searchInput) {
          filters.push({ operator: 'LIKE', path: 'NmfcNumber.description', values: [`%${v.searchInput}%`] })
          if (Number.isInteger(parseInt(v.searchInput)))
            filters.push({ operator: 'LIKE', path: 'NmfcNumber.prefix', values: [`${parseInt(v.searchInput)}%`] })
        }
        return filters
      }
    },
    associations: {
      url: gaSearch ? `/prodex/api/associations/datagrid?${GA_TRACK_QUERY}=${encodeURIComponent(gaSearch)}` : `/prodex/api/associations/datagrid`,
      searchToFilter: v => {
        setGaSearch(getSafe(() => v.searchInput, ''))
        return v && v.searchInput ? [{ operator: 'LIKE', path: 'Association.name', values: [`%${v.searchInput}%`] }] : []
      }
    },
    forms: {
      url: gaSearch ? `/prodex/api/product-forms/datagrid?${GA_TRACK_QUERY}=${encodeURIComponent(gaSearch)}` : `/prodex/api/product-forms/datagrid`,
      searchToFilter: v => {
        setGaSearch(getSafe(() => v.searchInput, ''))
        return v && v.searchInput ? [{ operator: 'LIKE', path: 'ProductForm.name', values: [`%${v.searchInput}%`] }] : []
      }
    },
    grades: {
      url: gaSearch ? `/prodex/api/product-grades/datagrid?${GA_TRACK_QUERY}=${encodeURIComponent(gaSearch)}` : `/prodex/api/product-grades/datagrid`,
      searchToFilter: v => {
        setGaSearch(getSafe(() => v.searchInput, ''))
        return v && v.searchInput ? [{ operator: 'LIKE', path: 'ProductGrade.name', values: [`%${v.searchInput}%`] }] : []
      }
    },
    manufacturers: {
      url: gaSearch ? `/prodex/api/manufacturers/datagrid?${GA_TRACK_QUERY}=${encodeURIComponent(gaSearch)}` : `/prodex/api/manufacturers/datagrid`,
      searchToFilter: v => {
        setGaSearch(getSafe(() => v.searchInput, ''))
        return v && v.searchInput ? [{ operator: 'LIKE', path: 'Manufacturer.name', values: [`%${v.searchInput}%`] }] : []
      }
    },
    'packaging-types': {
      url: gaSearch ? `/prodex/api/packaging-types/datagrid?${GA_TRACK_QUERY}=${encodeURIComponent(gaSearch)}` : `/prodex/api/packaging-types/datagrid`,
      searchToFilter: v => {
        setGaSearch(getSafe(() => v.searchInput, ''))
        return v && v.searchInput ? [{ operator: 'LIKE', path: 'PackagingType.name', values: [`%${v.searchInput}%`] }] : []
      }
    },
    'units-of-measure': {
      url: gaSearch ? `/prodex/api/units/datagrid?${GA_TRACK_QUERY}=${encodeURIComponent(gaSearch)}` : `/prodex/api/units/datagrid`,
      searchToFilter: v => {
        setGaSearch(getSafe(() => v.searchInput, ''))
        return v && v.searchInput ? [{ operator: 'LIKE', path: 'Unit.name', values: [`%${v.searchInput}%`] }] : []
      }
    },
    logistics: {
      url: gaSearch ? `/prodex/api/logistics-providers/stored/datagrid?${GA_TRACK_QUERY}=${encodeURIComponent(gaSearch)}` : `/prodex/api/logistics-providers/stored/datagrid`,
      searchToFilter: v => {
        setGaSearch(getSafe(() => v.searchInput, ''))
        return v && v.searchInput ? [{ operator: 'LIKE', path: 'LogisticsProvider.name', values: [`%${v.searchInput}%`] }] : []
      }
    },
    carriers: {
      url: gaSearch ? `/prodex/api/logistics-carriers/stored/datagrid?${GA_TRACK_QUERY}=${encodeURIComponent(gaSearch)}` : `/prodex/api/logistics-carriers/stored/datagrid`,
      searchToFilter: v => {
        setGaSearch(getSafe(() => v.searchInput, ''))
        return v && v.searchInput ? [{ operator: 'LIKE', path: 'LogisticsCarrier.code', values: [`%${v.searchInput}%`] }] : []
      }
    }
  }

  /**
   * Get Api Config
   * @category Admin Settings
   * @method
   */
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
