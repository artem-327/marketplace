/**
 * Gets string mime type.
 *
 * @param {string} documentName
 * @return {string} Returns string for mime type in request.
 */
export const getMimeType = documentName => {
  const documentExtension = documentName.substr(documentName.lastIndexOf('.') + 1)

  switch (documentExtension) {
    case 'doc':
      return 'application/msword'
    case 'docx':
      return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    case 'ppt':
      return 'application/vnd.ms-powerpoint'
    case 'pptx':
      return 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    case 'xls':
      return 'application/vnd.ms-excel'
    case 'xlsx':
      return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    case 'gif':
      return 'image/gif'
    case 'png':
      return 'image/png'
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg'
    case 'svg':
      return 'image/svg'
    case 'pdf':
      return 'application/pdf'
    case '7z':
      return 'application/x-7z-compressed'
    case 'zip':
      return 'application/zip'
    case 'tar':
      return 'application/x-tar'
    case 'rar':
      return 'application/x-rar-compressed'
    case 'xml':
      return 'application/xml'
    default:
      return 'text/plain'
  }
}
