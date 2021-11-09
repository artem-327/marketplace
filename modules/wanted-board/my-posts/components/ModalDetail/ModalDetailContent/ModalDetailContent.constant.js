import { FormattedMessage } from 'react-intl'

export const YES_NO_OPTIONS = [
    {
        key: 'Yes',
        text: <FormattedMessage id='wantedBoard.yes' defaultMessage='Yes' />,
        value: true
    },
    {
        key: 'No',
        text: <FormattedMessage id='wantedBoard.no' defaultMessage='No' />,
        value: false
    }
]
