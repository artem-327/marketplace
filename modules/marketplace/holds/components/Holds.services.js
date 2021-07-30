import { FormattedNumber } from 'react-intl'
import moment from 'moment/moment'
import { Label } from 'semantic-ui-react'
import { debounce } from 'lodash'
import Router from 'next/router'
import { FormattedMessage } from 'react-intl'
// Components
import ActionCell from '../../../../components/table/ActionCell'
import { FormattedUnit } from '../../../../components/formatted-messages'
// Services
import { getSafe } from '../../../../utils/functions'
// Constants
import { currency } from '../../../../constants'

const momentDurationFormatSetup = require('moment-duration-format')
momentDurationFormatSetup(moment)

function getDurationTime(expTime) {
    if (expTime && typeof moment.duration.format === 'function' && typeof moment.duration.fn.format === 'function') {
        const expirationTime = moment(expTime)
        const today = moment()
        const difference = moment.duration(expirationTime.diff(today))
        const durationFormat = difference.format('D[d] H[h] m[m]')
        return durationFormat
    }
    return null
}

function getStyleLabel(status) {
    let labelColor = {
        backgroundColor: '#f8f9fb',
        color: '#848893',
        fontSize: 'x-small',
        fontWeight: 400
    }
    if (status === 'APPROVED' || status === 'ON_HOLD') {
        labelColor.backgroundColor = '#84c225'
        labelColor.color = '#ffffff'
    }
    if (status === 'REJECTED' || status === 'EXPIRED' || status === 'CANCELLED') {
        labelColor.backgroundColor = '#f16844'
        labelColor.color = '#ffffff'
    }
    return labelColor
}

/**
 * Get rows by datagrid
 * @category Marketplace - Holds
 * @method
 */
export const getDatagridRows = datagrid => 
    datagrid.rows.map(po => {
        const unit = getSafe(() => po.productOffer.companyProduct.packagingUnit.nameAbbreviation, null)
        return {
            ...po,
            id: po.id,
            intProductName: getSafe(() => po.productOffer.productName, ''),
            pkgsHeld: po.pkgsHeld ? <FormattedUnit unit={unit} separator=' ' value={po.pkgsHeld} /> : null,
            expirationTime: po.expirationTime ? getDurationTime(po.expirationTime) : null,
            holdPricePerUOM: po.holdPricePerUOM ? (
                <FormattedNumber
                minimumFractionDigits={3}
                maximumFractionDigits={3}
                style='currency'
                currency={currency}
                value={po.holdPricePerUOM}
                />
            ) : null,
            holdPriceSubtotal: po.holdPriceSubtotal ? (
                <FormattedNumber
                minimumFractionDigits={2}
                maximumFractionDigits={2}
                style='currency'
                currency={currency}
                value={po.holdPriceSubtotal}
                />
            ) : null,
            status: po.status ? (
                <Label circular style={getStyleLabel(po.status)}>
                {po.status === 'ON_HOLD' ? 'Approved' : po.status[0].toUpperCase() + po.status.slice(1).toLowerCase()}
                </Label>
            ) : null
        }
    })


export const handleFiltersValue = debounce((filter, props) => {
    const { datagrid } = props
    datagrid.setSearch(filter, true, 'pageFilters')
}, 250)

/**
 * Search by filter change
 * @category Marketplace - Holds
 * @method
 */
export const handleFilterChange = (data, props, state, setState) => {
    setState({
        ...state,
        filterValue: {
            ...state.filterValue,
            [data.name]: data.value
        }
    })

    const filter = {
        ...state.filterValue,
        [data.name]: data.value
    }
    handleFiltersValue(filter, props)
}

const handleApprove = async (id, props) => {
    try {
        const response = await props.approveHold(id)
        const newRow = response && response.value && response.value.data ? response.value.data : null
        if (newRow) {
            props.datagrid.updateRow(id, () => ({
            ...newRow,
            status: 'ON_HOLD'
            }))
        }
    } catch (error) {
        console.error(error)
    }
}

const handleReject = async (id, props) => {
    try {
        const response = await props.rejectHold(id)
        const newRow = response && response.value && response.value.data ? response.value.data : null
        if (newRow) {
            props.datagrid.updateRow(id, () => ({
            ...newRow,
            status: 'REJECTED'
            }))
        }
    } catch (error) {
        console.error(error)
    }
}

const handleCancel = async (id, props) => {
    try {
        const response = await props.cancelHold(id)
        const newRow = response && response.value && response.value.data ? response.value.data : null
        if (newRow) {
            props.datagrid.updateRow(id, () => ({
            ...newRow,
            status: 'CANCELLED'
            }))
        }
    } catch (error) {
        console.error(error)
    }
}

const handleBuy = async (id, props) => {
    try {
        await props.toCartHold(id)
        Router.push('/cart')
    } catch (error) {
        console.error(error)
    }
}

const getActions = (props, state) => {
    const { intl, isMerchant, isCompanyAdmin, isProductOfferManager } = props
    let filterValue = {
        searchInput: '',
        holdDropdown: 'My Holds'
    }
    if (getSafe(() => state.filterValue, false)) {
        filterValue = state.filterValue
    }

    let { formatMessage } = intl

    const buttonApprove = {
        text: formatMessage({
            id: 'hold.approve',
            defaultMessage: 'Approve'
        }),
        callback: row => handleApprove(row.id, props),
        disabled: row => getSafe(() => row.status.props.children, false) && row.status.props.children !== 'Pending'
    }
    const buttonCancel = {
        text: formatMessage({
            id: 'hold.cancel',
            defaultMessage: 'Cancel'
        }),
        disabled: row =>
            (getSafe(() => row.status.props.children, false) && row.status.props.children === 'Rejected') ||
            row.status.props.children === 'Expired' ||
            row.status.props.children === 'Cancelled',
        callback: row => handleCancel(row.id, props)
    }
    const buttonReject = {
        text: formatMessage({
            id: 'hold.reject',
            defaultMessage: 'Reject'
        }),
        callback: row => handleReject(row.id, props),
        disabled: row => getSafe(() => row.status.props.children, false) && row.status.props.children !== 'Pending'
    }
    const buttonBuy = {
        text: formatMessage({
            id: 'hold.buy',
            defaultMessage: 'Buy'
        }),
        callback: row => handleBuy(row.id, props),
        disabled: row => getSafe(() => row.status.props.children, false) && row.status.props.children !== 'Approved'
    }
    let rowActions = []

    if ((isCompanyAdmin || isMerchant) && filterValue.holdDropdown === 'My Holds') {
        rowActions.push(buttonCancel)
        rowActions.push(buttonBuy)
    } else if (
        (isCompanyAdmin || isProductOfferManager) &&
        filterValue.holdDropdown === 'Requested Holds'
    ) {
        rowActions.push(buttonApprove)
        rowActions.push(buttonReject)
    }
    return rowActions
}

/**
 * Get columns for table
 * @category Marketplace - Holds
 * @method
 */
export const getColumns = () => {
    return [
        { name: 'id', title: '', disabled: true },
        {
            name: 'intProductName',
            title: (
            <FormattedMessage id='holds.intProductName' defaultMessage='Product Name' />
            ),
            width: 160,
            sortPath: 'InventoryHold.productOffer.companyProduct.intProductName',
            allowReordering: false
        },
        {
            name: 'pkgsHeld',
            title: (
            <FormattedMessage id='holds.pkgsHeld' defaultMessage='Quantity' />
            ),
            width: 140,
            align: 'right',
            sortPath: 'InventoryHold.pkgsHeld'
        },
        {
            name: 'expirationTime',
            title: (
            <FormattedMessage id='holds.expirationTime' defaultMessage='Expires' />
            ),
            width: 160,
            align: 'right',
            sortPath: 'InventoryHold.expirationTime'
        },
        {
            name: 'holdPricePerUOM',
            title: (
            <FormattedMessage id='holds.holdPricePerUOM' defaultMessage='Price/LB' />
            ),
            width: 160,
            align: 'right',
            sortPath: 'InventoryHold.holdPricePerUOM'
        },
        {
            name: 'holdPriceSubtotal',
            title: (
            <FormattedMessage id='holds.holdPriceSubtotal' defaultMessage='Subtotal' />
            ),
            width: 160,
            align: 'right',
            sortPath: 'InventoryHold.holdPriceSubtotal'
        },
        {
            name: 'status',
            title: (
            <FormattedMessage id='holds.status' defaultMessage='Status' />
            ),
            width: 120,
            sortPath: 'InventoryHold.status'
        }
    ]
}

/**
 * Get rows of table
 * @category Marketplace - Holds
 * @method
 */
export const getRows = (rows, props, state) => {
    return rows.map(r => {
        return {
            ...r,
            intProductName: <ActionCell row={r} getActions={() => getActions(props, state)} content={r.intProductName} />
        }
    })
}
    