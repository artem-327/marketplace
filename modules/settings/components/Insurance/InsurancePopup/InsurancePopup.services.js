export const SubmitFile = async (values, { setSubmitting }, props) => {
  const {
    intl: { formatMessage },
    uploadInsuranceDocument,
    getInsuranceDocuments,
    closePopup
  } = props

  try {
    await uploadInsuranceDocument(values.file, values.documentId)
    getInsuranceDocuments()
    closePopup()
  } catch (e) {
    console.error(e)
  } finally {
    setSubmitting(false)
  }
}