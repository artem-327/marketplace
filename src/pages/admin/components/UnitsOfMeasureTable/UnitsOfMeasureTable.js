import React, { Component } from 'react'
import { connect } from 'react-redux'
import { SearchState, IntegratedFiltering } from '@devexpress/dx-react-grid'
import { Grid, Table, TableHeaderRow } from '~/components/dx-grid-semantic-ui/plugins'

import { getUnitsOfMeasureDataRequest } from '../../actions'
import {EditDeleteFormatterProvider} from "./UnitsOfMeasureTableProviders";

class UnitsOfMeasureTable extends Component {
    state = {
        columns: [
            {name: 'editDeleteBtn', title: ' ', width: 45, dropdown: true},
            {name: 'name', title: 'Name'},
            {name: 'nameAbbreviation', title: 'Name abbreviation',},
            {name: 'measureType', title: 'Measure type'},
        ]
    }

    componentDidMount() {
        this.props.getUnitsOfMeasureDataRequest()
    }

    render() {
        const {
            rows,
            filterValue,
            editDeleteColumns,
            editPopupBoolean,
            addNewUnitsOfMeasurePopup    //! !
        } = this.props

        const { columns } = this.state

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
    getUnitsOfMeasureDataRequest
}

const mapStateToProps = state => {
    return {
        rows: state.admin.unitsOfMeasureRows,
        editDeleteColumns: state.admin.columnsForFormatter.editDeleteColumns,
        editPopupBoolean: state.admin.editPopupBoolean,
        addNewUnitsOfMeasurePopup: state.settings.addNewUnitsOfMeasurePopup,
        filterValue: state.admin.filterValue
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UnitsOfMeasureTable)