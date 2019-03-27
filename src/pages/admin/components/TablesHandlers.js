import {connect} from "react-redux";
import {handleFiltersValue, openAddPopup} from "../../settings/actions";
import {Component} from "react";




class TablesHandlers extends Component {
    state = {
    }


    render() {


        return (
            "Nadpis, search input, Add new button"

        )
    }


}

const mapStateToProps = state => {
    return {
    }
}

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(TablesHandlers)