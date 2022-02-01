import { FormattedMessage } from "react-intl"

/**
 * columns used in BroadcastCalculation Component
 * @category Monitoring
 * @services
 */
export const columns = [
    {
        name: 'entityType',
        title: (
            <FormattedMessage id='monitoring.broadcastCalculations.entityType' defaultMessage='Related Type' />
        ),
        allowReordering: false,
        width: 200
    },
    {
        name: 'entityId',
        title: (
            <FormattedMessage id='monitoring.broadcastCalculations.entityId' defaultMessage='Related ID' />
        ),
        allowReordering: false,
        width: 120
    },
    {
        name: 'sellerCompany',
        title: (
            <FormattedMessage id='monitoring.broadcastCalculations.sellerCompany' defaultMessage='Company ID' />
        ),
        allowReordering: false,
        width: 120
    },
    {
        name: 'viewsFound',
        title: (
            <FormattedMessage id='monitoring.broadcastCalculations.views' defaultMessage='Views found' />
        ),
        allowReordering: false,
        width: 120
    },
    {
        name: 'durationMs',
        title: (
            <FormattedMessage id='monitoring.broadcastCalculations.durationMs' defaultMessage='Duration (ms)' />
        ),
        allowReordering: false,
        width: 120
    },
    {
        name: 'threadId',
        title: (
            <FormattedMessage id='monitoring.broadcastCalculations.threadId' defaultMessage='Thread ID' />
        ),
        allowReordering: false,
        width: 120
    },
    {
        name: 'startTime',
        title: (
            <FormattedMessage id='monitoring.broadcastCalculations.startDate' defaultMessage='Start Time' />
        ),
        allowReordering: false,
        width: 200
    },
    {
        name: 'endTime',
        title: (
            <FormattedMessage id='monitoring.broadcastCalculations.endTime' defaultMessage='End Time' />
        ),
        allowReordering: false,
        width: 200
    }
]