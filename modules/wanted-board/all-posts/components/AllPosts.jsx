import { useEffect, useState } from 'react'
import { Container, Input } from 'semantic-ui-react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { debounce } from 'lodash'
import ProdexGrid from '../../../../components/table'
import InfoModal from './Modals/Info'
import RespondModal from './RespondModal/index'
import { CustomRowDiv } from '../../styles'
import ActionCell from '../../../../components/table/ActionCell'
import ColumnSettingButton from '../../../../components/table/ColumnSettingButton'

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
        <FormattedMessage id='wantedBoard.productName' defaultMessage='PRODUCT NAME' />
      ),
      width: 500,
      allowReordering: false
    },
    {
      name: 'quantity',
      title: (
        <FormattedMessage id='wantedBoard.quantity' defaultMessage='QTY.NEEDED' />
      ),
      width: 200
    },
    {
      name: 'shippingLocation',
      title: (
        <FormattedMessage id='wantedBoard.shippingLocation' defaultMessage='SHIPPING LOCATION' />
      ),
      width: 200
    },
    {
      name: 'conforming',
      title: (
        <FormattedMessage id='wantedBoard.conforming' defaultMessage='CONFORMING' />
      ),
      width: 200
    },
    {
      name: 'postExpiry',
      title: (
        <FormattedMessage id='wantedBoard.postExpiry' defaultMessage='POST EXPIRY' />
      ),
      width: 200
    }
  ]

  useEffect(() => {
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
            props.openRespondModal(row)
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
      openedInfoModal,
      openedRespondModal,
      popupValues,
      intl: {formatMessage},
      editID
    } = props

    return (
      <>
        {openedInfoModal && <InfoModal {...popupValues} />}
        {openedRespondModal && <RespondModal id={editID} />}
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
