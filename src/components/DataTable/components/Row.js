import React, {Component} from 'react';
import CheckboxControlled from "../../Checkbox/CheckboxControlled";
import ThreeDots from "../../ThreeDots/ThreeDots";
import classnames from "classnames";
import ThreeDotsMenu from "../../ThreeDots/ThreeDotsMenu";

class Row extends Component {

    constructor(props) {
        super(props);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.state = { openContext: false };
        this.row = React.createRef();
    }

    handleClickOutside(event) {
        if (this.row.current && this.row.current.contains(event.target)) return;
        this.setState({openContext: false})
    }

    componentWillUnmount(){
        document.removeEventListener('click', this.handleClickOutside, false);
    }

    handleClick(e) {
        e.preventDefault();
        if (!this.state.openContext) {
            document.addEventListener('click', this.handleClickOutside, false);
        } else {
            document.removeEventListener('click', this.handleClickOutside, false);
        }
        this.setState({openContext: !this.state.openContext})
    }

    render() {
        return (
            <tr>
                {this.props.selectable ? <td className="data-table-select"><CheckboxControlled value={this.props.data.selected} onChange={(value) => this.props.selectFunc(this.props.groupId, this.props.data.index, value)}/></td> : null}
                {this.props.contextMenu ? <React.Fragment >
                    <td className="data-table-context-td" ref={this.row} onClick={(e)=>this.handleClick(e)}><ThreeDots className={'small'+ classnames({" active": (this.state.openContext)})}/></td>
                    <td className="data-table-context-holder"><ThreeDotsMenu id={this.props.data.id} links={this.props.contextMenu} isOpen={this.state.openContext}/></td>
                </React.Fragment> : null}
                {this.props.data.row.map((cell, index) => {
                    if (!this.props.headers[index].visible) return null;
                    return <td key={index}>{cell}</td>
                })}
            </tr>
        )
    }
}

export default Row;
