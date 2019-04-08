import React, { Component } from "react"
import { connect } from "react-redux"
import ProdexTable from "~/components/table"
import { Confirm } from "semantic-ui-react"
import {
  openEditPopup,
  getProductsCatalogRequest,
  handleOpenConfirmPopup,
  closeConfirmPopup,
  deleteConfirmation
} from "../../actions"

class ProductCatalogTable extends Component {
  state = {
    columns: [
      { name: "productName", title: "Product Name" },
      { name: "productNumber", title: "Product Number" },
      { name: "casProduct", title: "CAS Product" },
      { name: "packagingType", title: "Packaging Type" },
      { name: "packagingSize", title: "Packaging Size" }
    ]
  }

  componentDidMount() {
    this.props.getProductsCatalogRequest()
  }

  render() {
    const {
      rows,
      filterValue,
      confirmMessage,
      openEditPopup,
      handleOpenConfirmPopup,
      closeConfirmPopup,
      deleteConfirmation
    } = this.props

    console.log("TABLE ROWS", rows)

    const { columns } = this.state

    return (
      <React.Fragment>
        <Confirm
          size="tiny"
          content="Do you really want to delete this product?"
          open={confirmMessage}
          onCancel={closeConfirmPopup}
          onConfirm={deleteConfirmation}
        />
        <ProdexTable
          rows={rows}
          columns={columns}
          filterValue={filterValue}
          rowActions={[
            { text: "Edit", callback: row => openEditPopup(row) },
            {
              text: "Delete",
              callback: row => handleOpenConfirmPopup(row.id)
            }
          ]}
        />
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = {
  openEditPopup,
  getProductsCatalogRequest,
  handleOpenConfirmPopup,
  closeConfirmPopup,
  deleteConfirmation
}

const mapStateToProps = state => {
  return {
    rows: state.settings.productsCatalogRows,
    filterValue: state.settings.filterValue,
    confirmMessage: state.settings.confirmMessage
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductCatalogTable)
