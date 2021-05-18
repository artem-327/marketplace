import { Component, useEffect } from 'react'
import confirm from '../../../../components/Confirmable/confirm'
import { injectIntl, FormattedMessage } from 'react-intl'
import { Popup, Label } from 'semantic-ui-react'
import { connect } from 'react-redux'

import ProdexTable from '../../../../components/table'
import ActionCell from '../../../../components/table/ActionCell'
import {
  openPopup,
  openEditAltNamesCasPopup,
  closeConfirmPopup,
  getHazardClassesDataRequest,
  getPackagingGroupsDataRequest,
  deleteCasProduct
} from '../../actions'
import { withDatagrid } from '../../../datagrid'

const CasProductsTable = props => {
  const columns = [
    {
      name: 'casIndexName',
      title: (
        <FormattedMessage id='global.indexName' defaultMessage='Index Name'>
          {text => text}
        </FormattedMessage>
      ),
      width: 375,
      sortPath: 'CasProduct.casIndexName',
      allowReordering: false
    },
    {
      name: 'casNumber',
      title: (
        <FormattedMessage id='global.casNumber' defaultMessage='CAS Number'>
          {text => text}
        </FormattedMessage>
      ),
      width: 150,
      sortPath: 'CasProduct.casNumber'
    }
  ]

  useEffect(() => {
    props.getHazardClassesDataRequest()
    props.getPackagingGroupsDataRequest()
  }, [])

  const getActions = () => {
    const { datagrid, intl, openPopup, openEditAltNamesCasPopup, deleteCasProduct } = props

    const { formatMessage } = intl
    return [
      {
        text: formatMessage({ id: 'global.edit', defaultMessage: 'Edit' }),
        callback: ({ hazardClassesLabeled, ...rest }) => openPopup(rest)
      },
      {
        text: formatMessage({ id: 'admin.editAlternativeNames', defaultMessage: 'Edit Alternative Names' }),
        callback: row => openEditAltNamesCasPopup(row)
      },
      {
        text: formatMessage({ id: 'global.delete', defaultMessage: 'Delete' }),
        callback: row =>
          confirm(
            formatMessage({ id: 'confirm.deleteCasProduct.title', defaultMessage: 'Delete CAS Product?' }),
            formatMessage(
              {
                id: 'confirm.deleteCasProduct.content',
                defaultMessage: `Do you really want to delete '${row.casIndexName}' CAS product?`
              },
              { name: row.casIndexName }
            )
          ).then(async () => {
            try {
              await deleteCasProduct(row.id)
              datagrid.removeRow(row.id)
            } catch (e) {
              console.error(e)
            }
          }),
        disabled: row => props.editedId === row.id
      }
    ]
  }

  const getRows = rows => {
    return rows.map((row, _i) => {
      const { hazardClassesLabeled, ...rest } = row
      return {
        ...row,
        casIndexName: (
          <ActionCell
            key={_i}
            row={row}
            getActions={getActions}
            content={row.casIndexName}
            onContentClick={() => props.openPopup(rest)}
          />
        )
      }
    })
  }

  const { datagrid, rows, editedId } = props

  return (
    <div className='flex stretched listings-wrapper'>
      <ProdexTable
        {...datagrid.tableProps}
        tableName='admin_cas_products'
        columns={columns}
        rows={getRows(rows)}
        defaultSorting={{
          columnName: 'casIndexName',
          sortPath: 'CasProduct.casIndexName',
          direction: 'asc'
        }}
        editingRowId={editedId}
      />
    </div>
  )
}

const mapDispatchToProps = {
  openPopup,
  openEditAltNamesCasPopup,
  closeConfirmPopup,
  getHazardClassesDataRequest,
  getPackagingGroupsDataRequest,
  deleteCasProduct
}

const transformHazardClasses = classes => {
  if (!classes || !classes.length) return
  return (
    <Label.Group color='blue'>
      {classes.map((b, i) => (
        <Popup
          key={i}
          content={b.description}
          trigger={
            <Label size='tiny'>
              {b.classCode}
            </Label>
          }
        />
      ))}
    </Label.Group>
  )
}

const mapStateToProps = (state, { datagrid }) => {
  return {
    editedId: state.productsAdmin.editedId,
    rows: datagrid.rows.map(d => {
      return {
        ...d,
        hazardClassesLabeled: transformHazardClasses(d.hazardClasses)
      }
    })
  }
}

export default withDatagrid(connect(mapStateToProps, mapDispatchToProps)(injectIntl(CasProductsTable)))
