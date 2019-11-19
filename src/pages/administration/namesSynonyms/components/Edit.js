import React, {Component} from 'react'
import InputEdit from '../../../../components/InputEdit/InputEdit'
import {FormattedMessage} from 'react-intl'

class NamesSynonyms extends Component {
  constructor(props) {
    super(props)
    this.state = {
      primaryName: '',
      alternativeNames: []
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({alternativeNames: nextProps.alternativeNames})
    if (nextProps.selectedProduct) {
      this.setState({
        primaryName: nextProps.selectedProduct.chemicalName
      })
    }
  }

  saveNewName(text, index) {
    let newAlternativeNames = this.state.alternativeNames.slice()
    newAlternativeNames[index].alternativeName = text
    this.setState({
      alternativeNames: newAlternativeNames
    })
  }

  render() {
    return this.props.selectedProduct ? (
      <div className='edit'>
        <h2>
          <FormattedMessage id='namesSynonyms.editPrimaryName' defaultMessage='Edit Primary name and synonyms' />
        </h2>
        <h3>
          <FormattedMessage id='namesSynonyms.primaryName' defaultMessage='Primary Name' />
        </h3>
        <InputEdit
          value={this.state.primaryName}
          onSave={text => this.setState({primaryName: text})}
          data-test='administration_name_synonyms_primaryName_inp'
        />
        <h3>
          <FormattedMessage id='namesSynonyms.synonyms' defaultMessage='Synonyms' />
        </h3>
        <ul className='synonyms-list'>
          {this.state.alternativeNames.map((item, index) => {
            return (
              <InputEdit
                key={item.id}
                value={item.alternativeName}
                onSave={text => this.saveNewName(text, index)}
                data-test='administration_name_synonyms_alternativeName_inp'
              />
            )
          })}
        </ul>
        <button className='button' data-test='administration_name_synonyms_save_btn'>
          <FormattedMessage id='global.save' defaultMessage='Save' />
        </button>
      </div>
    ) : null
  }
}

export default NamesSynonyms
