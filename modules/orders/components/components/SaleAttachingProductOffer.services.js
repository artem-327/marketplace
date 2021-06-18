import {
    Table,
    Grid,
    Button,
    Label
} from 'semantic-ui-react'
import { FormattedMessage } from 'react-intl'
import { Input, Checkbox } from 'formik-semantic-ui-fixed-validation'
import { FieldArray } from 'formik'
import moment from 'moment'
// Components
import UploadAttachment from '../../../inventory/components/upload/UploadAttachment'
// Services
import { getSafe } from '../../../../utils/functions'
import { getLocaleDateFormat } from '../../../../components/date-format'
// Styles
import { UploadCloudIcon, LotsTabs, DivIcon, AIcon } from '../../styles'
  

export const initValues = {
    tab: [
    {
        groupedOffer: []
    }
    ]
}

const linkAttachment = async (orderItemId, files, setFieldValue, index, props, state) => {
    try {
    const response = await props.addAttachment(files[0], 1, {})
    setFieldValue(`tab[${state.activeTab}].groupedOffer[${index}].attachments[0]`, {
        id: response.value.data.id,
        name: response.value.data.name,
        linked: true,
        isToOrderItem: true
    })

    const query = {
        attachmentId: response.value.data.id,
        orderItemId: orderItemId
    }
    await props.linkAttachmentToOrderItem(query)
    } catch (error) {
    console.error(error)
    }
}

const removeAttachment = (orderItemId, file, props) => {
    const query = {
    attachmentId: file.id,
    orderItemId: orderItemId
    }
    props.removeLinkAttachmentToOrderItem(query)
}

export const renderTab = (tabIndex, offers, setFieldValue, values, props, state, setState) => {
    if (!getSafe(() => offers.length, 0)) return <></>

    return (
    <LotsTabs active={state.activeTab === tabIndex}>
        <Grid style={{ marginTop: '0.5em' }}>
        <Grid.Column width={14}>
            <FormattedMessage
            id='order.groupedOffer.item.amount'
            defaultMessage='Allocated packages: {allocated} / {amount}'
            values={{ allocated: state.sumAllocated[tabIndex], amount: state.sumAvailable[tabIndex] }}
            />
            {state.sumAvailable[tabIndex] !== state.sumAllocated[tabIndex] ? (
            <Label circular color='red' empty style={{ marginLeft: '0.5em' }} />
            ) : null}
        </Grid.Column>
        <Grid.Column width={1}>
            <Input name={`tab[${tabIndex}].itemId`} inputProps={{ type: 'hidden', defaultValue: tabIndex }} />
        </Grid.Column>
        <Grid.Column width={1}>
            <Input
            name={`tab[${tabIndex}].productOfferId`}
            inputProps={{ type: 'hidden', defaultValue: props.orderId }}
            />
        </Grid.Column>
        </Grid>
        <Table className='ui celled table' basic>
        <Table.Header>
            <Table.Row>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell>
                <FormattedMessage id='order.groupedOffer.header.number' defaultMessage='Number' />
            </Table.HeaderCell>
            <Table.HeaderCell textAlign='center'>
                <FormattedMessage id='order.groupedOffer.header.total' defaultMessage='Total' />
            </Table.HeaderCell>
            <Table.HeaderCell textAlign='center'>
                <FormattedMessage id='order.groupedOffer.header.available' defaultMessage='Available' />
            </Table.HeaderCell>
            <Table.HeaderCell textAlign='center'>
                <FormattedMessage id='order.groupedOffer.header.allocated' defaultMessage='Allocated' />
            </Table.HeaderCell>
            <Table.HeaderCell textAlign='center'>
                <FormattedMessage id='order.groupedOffer.header.mfgDate' defaultMessage='MFG Date' />
            </Table.HeaderCell>
            <Table.HeaderCell textAlign='center'>
                <FormattedMessage id='order.groupedOffer.header.expirationDate' defaultMessage='Expiration Date' />
            </Table.HeaderCell>
            <Table.HeaderCell textAlign='center'>
                <FormattedMessage id='order.groupedOffer.header.cOfA' defaultMessage='C of A' />
            </Table.HeaderCell>
            </Table.Row>
        </Table.Header>
        <Table.Body>
            <FieldArray
            name={`tab[${tabIndex}].groupedOffer`}
            render={arrayHelpers => (
                <>
                {offers &&
                    offers.map((offer, index) => (
                    <Table.Row
                        key={offer.id}
                        active={getSafe(() => values.tab[tabIndex].groupedOffer[index].selected, false)}>
                        <Table.Cell>
                        <Checkbox
                            name={`tab[${tabIndex}].groupedOffer[${index}].selected`}
                            value={offer.id}
                            inputProps={{
                            onClick: (e, { checked }) => {
                                setFieldValue(`tab[${tabIndex}].groupedOffer[${index}].selected`, checked)
                                const available = state.available
                                const allocated = state.allocated
                                const sumAvailable = state.sumAvailable
                                const sumAllocated = state.sumAllocated

                                const allocatedIndex = state.allocated[tabIndex][index]
                                const availableIndex = state.available[tabIndex][index]
                                setFieldValue(`tab[${tabIndex}].groupedOffer[${index}].id`, offer.id)
                                let differenceNumber = 0
                                if (sumAvailable[tabIndex] !== sumAllocated[tabIndex]) {
                                differenceNumber = sumAvailable[tabIndex] - sumAllocated[tabIndex]
                                }

                                if (checked) {
                                setFieldValue(`tab[${tabIndex}].groupedOffer[${index}].allocated`, differenceNumber)
                                setFieldValue(`tab[${tabIndex}].groupedOffer[${index}].available`, 0)
                                available[tabIndex][index] = availableIndex - differenceNumber
                                allocated[tabIndex][index] = differenceNumber
                                //sumAvailable[tabIndex] = sumAvailable[tabIndex] - availableIndex
                                sumAllocated[tabIndex] = sumAllocated[tabIndex] + differenceNumber
                                setState({ ...state, available, allocated, sumAllocated })
                                } else {
                                setFieldValue(`tab[${tabIndex}].groupedOffer[${index}].allocated`, 0)
                                setFieldValue(
                                    `tab[${tabIndex}].groupedOffer[${index}].available`,
                                    availableIndex + allocatedIndex
                                )

                                available[tabIndex][index] = availableIndex + allocatedIndex
                                allocated[tabIndex][index] = 0
                                //sumAvailable[tabIndex] = sumAvailable[tabIndex] + allocatedIndex
                                sumAllocated[tabIndex] = sumAllocated[tabIndex] - allocatedIndex
                                setState({ ...state, available, allocated, sumAllocated })
                                }
                            },
                            id: `tab${tabIndex}_groupedOffer${index}`
                            }}
                        />
                        </Table.Cell>
                        <Table.Cell>{offer.id}</Table.Cell>
                        <Table.Cell textAlign='center'>{offer.cfPkgTotal}</Table.Cell>
                        <Table.Cell textAlign='center'>
                        {state.available[tabIndex] && state.available[tabIndex][index]
                            ? state.available[tabIndex][index]
                            : 0}
                        </Table.Cell>
                        <Table.Cell textAlign='center'>
                        <Input
                            name={`tab[${tabIndex}].groupedOffer[${index}].allocated`}
                            inputProps={{
                            type: 'number',
                            readOnly: getSafe(() => values.tab[tabIndex].groupedOffer[index].selected, false)
                                ? false
                                : true,
                            defaultValue:
                                state.allocated &&
                                state.allocated[tabIndex] &&
                                state.allocated[tabIndex][index],
                            max: offer.cfPkgTotal,
                            min: 0,
                            onChange: (e, { value }) => {
                                value = parseInt(value)

                                const available = state.available
                                const allocated = state.allocated
                                //const sumAvailable = state.sumAvailable
                                const sumAllocated = state.sumAllocated

                                const allocatedIndex = state.allocated[tabIndex][index]
                                const availableIndex = state.available[tabIndex][index]
                                const difference = state.allocated[tabIndex][index] - value

                                setFieldValue(`tab[${tabIndex}].groupedOffer[${index}].id`, offer.id)

                                if (value > offer.cfPkgTotal || value < 0) {
                                setFieldValue(`tab[${tabIndex}].groupedOffer[${index}].available`, availableIndex)
                                setFieldValue(`tab[${tabIndex}].groupedOffer[${index}].allocated`, allocatedIndex)
                                } else if (difference) {
                                setFieldValue(
                                    `tab[${tabIndex}].groupedOffer[${index}].available`,
                                    availableIndex + difference
                                )
                                available[tabIndex][index] = availableIndex + difference
                                allocated[tabIndex][index] = allocatedIndex - difference
                                //sumAvailable[tabIndex] = sumAvailable[tabIndex] + difference
                                sumAllocated[tabIndex] = sumAllocated[tabIndex] - difference
                                setState({ ...state, available, allocated, sumAllocated })
                                }
                            }
                            }}
                        />
                        </Table.Cell>
                        <Table.Cell textAlign='center'>
                        {offer.lotManufacturedDate
                            ? moment(offer.lotManufacturedDate).format(getLocaleDateFormat())
                            : 'N/A'}
                        </Table.Cell>
                        <Table.Cell textAlign='center'>
                        {offer.lotExpirationDate
                            ? moment(offer.lotExpirationDate).format(getLocaleDateFormat())
                            : 'N/A'}
                        </Table.Cell>
                        <Table.Cell textAlign='center'>
                        <UploadAttachment
                            {...props}
                            removeOrderItem={file => {
                            removeAttachment(props.orderItemsId[tabIndex], file, props)
                            }}
                            attachments={getSafe(
                            () => values.tab[tabIndex].groupedOffer[index].attachments,
                            offer.attachments
                            )}
                            name={`tab[${tabIndex}].groupedOffer[${index}].attachments`}
                            type={1}
                            lot={offer}
                            filesLimit={1}
                            fileMaxSize={20}
                            onChange={files =>
                            linkAttachment(props.orderItemsId[tabIndex], files, setFieldValue, index, props, state)
                            }
                            data-test={`grouped_offer_${index}_attachments`}
                            emptyContent={
                            <DivIcon>
                                <UploadCloudIcon />
                                <AIcon>
                                <FormattedMessage id='global.uploadCloud' defaultMessage='upload' />
                                </AIcon>
                            </DivIcon>
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
        <Grid>
        <Grid.Column width={9}></Grid.Column>
        <Grid.Column floated='right' width={3}>
            <Button basic fluid onClick={() => props.closePopup()}>
            <FormattedMessage id='global.cancel' defaultMessage='Cancel' tagName='span' />
            </Button>
        </Grid.Column>
        <Grid.Column floated='right' width={4}>
            <Button
            style={{ backgroundColor: '#2599d5', color: 'white' }}
            fluid
            disabled={
                state.totalPkgAmount !==
                state.sumAllocated.reduce((sum, allocated) => {
                return sum + allocated
                }, 0)
            }>
            <FormattedMessage id='order.assignOffer' defaultMessage='Assign Offer' tagName='span' />
            </Button>
        </Grid.Column>
        </Grid>
    </LotsTabs>
    )
}
