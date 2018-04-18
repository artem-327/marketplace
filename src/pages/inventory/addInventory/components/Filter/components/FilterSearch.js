import React, {Component} from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
class SetAlerts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: '',
        }

    }

    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
        this.props.onChange(selectedOption)
    };
    render() {
        const { selectedOption } = this.state;

        return (
                <Select
                    className="add-inventory-select"
                    name="form-field-name"
                    value={selectedOption}
                    onChange={this.handleChange.bind(this)}
                    id="state-select"
                    ref={(ref) => { this.select = ref; }}
                    onBlurResetsInput={false}
                    onSelectResetsInput={false}
                    autoFocus
                    simpleValue
                    placeholder={this.props.placeholder}
                    options={[
                        { value: 'AL', label: 'Alabama', disabled: true },
                        { value: 'AK', label: 'Alaska' },
                        { value: 'AS', label: 'American Samoa' },
                        { value: 'AZ', label: 'Arizona' },
                        { value: 'AR', label: 'Arkansas' },
                        { value: 'CA', label: 'California' },
                        { value: 'CO', label: 'Colorado' },
                        { value: 'CT', label: 'Connecticut' },
                        { value: 'DE', label: 'Delaware' },
                        { value: 'DC', label: 'District Of Columbia' },
                        { value: 'FM', label: 'Federated States Of Micronesia' },
                        { value: 'FL', label: 'Florida' },
                        { value: 'GA', label: 'Georgia' },
                        { value: 'GU', label: 'Guam' },
                        { value: 'HI', label: 'Hawaii' },
                        { value: 'ID', label: 'Idaho' },
                        { value: 'IL', label: 'Illinois' },
                        { value: 'IN', label: 'Indiana' },
                        { value: 'IA', label: 'Iowa' },
                        { value: 'KS', label: 'Kansas' },
                        { value: 'KY', label: 'Kentucky' },
                        { value: 'LA', label: 'Louisiana' },
                        { value: 'ME', label: 'Maine' },
                        { value: 'MH', label: 'Marshall Islands' },
                        { value: 'MD', label: 'Maryland' },
                        { value: 'MA', label: 'Massachusetts' },
                        { value: 'MI', label: 'Michigan' },
                        { value: 'MN', label: 'Minnesota' },
                        { value: 'MS', label: 'Mississippi' },
                        { value: 'MO', label: 'Missouri' },
                        { value: 'MT', label: 'Montana' },
                    ]}
                />
            );
    }
}

export default SetAlerts