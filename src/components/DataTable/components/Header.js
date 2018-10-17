import React, {Component} from 'react';
import CheckboxControlled from "../../Checkbox/CheckboxControlled";

class Header extends Component {

    constructor(props) {
        super(props);
        this.header = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.state = { open: {} };
        this.node = React.createRef();
    }

    handleClickOutside(event) {
        if (this.node.current && this.node.current.contains(event.target)) return;
        this.setState({open: {}})
    }

    componentWillUnmount(){
        document.removeEventListener('click', this.handleClickOutside, false);
    }

    handleClick(e, name) {
        e.preventDefault();
        if (!this.state.open[name]) {
            document.addEventListener('click', this.handleClickOutside, false);
        } else {
            document.removeEventListener('click', this.handleClickOutside, false);
        }
        if(name !== null){
            this.setState({open: {[name]: !this.state.open[name]}})
        }
    }

    leftClickSort(name) {
        if (this.state.open[name]) return;
        this.props.sortFunc(name)
    }

    selectTable(value){
        let rowsOpns = this.props.data.rowsOpns.map((r)=>({
            ...r,
            rows: r.rows.map((r2)=>({
                ...r2, selected: value
            }))}
        ));
        this.props.selectTable(rowsOpns);
    }

    isSelected(){
        for(let i = 0; i < this.props.data.rowsOpns.length; i++){
            for(let j = 0; j < this.props.data.rowsOpns[i].rows.length; j++){
                if(!this.props.data.rowsOpns[i].rows[j].selected) return false
            }
        }
        return true
    }


    render() {
        return (
            <thead className='data-table-header'>
                <tr>
                    {this.props.selectable ? <th className="data-table-select"><CheckboxControlled value={this.isSelected()} onChange={(value)=>this.selectTable(value)}/></th> : null}
                    {this.props.contextMenu ? <React.Fragment><th/><th/></React.Fragment> : null}
                    {this.props.data.header.map((item, index) => (
                        item.visible ?
                        <th  ref={this.node} onClick={() => this.leftClickSort(item.name)}
                            onContextMenu={(e) => this.handleClick(e, item.name)} key={index}>
                            {item.name}
                            {this.state.open[item.name] ?
                                <ul className="data-table-context-th">
                                    <li onClick={() => this.props.sortFunc(item.name)}>Sort</li>
                                    <li onClick={() => this.props.toggleColumn(item.index, false)}>Hide</li>
                                </ul> : null}
                        </th> : null
                    ))}
                </tr>
            </thead>
        )

    }
}

export default Header;
