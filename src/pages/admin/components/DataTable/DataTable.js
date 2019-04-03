import React, { Component } from 'react'
import { connect } from 'react-redux'
import ProdexTable from '~/components/table'
import { getDataRequest, openEditPopup, deleteItem } from '../../actions'

class DataTable extends Component {
    componentDidMount() {
        this.props.getDataRequest(this.props.config.api.get)
    }

    render() {
        const {
            rows,
            filterValue,
            currentTab,
            openEditPopup,
            deleteItem,
        } = this.props;

        const { columns } = this.props.config.display;

        return (
            <ProdexTable
                filterValue={filterValue}
                columns={columns}
                rows={rows}
                rowActions={[
                    {text: 'Edit', callback: (row) => openEditPopup({currentTab}, row)},
                    {text: 'Delete', callback: (row) => deleteItem({currentTab}, row.id)}
                ]}
            />
        )
    }
}

const mapDispatchToProps = {
    getDataRequest,
    openEditPopup,
    deleteItem
}

const mapStateToProps = state => {
    let cfg = state.admin.config[state.admin.currentTab];
    return {
        config: cfg,
        rows: state.admin[cfg.api.get.dataName],
        editDeleteColumns: state.admin.columnsForFormatter.editDeleteColumns, //! ! ??
        editPopupBoolean: state.admin.editPopupBoolean,
        addNewPopup: state.admin.addNewPopup,
        filterValue: state.admin.filterValue,
        currentTab: state.admin.currentTab,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DataTable)