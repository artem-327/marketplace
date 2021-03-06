import { useEffect, useState } from 'react'
import { injectIntl } from 'react-intl'
import PropTypes from 'prop-types'
// Components
import ProdexTable from '../../../../components/table'
import ListingDetail from './ListingDetail/ListingDetail'
import TableHandler from './TableHandlerContainer'
import ModalPriceBook from './ModalPriceBook/ModalPriceBook'
// Services
import { getRows } from './SharedListings.services'
// Constants
import { COLUMNS } from './SharedListings.constants'

/**
 * SharedListings Component
 * @category Inventory - Shared Listings
 * @components
 */
const SharedListings = props => {
  const [expandedRowIds, setExpandedRowIds] = useState([])

  const [values, setValues] = useState({
    header: {
      pricingTabIndex: 0,
      priceMultiplier: '',
      priceAddition: '',
      priceOverride: '',
      id: ''
    },
    tabs: {
      activeTab: 0
    }
  })

  const {
    datagrid,
    rows,
    setActiveTab,
    isOpenPriceBookModal,
    getTemplates,
    broadcastTemplates,
    triggerPriceBookModal,
    rowPriceBook,
    getMarkUp
  } = props

  const state = {
    expandedRowIds,
    setExpandedRowIds
  }

  useEffect(() => {
    if (broadcastTemplates && !broadcastTemplates.length) {
      getTemplates()
    }
  }, [])

  const getRowDetail = (row, props, state) => {
    return (
      <ListingDetail
        row={row.rawData}
        parentState={state}
        values={values}
        onChange={data => setValues(data)}
        datagrid={props.datagrid}
        companyType={props.companyType}
        defaultMarkup={props.defaultMarkup}
      />)
  }

  return (
    <>
      <ModalPriceBook
        isOpenPriceBookModal={isOpenPriceBookModal}
        triggerPriceBookModal={triggerPriceBookModal}
        detailValues={rowPriceBook}
        tableDatagrid={datagrid}
      />

      <TableHandler datagrid={datagrid} />
      <div className='flex stretched inventory-wrapper listings-wrapper' style={{ padding: '10px 30px' }}>
        <ProdexTable
          {...datagrid.tableProps}
          tableName='inventory_shared_listings_grid'
          columns={COLUMNS}
          rows={getRows(rows, props)}
          hideCheckboxes
          loading={datagrid.loading}
          rowDetailType={true}
          rowDetail={({ row }) => getRowDetail(row, props, state)}
          groupBy={['groupProductName']}
          getChildGroups={rows =>
            _(rows)
              .groupBy('groupProductName')
              .map(v => {
                return {
                  key: `${v[0].groupProductName}_${v[0].companyProduct.id}`,
                  childRows: v,
                  groupLength: v.length
                }
              })
              .value()
          }
          renderGroupLabel={({ row: { value }, groupLength }) => null}
          onRowClick={async (_, row) => {
            setActiveTab(0)
            let ids = expandedRowIds.slice()
            if (ids.includes(row.id)) {
              setValues(prevValues => ({
                ...prevValues,
                header: { ...prevValues.header, priceMultiplier: '', priceAddition: '', priceOverride: '', id: '' },
                tabs: { activeTab: 0 }
              }))
              setExpandedRowIds([])
            } else {
              setValues(prevValues => ({
                ...prevValues,
                header: {
                  ...prevValues.header,
                  priceMultiplier: '',
                  priceAddition: '',
                  priceOverride: '',
                  id: row.id
                }
              }))
              setExpandedRowIds([row.id])
              try {
                const { value } = await getMarkUp(row.id)
                setValues(prevValues => ({
                  ...prevValues,
                  header: { ...prevValues.header, ...value, id: row.id }
                }))
              } catch (e) {console.error(e)}
            }
          }}
          expandedRowIds={expandedRowIds}
          onExpandedRowIdsChange={expandedRowIds => setExpandedRowIds(expandedRowIds)}
          toggleCellComponent={null}
          estimatedRowHeight={1500}
        />
      </div>
    </>
  )
}

SharedListings.propTypes = {
  rows: PropTypes.array,
  broadcastTemplates: PropTypes.array,
  isOpenPriceBookModal: PropTypes.bool,
  setActiveTab: PropTypes.func,
  getTemplates: PropTypes.func,
  triggerPriceBookModal: PropTypes.func,
  getMarkUp: PropTypes.func,
  broadcastChange: PropTypes.func,
  rowPriceBook: PropTypes.object,
  datagrid: PropTypes.object,
  intl: PropTypes.object
}

SharedListings.defaultProps = {
  rows: [],
  broadcastTemplates: [],
  isOpenPriceBookModal: false,
  setActiveTab: () => {},
  getTemplates: () => {},
  triggerPriceBookModal: () => {},
  getMarkUp: () => {},
  broadcastChange: () => {},
  rowPriceBook: null,
  datagrid: {},
  intl: {}
}

export default injectIntl(SharedListings)
