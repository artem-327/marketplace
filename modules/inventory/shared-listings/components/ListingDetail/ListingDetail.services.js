import { Grid } from 'semantic-ui-react'
import { FormattedMessage } from 'react-intl'
//Components
import { FormattedPhone } from '../../../../../components/formatted-messages'
//Services
import { getMimeType, getSafe } from '../../../../../utils/functions'
//Styles
import { GridColumnTabFieldValue } from './ListingDetail.styles'

const prepareLinkToAttachment = async (documentName, documentId, props) => {
  let downloadedFile = await props.downloadAttachment(documentId)
  const mimeType = getMimeType(documentName)

  const element = document.createElement('a')
  const file = new Blob([downloadedFile.value.data], { type: mimeType })
  let fileURL = URL.createObjectURL(file)

  element.href = fileURL
  return element
}

/**
 * File Download Handler in ListingDetail Component
 * @category Inventory - Shared Listings
 * @method
 */
export const downloadFile = async (documentName, documentId, props) => {
  try {
    const element = await prepareLinkToAttachment(documentName, documentId, props)
    element.download = documentName
    document.body.appendChild(element) // Required for this to work in FireFox
    element.click()
  } catch (e) {
    console.error(e)
  }
}
/**
 * @category Inventory - Shared Listings
 * @method
 * @param {array} property
 * @param {object} product
 * @returns {JSX.Element}
 */
export const getProperty = (property, product) => {
  let value = getSafe(() => product[property[1]], '')

  if (property.length > 2) {
    if (property[2] === 'phone') {
      value = <FormattedPhone value={value} />
    }
  }

  return (
    <>
      <Grid.Column width={6}>
        <FormattedMessage id={`casProduct.${property[1]}`} defaultMessage={property[0]} />
      </Grid.Column>
      <GridColumnTabFieldValue width={10}>{value}</GridColumnTabFieldValue>
    </>
  )
}
