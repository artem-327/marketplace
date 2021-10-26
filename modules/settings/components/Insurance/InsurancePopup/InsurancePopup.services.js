export const SubmitFile = async (values, { setSubmitting }, props, additionalActions = null) => {
  const {
    intl: { formatMessage },
    uploadInsuranceDocument,
    getInsuranceDocuments,
    closePopup
  } = props

  if (additionalActions) {
    const reset = additionalActions?.resetForm

    if (reset) {
      reset()
    } else {
      const { activeStep, nextStep } = additionalActions
      nextStep(activeStep + 1)
    }
  }

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