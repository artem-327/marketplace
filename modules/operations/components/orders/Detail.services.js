import moment from 'moment/moment'
import { Button, Icon } from 'semantic-ui-react'
import { FormattedMessage, FormattedNumber } from 'react-intl'
// Components
import ProdexGrid from '../../../../components/table'
// Services
import { getLocaleDateFormat } from '../../../../components/date-format'
import { getSafe, getFormattedAddress, getMimeType } from '../../../../utils/functions'
import * as OrdersHelper from '../../../../components/helpers/Orders'
// Constants
import { currency } from '../../../../constants/index'

/**
 * action Required function used in DetailContainer
 * @category Operations
 * @services
 */
export const actionRequired = (data) => {
    // return statuses code
    return getSafe(() => data.orderStatus.toString(), 0) + getSafe(() => data.shippingStatus.toString(), 0)
}

const getReturnAddress = (data) => {
    let returnAddr = ''
    if (data.returnAddressStreet) {
      returnAddr = data.returnAddressStreet + ', '
    }
    if (data.returnAddressCity) {
      returnAddr += data.returnAddressCity + ', '
    }
    if (data.returnAddressCountry) {
      returnAddr += data.returnAddressCountry
    }
    return returnAddr
}

/**
 * prepare Detail function used in DetailContainer
 * @category Operations
 * @services
 */
export const prepareDetail = (data, type = 'sales') => {
    if (typeof data?.id === 'undefined') return {}
  
    const subtotal = getSafe(() => data.cfPriceSubtotal, 0)
    const totalPriceWithShipping = getSafe(
      () => data.cfPriceTotal,
      getSafe(() => data.cfPriceSubtotal, 0)
    )
    const orderItems = getSafe(() => data.orderItems, [])
  
    return {
      ...data,
      companyEin: data.buyerCompanyTin ? data.buyerCompanyTin : 'N/A',
      acceptanceDate:
        typeof data.acceptanceDate !== 'undefined' ? moment(data.acceptanceDate).toDate().toLocaleString() : 'N/A',
      amount: (
        <FormattedNumber
          minimumFractionDigits={2}
          maximumFractionDigits={2}
          style='currency'
          currency={currency}
          value={subtotal}
        />
      ),
      buyerRejectionDate:
        typeof data.buyerRejectionDate !== 'undefined' ? moment(data.buyerRejectionDate).toDate().toLocaleString() : null,
      carrier: data.shippingCourierName ? data.shippingCourierName : 'N/A',
      chemicalName: orderItems.map(d => (d.echoProductName ? d.echoProductName : 'N/A')),
      confirmationDate:
        typeof data.confirmationDate !== 'undefined' ? moment(data.confirmationDate).toDate().toLocaleString() : 'N/A',
      contactEmail: data.sellerCompanyContactEmail ? data.sellerCompanyContactEmail : 'N/A',
      contactNumber: data.sellerCompanyContactPhone ? data.sellerCompanyContactPhone : 'N/A',
      createdBy: data.buyerName ? data.buyerName : 'N/A',
      creditStatus: OrdersHelper.getCreditStatus(data.creditStatus),
      deliveryDate:
        typeof data.deliveryDate !== 'undefined' ? moment(data.deliveryDate).toDate().toLocaleString() : 'N/A',
      echoFee: getSafe(() => data.echoFee, 0),
      freight: (
        <FormattedNumber
          minimumFractionDigits={2}
          maximumFractionDigits={2}
          style='currency'
          currency={currency}
          value={data.shippingPrice ? data.shippingPrice : 0}
        />
      ),
      grossProfit: (
        <FormattedNumber
          minimumFractionDigits={2}
          maximumFractionDigits={2}
          style='currency'
          currency={currency}
          value={data.totalPriceWithShipping ? data.totalPriceWithShipping : 0}
        />
      ), // ! ! TBD
      id: data.id,
      incoterms: 'FOB', // ! ! TBD
      orderDate: data.orderDate && moment(data.orderDate).toDate().toLocaleString(),
      orderStatus: OrdersHelper.getOrderStatus(data.orderStatus),
      orderType: type === 'sales' ? 'Sales' : 'Purchase',
      packaging: orderItems.map(d =>
        d.packagingSize && d.packagingType && d.packagingUnit
          ? d.packagingSize + ' ' + d.packagingUnit.name.toLowerCase() + ' ' + d.packagingType.name
          : 'N/A'
      ),
      paymentInitiationDate:
        typeof data.paymentInitiationDate !== 'undefined'
          ? moment(data.paymentInitiationDate).toDate().toLocaleString()
          : 'N/A',
      paymentReceivedDate:
        typeof data.paymentReceivedDate !== 'undefined'
          ? moment(data.paymentReceivedDate).toDate().toLocaleString()
          : 'N/A',
      paymentSendDate:
        typeof data.paymentSendDate !== 'undefined' ? moment(data.paymentSendDate).toDate().toLocaleString() : 'N/A',
      paymentStatus: OrdersHelper.getPaymentStatus(data.paymentStatus),
      pickUpAddress: getFormattedAddress({
        street: data.returnAddressStreet,
        city: data.returnAddressCity,
        zip: data.returnAddressZip,
        province: data.returnAddressProvince,
        country: data.returnAddressCountry
      }),
      productCode: orderItems.map(d => (d.companyGenericProductCode ? d.companyGenericProductCode : 'N/A')),
      productName: orderItems.map(d => (d.companyGenericProductName ? d.companyGenericProductName : 'N/A')),
      productOfferIds: data.orderItems.map(orderItem => orderItem.productOffer),
      proNumber: 'N/A', // ! ! TBD
      quantityOrdered: orderItems.map(d =>
        d.packagingSize && d.packagingUnit
          ? `${(parseFloat(d.pkgAmount) * parseFloat(d.packagingSize)).toFixed(2)} ${d.packagingUnit.nameAbbreviation}`
          : 'N/A'
      ),
      refundDate: typeof data.refundDate !== 'undefined' ? moment(data.refundDate).toDate().toLocaleString() : null,
      returnDeliveryDate:
        typeof data.returnDeliveryDate !== 'undefined' ? moment(data.returnDeliveryDate).toDate().toLocaleString() : null,
      returnShipDate:
        typeof data.returnShipDate !== 'undefined' ? moment(data.returnShipDate).toDate().toLocaleString() : null,
      returnStatus: OrdersHelper.getReturnStatus(data.returnStatus),
      returnTo: data.sellerCompanyName,
      returnAddressName: data.returnAddressContactName,
      returnAddressContactEmail: data.returnAddressContactEmail,
      returnAddressContactPhone: data.returnAddressContactPhone,
      returnAddress: getReturnAddress(data),
      returnCourierName: data.returnCourierName,
      reviewStatus: OrdersHelper.getReviewStatus(data.reviewStatus),
      sellerRejectionDate:
        typeof data.sellerRejectionDate !== 'undefined'
          ? moment(data.sellerRejectionDate).toDate().toLocaleString()
          : null,
      service: 'N/A', // ! ! TBD
      shipDate: typeof data.shipDate !== 'undefined' ? moment(data.shipDate).toDate().toLocaleString() : 'N/A',
      shippingContact: data.sellerCompanyContactName ? data.sellerCompanyContactName : 'N/A',
      shippingStatus: OrdersHelper.getShippingStatus(data.shippingStatus),
      shipTo: data.shippingAddressContactName,
      shipToAddress: getFormattedAddress({
        street: data.shippingAddressStreet,
        city: data.shippingAddressCity,
        zip: data.shippingAddressZip,
        province: data.shippingAddressProvince,
        country: data.shippingAddressCountry
      }),
      shipToEmail: data.shippingAddressContactEmail,
      shipToPhone: data.shippingAddressContactPhone,
      subtotal: (
        <FormattedNumber
          minimumFractionDigits={2}
          maximumFractionDigits={2}
          style='currency'
          currency={currency}
          value={subtotal}
        />
      ), //"$" + totalPrice.formatMoney(2),
      terms: data.cfPaymentTerms ? data.cfPaymentTerms : 'N/A',
      total: (
        <FormattedNumber
          minimumFractionDigits={2}
          maximumFractionDigits={2}
          style='currency'
          currency={currency}
          value={totalPriceWithShipping}
        />
      ), //"$" + totalPriceWithShipping.formatMoney(2),
      totalPkg: orderItems.map(d => d.pkgAmount),
      unit: orderItems.map(d => (d.packagingUnit ? d.packagingUnit.nameAbbreviation : 'N/A')),
      unitCost: orderItems.map(d => {
        let sum = 0
        if (d?.productOffers && d?.productOffers?.length) {
          //calculate average
          for (let product of d.productOffers) {
            if (product.costPerUOM) {
              sum += parseInt(product.costPerUOM)
            }
          }
          return sum / d.productOffers.length
        }
        return sum
      }),
      unitPrice: orderItems.map(d =>
        d.pricePerUOM ? (
          <FormattedNumber
            minimumFractionDigits={3}
            maximumFractionDigits={3}
            style='currency'
            currency={currency}
            value={d.pricePerUOM}
          />
        ) : (
          'N/A'
        )
      ),
      itemTotal: orderItems.map(d =>
        d.priceSubtotal ? (
          <FormattedNumber
            minimumFractionDigits={2}
            maximumFractionDigits={2}
            style='currency'
            currency={currency}
            value={d.priceSubtotal}
          />
        ) : (
          'N/A'
        )
      ),
      //<FormattedNumber style='currency' currency={currency} value={0} />, //"$" + getSafe(() => data.orderItems[0].price, 0).formatMoney(2),
      // Vendor or Customer
      paymentType: type === 'sales' ? 'Customer' : 'Vendor',
      paymentAddress:
        type === 'sales'
          ? data.buyerCompanyAddressStreet +
            ', ' +
            data.buyerCompanyAddressCity +
            ', ' +
            data.buyerCompanyAddressZip +
            ' ' +
            data.buyerCompanyAddressCountry
          : data.sellerCompanyAddressStreet +
            ', ' +
            data.sellerCompanyAddressCity +
            ', ' +
            data.sellerCompanyAddressZip +
            ' ' +
            data.sellerCompanyAddressCountry,
      paymentEmail: type === 'sales' ? data.buyerCompanyContactEmail : data.sellerCompanyContactEmail,
      paymentName: type === 'sales' ? data.buyerCompanyName : data.sellerCompanyName,
      paymentPhone: type === 'sales' ? data.buyerCompanyContactPhone : data.sellerCompanyContactPhone,
      paymentContact: type === 'sales' ? data.buyerCompanyContactName : data.sellerCompanyContactName,
      shippingTrackingCode: data.shippingTrackingCode ? data.shippingTrackingCode : '',
      isTrackingNumberEditable: data.trackingNumberEditable ? data.trackingNumberEditable : false,
      isReturnTrackingNumberEditable: data.returnTrackingNumberEditable ? data.returnTrackingNumberEditable : false,
      returnShippingTrackingCode: data.returnShippingTrackingCode ? data.returnShippingTrackingCode : '',
      note: getSafe(() => data.note, ''),
      attachments: getSafe(() => data.attachments, [])
    }
}


/**
 * columns(Related Orders Detail Documents) used in Detail Component
 * @category Operations
 * @services
 */
export const columnsRelatedOrdersDetailDocuments = [
  {
    name: 'documentName',
    title: (
      <FormattedMessage id='order.detail.documents.name' defaultMessage='Document #' />
    ),
    width: 150
  },
  {
    name: 'documenType',
    title: (
      <FormattedMessage id='order.detail.documents.type' defaultMessage='Type' />
    ),
    width: 150
  },
  {
    name: 'documenDate',
    title: (
      <FormattedMessage id='order.detail.documents.date' defaultMessage='Document Date' />
    ),
    width: 150
  },
  {
    name: 'documenIssuer',
    title: (
      <FormattedMessage id='order.detail.documents.issuer' defaultMessage='Issuer' />
    ),
    width: 150
  },
  {
    name: 'download',
    title: (
      <FormattedMessage id='global.download' defaultMessage='Download' />
    ),
    width: 150,
    align: 'center'
  }
]

/**
 * download Order function used in Detail Component
 * @category Operations
 * @services
 */
export const downloadOrder = async (props) => {
  let endpointType = 'sale'
  let pdf = await props.downloadPdf(endpointType, props.order.id)

  const element = document.createElement('a')
  const file = new Blob([pdf.value.data], { type: 'application/pdf' })
  let fileURL = URL.createObjectURL(file)

  element.href = fileURL
  element.download = `${endpointType}-order-${props.order.id}.pdf`
  document.body.appendChild(element) // Required for this to work in FireFox
  element.click()
}

/**
 * handle Click function used in Detail Component
 * @category Operations
 * @services
 */
export const handleClick = (titleProps, state, setState) => {
  const { index } = titleProps
  const { activeIndexes } = state

  activeIndexes[index] = activeIndexes[index] ? false : true

  setState({ ...state, activeIndexes })
}

const downloadAttachment = async (documentName, documentId, props) => {
  const element = await prepareLinkToAttachment(documentId, props)

  element.download = documentName
  document.body.appendChild(element) // Required for this to work in FireFox
  element.click()
}

const prepareLinkToAttachment = async (documentId, props) => {
  let downloadedFile = await props.downloadAttachment(documentId)
  const fileName = extractFileName(downloadedFile.value.headers['content-disposition'])
  const mimeType = fileName && getMimeType(fileName)
  const element = document.createElement('a')
  const file = new Blob([downloadedFile.value.data], { type: mimeType })
  let fileURL = URL.createObjectURL(file)
  element.href = fileURL

  return element
}

const extractFileName = contentDispositionValue => {
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

/**
 * get Rows function used in Detail Component
 * @category Operations
 * @services
 */
export const getRows = (attachments, props) => {
  if (attachments && attachments.length) {
    return attachments.map(row => {
      return {
        id: row.id,
        documentTypeId: getSafe(() => row.documentType.id, 'N/A'),
        documentName: (
          <Button as='a' onClick={() => downloadAttachment(row.name, row.id, props)}>
            {row.name}
          </Button>
        ),
        documenType: getSafe(() => row.documentType.name, 'N/A'),
        documenDate: row.expirationDate
          ? getSafe(() => moment(row.expirationDate).format(getLocaleDateFormat()), 'N/A')
          : 'N/A',
        documenIssuer: getSafe(() => row.issuer, 'N/A'),
        download: (
          <a href='#' onClick={() => downloadAttachment(row.name, row.id, props)}>
            <Icon name='file' className='positive' />
          </a>
        )
      }
    })
  } else {
    return []
  }
}

/**
 * open Related Popup function used in Detail Component
 * @category Operations
 * @services
 */
export const openRelatedPopup = (attachments, name, state, setState) => {
  setState({
    ...state,
    openDocumentsPopup: true,
    openDocumentsAttachments: attachments,
    documentsPopupProduct: name
  })
}

/**
 * get Related Documents Content function used in Detail Component
 * @category Operations
 * @services
 */
export const getRelatedDocumentsContent = (props, state) => {
  const {
    intl: { formatMessage }
  } = props
  let { openDocumentsAttachments } = state

  const rowsDocuments = openDocumentsAttachments.map(att => ({
    id: att.id,
    documentName: (
      <Button as='a' onClick={() => downloadAttachment(att.name, att.id, props)}>
        {att.name}
      </Button>
    ),
    documenType: att.documentType.name,
    documenDate: 'N/A',
    documenIssuer: 'N/A',
    download: (
      <a href='#' onClick={() => downloadAttachment(att.name, att.id, props)}>
        <Icon name='file' className='positive' />
      </a>
    )
  }))
  return (
    <ProdexGrid
      loading={state.submitting}
      tableName='related_orders'
      columns={columnsRelatedOrdersDetailDocuments}
      rows={rowsDocuments}
    />
  )
}
