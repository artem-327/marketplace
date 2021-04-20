export const SubmitFile = async (values, { setSubmitting }, props) => {
  const {
    intl: { formatMessage },
    uploadInsuranceDocument,
    getInsuranceDocuments,
    onUpload,
    closePopup
  } = props

  try {
    await uploadInsuranceDocument(values.file, values.documentId)
    getInsuranceDocuments()
    onUpload()
    closePopup()
  } catch (e) {
    console.error(e)
  } finally {
    setSubmitting(false)
  }
}