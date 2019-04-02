import React, {Component} from "react"
import Router from 'next/router'
import {Control, Form} from 'react-redux-form'
import DropdownRedux from "~/src/components/Dropdown/DropdownRedux"
import RadioRedux from "~/src/components/Radio/RadioRedux"
import RemoteComboBoxRedux from "~/src/components/ComboBox/RemoteComboBoxRedux"
import DatepickerRedux from "~/src/components/Datepicker/DatepickerRedux"
import UploadLot from "./upload/UploadLot"
import {Grid, Header, Form as SForm, FormGroup, FormField, Label, List, Icon, Segment, Button, Divider} from "semantic-ui-react"

export default class AddInventory extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        if (this.props.edit) {
            this.props.getProductOffer(this.props.edit)
        }
        this.props.getWarehouses()
    }

    addProductOffer(values) {

        let params = {
            //"anonymous": true,
            //"assayMax": 0,
            //"assayMin": 0,
            //"externalNotes": "",
            "inStock": !!values.inStock,
            //"internalNotes": "",
            "lots": [
                {
                    "expirationDate": values.validityDate ? values.validityDate+"T00:00:00Z" : null,
                    "lotNumber": "100100100",
                    //"manufacturedDate": "2019-03-29T16:49:22.923Z",
                    "pkgAmount": parseInt(values.pkgAmount)
                }
            ],
            //"manufacturer": 0,
            //"origin": 0,
            "packaging": {
                "packagingType": 1, // TODO: modify it
                "size": 5, // TODO: modify it
                "unit": 1 // TODO: modify it
            },
            "pricing": {
                "cost": 0,
                "price": parseInt(values.pricing.tiers[0].price),
                "tiers": values.pricing.tiers.map((tier, index) => {
                    return {
                        "price": parseInt(tier.price),
                        "quantityFrom": parseInt(!index ? values.minimum : tier.quantityFrom)
                    }
                })
            },
            "processingTimeDays": parseInt(values.processingTime),
            "product": parseInt(values.product.id),
            //"productCode": "",
            "productCondition": 1, // TODO: modify it
            "productForm": 1, // TODO: modify it
            "productGrades": [ // TODO: modify it
                {
                    "id": 1
                }
            ],
            "productName": values.product.chemicalName,
            //"tradeName": "",
            "validityDate": values.validityDate ? values.validityDate+"T00:00:00Z" : null,
            "warehouse": parseInt(values.warehouse)
        }

        this.props.addProductOffer(params).then((productOffer)=>{
            this.uploadDocuments(productOffer)
        })
    }

    changeMinimumRequirement = (e, { value }) => this.props.changeMinimumRequirement(!!value)

    getProcessingTimes = (max) => {
        let processingTimes = []

        for (let i = 1; i <= max; i++) {
            processingTimes.push({id: i, name: i + ' Day'+(i > 1 ? 's' : '')})
        }

        return processingTimes
    }

    getPriceTiers = (max) => {
        let priceTiers = []

        for (let i = 1; i <= max; i++) {
            priceTiers.push({id: i, name: i})
        }

        return priceTiers
    }

    checkUploadDocumentsStatus(attActions, attSuccesses, attErrors) {
        console.log('Attachments: ' + attActions + '; Successes: ' + attSuccesses + '; Errors: ' + attErrors)
        if (attActions === attSuccesses) {
            Router.push("/inventory/my")
        } else if (attActions === (attSuccesses + attErrors)) {
            console.log('not all Attachments were saved :-/')
        }
    }

    uploadDocuments = (productOffer) => {
        let attachments = this.props.fileIds
        let productOfferId = productOffer.value.data

        var attSuccesses = 0
        var attErrors = 0
        var attActions = attachments ? attachments.length : 0

        if (attActions > 0) {
            for (let at = 0; at < attachments.length; at++) {
                this.props.linkAttachment(attachments[at].lot ? true : false, attachments[at].lot ? attachments[at].lot : productOfferId, attachments[at].id).then((r) => {
                    attSuccesses++
                    this.checkUploadDocumentsStatus(attActions, attSuccesses, attErrors)
                }).catch(e => {
                    attErrors++
                    this.checkUploadDocumentsStatus(attActions, attSuccesses, attErrors)
                })
            }
        } else {
            Router.push("/inventory/my")
        }
    }

    renderPriceTiers = () => {
        let priceTiersList = []

        for (let pt = 0; pt < parseInt(this.props.priceTiers); pt++) {
            priceTiersList.push(
                <List.Item>
                    <FormGroup widths={4}>
                        {pt}
                        <Icon name='terminal' />
                        <FormField control={Control.text}
                                   label={pt === 0 ? 'Min OQ' : null}
                                   model={'.pricing.tiers['+pt+'].quantityFrom'}
                                   readOnly={pt === 0 ? true : false}
                                   value={pt === 0 ? (!!this.props.minimumRequirement ? this.props.minimum : '1') : null}
                        />
                        <FormField control={Control.text}
                                   label={pt === 0 ? 'FOB Price' : null}
                                   model={'.pricing.tiers['+pt+'].price'}
                        />
                    </FormGroup>
                </List.Item>
            )
        }

        return priceTiersList
    }

    render() {
        console.log('esisisišim', this.props)
        return (
            <Form model="forms.simpleAdd"
                  component={SForm}
                  onSubmit={(values) => this.addProductOffer(values)}
            >
                <Grid columns={3} centered divided>
                    <Grid.Row>
                        <Grid.Column width={5}>
                            <Grid>
                                <Grid.Column width={13}>
                                    <Header as='h3'>What product do you want to list?</Header>
                                    <FormGroup widths='1'>
                                        <FormField label='Product Search'
                                                   name='product'
                                                   model='.product'
                                                   control={RemoteComboBoxRedux}
                                                   items={this.props.searchedProducts}
                                                   api={(text) => this.props.searchProducts(text)}
                                                   displayName={(product) => (
                                                       (product.chemicalName !== "(unknown)" ?
                                                           product.chemicalName
                                                           : product.casIndexName) + " · " + product.casNumber
                                                   )}
                                                   dataFetched={this.props.searchedProductsFetched}
                                                   saveObj={obj=>obj}
                                                   displayAttr="chemicalName"
                                        />
                                    </FormGroup>

                                    <Header as='h3'>Is this product in stock?</Header>
                                    <FormGroup inline>
                                        <FormField name='inStock'
                                                   model='.inStock'
                                                   control={RadioRedux}
                                                   opns={[
                                                       {label:'No', value: ''}
                                                   ]}
                                                   inline
                                                   dispatch={this.props.dispatch}
                                                   checked={this.props.inStock}
                                        />
                                        <FormField name='inStock'
                                                   model='.inStock'
                                                   control={RadioRedux}
                                                   opns={[
                                                       {label:'Yes', value: 'Yes'}
                                                   ]}
                                                   inline
                                                   dispatch={this.props.dispatch}
                                                   checked={this.props.inStock}
                                        />
                                    </FormGroup>
                                    <FormGroup widths='3'>
                                        <FormField label='Processing Time'
                                                   name='processingTime'
                                                   model='.processingTime'
                                                   opns={this.getProcessingTimes(14)}
                                                   control={DropdownRedux}
                                                   defaultValue={1}
                                                   dispatch={this.props.dispatch}
                                        />
                                    </FormGroup>

                                    <Header as='h3'>Does this product expire?</Header>
                                    <FormGroup inline>
                                        <FormField name='doesExpire'
                                                   model='.doesExpire'
                                                   control={RadioRedux}
                                                   opns={[
                                                       {label:'No', value: ''}
                                                   ]}
                                                   inline
                                                   dispatch={this.props.dispatch}
                                                   checked={this.props.doesExpire}
                                        />
                                        <FormField name='doesExpire'
                                                   model='.doesExpire'
                                                   control={RadioRedux}
                                                   opns={[
                                                       {label:'Yes', value: 'Yes'}
                                                   ]}
                                                   inline
                                                   dispatch={this.props.dispatch}
                                                   checked={this.props.doesExpire}
                                        />
                                    </FormGroup>
                                    <FormGroup widths='3'>
                                        <FormField label='Expiration Date'
                                                   name='validityDate'
                                                   model='.validityDate'
                                                   control={DatepickerRedux}
                                                   dispatch={this.props.dispatch}
                                                   value={this.props.validityDate}
                                                   disabled={!this.props.doesExpire}
                                        />
                                    </FormGroup>

                                    <Header as='h3'>Where will this product ship from?</Header>
                                    <FormGroup widths='1'>
                                        <FormField label='Warehouse'
                                                   name='warehouse'
                                                   model='.warehouse'
                                                   control={DropdownRedux}
                                                   dispatch={this.props.dispatch}
                                                   defaultValue={''}
                                                   opns={this.props.warehousesList}
                                        />
                                    </FormGroup>

                                    <Header as='h3'>How many packages are available?</Header>
                                    <FormGroup widths='3'>
                                        <FormField label='Total Packages'
                                                   name='pkgAmount'
                                                   model='.pkgAmount'
                                                   control={Control.text}
                                        />
                                    </FormGroup>
                                </Grid.Column>
                            </Grid>
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <Grid columns={2} centered>
                                <Grid.Column width={12}>
                                    <Header as='h3'>Is there any order minimum requirement?</Header>
                                    <FormGroup inline>
                                        <FormField name='minimumRequirement'
                                                   model='.minimumRequirement'
                                                   control={RadioRedux}
                                                   opns={[
                                                       {label:'No', value: ''}
                                                   ]}
                                                   inline
                                                   dispatch={this.props.dispatch}
                                                   checked={this.props.minimumRequirement}
                                        />
                                        <FormField name='minimumRequirement'
                                                   model='.minimumRequirement'
                                                   control={RadioRedux}
                                                   opns={[
                                                       {label:'Yes', value: 'Yes'}
                                                   ]}
                                                   inline
                                                   dispatch={this.props.dispatch}
                                                   checked={this.props.minimumRequirement}
                                        />
                                    </FormGroup>
                                    <FormGroup widths='4'>
                                        <FormField label='Minimum OQ'
                                                   control={Control.text}
                                                   model='.minimum'
                                                   defaultValue={'1'}
                                                   disabled={!this.props.minimumRequirement}
                                        />
                                        <FormField label='Splits'
                                                   control={Control.text}
                                                   model='.splits'
                                                   defaultValue={'1'}
                                                   disabled={!this.props.minimumRequirement}
                                        />
                                    </FormGroup>

                                    <Header as='h3'>How many price tiers would you like to offer?</Header>
                                    <FormGroup widths={4}>
                                        <FormField label='Price Tiers'
                                                   control={DropdownRedux}
                                                   model='.priceTiers'
                                                   opns={this.getPriceTiers(10)}
                                                   dispatch={this.props.dispatch}
                                                   defaultValue={this.props.priceTiers}
                                        />
                                    </FormGroup>

                                    <Header as='h3'>What is the FOB price for each tier?</Header>
                                    <List>{this.renderPriceTiers()}</List>

                                    <Divider />
                                    <Header as='h3'>Upload Spec Sheet</Header>
                                    <FormField {...this.props}
                                               control={UploadLot}
                                               model='.documents'
                                               type='Spec Sheet'
                                               fileMaxSize={20}>
                                            Drag and drop spec sheet file here or <a>select</a> from computer
                                    </FormField>
                                </Grid.Column>
                            </Grid>
                        </Grid.Column>
                        <Grid.Column width={5}>
                            <Button primary
                                    type='submit'>Add Product Offer</Button>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Form>
        )
    }
}