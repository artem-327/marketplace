import { Table, Grid, Button, Label } from 'semantic-ui-react'
import { FieldArray } from 'formik'
import * as val from 'yup'
import { FormattedMessage, FormattedDate } from 'react-intl'
import { Input, Checkbox } from 'formik-semantic-ui-fixed-validation'
// Components
import UploadAttachment from '../../../inventory/components/upload/UploadAttachment'
// Services
import { getSafe } from '../../../../utils/functions'
import { errorMessages } from '../../../../constants/yupValidation'
// Styles
import { LotsTab, TableWrapper} from '../../styles'

export const initValues = {
    tabLots: [
    {
        orderItemId: 0,
        lots: []
    }
    ]
}

val.addMethod(val.object, 'lessThanOrdered', function (propertyName, message) {
    return this.test('lessThan', message, function (value) {
    if (!value || !value[propertyName]) {
        return true
    }

    const { path } = this
    const options = [...this.parent]
    const amount = value['amount']
    const allocated = options.reduce(function (allocated, option) {
        allocated += option.allocated
        return allocated
    }, 0)

    if (allocated < amount) {
        throw this.createError({
        path: `${path}.${propertyName}`,
        message
        })
    }

    return true
    })
})

val.addMethod(val.object, 'moreThanOrdered', function (propertyName, message) {
    return this.test('moreThan', message, function (value) {
    if (!value || !value[propertyName]) {
        return true
    }

    const { path } = this
    const options = [...this.parent]
    const amount = value['amount']
    const allocated = options.reduce(function (allocated, option) {
        allocated += option.allocated
        return allocated
    }, 0)

    if (allocated > amount) {
        throw this.createError({
        path: `${path}.${propertyName}`,
        message
        })
    }

    return true
    })
})

export const validationScheme = val.object().shape({
    tabLots: val.array().of(
    val.object().shape({
        orderItemId: val.number(),
        lots: val.array().of(
        val
            .object()
            .lessThanOrdered('allocated', errorMessages.lessThanOrdered)
            .moreThanOrdered('allocated', errorMessages.moreThanOrdered)
            .shape({
            allocated: val
                .number(errorMessages.mustBeNumber)
                .min(0, errorMessages.minimum(0))
                .required(errorMessages.requiredMessage),
            amount: val.number(), // helper for allocated validation
            selected: val.bool()
            })
        )
    })
    )
})


const linkAttachment = (lotId, files, data, props) => {
    const { values, setFieldValue, lotNumber, productOfferId } = data
    props.linkAttachment(lotId, files).then(r => {
    const affectedOrderItems = values.tabLots.forEach((tab, tabIndex) => {
        if (tab.productOfferId === productOfferId) {
        const lotIndex = tab.lots.findIndex(lot => lot.lotNumber === lotNumber)
        const attachments = values.tabLots[tabIndex].lots[lotIndex].attachments
        setFieldValue(
            `tabLots[${tabIndex}].lots[${lotIndex}].attachments[${attachments.length ? attachments.length : 0}]`,
            {
            id: r.value.file.id,
            name: r.value.file.name,
            linked: true
            }
        )
        }
    })
    })
}

const removeAttachment = (fileId, data, props) => {
    const { values, setFieldValue } = data
    values.tabLots.forEach((tab, tabIndex) => {
    const lotIndex = tab.lots.findIndex(lot => getSafe(() => lot.attachments[0].id, 0) === fileId)
    if (lotIndex) {
        setFieldValue(`tabLots[${tabIndex}].lots[${lotIndex}].attachments`, [])
    }
    })
    props.removeAttachment(fileId)
}

export const renderTab = (tabIndex, orderItem, lots, setFieldValue, values, props, state, setState) => {
    const { poLots } = props
    const statePoLots = state.poLots
    let tabAvailability = []
    if (statePoLots.length)
    tabAvailability = getSafe(() => statePoLots.find(poLot => poLot.id === orderItem.productOffer).lots, [])

    if (!getSafe(() => poLots.length, 0)) return <></>

    return (
    <LotsTab active={state.activeTab === tabIndex}>
        <Grid style={{ marginTop: '0.5em' }}>
        <Grid.Column width={14}>
            <FormattedMessage
            id='order.assignLots.orderItem.amount'
            defaultMessage='Allocated packages: {allocated} / {amount}'
            values={{ allocated: state.allocated[tabIndex], amount: orderItem.amount }}
            />
            {state.allocated[tabIndex] > orderItem.amount ? (
            <Label circular color='red' empty style={{ marginLeft: '0.5em' }} />
            ) : null}
        </Grid.Column>
        <Grid.Column width={1}>
            <Input
            name={`tabLots[${tabIndex}].orderItemId`}
            inputProps={{ type: 'hidden', defaultValue: orderItem.id }}
            />
        </Grid.Column>
        <Grid.Column width={1}>
            <Input
            name={`tabLots[${tabIndex}].productOfferId`}
            inputProps={{ type: 'hidden', defaultValue: orderItem.productOffer }}
            />
        </Grid.Column>
        </Grid>
        <TableWrapper>
        <Table className='table-fields basic'>
            <Table.Header>
            <Table.Row>
                <Table.HeaderCell></Table.HeaderCell>
                <Table.HeaderCell>
                <FormattedMessage id='order.assignLots.header.lotNumber' defaultMessage='Lot Number' />
                </Table.HeaderCell>
                <Table.HeaderCell textAlign='center'>
                <FormattedMessage id='order.assignLots.header.total' defaultMessage='Total' />
                </Table.HeaderCell>
                <Table.HeaderCell textAlign='center'>
                <FormattedMessage id='order.assignLots.header.available' defaultMessage='Available' />
                </Table.HeaderCell>
                <Table.HeaderCell textAlign='center'>
                <FormattedMessage id='order.assignLots.header.allocated' defaultMessage='Allocated' />
                </Table.HeaderCell>
                <Table.HeaderCell textAlign='center'>
                <FormattedMessage id='order.assignLots.header.mfgDate' defaultMessage='MFG Date' />
                </Table.HeaderCell>
                <Table.HeaderCell textAlign='center'>
                <FormattedMessage id='order.assignLots.header.expirationDate' defaultMessage='Expiration Date' />
                </Table.HeaderCell>
                <Table.HeaderCell textAlign='center'>
                <FormattedMessage id='order.assignLots.header.cOfA' defaultMessage='C of A' />
                </Table.HeaderCell>
            </Table.Row>
            </Table.Header>
            <Table.Body>
            <FieldArray
                name={`tabLots[${tabIndex}].lots`}
                render={arrayHelpers => (
                <>
                    {lots.map((lot, index) => (
                    <Table.Row key={lot.lotNumber}>
                        <Table.Cell>
                        <Input
                            name={`tabLots[${tabIndex}].lots[${index}].amount`}
                            inputProps={{ type: 'hidden', defaultValue: orderItem.amount }}
                        />
                        <Checkbox
                            name={`tabLots[${tabIndex}].lots[${index}].selected`}
                            value={lot.lotNumber}
                            inputProps={{
                            onClick: (e, { checked }) => {
                                setFieldValue(`tabLots[${tabIndex}].lots[${index}].selected`, checked)
                                const stateAllocated = state.allocated
                                const stateAvailability = state.poLots
                                const needAmount = (
                                orderItem.amount - stateAllocated[tabIndex] > 0
                                    ? orderItem.amount - stateAllocated[tabIndex]
                                    : 0
                                )
                                if (checked) {
                                const available = parseInt(
                                    state.poLots
                                    .find(poLot => poLot.id === values.tabLots[tabIndex].productOfferId)
                                    .lots.find(lot => lot.id === values.tabLots[tabIndex].lots[index].id).available
                                )
                                const allocated = available > needAmount ? needAmount : available
                                setFieldValue(`tabLots[${tabIndex}].lots[${index}].allocated`, allocated)
                                stateAllocated[tabIndex] += allocated

                                const newAvailability = stateAvailability.map(po => {
                                    if (po.id === orderItem.productOffer) {
                                    return {
                                        id: po.id,
                                        lots: po.lots.map(pLot => {
                                        if (pLot.id === values.tabLots[tabIndex].lots[index].id) {
                                            return {
                                            id: pLot.id,
                                            available: pLot.available - allocated
                                            }
                                        } else {
                                            return pLot
                                        }
                                        })
                                    }
                                    } else {
                                    return po
                                    }
                                })

                                setState({ ...state, poLots: newAvailability, allocated: stateAllocated })
                                } else {
                                const allocated = values.tabLots[tabIndex].lots[index].allocated
                                setFieldValue(`tabLots[${tabIndex}].lots[${index}].allocated`, 0)
                                stateAllocated[tabIndex] -= allocated

                                const newAvailability = stateAvailability.map(po => {
                                    if (po.id === orderItem.productOffer) {
                                    return {
                                        id: po.id,
                                        lots: po.lots.map(pLot => {
                                        if (pLot.id === values.tabLots[tabIndex].lots[index].id) {
                                            return {
                                            id: pLot.id,
                                            available: parseInt(pLot.available + allocated)
                                            }
                                        } else {
                                            return pLot
                                        }
                                        })
                                    }
                                    } else {
                                    return po
                                    }
                                })

                                setState({ ...state, poLots: newAvailability, allocated: stateAllocated })
                                }
                            },
                            id: `tab${tabIndex}_lot${index}`
                            }}
                        />
                        </Table.Cell>
                        <Table.Cell>{lot.lotNumber}</Table.Cell>
                        <Table.Cell textAlign='center'>{lot.total}</Table.Cell>
                        <Table.Cell textAlign='center'>
                        {getSafe(() => tabAvailability.find(avLot => avLot.id === lot.id).available, 0)}
                        </Table.Cell>
                        <Table.Cell textAlign='center'>
                        <Input
                            name={`tabLots[${tabIndex}].lots[${index}].allocated`}
                            inputProps={{
                            type: 'number',
                            readOnly: getSafe(() => values.tabLots[tabIndex].lots[index].selected, false)
                                ? false
                                : true,
                            defaultValue: lot.allocated,
                            onChange: (e, { value }) => {
                                const origValue = value
                                value = parseInt(value)
                                if (!Number.isInteger(value) || (Number.isInteger(value) && value < 0)) {
                                setFieldValue(
                                    `tabLots[${tabIndex}].lots[${index}].allocated`,
                                    values.tabLots[tabIndex].lots[index].allocated
                                )
                                value = values.tabLots[tabIndex].lots[index].allocated
                                }

                                // manage allocated values
                                let stateAllocated = state.allocated
                                const allocNow = (value - values.tabLots[tabIndex].lots[index].allocated)
                                const available = state.poLots
                                .find(poLot => poLot.id === values.tabLots[tabIndex].productOfferId)
                                .lots.find(lot => lot.id === values.tabLots[tabIndex].lots[index].id).available
                                if (allocNow > available) {
                                setFieldValue(
                                    `tabLots[${tabIndex}].lots[${index}].allocated`,
                                    values.tabLots[tabIndex].lots[index].allocated
                                )
                                } else {
                                stateAllocated[tabIndex] += allocNow

                                // manage availability
                                let stateAvailability = state.poLots
                                const newAvailability = stateAvailability.map(po => {
                                    if (po.id === orderItem.productOffer) {
                                    return {
                                        id: po.id,
                                        lots: po.lots.map(pLot => {
                                        if (pLot.id === values.tabLots[tabIndex].lots[index].id) {
                                            return {
                                            id: pLot.id,
                                            available: pLot.available - allocNow
                                            }
                                        } else {
                                            return pLot
                                        }
                                        })
                                    }
                                    } else {
                                    return po
                                    }
                                })

                                // fix value
                                if (origValue !== '' + value) {
                                    setFieldValue(`tabLots[${tabIndex}].lots[${index}].allocated`, value + 1)
                                    setFieldValue(`tabLots[${tabIndex}].lots[${index}].allocated`, value)
                                }

                                setState({ ...state, poLots: newAvailability, allocated: stateAllocated })
                                }
                            }
                            }}
                        />
                        </Table.Cell>
                        <Table.Cell textAlign='center'>
                        {getSafe(
                            () => (
                            <FormattedDate value={lot.mfgDate.split('T')[0]} />
                            ),
                            'N/A'
                        )}
                        </Table.Cell>
                        <Table.Cell textAlign='center'>
                        {getSafe(
                            () => (
                            <FormattedDate value={lot.expirationDate.split('T')[0]} />
                            ),
                            'N/A'
                        )}
                        </Table.Cell>
                        <Table.Cell textAlign='center'>
                        <UploadAttachment
                            {...props}
                            removeAttachment={fileId => removeAttachment(fileId, { values, setFieldValue })}
                            attachments={getSafe(
                            () => values.tabLots[tabIndex].lots[index].attachments,
                            lot.attachments
                            )}
                            name={`tabLots[${tabIndex}].lots[${index}].attachments`}
                            type={1}
                            lot={lot}
                            filesLimit={1}
                            fileMaxSize={20}
                            onChange={files =>
                            linkAttachment(lot.id, files, {
                                values,
                                setFieldValue,
                                lotNumber: lot.lotNumber,
                                productOfferId: orderItem.productOffer
                            })
                            }
                            data-test={`assign_lots_${index}_attachments`}
                            emptyContent={
                            <FormattedMessage id='global.upUpload' defaultMessage='\u2191 upload' tagName='a' />
                            }
                        />
                        </Table.Cell>
                    </Table.Row>
                    ))}
                </>
                )}
            />
            </Table.Body>
        </Table>
        </TableWrapper>
        <Grid>
        <Grid.Column width={10}></Grid.Column>
        <Grid.Column floated='right' width={3}>
            <Button basic fluid onClick={() => props.closeAssignLots()}>
            <FormattedMessage id='global.cancel' defaultMessage='Cancel' tagName='span' />
            </Button>
        </Grid.Column>
        <Grid.Column floated='right' width={3}>
            <Button primary fluid>
            <FormattedMessage id='order.assignLots' defaultMessage='Assign Lots' tagName='span' />
            </Button>
        </Grid.Column>
        </Grid>
    </LotsTab>
    )
}
