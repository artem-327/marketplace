import { FormattedMessage } from 'react-intl'
import { Input, Button } from 'formik-semantic-ui-fixed-validation'
import * as val from 'yup'
import { debounce } from 'lodash'
import Router from 'next/router'
import {
  Icon,
  Segment,
  Header,
  Divider,
  Grid,
  GridRow,
  GridColumn,
  Table,
  Accordion,
  Message,
  Popup,
  Dropdown as DropdownMenu
} from 'semantic-ui-react'
// Services
import { errorMessages, dateValidation } from '../../../../constants/yupValidation'
import confirm from '../../../../components/Confirmable/confirm'
import { getSafe, generateToastMarkup, getMimeType } from '../../../../utils/functions'
// Styles
import {
  CustomPaddedColumn,
  ResponsiveColumn,
  TopMargedColumn,
  GridHeader,
  InnerRow,
  HeaderMixtures
} from './MyListings.styles'
// Components
import { AttachmentManager } from '../../../attachments'


// validation array
let tabs = []
// 1st tab
tabs.push([
  'inStock',
  'product',
  'processingTimeDays',
  'doesExpire',
  'pkgAvailable',
  'validityDate',
  'minimumRequirement',
  'minimum',
  'splits',
  'priceTiers',
  'pricingTiers',
  'warehouse'
])
// 2nd tab
tabs.push(['costs', 'lots', 'origin', 'touchedLot'])
// 3rd tab
tabs.push([])

/**
 * initial Values for Add or Edit Inventory Form
 * @category Inventory - My Listings
 * @method
 */
export const initValues = {
    additionalType: 'Unspecified',
    additional: [],
    assayMin: '',
    assayMax: '',
    costs: [],
    doesExpire: false,
    inStock: true,
    lots: [
      {
        lotNumber: 'Lot #1',
        pkgAvailable: 1,
        manufacturedDate: '',
        expirationDate: ''
      }
    ],
    minimumRequirement: true,
    minimum: 1,
    multipleLots: false,
    origin: null,
    quantity: 1,
    priceTiers: 1,
    product: '',
    productCondition: null,
    productForm: null,
    productGrades: [],
    processingTimeDays: 1,
    processingTimeDW: 1,
    processingTimeNum: 1,
    splits: 1,
    touchedLot: false,
    tradeName: '',
    trackSubCosts: true,
    validityDate: '',
    warehouse: null
}

val.addMethod(val.object, 'uniqueProperty', function (propertyName, message) {
    return this.test('unique', message, function (value) {
    if (!value || !value[propertyName]) {
        return true
    }

    const { path } = this
    const options = [...this.parent]
    const currentIndex = options.indexOf(value)

    const subOptions = options.slice(0, currentIndex)

    if (subOptions.some(option => option[propertyName] === value[propertyName])) {
        throw this.createError({
        path: `${path}.${propertyName}`,
        message
        })
    }

    return true
    })
})

val.addMethod(val.number, 'divisibleBy', function (ref, message) {
    return this.test({
    name: 'divisibleBy',
    exclusive: false,
    message: message || '${path} must be divisible by ${reference}',
    params: {
        reference: ref.path
    },
    test: function (value) {
        const divisedBy = parseInt(this.resolve(ref))
        if (!divisedBy || isNaN(divisedBy)) return false

        return !(value % divisedBy)
    }
    })
})

val.addMethod(val.string, 'minDateComparedTo', function (propertyName, message) {
    return this.test('minDateComparedTo', message, function (value) {
    const comparedDate = this.parent[propertyName]
    if (!value || !comparedDate) {
        return true
    }

    const valueInt = parseInt(value.split('-').join(''))
    const comparedInt = parseInt(comparedDate.split('-').join(''))
    if (valueInt < comparedInt) {
        return false
    }

    return true
    })
})

/**
 * Validation of form in Add or Edit Inventory Form
 * @category Inventory - My Listings
 * @method
 */
export const validationScheme = val.object().shape({
    costs: val.array().of(
    val.object().shape({
        description: val.string(),
        lot: val.number().moreThan(-1, errorMessages.lotHasToBeSelected).required(errorMessages.requiredMessage),
        cost: val
        .number()
        .nullable()
        .moreThan(0, errorMessages.greaterThan(0))
        .required(errorMessages.requiredMessage)
        .test('maxdec', errorMessages.maxDecimals(3), val => {
            return !val || val.toString().indexOf('.') === -1 || val.toString().split('.')[1].length <= 3
        })
        .typeError(errorMessages.requiredMessage)
    })
    ),
    inStock: val.bool().required(errorMessages.requiredMessage),
    product: val.string().required(errorMessages.requiredMessage),
    processingTimeDays: val.number().required(errorMessages.requiredMessage),
    doesExpire: val.bool(),
    quantity: val
    .number()
    .typeError(errorMessages.mustBeNumber)
    .nullable()
    .moreThan(0, errorMessages.greaterThan(0))
    .required(errorMessages.requiredMessage)
    .integer(errorMessages.integer),
    validityDate: val.string().matches(/[0-9]{4}\-[0-9]{2}\-[0-9]{2}/, { message: errorMessages.invalidDate }),
    lots: val
    .array()
    .of(
        val
        .object()
        .uniqueProperty('lotNumber', errorMessages.lotUnique)
        .shape({
            lotNumber: val.string().nullable().required(errorMessages.requiredMessage),
            pkgAvailable: val
            .number()
            .nullable()
            .moreThan(0, errorMessages.greaterThan(0))
            .required(errorMessages.requiredMessage)
            .integer(errorMessages.integer)
            .typeError(errorMessages.mustBeNumber),
            manufacturedDate: dateValidation(false),
            expirationDate: dateValidation(false).concat(
            val.string().minDateComparedTo('manufacturedDate', '> than MFG Date')
            )
        })
    )
    .nullable(),
    minimumRequirement: val.bool(),
    minimum: val
    .number()
    .nullable()
    .divisibleBy(val.ref('splits'), 'Value is not divisible by Splits')
    .moreThan(0, errorMessages.greaterThan(0)),
    splits: val.number().nullable().moreThan(0, errorMessages.greaterThan(0)),
    origin: val.number().nullable().moreThan(0, errorMessages.invalidString),
    priceTiers: val.number(),
    pricingTiers: val.array().of(
    val
        .object()
        .uniqueProperty('quantityFrom', 'Quantity has to be unique')
        .shape({
        quantityFrom: val
            .number()
            .typeError(errorMessages.mustBeNumber)
            .nullable()
            .moreThan(0, errorMessages.greaterThan(0))
            .required(errorMessages.requiredMessage),
        price: val
            .number()
            .typeError(errorMessages.mustBeNumber)
            .nullable()
            .moreThan(0, errorMessages.greaterThan(0))
            .required(errorMessages.requiredMessage)
            .test('maxdec', errorMessages.maxDecimals(3), val => {
            return !val || val.toString().indexOf('.') === -1 || val.toString().split('.')[1].length <= 3
            }),
        manuallyModified: val.number().min(0).max(1)
        })
    ),
    touchedLot: val.bool(),
    warehouse: val
    .number(errorMessages.requiredMessage)
    .nullable(errorMessages.required)
    .moreThan(0, errorMessages.requiredMessage)
    .required(errorMessages.requiredMessage),
    assayMin: val
    .number()
    .nullable()
    .min(0, errorMessages.minimum(0))
    .max(100, errorMessages.maximum(100))
    .test('match', errorMessages.minUpToMax, function (assayMin) {
        return typeof this.parent.assayMax === 'undefined' || assayMin <= this.parent.assayMax
    }),
    assayMax: val
    .number()
    .nullable()
    .min(0, errorMessages.minimum(0))
    .max(100, errorMessages.maximum(100))
    .test('match', errorMessages.maxAtLeastMin, function (assayMax) {
        return typeof this.parent.assayMin === 'undefined' || assayMax >= this.parent.assayMin
    })
})


const accClick = (e, titleProps, state, setState) => {
    const { index } = titleProps
    const { activeIndex } = state
    const newIndex = activeIndex === index ? -1 : index

    setState({ ...state, activeIndex: newIndex })
}

/**
 * Get Processing Times in Add or Edit Inventory Form
 * @category Inventory - My Listings
 * @method
 */
export const getProcessingTimes = () => {
    let processingTimes = []

    for (let i = 1; i <= 10; i++) {
    processingTimes.push({
        value: i,
        key: i,
        text: i
    })
    }
    return processingTimes
}

/**
 * Get Price Tiers in Add or Edit Inventory Form
 * @category Inventory - My Listings
 * @method
 */
export const getPriceTiers = max => {
    let priceTiers = []

    for (let i = 1; i <= max; i++) {
    priceTiers.push({
        value: i,
        key: i,
        text: i
    })
    }

    return priceTiers
}

/**
 * Switch Tab in Add or Edit Inventory Form
 * @category Inventory - My Listings
 * @method
 */
export const switchTab = (newTab, values, setFieldValue, state, setState) => {
    let lotAmount = values.lots.length === 0 ? parseInt(values.pkgAvailable) : 0
    if (newTab === 1 && lotAmount > 0) {
    setFieldValue('lots[0].lotNumber', '1')
    setFieldValue('lots[0].pkgAvailable', lotAmount)
    setState({
        ...state,
        activeTab: newTab
    })
    } else {
    setState({
        ...state,
        activeTab: newTab
    })
    }
}

const prepareLinkToAttachment = async (documentName, documentId, props) => {
    let downloadedFile = await props.downloadAttachment(documentId)
    const mimeType = getMimeType(documentName)

    const element = document.createElement('a')
    const file = new Blob([downloadedFile.value.data], { type: mimeType })
    let fileURL = URL.createObjectURL(file)

    element.href = fileURL
    return element
}

const viewAttachment = async (documentName, documentId, props) => {
    const element = await prepareLinkToAttachment(documentName, documentId, props)

    element.target = '_blank'
    document.body.appendChild(element) // Required for this to work in FireFox
    element.click()
}

const downloadAttachment = async (documentName, documentId, props) => {
    const element = await prepareLinkToAttachment(documentName, documentId, props)

    element.download = documentName
    document.body.appendChild(element) // Required for this to work in FireFox
    element.click()
}

const handleQuantities = (setFieldValue, values, splits, quantity = 0) => {
    // be sure that splits is integer and larger than 0
    splits = parseInt(splits)
    if (splits < 1 || isNaN(splits)) return false

    // correct quantity before anchor calculation
    if (quantity > 0) quantity -= splits

    const prices = values.pricingTiers

    for (let i = 0; i < prices.length; i++) {
    const qtyFrom = parseInt(prices[i].quantityFrom)

    // get level quantity (must be larger than previous level quantity)
    let anchor = Math.max(qtyFrom, ++quantity)
    if (!parseInt(values.pricingTiers[i].manuallyModified)) {
        // if not manually modified then change quantity value
        quantity = Math.ceil(anchor / splits) * splits
        setFieldValue(`pricingTiers[${i}].quantityFrom`, quantity)
    } else {
        // if manually modified or loaded from BE then do not change already set value - just remember largest anchor
        quantity = Math.max(qtyFrom, quantity)
    }
    }
}

/**
 * On Splits Change in Add or Edit Inventory Form
 * @category Inventory - My Listings
 * @method
 */
export const onSplitsChange = debounce(async (value, values, setFieldValue, validateForm) => {
    value = parseInt(value)
    const minimum = parseInt(values.minimum)

    handleQuantities(setFieldValue, values, value)

    if (isNaN(value) || isNaN(minimum)) return false

    if (values.minimumRequirement) {
    if (minimum !== value && minimum % value !== 0) {
        await setFieldValue('minimum', value)
    }
    } else {
    await setFieldValue('minimum', value)
    }
    validateForm()
}, 250)

const attachDocuments = (newDocuments, values, setFieldValue) => {
    setFieldValue(`additional`, values.additional.concat(newDocuments))
}

/**
 * Render Edit Documents in Add or Edit Inventory Form
 * @category Inventory - My Listings
 * @method
 */
export const renderEditDocuments = (values, setFieldValue, validateForm, props) => {
    const {
    edit,
    removeAttachment,
    removeAttachmentLink,
    intl: { formatMessage }
    } = props
    const { additional, attachments, lots } = values
    if (typeof attachments === 'undefined' || !edit) return false

    let documents = attachments.concat(
    additional,
    lots.reduce(function (filtered, lot) {
        if (lot.attachments && lot.attachments.length) {
        lot.attachments.map(attachment => {
            let lotAttachment = {
            ...attachment,
            lotId: lot.id
            }
            filtered.push(lotAttachment)
        })
        }
        return filtered
    }, [])
    )

    return (
    <>
        <Grid>
        <GridColumn width={10}>
            <GridHeader as='h3'>
            <FormattedMessage
                id='addInventory.productOfferDocuments'
                defaultMessage='Product Offer has these documents'
            />
            </GridHeader>
        </GridColumn>
        <GridColumn width={6} textAlign='right'>
            <AttachmentManager
            returnSelectedRows={rows => attachDocuments(rows, values, setFieldValue)}
            lockSelection={documents.map(doc => doc.id)}
            />
        </GridColumn>
        </Grid>
        <Table>
        <Table.Header>
            <Table.Row>
            <Table.HeaderCell width={1}></Table.HeaderCell>
            <Table.HeaderCell width={3}>
                <FormattedMessage id='addInventory.documents.type' defaultMessage='Document Type' />
            </Table.HeaderCell>
            <Table.HeaderCell width={3}>
                <FormattedMessage id='addInventory.documents.name' defaultMessage='Document Name' />
            </Table.HeaderCell>
            <Table.HeaderCell width={2}>
                <FormattedMessage id='addInventory.documents.fileType' defaultMessage='File Type' />
            </Table.HeaderCell>
            <Table.HeaderCell width={2}>
                <FormattedMessage id='addInventory.documents.expiration' defaultMessage='Expiration' />
            </Table.HeaderCell>
            <Table.HeaderCell width={5}></Table.HeaderCell>
            </Table.Row>
        </Table.Header>
        <Table.Body>
            {documents.map(document => {
            const lastDot = document.name.lastIndexOf('.')
            const canView = ['pdf', 'png', 'jpg', 'svg', 'gif'].includes(document.name.substr(lastDot + 1))
            return (
                <Table.Row key={document.id}>
                <Table.Cell>
                    <DropdownMenu icon={<Icon name='ellipsis vertical' size='large' />}>
                    <DropdownMenu.Menu>
                        {canView ? (
                        <DropdownMenu.Item
                            text={formatMessage({ id: 'addInventory.documents.view', defaultMessage: 'View' })}
                            onClick={() => viewAttachment(document.name, document.id, props)}
                        />
                        ) : null}
                        <DropdownMenu.Item
                        text={formatMessage({ id: 'global.download', defaultMessage: 'Download' })}
                        onClick={() => downloadAttachment(document.name, document.id, props)}
                        />
                        <DropdownMenu.Item
                        text={formatMessage({ id: 'global.delete', defaultMessage: 'Delete' })}
                        onClick={() =>
                            confirm(
                            formatMessage({ id: 'confirm.deleteAttachment', defaultMessage: 'Delete Attachment' }),
                            formatMessage(
                                {
                                id: 'confirm.deleteItem',
                                defaultMessage: `Do you really want to delete ${document.name}?`
                                },
                                { item: document.name }
                            )
                            ).then(() => {
                            removeAttachment(
                                document.lotId ? true : false, // isLot
                                document.name, // documentName
                                document.id, // documentId
                                document.lotId ? document.lotId : props.id, // connectedId
                                values,
                                setFieldValue
                            )
                            })
                        }
                        />
                    </DropdownMenu.Menu>
                    </DropdownMenu>
                </Table.Cell>
                <Table.Cell>{getSafe(() => document.documentType.name, null)}</Table.Cell>
                <Table.Cell>{document.name.substr(0, lastDot)}</Table.Cell>
                <Table.Cell>{document.name.substr(lastDot)}</Table.Cell>
                <Table.Cell>
                    {getSafe(
                    () => values.lots.find(lot => lot.id === document.lotId).expirationDate,
                    document.documentType.id === 1 ? 'N/A' : ''
                    )}
                </Table.Cell>
                <Table.Cell width={5} textAlign='right'>
                    {document.linked ? null : (
                    <Popup
                        content={
                        <FormattedMessage
                            id='addInventory.unlinked'
                            defaultMessage='The file will be attached to Product Offer after you click the Save button'
                        />
                        }
                        trigger={<Icon name='info circle' size='large' color='blue' />}
                    />
                    )}
                </Table.Cell>
                </Table.Row>
            )
            })}
        </Table.Body>
        </Table>
    </>
    )
}

export const renderPricingTiers = (count, setFieldValue) => {
    let tiers = []

    for (let i = 0; i < count; i++) {
    tiers.push(
        <InnerRow key={i + 1}>
        <TopMargedColumn computer={2} textAlign='center'>
            <label name={`pricingTiers[${i}].level`}>{i + 1}</label>
        </TopMargedColumn>

        <TopMargedColumn computer={1}>
            <Icon name='greater than equal' />
        </TopMargedColumn>

        <GridColumn computer={6} data-test={`add_inventory_quantityFrom_${i}_inp`}>
            <Input
            name={`pricingTiers[${i}].quantityFrom`}
            inputProps={{
                type: 'number',
                min: 1,
                value: null,
                onChange: (e, { value }) => {
                setFieldValue(`pricingTiers[${i}].manuallyModified`, 1)
                if (i === 0) setFieldValue('minimum', value)
                }
            }}
            />
        </GridColumn>

        <GridColumn computer={6} data-test={`add_inventory_price_${i}_inp`}>
            <Input
            name={`pricingTiers[${i}].price`}
            inputProps={{ type: 'number', step: '0.001', min: 0.001, value: null }}
            />
        </GridColumn>

        <GridColumn computer={1} data-test={`add_inventory_manuallyModified_${i}_inp`}>
            <Input name={`pricingTiers[%{i}].manuallyModified`} inputProps={{ type: 'hidden', value: 0 }} />
        </GridColumn>
        </InnerRow>
    )
    }

    return (
    <>
        <InnerRow key={0}>
        <GridColumn computer={2}>
            <FormattedMessage id='addInventory.level' defaultMessage='Level' />
        </GridColumn>
        <GridColumn computer={1} />
        <GridColumn computer={6}>
            <FormattedMessage id='global.quantity' defaultMessage='Quantity' />
        </GridColumn>
        <GridColumn computer={6}>
            <FormattedMessage id='addInventory.fobPrice' defaultMessage='FOB Price' />
        </GridColumn>
        </InnerRow>
        {tiers}
    </>
    )
}

/**
 * Render Product Details in Add or Edit Inventory Form
 * @category Inventory - My Listings
 * @method
 */
export const renderProductDetails = (values, validateForm, setFieldValue, props, state, setState) => {
    const { activeIndex } = state

    const {
    autocompleteData,
    toastManager,
    intl: { formatMessage }
    } = props

    let defaultMessage = values.product ? 'N/A' : ''
    const blendMessage = formatMessage({ id: 'global.blend', defaultMessage: 'Blend' })
    let product = autocompleteData.find(el => el.id === values.product)
    let casProducts = getSafe(() => product.companyGenericProduct.elements, [])

    return (
    <Grid className='product-details' centered>
        <CustomPaddedColumn>
        <Segment attached={values.product ? false : 'top'} style={{ padding: '1.5em' }}>
            <Accordion>
            <Accordion.Title
                active={activeIndex === 0}
                index={0}
                onClick={(e, titleProps) => accClick(e, titleProps, state, setState)}
                data-test='add_inventory_documents_details_btn'>
                <Header as='h4'>
                <FormattedMessage id='addInventory.productDetails' defaultMessage='PRODUCT DETAILS'>
                    {message => (
                    <>
                        {' '}
                        <Icon name={activeIndex === 0 ? 'chevron down' : 'chevron right'} /> {message}{' '}
                    </>
                    )}
                </FormattedMessage>
                </Header>
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 0}>
                <Grid columns={2} className='data-grid'>
                <GridColumn computer={8} mobile={16} className='key'>
                    <FormattedMessage id='addInventory.productName' defaultMessage='Product Name' />
                </GridColumn>
                <GridColumn computer={8} mobile={16}>
                    {getSafe(() => product.companyGenericProduct.name, defaultMessage)}
                </GridColumn>

                <GridColumn computer={8} mobile={16} className='key'>
                    <FormattedMessage id='global.productCode' defaultMessage='Product Code' />
                </GridColumn>
                <GridColumn computer={8} mobile={16}>
                    {getSafe(() => product.companyGenericProduct.code, defaultMessage)}
                </GridColumn>

                <GridColumn computer={8} mobile={16} className='key'>
                    <FormattedMessage id='addInventory.productName.internal' defaultMessage='Internal Product Name' />
                </GridColumn>
                <GridColumn computer={8} mobile={16}>
                    {getSafe(() => product.intProductName, defaultMessage)}
                </GridColumn>

                <GridColumn computer={8} mobile={16} className='key'>
                    <FormattedMessage id='addInventory.productCode.internal' defaultMessage='Internal Product Code' />
                </GridColumn>
                <GridColumn computer={8} mobile={16}>
                    {getSafe(() => product.intProductCode, defaultMessage)}
                </GridColumn>

                <GridColumn computer={8} mobile={16} className='key'>
                    <FormattedMessage id='addInventory.packagingSize' defaultMessage='Packaging Size' />
                </GridColumn>
                <GridColumn computer={8} mobile={16}>
                    {getSafe(() => product.packagingSize, defaultMessage)}
                </GridColumn>

                <GridColumn computer={8} mobile={16} className='key'>
                    <FormattedMessage id='addInventory.packagingUnit' defaultMessage='Packaging Unit' />
                </GridColumn>
                <GridColumn computer={8} mobile={16}>
                    {getSafe(() => product.packagingUnit.name, defaultMessage)}
                </GridColumn>

                <GridColumn computer={8} mobile={16} className='key'>
                    <FormattedMessage id='addInventory.packagingType' defaultMessage='Packaging Type' />
                </GridColumn>
                <GridColumn computer={8} mobile={16}>
                    {getSafe(() => product.packagingType.name, defaultMessage)}
                </GridColumn>

                <GridColumn computer={16} mobile={16}>
                    <Divider />
                    <HeaderMixtures as='h4'>
                    <FormattedMessage id='global.mixtures' defaultMessage='Mixtures' />
                    </HeaderMixtures>
                </GridColumn>

                <GridColumn computer={6} mobile={16} className='key small'>
                    <FormattedMessage id='addInventory.casIndexName' defaultMessage='CAS Index Name' />
                </GridColumn>
                <GridColumn computer={5} mobile={11} className='key small'>
                    <FormattedMessage id='addInventory.casNumber' defaultMessage='CAS Number' />
                </GridColumn>
                <GridColumn computer={5} mobile={5} className='key small' textAlign='center'>
                    <FormattedMessage id='global.minToMax' defaultMessage='Min - Max' />
                </GridColumn>

                {getSafe(
                    () =>
                    casProducts.map(casProduct => (
                        <>
                        <GridColumn computer={6} mobile={16} className='small'>
                            {getSafe(
                            () => (casProduct.proprietary ? casProduct.name : casProduct.casProduct.casIndexName),
                            defaultMessage
                            )}
                        </GridColumn>
                        <GridColumn computer={5} mobile={16} className='small'>
                            {getSafe(
                            () => (casProduct.proprietary ? 'Proprietary' : casProduct.casProduct.casNumber),
                            defaultMessage
                            )}
                        </GridColumn>
                        <GridColumn computer={5} mobile={5} className='small' textAlign='center'>
                            <FormattedMessage
                            id='global.minToMax.data'
                            defaultMessage='{min} - {max}'
                            values={{
                                min: getSafe(() => casProduct.assayMin, defaultMessage),
                                max: getSafe(() => casProduct.assayMax, defaultMessage)
                            }} />
                        </GridColumn>
                        </>
                    )),
                    null
                )}

                <GridColumn computer={16} mobile={16}>
                    <Divider />
                </GridColumn>

                <GridColumn computer={8} mobile={16} className='key'>
                    <FormattedMessage id='addInventory.hazardous' defaultMessage='Hazardous' />
                </GridColumn>
                <GridColumn computer={8} mobile={16}>
                    {values.product && (getSafe(() => product.hazardous.toString(), false) ? 'Yes' : 'No')}
                </GridColumn>

                <GridColumn computer={8} mobile={16} className='key'>
                    <FormattedMessage id='addInventory.unNumber' defaultMessage='UN Number' />
                </GridColumn>
                <GridColumn computer={8} mobile={16}>
                    {getSafe(() => product.companyGenericProduct.cfUnNumber, defaultMessage)}
                </GridColumn>

                <GridColumn computer={8} mobile={16} className='key'>
                    <FormattedMessage id='addInventory.packGrp' defaultMessage='Packaging Group' />
                </GridColumn>
                <GridColumn computer={8} mobile={16}>
                    {getSafe(() => product.companyGenericProduct.cfPackagingGroup, defaultMessage)}
                </GridColumn>

                <GridColumn computer={8} mobile={16} className='key'>
                    <FormattedMessage id='addInventory.hazardClass' defaultMessage='Hazard Class' />
                </GridColumn>
                <GridColumn computer={8} mobile={16}>
                    {getSafe(() => product.companyGenericProduct.cfHazardClass, defaultMessage)}
                </GridColumn>

                <GridColumn computer={8} mobile={16} className='key'>
                    <FormattedMessage id='addInventory.stackable' defaultMessage='Stackable' />
                </GridColumn>
                <GridColumn computer={8} mobile={16}>
                    {product && typeof product.stackable === 'boolean' ? (product.stackable ? 'Yes' : 'No') : ''}
                </GridColumn>

                <GridColumn computer={8} mobile={16} className='key'>
                    <FormattedMessage id='addInventory.freightClass' defaultMessage='Freight Class' />
                </GridColumn>
                <GridColumn computer={8} mobile={16}>
                    {getSafe(() => product.freightClass, defaultMessage)}
                </GridColumn>

                <GridColumn computer={8} mobile={16} className='key'>
                    <FormattedMessage id='addInventory.nmfcNumber' defaultMessage='NMFC Number' />
                </GridColumn>
                <GridColumn computer={8} mobile={16}>
                    {getSafe(() => product.nmfcNumber, defaultMessage)}
                </GridColumn>
                </Grid>
            </Accordion.Content>
            </Accordion>
        </Segment>
        {values.product ? (
            ''
        ) : (
            <Message attached='bottom'>
            <Icon name='info circle outline' size='large' color='blue' />
            <FormattedMessage
                id='addInventory.fillToSearch'
                defaultMessage='Please search product to fill data above.'
            />
            </Message>
        )}

        <Segment className='segment-fixed'>
            <Grid verticalAlign='middle'>
            <GridRow>
                <ResponsiveColumn computer={6} mobile={16}>
                <Button
                    fluid
                    size='big'
                    floated='left'
                    data-test='new_inventory_cancel_btn'
                    onClick={() => goToList(props)}>
                    {formatMessage({ id: 'global.cancel', defaultMessage: 'Cancel' })}
                </Button>
                </ResponsiveColumn>
                <GridColumn computer={10} mobile={16}>
                <Button.Submit
                    fluid
                    size='big'
                    floated='right'
                    data-test='new_inventory_submit_btn'
                    onClick={(e) => {
                    validateForm()
                        .then(r => {
                        // stop when errors found
                        if (Object.keys(r).length) {
                            if (Object.keys(r).some(r => tabs[0].includes(r))) {
                            switchTab(0, values, setFieldValue, state, setState)
                            }
                            if (Object.keys(r).some(r => tabs[1].includes(r))) {
                            switchTab(1, values, setFieldValue, state, setState)
                            }
                            toastManager.add(
                            generateToastMarkup(
                                <FormattedMessage id='addInventory.invalidForm' defaultMessage='Form is invalid' />,
                                <FormattedMessage
                                id='addInventory.fixErrorsBeforeSubmit'
                                defaultMessage='There are errors on current tab. Please, fix them before submit.'
                                />
                            ),
                            {
                                appearance: 'error'
                            }
                            )
                        }
                        })
                        .catch(e => {
                        console.error('CATCH', e)
                        })
                    }}
                    style={{ paddingLeft: '1em', paddingRight: '1em' }}>
                    {formatMessage({
                    id: props.edit ? 'addInventory.editButton' : 'addInventory.addButton',
                    defaultMessage: props.edit ? 'Save Product Offer' : 'Add Product Offer'
                    })}
                </Button.Submit>
                </GridColumn>
            </GridRow>
            </Grid>
        </Segment>
        </CustomPaddedColumn>
    </Grid>
    )
}

/**
 * Reset Form in Add or Edit Inventory Form
 * @category Inventory - My Listings
 * @method
 */
export const resetForm = (props) => {
    props.resetForm(initValues)
}

/**
 * Go to List in Add or Edit Inventory Form
 * @category Inventory - My Listings
 * @method
 */
export const goToList = (props) => {
    resetForm(props)
    Router.push('/inventory/my-listings')
}

const modifyCosts = (setFieldValue, values) => {
    if (!values.costs.length) return true

    for (let i = 0; i < values.costs.length; i++) {
    setFieldValue(
        `costs[${i}].costUom`,
        +(
        parseFloat(values.costs[i].cost) / parseFloat(values.packagingSize) /
        (parseInt(values.costs[i].lot) > 0
            ? parseFloat(values.lots[parseInt(values.costs[i].lot) - 1].pkgAvailable)
            : parseInt(values.costs[i].lot) < 0
            ? 0
            : values.lots.reduce((all, lot) => all + parseFloat(lot.pkgAvailable), 0))
        ).toFixed(3)
    )
    }
}

/**
 * Remove Lot in Add or Edit Inventory Form
 * @category Inventory - My Listings
 * @method
 */
export const removeLot = (lotHelpers, setFieldValue, values, lotIndex) => {
    if (values.costs.length) {
    for (let i = 0; i < values.costs.length; i++) {
        // unset all cost rows if they are using only removed lot
        if ((parseInt(values.costs[i].lot) - 1) === lotIndex) {
        values.costs[i].lot = -1
        setFieldValue(`costs[${i}].lot`, -1)
        }
        // if used lot has higher index then it has to be moved down as one lot will be completely removed
        if ((parseInt(values.costs[i].lot) - 1) > lotIndex) {
        values.costs[i].lot = parseInt(values.costs[i].lot) - 1
        setFieldValue(`costs[${i}].lot`, parseInt(values.costs[i].lot))
        }
    }
    }

    // remove lot row
    lotHelpers.remove(lotIndex)
    values.lots = values.lots.filter((lot, index) => {
    return index !== lotIndex
    })

    // modify costs
    modifyCosts(setFieldValue, values)
}
