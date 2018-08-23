import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import FilterTags from './FilterTags';
import {closeFilterTag} from '../../../../modules/filter';

function mapStateToProps(store) {
    return {
<<<<<<< src/components/Filter/components/FilterTag/index.js
        filterTags: store.forms.filter.filterTags,
        packageTypes:store.packageTypes.data
=======
        filterTags: store.filter.filterTags,
        productAge: store.forms.filter.productAge
>>>>>>> src/components/Filter/components/FilterTag/index.js
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({closeFilterTag}, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(FilterTags);