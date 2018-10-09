import React, {Component} from 'react';
import PropTypes from "prop-types";
import GroupRow from "./GroupRow";
import Row from "./Row";

class Rows extends Component {

    render() {
        let rows = this.props.data.map((item, index) => {
            if(item.group) return <GroupRow key={index} {...item} />;
            return item.rows.map((row, index) => (<Row data={row} key={index}/>))
        });
        return (
            <tbody>
                {rows}
            </tbody>
        )

    }
}

Rows.propTypes = {
    data: PropTypes.array
};

export default Rows;
