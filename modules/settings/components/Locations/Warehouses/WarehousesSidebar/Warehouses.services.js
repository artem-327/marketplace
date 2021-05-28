import * as Yup from 'yup'
//Services
import {
  addressValidationSchema,
  errorMessages,
  minOrZeroLength,
  validateTime,
  phoneValidation
} from '../../../../../../constants/yupValidation'
import {generateToastMarkup, getSafe, removeEmpty} from '../../../../../../utils/functions'

const minLength = errorMessages.minLength(3)
/**
 * Form validation function.
 * @category Settings - Location - Warehouses
 * @method
 * @return {Object} Yup object with values from form.
 */
export const formValidation = () =>
  Yup.object().shape({
    deliveryAddress: Yup.object().shape({
      address: addressValidationSchema(),
      addressName: Yup.string().trim().min(3, minLength).required(errorMessages.requiredMessage),
      contactName: Yup.string().trim().min(3, minLength).required(errorMessages.requiredMessage),
      contactPhone: phoneValidation(10).required(errorMessages.requiredMessage),
      contactEmail: Yup.string().trim().email(errorMessages.invalidEmail).required(errorMessages.requiredMessage),
      readyTime: validateTime(),
      closeTime: validateTime()
    })
  })

/**
 * Get initial values for form.
 * @category Settings - Location - Warehouses
 * @method
 * @param {Object} sidebarValues Object values for form.
 * @return {Object} Initialized object with values for form.
 */
export const getInitialFormValues = sidebarValues => {
  const provinceId = getSafe(() => sidebarValues.deliveryAddress.address.province.id, '')
  const countryId = getSafe(() => sidebarValues.deliveryAddress.address.country.id, null)
  const hasProvinces = getSafe(() => sidebarValues.deliveryAddress.address.country.hasProvinces, false)
  const zip = getSafe(() => sidebarValues.deliveryAddress.address.zip.zip, '')
  const zipID = getSafe(() => sidebarValues.deliveryAddress.address.zip.id, '')

  const initialValues = {
    //name: r.name,
    taxId: getSafe(() => sidebarValues.taxId, ''),
    deaListReceive: getSafe(() => sidebarValues.deaListReceive, false),
    deaListReceiveFlag: getSafe(() => sidebarValues.deaListReceive, false) || getSafe(() => sidebarValues.deaListReceiveVerify, false),
    deaListCertificateFile: getSafe(() => sidebarValues.deaListCertificateFile.name, null),
    epaReceive: getSafe(() => sidebarValues.epaReceive, false),
    epaReceiveFlag: getSafe(() => sidebarValues.epaReceive, false) || getSafe(() => sidebarValues.epaReceiveVerify, false),
    epaCertificateFile: getSafe(() => sidebarValues.epaCertificateFile.name, null),
    taxExemptReceive: getSafe(() => sidebarValues.taxExemptReceive, false),
    taxExemptReceiveFlag: getSafe(() => sidebarValues.taxExemptReceive, false) || getSafe(() => sidebarValues.taxExemptReceiveVerify, false),
    taxExemptCertificateFile: getSafe(() => sidebarValues.taxExemptCertificateFile.name, null),
    //warehouse: getSafe(() => sidebarValues.warehouse, false),
    deliveryAddress: {
      address: {
        streetAddress: getSafe(() => sidebarValues.deliveryAddress.address.streetAddress, ''),
        city: getSafe(() => sidebarValues.deliveryAddress.address.city, ''),
        province: provinceId,
        country: countryId ? JSON.stringify({ countryId, hasProvinces }) : '',
        zip
      },
      readyTime: getSafe(() => sidebarValues.deliveryAddress.readyTime, ''),
      closeTime: getSafe(() => sidebarValues.deliveryAddress.closeTime, ''),
      liftGate: getSafe(() => sidebarValues.deliveryAddress.liftGate, false),
      forkLift: getSafe(() => sidebarValues.deliveryAddress.forkLift, false),
      callAhead: getSafe(() => sidebarValues.deliveryAddress.callAhead, false),
      deliveryNotes: getSafe(() => sidebarValues.deliveryAddress.deliveryNotes, ''),
      addressName: getSafe(() => sidebarValues.deliveryAddress.addressName, ''),
      contactName: getSafe(() => sidebarValues.deliveryAddress.contactName, ''),
      contactPhone: getSafe(() => sidebarValues.deliveryAddress.contactPhone, ''),
      contactEmail: getSafe(() => sidebarValues.deliveryAddress.contactEmail, '')
    },
    attachments: getSafe(() => sidebarValues.attachments, []),
    zipID,
    countryId,
    hasProvinces,
    branchId: getSafe(() => sidebarValues.id, ''),
    province: getSafe(() => sidebarValues.deliveryAddress.address.province, ''),
    alsoCreate: false
  }

  return initialValues
}

/**
 * Submit warehouse form.
 * @category Settings - Locations - Warehouses
 * @method
 * @param {Object} values Object values from warehouse form
 * @param {{sidebarValues: Object<string, any>,
 *    putEditWarehouse: Function,
 *    postNewWarehouseRequest: Function,
 *    openGlobalAddForm: Function,
 *    attachmentFiles: Array,
 *    setAttachmentFiles: Function,
 *    setSubmitting: Function,
 *    datagrid: Object}} helpers Object with sidebarValues and helper functions.
 */
export const submitHandler = async (values, helpers) => {
  const {
    sidebarValues,
    putEditWarehouse,
    postNewWarehouseRequest,
    openGlobalAddForm,
    attachmentFiles,
    setAttachmentFiles,
    setSubmitting,
    datagrid
  } = helpers
  let country = JSON.parse(values.deliveryAddress.address.country).countryId
  let requestData = {}

  requestData = {
    deaListReceiveFlag: values.deaListReceiveFlag,
    epaReceiveFlag: values.epaReceiveFlag,
    taxExemptReceiveFlag: values.taxExemptReceiveFlag,
    deliveryAddress: {
      ...values.deliveryAddress,
      readyTime:
        !values.deliveryAddress.readyTime || values.deliveryAddress.readyTime === ''
          ? null
          : values.deliveryAddress.readyTime,
      closeTime:
        !values.deliveryAddress.closeTime || values.deliveryAddress.closeTime === ''
          ? null
          : values.deliveryAddress.closeTime,
      address: {
        ...values.deliveryAddress.address,
        country
      }
    },
    taxId: values.taxId,
    warehouse: !values.alsoCreate
  }
  removeEmpty(requestData)

  try {
    if (sidebarValues) {
      await putEditWarehouse(requestData, sidebarValues.id, attachmentFiles, datagrid)
    } else {
      await postNewWarehouseRequest(true, requestData, attachmentFiles)
    }
    if (openGlobalAddForm) openGlobalAddForm('')
  } catch {
  } finally {
    setSubmitting(false)
    setAttachmentFiles([])
  }
}

export const addCertificateAttachment = async (files, branchId, listDocumentTypes, toastManager, formikProps, actions) => {
  const { loadFile, addAttachment } = actions
  if (loadFile && addAttachment) {
    ;(async function loop(j) {
      if (j < files.length)
        await new Promise((resolve, reject) => {
          loadFile(files[j])
            .then(file => {
              addAttachment(file.value, branchId)
                .then(aId => {
                  const addedFile = aId.value.data
                  formikProps.setFieldValue(
                    `attachments[${
                      formikProps.values.attachments && formikProps.values.attachments.length
                        ? formikProps.values.attachments.length
                        : 0
                    }]`,
                    {
                      id: addedFile.id,
                      name: addedFile.name,
                      documentType: addedFile.documentType,
                      isLinkedFromDocumentManager: getSafe(() => addedFile.isLinkedFromDocumentManager, false)
                    }
                  )
                  //setAttachmentFiles(attachmentFiles.concat([addedFile]))
                  resolve()
                })
                .catch(e => {
                  console.error(e)
                  resolve()
                })
            })
            .catch(e => {
              console.error(e)
              const fileName = files[j].name
              toastManager.add(
                generateToastMarkup(
                  <FormattedMessage id='errors.fileNotUploaded.header' defaultMessage='File not uploaded' />,
                  <FormattedMessage
                    id='errors.fileNotUploaded.content'
                    defaultMessage={`File ${fileName} was not uploaded due to an error`}
                    values={{ name: fileName }}
                  />
                ),
                {
                  appearance: 'error'
                }
              )
              resolve()
            })
        })
    })(0)
  }
}
