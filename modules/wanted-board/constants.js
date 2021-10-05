import { FormattedMessage } from "react-intl"

export const listFrequency = [
  {
    key: 1,
    text: <FormattedMessage id='wantedBoard.oneTime' defaultMessage='One Time' />,
    value: 1
  },
  {
    key: 2,
    text: <FormattedMessage id='wantedBoard.biWeekly' defaultMessage='Bi Weekly' />,
    value: 2
  },
  {
    key: 3,
    text: <FormattedMessage id='wantedBoard.monthly' defaultMessage='Monthly' />,
    value: 3
  },
  {
    key: 4,
    text: <FormattedMessage id='wantedBoard.biMonthly' defaultMessage='Bi Monthly' />,
    value: 4
  },
  {
    key: 5,
    text: <FormattedMessage id='wantedBoard.yearly' defaultMessage='Yearly' />,
    value: 5
  }
]

export const statusFilterList = [
  {
    key: 0,
    text: <FormattedMessage id='wantedBoard.showAllSttaus' defaultMessage='Show All Status' />,
    value: 0
  },
  {
    key: 1,
    text: <FormattedMessage id='wantedBoard.showPendingOffer' defaultMessage='Show Pending Offer' />,
    value: 1
  },
  {
    key: 2,
    text: <FormattedMessage id='wantedBoard.showRejected' defaultMessage='Show Rejected' />,
    value: 2
  },
  {
    key: 3,
    text: <FormattedMessage id='wantedBoard.showPendingCounterOffer' defaultMessage='Show Pending Counter Offer' />,
    value: 3
  },
  {
    key: 4,
    text: <FormattedMessage id='wantedBoard.showAccepted' defaultMessage='Show Accepted' />,
    value: 4
  }
]
