import { Component } from 'react'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { FormattedMessage } from 'react-intl'
import { withToastManager } from 'react-toast-notifications'

import { generateToastMarkup, getSafe } from '../../../../utils/functions'
import confirm from '../../../../components/Confirmable/confirm'
import ProdexTable from '../../../../components/table'
import ActionCell from '../../../../components/table/ActionCell'
import { openPopup, deleteProductGroups } from '../../actions'
import { withDatagrid } from '../../../datagrid'
import { ArrayToFirstItem } from '../../../../components/formatted-messages'

class ProductGroupsTable extends Component {
  constructor(props) {
    super(props)

    this.state = {
      columns: [
        {
          name: 'name',
          title: (
            <FormattedMessage id='product.groups.name' defaultMessage='Group Name'>
              {text => text}
            </FormattedMessage>
          ),
          sortPath: 'ProductGroup.name',
          allowReordering: false
        },
        {
          name: 'tags',
          title: (
            <FormattedMessage id='product.groups.tags' defaultMessage='Tags'>
              {text => text}
            </FormattedMessage>
          )
        }
      ]
    }
  }

  getActions = () => {
    const { intl, openPopup, deleteProductGroups, datagrid } = this.props

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
                id: `confirm.delete.product.groups.content`,
                defaultMessage: `Do you really want to delete Product Group?`
              },
              { name: row.name }
            )
          ).then(async () => {
            try {
              await deleteProductGroups(row.id)
              datagrid.removeRow(row.id)
            } catch (e) {
              console.error(e)
            }
          }),
        disabled: row => this.props.editedId === row.id
      }
    ]
  }

  getRows = rows => {
    return rows.map(row => {
      return {
        ...row,
        name: (
          <ActionCell
            row={row}
            getActions={this.getActions}
            content={row.name}
            onContentClick={() => this.props.openPopup(row)}
          />
        )
      }
    })
  }

  render() {
    const {
      intl,
      loading,
      rows,
      datagrid,
      filterValue,
      openPopup,
      deleteProductGroups,
      editedId,
      toastManager
    } = this.props

    const { formatMessage } = intl
    const { columns } = this.state
    return (
      <div className='flex stretched listings-wrapper'>
        <ProdexTable
          tableName={'product_group'}
          {...datagrid.tableProps}
          filterValue={filterValue}
          loading={datagrid.loading || loading}
          columns={columns}
          rows={this.getRows(rows)}
          editingRowId={editedId}
        />
      </div>
    )
  }
}
const mapDispatchToProps = {
  openPopup,
  deleteProductGroups
}

const mapStateToProps = (state, { handleFilterChange, datagrid }) => {
  return {
    rows: datagrid.rows.map(row => ({
      ...row,
      rawData: row,
      tags: (
        <ArrayToFirstItem
          values={row.tags ? row.tags.map(d => (d.name ? d.name : d)) : ''}
          rowItems={3}
          ids={row.tags ? row.tags.map(d => (d.id ? d.id : d)) : ''}
          tags={true}
          onTagClick={handleFilterChange}
        />
      )
    })),
    filterValue: state.productsAdmin.filterValue,
    editedId: state.productsAdmin.editedId,
    loading: state.productsAdmin.loading
  }
}

export default withDatagrid(
  connect(mapStateToProps, mapDispatchToProps)(injectIntl(withToastManager(ProductGroupsTable)))
)
