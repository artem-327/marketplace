import React, { Component } from 'react'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { FormattedMessage } from 'react-intl'
import { withToastManager } from 'react-toast-notifications'

import { generateToastMarkup, getSafe } from '~/utils/functions'
import confirm from '~/components/Confirmable/confirm'
import ProdexTable from '~/components/table'
import { openPopup, deleteTag } from '../../actions'
import { withDatagrid } from '~/modules/datagrid'

class TagsTable extends Component {
  constructor(props) {
    super(props)

    this.state = {
      columns: [
        {
          name: 'name',
          title: (
            <FormattedMessage id='operations.tagName' defaultMessage='Tag Name'>
              {text => text}
            </FormattedMessage>
          ),
          sortPath: 'Tag.name',
          actions: this.getActions()
        }
      ]
    }
  }

  getActions = () => {
    const { intl, openPopup, deleteTag, datagrid } = this.props

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

  render() {
    const { loading, rows, datagrid, filterValue } = this.props

    const { columns } = this.state
    return (
      <React.Fragment>
        <ProdexTable
          tableName={'operations_tag'}
          {...datagrid.tableProps}
          filterValue={filterValue}
          loading={datagrid.loading || loading}
          columns={columns}
          rows={rows}
          columnActions='name'
        />
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = {
  openPopup,
  deleteTag
}

const mapStateToProps = (state, { datagrid }) => {
  return {
    rows: datagrid.rows,
    filterValue: state.operations.filterValue,
    loading: state.operations.loading
  }
}

export default withDatagrid(connect(mapStateToProps, mapDispatchToProps)(injectIntl(withToastManager(TagsTable))))
