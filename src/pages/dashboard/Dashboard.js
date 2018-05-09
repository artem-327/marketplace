import React, {Component} from 'react';
import InputGroup from './components/InputGroup'

import './dashboard.css'


class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            counterActivated: false,
            statsRef:{}
        }
    }

    render() {
      let location = [
        {
          // todo need to create select box
          label: 'WAREHOUSE',
          type: 'select',
          name: 'warehouse',
          value: 'Select'
        },
        {
          label: 'WAREHOUSE NAME',
          type: 'text',
          name: 'warehouse-name',
          value: ''
        },
        {
          label: 'ADDRESS',
          type: 'text',
          name: 'address',
          value: ''
        },
        /*
        {
          label: 'WAREHOUSE NAME',
          type: 'password',
          name: 'first',
          value: ''
        },
        */
      ]

      let detail = [
        {
          label: 'TOTAL PACKAGES',
          type: 'text',
          name: 'total-packages',
          value: ''
        },

        // todo need to create select box
        {

        }
      ]

        return (
            <div className="LandingPage">
                   Dashboard test
                   <InputGroup title='filter' inputsLocation={location} inputsDetail={detail}/>
            </div>
        );
    }
}

export default Dashboard;
