import * as Yup from 'yup'
// Services
import { errorMessages, addressValidationSchema, dateValidation } from '../../../../constants/yupValidation'

export const formValidation = Yup.object().shape({
    dwollaController: Yup.object().shape({
        firstName: Yup.string().trim().min(3, errorMessages.minLength(3)).required(errorMessages.requiredMessage),
        lastName: Yup.string().trim().min(3, errorMessages.minLength(3)).required(errorMessages.requiredMessage),
        jobTitle: Yup.string().trim().min(3, errorMessages.minLength(3)),
        dateOfBirth: dateValidation(false).concat(Yup.string().required(errorMessages.requiredMessage)),
        ssn: Yup.string().trim().min(8, errorMessages.minDigits(8)).required(errorMessages.requiredMessage),
        address: addressValidationSchema()
    })
})

export const initialFormValues = popupValues => ({
    dwollaController: {
        ...(popupValues.primaryUser
            ? {
                firstName: popupValues.primaryUser.name.split(' ')[0],
                lastName: popupValues.primaryUser.name.split(' ')[1],
                address: {
                city: popupValues.primaryUser.homeBranch.address.city,
                streetAddress: popupValues.primaryUser.homeBranch.address.streetAddress,
                zip: popupValues.primaryUser.homeBranch.address.zip.id,
                country: popupValues.primaryUser.homeBranch.address.country.id
                }
            }
            : {
                firstName: '',
                lastName: '',
                address: {
                city: '',
                streetAddress: '',
                zip: '',
                country: ''
                }
            }),
        ssn: '',
        dateOfBirth: ''
    }
})
