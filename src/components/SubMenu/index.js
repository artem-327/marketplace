import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import SubMenu from './SubMenu';
import {toggleFilter} from '../../modules/filter'

function mapStateToProps(store) {
    return {
        filterOpen: store.forms.filter.isOpen
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({toggleFilter}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SubMenu);
