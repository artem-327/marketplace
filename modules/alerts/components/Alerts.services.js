import { getMimeType } from "../../../utils/functions"

export const downloadFile = async (documentName, documentId, downloadAttachment) => {
  try {
    const element = await prepareLinkToAttachment(documentId, downloadAttachment)
    element.download = documentName
    document.body.appendChild(element) // Required for this to work in FireFox
    element.click()
  } catch (e) {
    console.error(e)
  }
}

const prepareLinkToAttachment = async (documentId, downloadAttachment) => {
  const downloadedFile = await downloadAttachment(documentId)
  const fileName = extractFileName(downloadedFile.value.headers['content-disposition'])
  const mimeType = fileName && getMimeType(fileName)
  const element = document.createElement('a')
  const file = new Blob([downloadedFile.value.data], { type: mimeType })
  let fileURL = URL.createObjectURL(file)
  element.href = fileURL
  return element
}

const extractFileName = contentDispositionValue => {
  let filename = ''
  if (contentDispositionValue && contentDispositionValue.indexOf('attachment') !== -1) {
    const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
    const matches = filenameRegex.exec(contentDispositionValue)
    if (matches != null && matches[1]) {
      filename = matches[1].replace(/['"]/g, '')
    }
  }
  return filename
}