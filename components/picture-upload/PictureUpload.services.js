import { generateToastMarkup } from '~/utils/functions'
import { FormattedMessage, injectIntl } from 'react-intl'
import { FormGroup, FormField, Popup, Image, Dropdown, Grid, GridRow, GridColumn, Button } from 'semantic-ui-react'

const getMimeType = documentName => {
  const documentExtension = documentName.substr(documentName.lastIndexOf('.') + 1)
  switch (documentExtension) {
    case 'gif':
      return 'image/gif'
    case 'png':
      return 'image/png'
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg'
    case 'svg':
      return 'image/svg'
    default:
      return false
  }
}

export const getPicture = props => {
  if (props.picture) {
    const file = new Blob([props.picture], { type: props.picture.type })
    let fileURL = URL.createObjectURL(file)
    return <Image src={fileURL} size='small' />
  }
  return null
}

export const selectPicture = (file, props) => {
  if (getMimeType(file.name)) {
    props.selectPicture(file)
  } else {
    props.toastManager.add(
      generateToastMarkup(
        <FormattedMessage id='errors.notImage.header' defaultMessage='File not Uploaded' />,
        <FormattedMessage
          id='errors.notImage.content'
          defaultMessage={`File ${file.name} you are uploading is not in the desired format. Please select a picture in format: (gif, jpg, png, svg)`}
          values={{ name: file.name }}
        />
      ),
      {
        appearance: 'error'
      }
    )
  }
}

