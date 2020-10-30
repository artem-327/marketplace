import { FormattedMessage } from "react-intl"
import React from "react"
import { getSafe } from '~/utils/functions'

export const getProductName = element => {
  const productName = getSafe(() => element.productGroup.name, '')
  const casProductNumber = getSafe(() => element.casProduct.casNumber, '')
  const casProductName = getSafe(() => element.casProduct.casIndexName, '')
  const casProduct = `${casProductNumber ? casProductNumber + ' ' : ''}${casProductName}`

  return productName && casProduct
    ? (
      <>
        {`${productName} `}
        <FormattedMessage id='global.or' defaultMessage='or' />
        {` ${casProduct}`}
      </>)
    : (productName ? productName : (
      casProduct
        ? casProduct
        : <FormattedMessage id='wantedBoard.any' defaultMessage='Any' />
    ))
}

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