import React, { Component } from 'react';

import ThreeDotsMenu from '../../ThreeDots/ThreeDotsMenu';
import AddCart from '../../../pages/cart/components/AddCart';
import { checkToken } from "../../../utils/auth";
import { Icon, Checkbox } from "semantic-ui-react"

class Row extends Component {

  constructor(props) {
    super(props);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.state = { openContext: false, openRowComponent: false };
    this.row = React.createRef();
  }

  handleClickOutside(event) {
    if (this.row.current && this.row.current.contains(event.target)) return;
    this.setState({ openContext: false });
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside, false);
  }

  handleClick(e) {
    e.preventDefault();
    if (!this.state.openContext) {
      document.addEventListener('click', this.handleClickOutside, false);
    } else {
      document.removeEventListener('click', this.handleClickOutside, false);
    }
    this.setState({ openContext: !this.state.openContext });
  }

  addCart(event, id) {
    if (checkToken(this.props)) return;

    if (event.target.parentNode.classList.contains('checkbox') || event.target.getAttribute('type') === 'checkbox') {
      // function addCart() blocked - clicked on checkmark
      this.props.removePopup();
      return false;
    }

    // check that new popup has different id than previous
    if (AddCart.openedPopup.id !== id) {
      // previous popup has different id - remove it
      if (AddCart.openedPopup.id) {
        AddCart.openedPopup.id = false;
        this.props.removePopup();
      }

      // create new popup
      AddCart.openedPopup.id = id;
      this.props.addPopup(<AddCart id={id} history={this.props.history} className='add-cart-popup' />);
    }
  }

  render() {
    const { tableType } = this.props
    const isAllInventory = tableType === "allInventoryTable"
    return (
      <React.Fragment>
        <tr className={isAllInventory ? "isAllInventory" : ""}>
          {this.props.selectable ? (
            <td className="data-table-select">
              <Checkbox checked={this.props.rowOpns.selected}
                disabled={this.props.rowOpns.disabled ? true : false}
                groupid={this.props.groupId}
                rowindex={this.props.rowOpns.index}
                disabling={isAllInventory}
                otherschecked={this.props.othersChecked}
                onChange={
                  (event, data) => {
                    console.log('onChane!')
                    this.props.selectFunc({
                      groupId: data.groupid,
                      rowId: data.rowindex,
                      checked: data.checked,
                      othersChecked: data.otherschecked,
                      disabling: data.disabling
                    })
                  }
                }
              />
            </td>
          ) : null}
          {this.props.contextMenu ? (
            <React.Fragment>
              <td
                className="data-table-context-td"
                ref={this.row}
                onClick={e => this.handleClick(e)}
              >
                <Icon name='ellipsis vertical' color={this.state.openContext ? 'blue' : 'black'} size='large' />
              </td>
              <td className="data-table-context-holder">
                <ThreeDotsMenu
                  callback={() =>
                    this.setState({
                      openRowComponent: !this.state.openRowComponent
                    })
                  }
                  id={this.props.rowOpns.id}
                  links={this.props.contextMenu}
                  isOpen={this.state.openContext}
                />
              </td>
            </React.Fragment>
          ) : null}
          {this.props.data.map((cell, index) => {
            const cellShortName =
              typeof cell === 'string' ? cell.slice(0, 14) : cell;

            const cellName =
              typeof cell === 'string'
                ? `${cellShortName}${
                cellShortName.length < cell.length ? '...' : ''
                }`
                : (
                  cell && cell.content
                    ? cell.content
                    : cell
                );

            const cellAlign = cell && cell.align ? cell.align : ''

            if (!this.props.headers[index].visible) return null;

            return (
              <td
                onClick={isAllInventory ? () => this.props.onRowClick(this.props.id, this.props.history) : () => { }}
                key={index}
                title={cellName && cellName.length > 14 ? cell : ''}
                className={cellAlign}>
                {/*Decide if it will be formatted also through react-intl*/}
                {cellName}
              </td>
            );
          })}
        </tr>
        {this.props.rowComponent && this.state.openRowComponent ? (
          <tr>
            <td colSpan={this.props.data.length + 3}>
              {React.cloneElement(this.props.rowComponent, {
                visible: this.state.openRowComponent,
                id: this.props.rowOpns.id,
                closeRowComponent: () =>
                  this.setState({ openRowComponent: false })
              })}
            </td>
          </tr>
        ) : null}
      </React.Fragment>
    );
  }
}

export default Row;
