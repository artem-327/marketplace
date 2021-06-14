import * as val from 'yup'
// Services
import { errorMessages } from '../../../../constants/yupValidation'


export const initValues = {
    counterValue: null,
    messageBuyer: null
}

export const validationSchema = val.object().shape({
    counterValue: val
    .number()
    .min(0, errorMessages.minimum(0))
    .typeError(errorMessages.mustBeNumber)
    .required(errorMessages.requiredMessage),
    messageBuyer: val.string().typeError(errorMessages.invalidString).required(errorMessages.requiredMessage)
})

export const submitHandler = async (values, actions, props) => {
    const { closePopup, orderId, creditCounter } = props
    const { counterValue, messageBuyer, attachments } = values
    try {
    const request = {
        amount: counterValue,
        message: messageBuyer
    }

    await creditCounter(orderId, request, attachments)
    closePopup()
    } catch (e) {
    console.error(e)
    } finally {
    actions.setSubmitting(false)
    }
}

export const handleChange = (e, value, name, setFieldValue, state, setState) => {
    e.preventDefault()
    setState({ ...state, [name]: value })
    setFieldValue(name, value)
}

export const acceptRequestCredit = async (e, props) => {
    e.preventDefault()
    const { closePopup, orderId, creditAccept } = props

    try {
    await creditAccept(orderId)
    closePopup()
    } catch (e) {
    console.error(e)
    }
}

export const handleClick = (e, titleProps, state, setState) => {
    const { index } = titleProps
    const { activeIndexes } = state

    activeIndexes[index] = activeIndexes[index] ? false : true

    setState({ ...state, activeIndexes })
}

const prepareLinkToAttachment = async (attachmentId, props) => {
    let downloadedFile = await props.downloadCreditRequestAttachments('purchase', props.orderId, attachmentId)
    const element = document.createElement('a')
    let fileURL = URL.createObjectURL(downloadedFile.value.data)
    element.href = fileURL

    return element
}

export const downloadAttachment = async (documentName, attachmentId, props) => {
    const element = await prepareLinkToAttachment(attachmentId, props)
    element.download = documentName
    document.body.appendChild(element) // Required for this to work in FireFoxs
    element.click()
}
