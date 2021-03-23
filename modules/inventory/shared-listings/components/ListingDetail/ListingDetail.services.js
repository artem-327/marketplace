import { getMimeType } from '../../../../../utils/functions'

const prepareLinkToAttachment = async (documentName, documentId, props) => {
  let downloadedFile = await props.downloadAttachment(documentId)
  const mimeType = getMimeType(documentName)

  const element = document.createElement('a')
  const file = new Blob([downloadedFile.value.data], { type: mimeType })
  let fileURL = URL.createObjectURL(file)

  element.href = fileURL
  return element
}

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