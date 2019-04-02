import React, { Component } from 'react'
import { connect } from 'react-redux'
import { SearchState, IntegratedFiltering } from '@devexpress/dx-react-grid'
import { Grid, Table, TableHeaderRow } from '~/components/dx-grid-semantic-ui/plugins'

import { getDataRequest } from '../../actions'
import {EditDeleteFormatterProvider} from "../TableProviders"

class DataTable extends Component {
    componentDidMount() {
        this.props.getDataRequest(this.props.config.api.get)
    }

    render() {
        const {
            rows,
            filterValue,
            editDeleteColumns,
            editPopupBoolean,
            addNewPopupBoolean,
        } = this.props;

        const { columns } = this.props.config;

        const GridRoot = props => <Grid.Root {...props} />
        const HeaderCells = props => <TableHeaderRow.Cell {...props} />
        const TableCells = props => <Table.Cell {...props} />

        return (
            <Grid
                rootComponent={ GridRoot }
                rows={ rows }
                columns={ columns }
            >
                <SearchState
                    value={ filterValue }
                />
                <IntegratedFiltering />
                <Table
                    cellComponent={ TableCells }
                />
                <TableHeaderRow
                    cellComponent={ HeaderCells }
                />
                <EditDeleteFormatterProvider
                    for={ editDeleteColumns }
                    rows={ rows }
                />
            </Grid>
        )
    }
}

const mapDispatchToProps = {
    getDataRequest
}

const mapStateToProps = state => {
    let cfg = state.admin.config[state.admin.currentTab];
    return {
        config: cfg,
        rows: state.admin[cfg.api.get.dataName],

        editDeleteColumns: state.admin.columnsForFormatter.editDeleteColumns,
        editPopupBoolean: state.admin.editPopupBoolean,
        addNewPopupBoolean: state.admin.addNewPopupBoolean,
        filterValue: state.admin.filterValue,
        currentTab: state.admin.currentTab,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DataTable)