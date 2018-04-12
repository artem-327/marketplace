import React, {Component} from 'react';

import settingsLogo from '../../../../../images/settings.png'

class TableItem extends Component {

    render() {
        return (
                <div className="data-table-body">
                    <span className="data-table-body-item">
                        BigChem
                    </span>
                        <span className="data-table-body-item">
                        DOW
                    </span>
                        <span className="data-table-body-item">
                        USA
                    </span>
                        <span className="data-table-body-item">
                       13.897/lib
                    </span>
                        <span className="data-table-body-item">
                       $3.2650/lib
                    </span>
                        <span className="data-table-body-item">
                        Drums
                    </span>
                        <span className="data-table-body-item">
                        3 W
                    </span>
                        <span className="data-table-body-item">
                        Prime
                    </span>
                        <span className="data-table-body-item">
                        Granular
                    </span>
                        <span className="data-table-body-item">
                        Dallas TX
                    </span>
                        <span className="data-table-body-item">
                        67543
                    </span>
                        <span className="data-table-body-item">
                        500 miles
                    </span>
                        <span className="data-table-body-item">
                        Net 30
                    </span>
                        <span>
                        <img alt="Settings Logo" src={settingsLogo}/>
                    </span>
                </div>

        );
    }
}

export default TableItem