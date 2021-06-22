import * as Yup from 'yup'
// Services
import { errorMessages, multipleEmails } from '../../../../constants/yupValidation'

const initialValuesAdd = {
    providerIdentifier: '',
    providerIdentifierName: '',
    identifierType: '',
    identifierValue: '',
    note: '',
    reinvoice: false,
    email: ''
}

export const getInitialValues = popupValues => {
    return popupValues
    ? {
        ...initialValuesAdd,
        note: popupValues.note || '',
        email: popupValues.email || '',
        reinvoice: popupValues.reinvoice,
        providerIdentifierName: `${popupValues.name} (${popupValues.identifierValue})`
        }
    : initialValuesAdd
}

export const getValidationSchema = popupValues => {
    if (popupValues) {
        return Yup.object().shape({
            email: multipleEmails()
        })
    } else {
        return Yup.object().shape({
            providerIdentifier: Yup.string(errorMessages.requiredMessage).required(errorMessages.requiredMessage),
            email: multipleEmails()
        })
    }
}
