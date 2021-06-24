import { FormattedNumber } from 'react-intl'
// Components
import ActionCell from '../../../../components/table/ActionCell'
import { Checkbox } from 'semantic-ui-react'
// Services
import confirm from '../../../../components/Confirmable/confirm'
import { removeEmpty } from '../../../../utils/functions'
import { currency } from '../../../../constants/index'


const getActions = props => {
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

const handleToggleSwitch = async (values, props) => {
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

/**
 * Get Rows in CarriersContainer using datagrid
 * @category Admin Settings - Carrier
 * @method
 */
export const makeRows = datagrid => datagrid.rows.map((row, index) => {
  return {
      ...row,
      rawData: row
  }
})

/**
 * Get Rows in Carriers Component using props
 * @category Admin Settings - Carrier
 * @method
 */
export const getRows = (rows, props) => {
  return rows.map(row => {
    return {
      ...row,
      code: (
        <ActionCell
          row={row}
          getActions={() => getActions(props)}
          content={row.code}
          onContentClick={() => props.openPopup(row.rawData)}
        />
      ),
      priceMarkup: row.priceMarkup ? (
        <FormattedNumber
          minimumFractionDigits={2}
          maximumFractionDigits={2}
          style='currency'
          currency={currency}
          value={row.priceMarkup}
        />
      ) : (
        ''
      ),
      blindShipmentSupport: (
        <Checkbox
          key={`enabled${row.id}`}
          toggle={true}
          defaultChecked={row.blindShipmentSupport}
          onClick={() => handleToggleSwitch(row.rawData, props)}
          data-test={`admin_carrier_table_blind_shipment_support_${row.id}_chckb`}
        />
      )
    }
  })
}
