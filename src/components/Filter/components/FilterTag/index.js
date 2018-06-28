import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import FilterTags from './FilterTags';
import {closeFilterTag} from '../../../../modules/filter';


function mapStateToProps(store) {
    return {
        filterTags: store.forms.filter.filterTags
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({closeFilterTag}, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(FilterTags);