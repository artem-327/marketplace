import { useEffect, useState } from 'react'
import Router from 'next/router'
import { Container, Input } from 'semantic-ui-react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { debounce } from 'lodash'
import ProdexGrid from '../../../../components/table'
import ConfirmModal from './Modals/Confirm'
import InfoModal from './Modals/Info'
import RespondModal from './RespondModal/index'
import { CustomRowDiv } from '../../styles'
import ActionCell from '../../../../components/table/ActionCell'
import ColumnSettingButton from '../../../../components/table/ColumnSettingButton'
import moment from 'moment'
import { getLocaleDateFormat } from '../../../../components/date-format'
import ModalDetailContainer from '../../../inventory/my-listings/components/ModalDetail/ModalDetailContainer'

const AllPosts = props => {

  const [state, setState] = useState({
    filterValue: {
      searchInput: ''
    }
  })

  const columns = [
    {
      name: 'productName',
      title: (
        <FormattedMessage id='wantedBoard.productName' defaultMessage='Product Name' />
      ),
      width: 500,
      allowReordering: false
    },
    {
      name: 'quantity',
      title: (
        <FormattedMessage id='wantedBoard.quantityNeeded' defaultMessage='Qty.Needed' />
      ),
      width: 200
    },
    {
      name: 'shippingLocation',
      title: (
        <FormattedMessage id='wantedBoard.shippingLocation' defaultMessage='Shipping Location' />
      ),
      width: 200
    },
    {
      name: 'conforming',
      title: (
        <FormattedMessage id='wantedBoard.conforming' defaultMessage='Confirming' />
      ),
      width: 200
    },
    {
      name: 'postExpiry',
      title: (
        <FormattedMessage id='wantedBoard.postExpiry' defaultMessage='Post Expiry' />
      ),
      width: 200
    }
  ]

  useEffect(async () => {
    const { allPostsFilters } = props

    if (allPostsFilters) {
      setState(allPostsFilters)
      const filter = allPostsFilters.filterValue
      if (filter) {
        props.datagrid.clear()
        handleFiltersValue(filter, props)
      }
    } else {
      const filter = state.filterValue
      if (filter) {
        props.datagrid.clear()
        handleFiltersValue(filter, props)
      }
    }

    let openId = Router.router?.query?.id ? parseInt(Router.router?.query?.id) : 0
    openId = openId && !isNaN(openId) ? openId : 0

    if (openId) {
      try {
        const { value } = await props.getWantedBoard(openId)
        const row = value.data
        let province = row?.deliveryProvince?.name
        let country = row?.deliveryCountry?.name
        const payload = {
          id: row.id,
          rawData: row,
          productName: row?.productSearchPattern || row?.element?.productGroup?.name || row?.element?.casProduct?.name || row?.element?.casProduct?.casIndexName,
          quantity: `${row?.quantity} ${row?.unit?.nameAbbreviation}`,
          shippingLocation: province ? province + ", " + country : country ? country : "",
          conforming: row?.conforming ? 'Yes' : 'No',
          postExpiry: moment(row.expiresAt).format(getLocaleDateFormat())
        }
        props.openInfoModal(payload)
      } catch (e) {
        console.error(e)
      }
    }
  }, [])

  const handleFilterChangeInputSearch = (data, props, state, setState) => {
    const filter = {
      ...state.filterValue,
      [data.name]: data.value
    }
    setState({ ...state, filterValue: filter })
    props.handleVariableSave('allPostsFilters', { ...state, filterValue: filter })
    handleFiltersValue(filter, props)
  }

  const handleFiltersValue = debounce((filter, props) => {
    const { datagrid } = props
    datagrid.setSearch(filter, true, 'pageFilters')
  }, 300)

  const getActions = () => {
    const { intl } = props
    let { formatMessage } = intl
    return [
      {
        text: formatMessage({
          id: 'wantedBoard.info',
          defaultMessage: 'Info'
        }),
        callback: async row => {
          try {
            props.openInfoModal(row)
          } catch (e) {
            console.error(e)
          }
        }
      },
      {
        text: formatMessage({
          id: 'wantedBoard.respond',
          defaultMessage: 'Respond'
        }),
        callback: async row => {
          try {
            props.openConfirmModal(row)
          } catch (e) {
            console.error(e)
          }
        }
      }
    ]
  }

  const getRows = rows => {
    return rows.map(r => {
      return {
        ...r,
        productName: <ActionCell row={r} getActions={getActions} content={r.productName} />
      }
    })
  }

  const renderContent = () => {
    const {
      datagrid,
      rows,
      openedConfirmModal,
      openedInfoModal,
      openedRespondModal,
      openRespondModal,
      popupValues,
      intl: {formatMessage},
      editID,
      openGlobalAddFormName,
      openGlobalAddForm,
      loading
    } = props

    return (
      <>
        {openedConfirmModal && <ConfirmModal />}
        {openedInfoModal && <InfoModal {...popupValues} />}
        {openedRespondModal && <RespondModal id={editID} />}
        {openGlobalAddFormName === 'inventory-my-listings-wanted' && (
          <ModalDetailContainer
            openGlobalAddForm={openGlobalAddForm}
            wantedRespond
            onCreated={productOffer => {
              openGlobalAddForm('')
              openRespondModal(productOffer)
            }}
          />
        )}
        <div style={{ padding: '10px 0' }}>
          <CustomRowDiv>
            <div>
              <div className='column' style={{ width: '340px' }}>
                <Input
                  style={{ width: '370px' }}
                  icon='search'
                  name='searchInput'
                  value={state.filterValue.searchInput}
                  placeholder={formatMessage({
                    id: 'settings.tables.products.search',
                    defaultMessage: 'Search product by name, code'
                  })}
                  onChange={(e, data) => handleFilterChangeInputSearch(data, props, state, setState)}
                />
              </div>
            </div>
            <div>
              <ColumnSettingButton divide={false} />
            </div>
          </CustomRowDiv>
        </div>
        <div className='flex stretched listings-wrapper' style={{ padding: '10px 0 20px 0' }}>
          <ProdexGrid
            tableName={'wanted_board_listings_grid'}
            {...datagrid.tableProps}
            rows={getRows(rows)}
            columns={columns}
            rowSelection={false}
            showSelectionColumn={false}
            loading={datagrid.tableProps.loading || loading}
          />
        </div>
      </>
    )
  }

  return (
    <>
      <Container fluid style={{ padding: '10px 30px 0 30px' }} className='flex stretched'>
        {renderContent()}
      </Container>
    </>
  )
}

export default injectIntl(AllPosts)
