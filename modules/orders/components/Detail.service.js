import moment from 'moment/moment'
import { Button, Icon } from 'semantic-ui-react'
import { FormattedNumber } from 'react-intl'
// Components
import ProdexGrid from '../../../components/table'
import { AttachmentManager } from '../../attachments'
// Constants
import * as OrdersHelper from '../../../components/helpers/Orders'
import { columnsRelatedOrdersDetailDocuments } from '../constants'
import { currencyUSSymbol } from '../../../constants/index'
// Styles
import { CustomDivAddDocument } from './Detail.styles'
// Services
import { getSafe, getFormattedAddress, uniqueArrayByKey, getMimeType } from '../../../utils/functions'
import { getLocaleDateFormat } from '../../../components/date-format'

export const getOrder = (state, ownProps) => {
    
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
    
    const prepareDetail = (data, type) => {
        if (typeof data.id === 'undefined') return {}
    
        const subtotal = getSafe(() => data.cfPriceSubtotal, 0)
        const totalPriceWithShipping = getSafe(() => data.cfPriceTotal, 0)
        const orderItems = getSafe(() => data.orderItems, [])
    
        let paymentNetDays = data.cfPaymentTerms && data.cfPaymentTerms.split(' ')
        paymentNetDays = paymentNetDays.length ? parseInt(paymentNetDays[paymentNetDays.length - 1], 10) : 0
    
        return {
        ...data,
        paymentTerms: data.paymentTerms,
        paymentNetDays,
        companyEin:
            type === 'sales'
            ? data.buyerCompanyTin
                ? data.buyerCompanyTin
                : 'N/A'
            : data.sellerCompanyTin
            ? data.sellerCompanyTin
            : 'N/A',
        acceptanceDate:
            typeof data.acceptanceDate !== 'undefined' ? moment(data.acceptanceDate).toDate().toLocaleString() : 'N/A',
        amount: (
            <FormattedNumber
            minimumFractionDigits={2}
            maximumFractionDigits={2}
            children={val => <>{`${val} ${currencyUSSymbol}`}</>}
            value={subtotal}
            />
        ),
        buyerRejectionDate:
            typeof data.buyerRejectionDate !== 'undefined' ? moment(data.buyerRejectionDate).toDate().toLocaleString() : null,
        carrier: data.shippingCourierName ? data.shippingCourierName : 'N/A',
        chemicalName: orderItems.map(d => (d.companyGenericProductName ? d.companyGenericProductName : 'N/A')),
        confirmationDate:
            typeof data.confirmationDate !== 'undefined' ? moment(data.confirmationDate).toDate().toLocaleString() : 'N/A',
        contactEmail: data.sellerCompanyContactEmail ? data.sellerCompanyContactEmail : 'N/A',
        contactNumber: data.sellerCompanyContactPhone ? data.sellerCompanyContactPhone : 'N/A',
        createdBy: data.buyerName ? data.buyerName : 'N/A',
        creditStatus: OrdersHelper.getCreditStatus(data.creditReviewStatus),
        counterOrderId: getSafe(() => data.counterOrderId, 0),
        deliveryDate:
            typeof data.deliveryDate !== 'undefined' ? moment(data.deliveryDate).toDate().toLocaleString() : 'N/A',
        echoFee: (
            <FormattedNumber
            minimumFractionDigits={2}
            maximumFractionDigits={2}
            children={val => <>{`${val} ${currencyUSSymbol}`}</>}
            value={data.echoFee ? data.echoFee : 0}
            />
        ),
        freight: (
            <FormattedNumber
            minimumFractionDigits={2}
            maximumFractionDigits={2}
            children={val => <>{`${val} ${currencyUSSymbol}`}</>}
            value={data.shippingPrice ? data.shippingPrice : 0}
            />
        ),
        cfTax: getSafe(() => data.cfTax > 0, '') ? (
            <FormattedNumber
            minimumFractionDigits={2}
            maximumFractionDigits={2}
            children={val => <>{`${val} ${currencyUSSymbol}`}</>}
            value={data.cfTax}
            />
        ) : null,
        grossProfit: (
            <FormattedNumber
            minimumFractionDigits={2}
            maximumFractionDigits={2}
            children={val => <>{`${val} ${currencyUSSymbol}`}</>}
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
        frsId: data.shippingAddressEpaFrsId
            ? (
            data.shippingAddressEpaFacilityUrl
                ? (<a href={data.shippingAddressEpaFacilityUrl} target='_blank'>{data.shippingAddressEpaFrsId}</a>)
                : data.shippingAddressEpaFrsId
            ) : '',
        epaRegion: data.shippingAddressEpaRegion,
        subtotal: (
            <FormattedNumber
            minimumFractionDigits={2}
            maximumFractionDigits={2}
            children={val => <>{`${val} ${currencyUSSymbol}`}</>}
            value={subtotal}
            />
        ), //"$" + totalPrice.formatMoney(2),
        terms: data.cfPaymentTerms ? data.cfPaymentTerms : 'N/A',
        total: (
            <FormattedNumber
            minimumFractionDigits={2}
            maximumFractionDigits={2}
            children={val => <>{`${val} ${currencyUSSymbol}`}</>}
            value={totalPriceWithShipping}
            />
        ), //"$" + totalPriceWithShipping.formatMoney(2),
        totalPkg: orderItems.map(d => d.pkgAmount),
        unit: orderItems.map(d => (d.packagingUnit ? d.packagingUnit.nameAbbreviation : 'N/A')),
        unitPrice: orderItems.map(d =>
            d.pricePerUOM ? (
            <FormattedNumber
                minimumFractionDigits={3}
                maximumFractionDigits={3}
                children={val => <>{`${val} ${currencyUSSymbol}`}</>}
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
                children={val => <>{`${val} ${currencyUSSymbol}`}</>}
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
        attachments: getSafe(() => data.attachments, []),
        brokerageFee:
            data?.brokerageFee && +data.brokerageFee > 0 ? (
            <FormattedNumber
                minimumFractionDigits={2}
                maximumFractionDigits={2}
                children={val => <>{`${val} ${currencyUSSymbol}`}</>}
                value={data.brokerageFee}
            />
            ) : null,
        transactionFee:
            data?.transactionFee && +data.transactionFee > 0 ? (
            <FormattedNumber
                minimumFractionDigits={2}
                maximumFractionDigits={2}
                children={val => <>{`${val} ${currencyUSSymbol}`}</>}
                value={data.transactionFee}
            />
            ) : null
        }
    }
    return prepareDetail(state.orders.detail, ownProps.router.query.type)
}

export const getRows = (attachments, props, setAttachmentRows) => {
    if (attachments && attachments.length) {
      return attachments.map(row => {
        return {
          id: row.id,
          documentTypeId: getSafe(() => row.documentType.id, 'N/A'),
          documentName: (
            <Button as='a' onClick={() => downloadAttachment(row.name, row.id, props)}>
              <Icon name='download' />
              {row.name}
            </Button>
          ),
          documentType: getSafe(() => row.documentType.name, 'N/A'),
          documentDate: row.issuedAt
            ? getSafe(() => moment(row.issuedAt).format(getLocaleDateFormat()), 'N/A')
            : 'N/A',
          documentIssuer: getSafe(() => row.issuer, 'N/A'),
          documentActions: (
              <>
            <a href='#' onClick={() => downloadAttachment(row.name, row.id, props)} title={'Download'}>
              <Icon name='file' className='positive' />
            </a>
            <a href='#' onClick={() => {
                if (row.canBeUnlinked) {
                    unlinkAttachmentFromOrder(row.id, props, setAttachmentRows)
                }
            }}
               style={{marginLeft: '5px'}} title={row.canBeUnlinked ? 'Unlink from order' : 'Cannot unlink this document'}>
              <Icon name='trash alternate outline' className='positive' disabled={!row.canBeUnlinked} />
            </a>
              </>
          )
        }
      })
    } else {
      return []
    }
}

export const downloadOrder = async (props) => {
    let endpointType = props.router.query.type === 'sales' ? 'sale' : props.router.query.type
    let pdf = await props.downloadPdf(endpointType, props.order.id)

    const element = document.createElement('a')
    const file = new Blob([pdf.value.data], { type: 'application/pdf' })
    let fileURL = URL.createObjectURL(file)

    element.href = fileURL
    element.download = `${props.router.query.type}-order-${props.order.id}.pdf`
    document.body.appendChild(element) // Required for this to work in FireFox
    element.click()
}

export const handleClick = (index, activeIndexes, setActiveIndexes) => {
    let newActiveIndexes = activeIndexes.map((s, _i) => {
      return index === _i ? !s : s
    })
    setActiveIndexes(newActiveIndexes)
}

export const attachDocumentsManager = async (newDocuments, props, replaceRow, setReplaceRow, setOpenDocumentsPopup, setIsOpenManager, setAttachmentRows) => {
    const { linkAttachmentToOrder, order, getPurchaseOrder, getSaleOrder } = props
    setOpenDocumentsPopup(false)

    if (replaceRow) {
      await handleUnlink(replaceRow)
      setReplaceRow('')
    }
    const docArray = uniqueArrayByKey(newDocuments, 'id')

    try {
      if (docArray.length) {
        await docArray.forEach(doc => {
          linkAttachmentToOrder({ attachmentId: doc.id, orderId: order.id })
        })
      }
      let response = {}
      if (getSafe(() => props.router.query.type, false) === 'sales') {
        response = await getSaleOrder(order.id)
      } else {
        response = await getPurchaseOrder(order.id)
      }

      setIsOpenManager(false)
      setAttachmentRows(getRows(getSafe(() => response.value.data.attachments, []), props, setAttachmentRows))
    } catch (error) {
      console.error(error)
    }
}

export const replaceExiting = (row, setIsOpenManager, setReplaceRow) => {
    setIsOpenManager(true)
    setReplaceRow(row)
}

export const handleUnlink = async (row, props, setAttachmentRows) => {
    const { unlinkAttachmentToOrder, order, getSaleOrder, getPurchaseOrder } = props
    const query = {
      attachmentId: row.id,
      orderId: order.id
    }
    try {
      await unlinkAttachmentToOrder(query)
      let response = {}
      if (getSafe(() => props.router.query.type, false) === 'sales') {
        response = await getSaleOrder(order.id)
      } else {
        response = await getPurchaseOrder(order.id)
      }

      setAttachmentRows(getRows(getSafe(() => response.value.data.attachments, []), props, setAttachmentRows))
    } catch (err) {
      console.error(err)
    }
}

export const downloadAttachment = async (documentName, documentId, props) => {
    const element = await prepareLinkToAttachment(documentId, props)

    element.download = documentName
    document.body.appendChild(element) // Required for this to work in FireFox
    element.click()
}

export const prepareLinkToAttachment = async (documentId, props) => {
    let downloadedFile = await props.downloadAttachment(documentId)
    const fileName = extractFileName(downloadedFile.value.headers['content-disposition'])
    const mimeType = fileName && getMimeType(fileName)
    const element = document.createElement('a')
    const file = new Blob([downloadedFile.value.data], { type: mimeType })
    let fileURL = URL.createObjectURL(file)
    element.href = fileURL

    return element
}

export const extractFileName = contentDispositionValue => {
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

export const openRelatedPopup = (orderItem, name, setOpenDocumentsPopup, setOpenDocumentsAttachments, setDocumentsPopupProduct, setOrderItemId) => {
    setOpenDocumentsPopup(true)
    setOpenDocumentsAttachments(orderItem.attachments)
    setDocumentsPopupProduct(name)
    setOrderItemId(orderItem.id)
}

export const getRelatedDocumentsContent = (props, openDocumentsAttachments, setOpenDocumentsAttachments, isOpenManager, setIsOpenManager, orderItemId) => {
    const rowsDocuments = openDocumentsAttachments.map(att => ({
      id: att.id,
      documentName: (
        <Button as='a' onClick={() => downloadAttachment(att.name, att.id, props)}>
          {att.name}
        </Button>
      ),
      documentType: att.documentType.name,
      documentDate: 'N/A',
      documentIssuer: 'N/A',
      download: (
        <a href='#' onClick={() => downloadAttachment(att.name, att.id, props)}>
          <Icon name='file' className='positive' />
        </a>
      )
    }))
    return (
      <>
        <CustomDivAddDocument>
          <div>
            <AttachmentManager
              documentTypeIds={[]}
              isOpenManager={isOpenManager}
              asModal
              returnSelectedRows={rows => linkAttachment(rows, orderItemId, props, openDocumentsAttachments, setOpenDocumentsAttachments)}
              returnCloseAttachmentManager={val => setIsOpenManager(false)}
            />
          </div>
        </CustomDivAddDocument>
        <ProdexGrid
          loading={props.loadingRelatedDocuments}
          tableName='related_orders'
          columns={columnsRelatedOrdersDetailDocuments}
          rows={rowsDocuments}
        />
      </>
    )
}

export const linkAttachment = async (files, orderItemId, props, openDocumentsAttachments, setOpenDocumentsAttachments) => {
    const { order, getSaleOrder, getPurchaseOrder } = props

    const docArray = uniqueArrayByKey(files, 'id')
    let newAttachments = openDocumentsAttachments
    try {
      if (docArray.length) {
        await docArray.forEach(doc => {
          props.linkAttachmentToOrderItem({ attachmentId: doc.id, orderItemId: orderItemId })
          doc && newAttachments.push(doc)
        })
      }
      setOpenDocumentsAttachments(newAttachments)
      setTimeout(async () => {
        if (getSafe(() => props.router.query.type, false) === 'sales') {
          await getSaleOrder(order.id)
        } else {
          await getPurchaseOrder(order.id)
        }
      }, 250)
    } catch (error) {
      console.error(error)
    } finally {
    }
}

const unlinkAttachmentFromOrder = async (attachmentId, props, setAttachmentRows) => {
    try {
        const orderId = props.router.query.id
        await props.unlinkAttachmentToOrder({ attachmentId, orderId })
        const order = getSafe(() => props.router.query.type, false) === 'sales' ?
            await props.getSaleOrder(orderId) :
            await props.getPurchaseOrder(orderId)

        setAttachmentRows(getRows(getSafe(() => order.value.data.attachments, []), props, setAttachmentRows))
    } catch (error) {
        console.error(error)
    }
}
