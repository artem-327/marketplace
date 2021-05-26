import confirm from '~/components/Confirmable/confirm'
import ActionCell from '~/components/table/ActionCell'
import { Checkbox, Popup } from 'semantic-ui-react'
import { FormattedMessage, injectIntl } from 'react-intl'

export const getActions = props => {
  const { intl, datagrid, openSidebar, deleteUser, currentUserId } = props

  const { formatMessage } = intl
  return [
    {
      text: formatMessage({ id: 'global.edit', defaultMessage: 'Edit' }),
      callback: row => openSidebar(row, 'users')
    },
    {
      text: formatMessage({ id: 'global.delete', defaultMessage: 'Delete' }),
      disabled: row => currentUserId === row.id || props.editedId === row.id,
      callback: row =>
        confirm(
          formatMessage({ id: 'confirm.deleteUser', defaultMessage: 'Delete User' }),
          formatMessage({
            id: 'confirm.deleteUser.content',
            defaultMessage: 'Do you really want to delete user?'
          })
        ).then(async () => {
          try {
            await deleteUser(row.id)
            datagrid.removeRow(row.id)
          } catch (e) {
            console.error(e)
          }
        })
    }
  ]
}

const handleSwitchEnabled = async (id, row, props) => {
  try {
    await props.userSwitchEnableDisable(id, row)
    props.datagrid.updateRow(id, () => ({...row, enabled: !row.enabled}))
  } catch (e) {
    console.error(e)
  }
}

export const getRows = (rows, props) => {
  return rows.map(r => {
    const { currentUserId } = props
    let id = r.enabled ? 'settings.user.enabled' : 'settings.user.disabled'

    return {
      ...r,
      name: (
        <ActionCell
          row={r}
          getActions={() => getActions(props)}
          content={r.name}
          onContentClick={() => props.openSidebar(r, 'users')}
        />
      ),
      switchEnable: (
        <Popup
          id={r.id}
          trigger={
            <Checkbox
              toggle={true}
              defaultChecked={r.enabled}
              disabled={r.id === currentUserId}
              onChange={() => handleSwitchEnabled(r.id, r, props)}
              data-test={`settings_user_enabled_${r.id}_chckb`}
            />
          }
          content={
            r.id === currentUserId ? (
              <FormattedMessage id={id} defaultMessage={`User ${r.enabled ? 'enabled' : 'disabled'}`} />
            ) : (
              <FormattedMessage
                id={`${id}.clickToChange`}
                defaultMessage={
                  r.enabled ? '!User enabled. Click to disable user.' : '!User disabled. Click to enable user.'
                }
              />
            )
          }
        />
      )
    }
  })
}

