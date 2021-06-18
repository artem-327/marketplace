import confirm from '../../../../components/Confirmable/confirm'
import { removeEmpty } from '../../../../utils/functions'

/**
 * Get datagrid row actions
 *
 * @param {object} props - Component props (datagrid, openPopup, formatMessage, deleteCarrier)
 */
export const getActions = props => {
  const {
    datagrid,
    openPopup,
    intl: { formatMessage },
    deleteCarrier
  } = props

  return [
    {
      text: formatMessage({ id: 'global.edit', defaultMessage: 'Edit' }),
      callback: row => openPopup(row.rawData)
    },
    {
      text: formatMessage({ id: 'global.delete', defaultMessage: 'Delete' }),
      callback: row =>
        confirm(
          formatMessage({
            id: 'confirm.admin.deleteCarrier.title',
            defaultMessage: 'Delete Carrier'
          }),
          formatMessage(
            {
              id: 'confirm.admin.deleteCarrier.content',
              defaultMessage: "Do you really want to delete '{name}' carrier?"
            },
            { name: row.rawData.code }
          )
        ).then(async () => {
          try {
            await deleteCarrier(row.id)
            datagrid.removeRow(row.id)
          } catch (e) {
            console.error(e)
          }
        })
    }
  ]
}

/**
 * Submit form - add or edit Carrier.
 * @category Admin Settings - Add/Edit Carrier
 * @method
 * @param {Object} values Object form values.
 * @param {Object} props Object module input props (updateCarrier, datagrid).
 * @return {none}
 */
export const handleToggleSwitch = async (values, props) => {
  const { updateCarrier, datagrid } = props
  try {
    let payload = {
      blindShipmentSupport: !values.blindShipmentSupport,
      priceMarkup: values.priceMarkup
    }
    removeEmpty(payload)
    const { value } = await updateCarrier(values.id, payload)
    datagrid.updateRow(value.id, () => value)
  } catch (e) {
    console.error(e)
  }
}