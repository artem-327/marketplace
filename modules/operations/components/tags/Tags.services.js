import * as Yup from 'yup'
import { FormattedMessage } from 'react-intl'
// Components
import ActionCell from '../../../../components/table/ActionCell'
// Services
import { errorMessages } from '../../../../constants/yupValidation'
import confirm from '../../../../components/Confirmable/confirm'

export const formValidation = () =>
    Yup.lazy(values =>
        Yup.object().shape({
            name: Yup.string().trim().min(3, errorMessages.minLength(3)).required(errorMessages.requiredMessage)
        })
    )

export const initialFormValues = {
    name: ''
}

export const columns = [
    {
      name: 'name',
      title: (
        <FormattedMessage id='operations.tagName' defaultMessage='Tag Name' />
      ),
      sortPath: 'Tag.name',
      allowReordering: false
    }
]

const getActions = (props) => {
    const { intl, openPopup, deleteTag, datagrid } = props

    const { formatMessage } = intl
    return [
    { text: formatMessage({ id: 'global.edit', defaultMessage: 'Edit' }), callback: row => openPopup(row) },
    {
        text: formatMessage({ id: 'global.delete', defaultMessage: 'Delete' }),
        callback: row =>
        confirm(
            formatMessage({
            id: `confirm.delete.operations.tag.title`,
            defaultMessage: `Delete`
            }),
            formatMessage(
            {
                id: `confirm.delete.operations.tag.content`,
                defaultMessage: `Do you really want to delete tag?`
            },
            { name: row.name }
            )
        ).then(async () => {
            try {
            await deleteTag(row.id)
            datagrid.removeRow(row.id)
            } catch (e) {
            console.error(e)
            }
        })
    }
    ]
}

export const getRows = (rows, props) => {
    return rows.map(row => {
    return {
        ...row,
        name: (
        <ActionCell
            row={row}
            getActions={() => getActions(props)}
            content={row.name}
            onContentClick={() => props.openPopup(row)}
        />
        )
    }
    })
}
