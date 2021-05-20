export const SubmitFile = async (values, { setSubmitting }, props, additionalActions = null) => {
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
    if (additionalActions) {
      const { activeStep, nextStep } = additionalActions
      nextStep(activeStep + 1)
    }
  }
}