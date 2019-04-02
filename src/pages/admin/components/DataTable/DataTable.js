import React, { Component } from 'react'
import { connect } from 'react-redux'
import { SearchState, IntegratedFiltering } from '@devexpress/dx-react-grid'
import { Grid, Table, TableHeaderRow } from '~/components/dx-grid-semantic-ui/plugins'

import { getDataRequest } from '../../actions'
import {EditDeleteFormatterProvider} from "../TableProviders"

class DataTable extends Component {
    componentDidMount() {
        console.log('!!!!!!!!!! DataTable - componentDidMount !!!!!!!!!!!!!!!!!!! props..get ', this.props.config.api.get);
        this.props.getDataRequest(this.props.config.api.get)
    }

    render() {
        const {
            rows,
            filterValue,
            editDeleteColumns,
            editPopupBoolean,
            addNewUnitsOfMeasurePopup,    //! !
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

    console.log('!!!!!!! state.admin.config', state.admin.config);
    //console.log('!!!!!!! state.admin.config[state.admin.currentTab].fetchedDataName', state.admin.config[state.admin.currentTab].fetchedDataName);
    console.log('!!!!!!! cfg - ', cfg);

    return {
        config: cfg,
        //! !config: state.admin.config,
        //rows: state.admin[cfg.fetchedDataName],
        rows: state.admin.unitsOfMeasureRows,

        editDeleteColumns: state.admin.columnsForFormatter.editDeleteColumns,
        editPopupBoolean: state.admin.editPopupBoolean,
        addNewUnitsOfMeasurePopup: state.settings.addNewUnitsOfMeasurePopup,
        filterValue: state.admin.filterValue,
        currentTab: state.admin.currentTab,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DataTable)