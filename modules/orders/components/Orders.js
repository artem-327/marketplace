import React, { Component } from 'react'
import { injectIntl, FormattedMessage, FormattedDate, FormattedNumber } from 'react-intl'
import { Modal, Menu, Header, Container, Icon, Button } from 'semantic-ui-react'
import styled from 'styled-components'

import SubMenu from '~/src/components/SubMenu'
import Spinner from '~/src/components/Spinner/Spinner'
import ProdexGrid from '~/components/table'
import { actions } from 'react-redux-form'
import { OrderFilter } from '~/modules/filter'
import { getSafe } from '~/utils/functions'
import { filterPresets } from '~/modules/filter/constants/filter'
import { currency } from '~/constants/index'
import FilterTags from '~/modules/filter/components/FitlerTags'

const TitleOrderId = styled.div`
  font-size: larger;
  font-weight: 500;
`

class Orders extends Component {
  state = {
    columns: [
      {
        name: 'id',
        title: (
          <FormattedMessage id='order.orderId' defaultMessage='Order ID'>
            {text => text}
          </FormattedMessage>
        ),
        width: 120,
        sortPath: 'Order.id'
      },
      {
        name: 'globalStatus',
        title: (
          <FormattedMessage id='order.cfGlobalStatus' defaultMessage='Status'>
            {text => text}
          </FormattedMessage>
        ),
        width: 120,
        sortPath: 'Order.cfGlobalStatus'
      },
      {
        name: 'date',
        title: (
          <FormattedMessage id='order.date' defaultMessage='Order Date'>
            {text => text}
          </FormattedMessage>
        ),
        width: 120,
        sortPath: 'Order.orderDate'
      },
      {
        name: 'customerName',
        title: (
          <FormattedMessage id='order.vendor' defaultMessage='Vendor'>
            {text => text}
          </FormattedMessage>
        ),
        width: 120,
        sortPath: 'Order.sellerCompanyName'
      }, // ! ! ? seller vs purchaser
      {
        name: 'productName',
        title: (
          <FormattedMessage id='order.productName' defaultMessage='Product Name'>
            {text => text}
          </FormattedMessage>
        ),
        width: 160
      },
      {
        name: 'orderStatus',
        title: (
          <FormattedMessage id='order' defaultMessage='Order'>
            {text => text}
          </FormattedMessage>
        ),
        width: 120
      },
      {
        name: 'shippingStatus',
        title: (
          <FormattedMessage id='order.shipping' defaultMessage='Shipping'>
            {text => text}
          </FormattedMessage>
        ),
        width: 120
      },
      {
        name: 'reviewStatus',
        title: (
          <FormattedMessage id='order.review' defaultMessage='Review'>
            {text => text}
          </FormattedMessage>
        ),
        width: 120
      },
      {
        name: 'creditStatus',
        title: (
          <FormattedMessage id='order.credit' defaultMessage='Credit'>
            {text => text}
          </FormattedMessage>
        ),
        width: 120
      },
      {
        name: 'paymentStatus',
        title: (
          <FormattedMessage id='order.payment' defaultMessage='Payment'>
            {text => text}
          </FormattedMessage>
        ),
        width: 120
      },
      {
        name: 'bl',
        title: (
          <FormattedMessage id='order.bl' defaultMessage='B/L'>
            {text => text}
          </FormattedMessage>
        ),
        width: 80
      },
      {
        name: 'sds',
        title: (
          <FormattedMessage id='order.sds' defaultMessage='SDS'>
            {text => text}
          </FormattedMessage>
        ),
        width: 80
      },
      {
        name: 'cofA',
        title: (
          <FormattedMessage id='order.cOfa' defaultMessage='C of A'>
            {text => text}
          </FormattedMessage>
        ),
        width: 80
      },
      {
        name: 'related',
        title: (
          <FormattedMessage id='order.related' defaultMessage='Related'>
            {text => text}
          </FormattedMessage>
        ),
        width: 80
      },
      {
        name: 'orderTotal',
        title: (
          <FormattedMessage id='order.orderTotal' defaultMessage='Order Total'>
            {text => text}
          </FormattedMessage>
        ),
        width: 160,
        sortPath: 'Order.cfPriceSubtotal'
      }
    ],
    sorting: {
      sortDirection: '',
      sortPath: ''
    },

    LastEndpointType: '',

    filters: {
      All: { filters: [] },
      Draft: {
        filters: [
          {
            operator: 'EQUALS',
            path: 'Order.cfGlobalStatus',
            values: [`Draft`]
          }
        ]
      },
      Pending: {
        filters: [
          {
            operator: 'EQUALS',
            path: 'Order.cfGlobalStatus',
            values: [`Pending`]
          }
        ]
      },
      'In Transit': {
        filters: [
          {
            operator: 'EQUALS',
            path: 'Order.cfGlobalStatus',
            values: [`In Transit`]
          }
        ]
      },
      Review: {
        filters: [
          {
            operator: 'EQUALS',
            path: 'Order.cfGlobalStatus',
            values: [`Review`]
          }
        ]
      },
      Credit: {
        filters: [
          {
            operator: 'EQUALS',
            path: 'Order.cfGlobalStatus',
            values: [`Credit`]
          }
        ]
      },
      Completed: {
        filters: [
          {
            operator: 'EQUALS',
            path: 'Order.cfGlobalStatus',
            values: [`Completed`]
          }
        ]
      },
      'To Ship': {
        filters: [
          {
            operator: 'EQUALS',
            path: 'Order.cfGlobalStatus',
            values: [`To Ship`]
          }
        ]
      },
      Returned: {
        filters: [
          {
            operator: 'EQUALS',
            path: 'Order.cfGlobalStatus',
            values: [`Returned`]
          }
        ]
      },
      Declined: {
        filters: [
          {
            operator: 'EQUALS',
            path: 'Order.cfGlobalStatus',
            values: [`Declined`]
          }
        ]
      },
      Cancelled: {
        filters: [
          {
            operator: 'EQUALS',
            path: 'Order.cfGlobalStatus',
            values: [`Cancelled`]
          }
        ]
      }
    },
    openModal: false,
    columnsRelatedOrders: [
      {
        name: 'documentNumber',
        title: (
          <FormattedMessage id='order.related.documentNumber' defaultMessage='PO #'>
            {text => text}
          </FormattedMessage>
        ),
        width: 120
      },
      {
        name: 'type',
        title: (
          <FormattedMessage id='order.cfGlobalStatus' defaultMessage='Status'>
            {text => text}
          </FormattedMessage>
        ),
        width: 90
      },
      {
        name: 'issuedAt',
        title: (
          <FormattedMessage id='order.date' defaultMessage='Order Date'>
            {text => text}
          </FormattedMessage>
        ),
        width: 90
      },
      {
        name: 'issuerCompanyName',
        title: (
          <FormattedMessage id='order.vendor' defaultMessage='Vendor'>
            {text => text}
          </FormattedMessage>
        ),
        width: 100
      }, // ! ! ? seller vs purchaser
      {
        name: 'cfPriceTotal',
        title: (
          <FormattedMessage id='order.related.cfPriceTotal' defaultMessage='Total'>
            {text => text}
          </FormattedMessage>
        ),
        width: 100
      }
    ]
  }

  getMimeType = documentName => {
    const documentExtension = documentName.substr(documentName.lastIndexOf('.') + 1)

    switch (documentExtension) {
      case 'doc':
        return 'application/msword'
      case 'docx':
        return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      case 'ppt':
        return 'application/vnd.ms-powerpoint'
      case 'pptx':
        return 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
      case 'xls':
        return 'application/vnd.ms-excel'
      case 'xlsx':
        return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      case 'gif':
        return 'image/gif'
      case 'png':
        return 'image/png'
      case 'jpg':
      case 'jpeg':
        return 'image/jpeg'
      case 'svg':
        return 'image/svg'
      case 'pdf':
        return 'application/pdf'
      case '7z':
        return 'application/x-7z-compressed'
      case 'zip':
        return 'application/zip'
      case 'tar':
        return 'application/x-tar'
      case 'rar':
        return 'application/x-rar-compressed'
      case 'xml':
        return 'application/xml'
      default:
        return 'text/plain'
    }
  }

  loadData(endpointType, filterData) {
    this.props.dispatch(actions.change('forms.filter.status', filterData.status))
    this.props.datagrid.loadData(this.state.filters[filterData.status])
    this.props.loadData(endpointType, filterData)
  }

  failedWrapper = value => {
    return <span style={{ color: '#DB2828' }}>{value}</span>
  }

  getRows = () => {
    return this.props.rows.map(row => ({
      ...row,
      globalStatus: row.globalStatus === 'Failed' ? this.failedWrapper(row.globalStatus) : row.globalStatus,
      paymentStatus: row.paymentStatus === 'Failed' ? this.failedWrapper(row.paymentStatus) : row.paymentStatus,
      bl: <Icon name='file' className='unknown' />, // unknown / positive / negative
      sds: <Icon name='file' className='unknown' />,
      cofA: <Icon name='file' className='unknown' />,
      related:
        row.accountingDocumentsCount > 0 ? (
          <span onClick={() => this.openModalWindow(row.id)}>
            <Icon
              style={{
                color: 'green',
                fontSize: '1.45rem',
                opacity: '0.7',
                cursor: 'pointer',
                lineHeight: 'normal'
              }}
              className='invoice file'
            />
          </span>
        ) : (
          <Icon
            style={{
              fontSize: '1.45rem',
              opacity: '0.7',
              lineHeight: 'normal'
            }}
            className='invoice file'
          />
        )
    }))
  }

  async openModalWindow(orderId) {
    await this.props.getRelatedOrders(orderId)
    this.setState({ openModal: true })
  }

  handleFilterApply = payload => {
    let statusFilters = getSafe(() => this.state.filters[this.props.filterData.status].filters, [])
    statusFilters.forEach(f => payload.filters.push(f))

    this.props.datagrid.setFilter(payload)
  }

  componentDidMount() {
    const { endpointType, filterData } = this.props
    this.props.loadData(endpointType, { status: 'All' })
  }

  componentDidUpdate(prevProps) {
    const { endpointType } = this.props
    if (prevProps.endpointType !== this.props.endpointType) {
      this.props.loadData(endpointType, { status: 'All' })
    }
  }

  handleFilterClear = () => {
    this.props.applyFilter({ filters: [] })
    this.props.datagrid.setFilter({ filters: [] })
  }

  downloadAttachment = async (documentName, documentId) => {
    const element = await this.prepareLinkToAttachment(documentId)

    element.download = documentName
    document.body.appendChild(element) // Required for this to work in FireFox
    element.click()
  }

  prepareLinkToAttachment = async documentId => {
    let downloadedFile = await this.props.downloadAttachmentPdf(documentId)
    const fileName = this.extractFileName(downloadedFile.value.headers['content-disposition'])
    const mimeType = fileName && this.getMimeType(fileName)
    const element = document.createElement('a')
    const file = new Blob([downloadedFile.value.data], { type: mimeType })
    let fileURL = URL.createObjectURL(file)
    element.href = fileURL

    return element
  }

  extractFileName = contentDispositionValue => {
    var filename = ''
    if (contentDispositionValue && contentDispositionValue.indexOf('attachment') !== -1) {
      var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
      var matches = filenameRegex.exec(contentDispositionValue)
      if (matches != null && matches[1]) {
        filename = matches[1].replace(/['"]/g, '')
      }
    }
    return filename
  }

  getContent = () => {
    const { relatedOrders } = this.props
    const rowsRelatedOrders = relatedOrders.map(order => ({
      documentNumber: (
        <Button as='a' onClick={() => this.downloadAttachment(order.documentNumber, order.id)}>
          <Icon name='download' />
          {order.documentNumber}
        </Button>
      ),
      type: order.type,
      issuedAt: getSafe(() => <FormattedDate value={order.issuedAt.split('T')[0]} />, 'N/A'),
      issuerCompanyName: order.issuerCompanyName,
      cfPriceTotal: <FormattedNumber style='currency' currency={currency} value={order.cfPriceTotal} />
    }))
    return (
      <>
        <TitleOrderId>
          <FormattedMessage id='order.related.orderId' defaultMessage='Order ID: '>
            {text => text}
          </FormattedMessage>
          {`${relatedOrders[0].relatedOrder}`}
        </TitleOrderId>
        <ProdexGrid
          hideSettingsIcon={true}
          tableName='related_orders'
          columns={this.state.columnsRelatedOrders}
          rows={rowsRelatedOrders}
        />
      </>
    )
  }

  render() {
    const {
      endpointType,
      /*match, rows,*/ isFetching,
      activeStatus,
      queryType,
      router,
      datagrid,
      intl: { formatMessage }
    } = this.props

    const { columns } = this.state
    let ordersType = queryType.charAt(0).toUpperCase() + queryType.slice(1)
    return (
      <div id='page' className='flex stretched scrolling'>
        {this.props && this.props.relatedOrders && this.props.relatedOrders.length > 0 && (
          <Modal
            size='tiny'
            closeIcon
            onClose={() => this.setState({ openModal: false })}
            centered={true}
            open={this.state.openModal}
            onClose={() => this.setState({ openModal: false })}>
            <Modal.Header>
              <FormattedMessage id='order.related.table' defaultMessage='RELATED ORDERS'>
                {text => text}
              </FormattedMessage>
            </Modal.Header>
            <Modal.Content scrolling>{this.getContent()}</Modal.Content>
          </Modal>
        )}
        <Container fluid style={{ padding: '0 32px' }}>
          <Menu pointing secondary horizontal>
            <Menu.Item
              name={formatMessage({
                id: 'order.menu.all',
                defaultMessage: 'ALL'
              })}
              onClick={() =>
                this.loadData(endpointType, {
                  ...this.props.filterData,
                  status: 'All'
                })
              }
              active={!activeStatus || activeStatus === 'All'}
              data-test='menu_orders_all'
            />
            {endpointType === 'purchase' && (
              <Menu.Item
                name={formatMessage({
                  id: 'order.menu.draft',
                  defaultMessage: 'Draft'
                })}
                onClick={() =>
                  this.loadData(endpointType, {
                    ...this.props.filterData,
                    status: 'Draft'
                  })
                }
                active={activeStatus === 'Draft'}
                data-test='menu_orders_draft'
              />
            )}
            <Menu.Item
              name={formatMessage({
                id: 'order.menu.pending',
                defaultMessage: 'PENDING'
              })}
              onClick={() =>
                this.loadData(endpointType, {
                  ...this.props.filterData,
                  status: 'Pending'
                })
              }
              active={activeStatus === 'Pending'}
              data-test='menu_orders_pending'
            />
            <Menu.Item
              name={formatMessage({
                id: 'order.menu.inTransit',
                defaultMessage: 'IN TRANSIT'
              })}
              onClick={() =>
                this.loadData(endpointType, {
                  ...this.props.filterData,
                  status: 'In Transit'
                })
              }
              active={activeStatus === 'In Transit'}
              data-test='menu_orders_inTransit'
            />
            <Menu.Item
              name={formatMessage({
                id: 'order.menu.review',
                defaultMessage: 'REVIEW'
              })}
              onClick={() =>
                this.loadData(endpointType, {
                  ...this.props.filterData,
                  status: 'Review'
                })
              }
              active={activeStatus === 'Review'}
              data-test='menu_orders_review'
            />
            <Menu.Item
              name={formatMessage({
                id: 'order.menu.credit',
                defaultMessage: 'CREDIT'
              })}
              onClick={() =>
                this.loadData(endpointType, {
                  ...this.props.filterData,
                  status: 'Credit'
                })
              }
              active={activeStatus === 'Credit'}
              data-test='menu_orders_credit'
            />
            <Menu.Item
              name={formatMessage({
                id: 'order.menu.completed',
                defaultMessage: 'COMPLETED'
              })}
              onClick={() =>
                this.loadData(endpointType, {
                  ...this.props.filterData,
                  status: 'Completed'
                })
              }
              active={activeStatus === 'Completed'}
              data-test='menu_orders_completed'
            />
            <Menu.Item
              name={formatMessage({
                id: 'order.menu.toShip',
                defaultMessage: 'TO SHIP'
              })}
              onClick={() =>
                this.loadData(endpointType, {
                  ...this.props.filterData,
                  status: 'To Ship'
                })
              }
              active={activeStatus === 'To Ship'}
              data-test='menu_orders_ship'
            />
            <Menu.Item
              name={formatMessage({
                id: 'order.menu.returned',
                defaultMessage: 'RETURNED'
              })}
              onClick={() =>
                this.loadData(endpointType, {
                  ...this.props.filterData,
                  status: 'Returned'
                })
              }
              active={activeStatus === 'Returned'}
              data-test='menu_orders_returned'
            />
            <Menu.Item
              name={formatMessage({
                id: 'order.menu.declined',
                defaultMessage: 'DECLINED'
              })}
              onClick={() =>
                this.loadData(endpointType, {
                  ...this.props.filterData,
                  status: 'Declined'
                })
              }
              active={activeStatus === 'Declined'}
              data-test='menu_orders_declined'
            />
            <Menu.Item
              name={formatMessage({
                id: 'order.menu.cancelled',
                defaultMessage: 'Cancelled'
              })}
              onClick={() =>
                this.loadData(endpointType, {
                  ...this.props.filterData,
                  status: 'Cancelled'
                })
              }
              active={activeStatus === 'Cancelled'}
              data-test='menu_orders_cancelled'
            />
            <Menu.Item>
              <FilterTags datagrid={datagrid} />
            </Menu.Item>
            <Menu.Menu position='right'>
              <Menu.Item
                name={formatMessage({
                  id: 'order.menu.filter',
                  defaultMessage: 'Filter'
                })}>
                <SubMenu filterType={filterPresets.ORDERS} />
              </Menu.Item>
            </Menu.Menu>
          </Menu>
        </Container>
        <Container fluid style={{ padding: '20px 32px 0 32px' }} className='flex stretched'>
          <Header as='h1' size='medium'>
            {activeStatus
              ? activeStatus.toUpperCase()
              : formatMessage({
                  id: 'order.menu.all',
                  defaultMessage: 'ALL'
                })}{' '}
            {`${ordersType.toUpperCase()} ${formatMessage({
              id: 'order.orders',
              defaultMessage: 'ORDERS'
            })}`}
          </Header>
          <OrderFilter
            ordersType={ordersType.toLowerCase()}
            sortPath={this.state.sorting.sortPath}
            sortDirection={this.state.sorting.sortDirection}
            onApply={payload => this.handleFilterApply(payload)}
          />
          {isFetching ? (
            <Spinner />
          ) : (
            <ProdexGrid
              tableName='orders_grid'
              columns={columns}
              {...datagrid.tableProps}
              loading={datagrid.loading}
              rows={this.getRows()}
              // onSortingChange={sorting => sorting.sortPath && this.setState({ sorting })}
              rowActions={[
                {
                  text: formatMessage({
                    id: 'orders.detail',
                    defaultMessage: 'Detail'
                  }),
                  callback: row => router.push(`/orders/detail?type=${ordersType.toLowerCase()}&id=${row.id}`)
                }
              ]}
              /* COMMENTED #30916
            onRowClick={(e, row) => {
              const targetTag = e.target.tagName.toLowerCase()
              if (targetTag !== 'input' && targetTag !== 'label' && targetTag !== 'i') {
                router.push(`/orders/detail?type=${ordersType.toLowerCase()}&id=${row.id}`)
              }
            }}*/
            />
          )}
        </Container>
      </div>
    )
  }
}

// FilterTags.propTypes = {
//   filter: array,
//   onClick: func,
//   filters: arrayOf(
//     shape({
//       description: string,
//       indexes: arrayOf(number),
//       tagDescription: arrayOf(string),
//       valuesDescription: arrayOf(string)
//     })
//   )
// }

export default injectIntl(Orders)
