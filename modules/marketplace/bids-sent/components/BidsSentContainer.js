import React from 'react'
import { FormattedNumber } from 'react-intl'
import { connect } from 'react-redux'
import moment from 'moment/moment'

import { getLocationString } from '~/src/utils/functions'
import { withDatagrid } from '~/modules/datagrid'
import BidsSent from './BidsSent'
import * as Actions from '../../actions'
import { FormattedUnit, FormattedAssay } from '~/components/formatted-messages'
import { currency } from '~/constants/index'
import { getSafe } from '~/utils/functions'
import { getLocaleDateFormat } from '~/components/date-format'

function mapStateToProps(store, { datagrid }) {
  return {
    ...store.marketplace,
    rows: [
      {
        "id": 1,
        "createdAt": "2020-12-17T01:22:44.31752-08:00",
        "updatedAt": "2020-12-17T01:22:44.31752-08:00",
        "owner": {
          "id": 275,
          "name": "Norman Fox",
          "cfDisplayName": "Norman Fox",
          "phone": "+13243344344",
          "website": "http://www.univar.com/",
          "sellEligible": true,
          "buyEligible": true,
          "enabled": true,
          "tin": "123456781",
          "dunsNumber": "455454553",
          "preferredBankAccountId": "VA-d2de1b2f-0250-419e-8536-71d7245c98b0",
          "logisticsAccount": true,
          "reviewRequested": false,
          "businessType": {
            "id": 1,
            "name": "Corporation",
            "abbreviation": "Co.",
            "dwollaName": "corporation"
          },
          "hasLogo": true,
          "purchaseHazmatEligible": true,
          "associations": [],
          "paymentProcessor": "VELLOCI",
          "isClientCompany": false
        },
        "createdBy": {
          "id": 114,
          "email": "tomas.drlicek@artio.cz",
          "name": "Tomas Tester",
          "company": {
            "id": 275,
            "name": "Norman Fox",
            "cfDisplayName": "Norman Fox",
            "phone": "+13243344344",
            "website": "http://www.univar.com/",
            "sellEligible": true,
            "buyEligible": true,
            "enabled": true,
            "tin": "123456781",
            "dunsNumber": "455454553",
            "preferredBankAccountId": "VA-d2de1b2f-0250-419e-8536-71d7245c98b0",
            "logisticsAccount": true,
            "reviewRequested": false,
            "businessType": {
              "id": 1,
              "name": "Corporation",
              "abbreviation": "Co.",
              "dwollaName": "corporation"
            },
            "hasLogo": true,
            "purchaseHazmatEligible": true,
            "associations": [],
            "paymentProcessor": "VELLOCI",
            "isClientCompany": false
          }
        },
        "productOffer": {
          "id": 225,
          "cfStatus": "Broadcasting",
          "cfStatusReason": "Offer is broadcasted!",
          "cfPkgTotal": 100,
          "pkgAvailable": 100,
          "pkgAllocated": 0,
          "quantity": 100,
          pricingTiers: [
            {quantityFrom: 2, pricePerUOM: 40},
            {quantityFrom: 50, pricePerUOM: 33},
            {quantityFrom: 100, pricePerUOM: 29}
          ],
          "companyProduct": {
            "id": 102,
            "intProductName": "Methyl methacrylate",
            "intProductCode": "METH",
            "packagingType": {
              "id": 24,
              "name": "bag",
              "measureType": {
                "id": 1,
                "name": "weight"
              },
              "width": 10,
              "height": 10,
              "length": 10,
              "palletPkgMax": 1,
              "palletPkgMin": 1
            },
            "packagingUnit": {
              "id": 8,
              "name": "kilograms",
              "nameAbbreviation": "kg",
              "measureType": {
                "id": 1,
                "name": "weight"
              },
              "ratioToBaseSiUnit": 1,
              "system": true
            },
            "packageWeightUnit": {
              "id": 7,
              "name": "pounds",
              "nameAbbreviation": "lb",
              "measureType": {
                "id": 1,
                "name": "weight"
              },
              "ratioToBaseSiUnit": 0.45359237,
              "system": true
            },
            "packageWeight": 2.2046226218487757,
            "cfPackageWeightSi": 1,
            "packagingSize": 1,
            "nmfcNumber": {
              "id": 328,
              "code": "8035",
              "description": "Convention badges and name tags, adhesive back"
            },
            "freightClass": 60,
            "stackable": false,
            "freezeProtect": false,
            "hazardous": false,
            "companyGenericProduct": {
              "id": 23,
              "name": "Methyl 2-methylacrylate. Methyl methacrylate",
              "code": "METH",
              "blend": false,
              "mfrProductCodes": [],
              "manufacturer": {
                "id": 102,
                "name": "Covalent Chemical"
              },
              "isPublished": true,
              "elements": [
                {
                  "id": 299,
                  "name": "Methyl methacrylate",
                  "displayName": "Methyl methacrylate",
                  "casProduct": {
                    "id": 80626,
                    "casIndexName": "Methyl methacrylate",
                    "casNumber": "80-62-6",
                    "cfChemicalOfInterest": false,
                    "hazardClasses": [
                      {
                        "id": 30,
                        "description": "Flammable Liquid and Combustible Liquid",
                        "classCode": "3"
                      }
                    ]
                  },
                  "assayMin": 99.9,
                  "assayMax": 99.9,
                  "proprietary": false
                }
              ],
              "attachments": [],
              "productGroup": {
                "id": 3,
                "name": "Name",
                "tags": [
                  {
                    "id": 4,
                    "createdAt": "2020-04-02T10:47:30.233486-07:00",
                    "updatedAt": "2020-04-02T10:47:30.233486-07:00",
                    "name": "TSET"
                  },
                  {
                    "id": 5,
                    "createdAt": "2020-04-02T10:47:36.28632-07:00",
                    "updatedAt": "2020-04-02T10:47:36.28632-07:00",
                    "name": "TAG-3"
                  }
                ],
                "marketSegments": []
              },
              "company": {
                "id": 559,
                "name": "Ojojo",
                "cfDisplayName": "Ojojo",
                "dba": "",
                "phone": "",
                "website": "http://www.comoc.com/",
                "sellEligible": true,
                "buyEligible": true,
                "enabled": true,
                "cin": "",
                "tin": "123654789",
                "dunsNumber": "123456789",
                "preferredBankAccountId": "VA-7d14bae8-4a59-4c2e-9fef-286dcb76e7dc",
                "logisticsAccount": true,
                "reviewRequested": false,
                "businessType": {
                  "id": 1,
                  "name": "Corporation",
                  "abbreviation": "Co.",
                  "dwollaName": "corporation"
                },
                "hasLogo": false,
                "purchaseHazmatEligible": false,
                "associations": [
                  {
                    "id": 2,
                    "createdAt": "2020-03-27T04:11:51.645162-07:00",
                    "updatedAt": "2020-03-27T04:11:51.645162-07:00",
                    "name": "ASD"
                  }
                ],
                "paymentProcessor": "VELLOCI",
                "isClientCompany": false
              },
              "physicalState": "liquid",
              "appearance": "\"Clear, colorless\"",
              "odor": "Ester weak odor",
              "ph": "N.A.",
              "meltingPointRange": "-48oC(-54.4 oF)",
              "boilingPointRange": "100.8oC (213.4oF) @ 1013hPa",
              "flashPoint": "11 oC (51.8 oF) (closed cup)",
              "flammabilityOrExplosiveUpper": "<12.5 vol%",
              "flammabilityOrExplosiveLower": ">2.1 vol%",
              "vaporPressure": "3.73kPa @ 20oC",
              "vaporDensity": "3.45( air = 1 )",
              "specificGravity": "0.944 @ 20oC",
              "autoIgnitionTemperature": "421oC (789.8oF)",
              "viscosity": "0.56 mPa・s/20°C",
              "molecularWeight": "100.12",
              "dotUnNumber": {
                "id": 1247,
                "unNumberCode": "UN 1247",
                "description": "Methyl methacrylate monomer, inhibited"
              },
              "dotProperShippingName": "Methyl methacrylate ( Contain polymerization inhibitor)",
              "dotHazardClass": {
                "id": 30,
                "description": "Flammable Liquid and Combustible Liquid",
                "classCode": "3"
              },
              "sdsPreparedBy": "Covalent Chemical",
              "sdsRevisionDate": "2018-01-03T16:00:00-08:00",
              "recommendedUse": "Raw material for many types of polymer products or chemicals.",
              "cfHazardClass": {
                "id": 30,
                "description": "Flammable Liquid and Combustible Liquid",
                "classCode": "3"
              },
              "cfUnNumber": {
                "id": 1247,
                "unNumberCode": "UN 1247",
                "description": "Methyl methacrylate monomer, inhibited"
              },
              "cfProperShippingName": "Methyl methacrylate ( Contain polymerization inhibitor)",
              "companyProductsQuantity": 1
            },
            "cfProductOfferCount": 18,
            "attachments": [],
            "packagingWidth": 10,
            "packagingHeight": 10,
            "packagingLength": 10,
            "palletSaleOnly": true,
            "palletMinPkgs": 1,
            "palletMaxPkgs": 1,
            "palletWeight": 40,
            "cfPalletWeightSi": 18.143694800000002,
            "palletWidth": 48,
            "palletHeight": 60,
            "palletLength": 48
          },
          "grades": [],
          "splitPkg": 1,
          "minPkg": 1,
          "attachments": [],
          "leadTime": 1,
          "conforming": true,
          "warehouse": {
            "id": 150,
            "deliveryAddress": {
              "id": 214,
              "addressName": "PICK",
              "cfName": "PICK",
              "contactEmail": "tesxt@example.com",
              "contactPhone": "+19302948323",
              "contactName": "James Now",
              "address": {
                "id": 410,
                "streetAddress": "8601 95th Street",
                "city": "Pleasant Prairie",
                "country": {
                  "id": 1,
                  "name": "USA",
                  "code": "USA",
                  "phoneCode": "1",
                  "hasProvinces": true
                },
                "province": {
                  "id": 50,
                  "name": "Wisconsin",
                  "abbreviation": "WI"
                },
                "zip": {
                  "id": 3,
                  "zip": "53158",
                  "country": {
                    "id": 1,
                    "name": "USA",
                    "code": "USA",
                    "phoneCode": "1",
                    "hasProvinces": true
                  }
                }
              },
              "liftGate": false,
              "forkLift": false,
              "callAhead": false
            }
          },
          "broadcasted": true,
          "anonymous": true,
          "ownerNacdMember": false,
          "costRecords": [],
          "ownerAssociations": [
            {
              "id": 2,
              "createdAt": "2020-03-27T04:11:51.645162-07:00",
              "updatedAt": "2020-03-27T04:11:51.645162-07:00",
              "name": "ASD"
            }
          ],
          "paymentTerms": "REGULAR",
          "paymentNetDays": 2,
          "cfPaymentTerms": "Net 2",
          "virtual": false,
          "grouped": false,
          "groupEligible": false
        },
        "histories": [
          {
            "createdAt": "2020-12-17T01:22:44.438069-08:00",
            "updatedAt": "2020-12-17T01:22:44.438069-08:00",
            "createdBy": {
              "id": 114,
              "email": "tomas.drlicek@artio.cz",
              "name": "Tomas Tester",
              "company": {
                "id": 275,
                "name": "Norman Fox",
                "cfDisplayName": "Norman Fox",
                "phone": "+13243344344",
                "website": "http://www.univar.com/",
                "sellEligible": true,
                "buyEligible": true,
                "enabled": true,
                "tin": "123456781",
                "dunsNumber": "455454553",
                "preferredBankAccountId": "VA-d2de1b2f-0250-419e-8536-71d7245c98b0",
                "logisticsAccount": true,
                "reviewRequested": false,
                "businessType": {
                  "id": 1,
                  "name": "Corporation",
                  "abbreviation": "Co.",
                  "dwollaName": "corporation"
                },
                "hasLogo": true,
                "purchaseHazmatEligible": true,
                "associations": [],
                "paymentProcessor": "VELLOCI",
                "isClientCompany": false
              }
            },
            "status": "NEW",
            "historyType": "NORMAL",
            "pricePerUOM": 2,
            "pkgAmount": 10,
            "message": "Ahoj"
          }
        ],
        "cfHistoryLastPricePerUOM": 2,
        "cfHistoryLastPkgAmount": 10,
        "cfHistoryLastStatus": "NEW",
        "cfHistoryLastType": "NORMAL"
      }
      ].map(bid => {
      const po = bid.productOffer
      const priceUnit = getSafe(() => po.companyProduct.packagingUnit.nameAbbreviation, '')

      return {
        id: bid.id,
        rawData: bid,
        intProductName: getSafe(() => po.companyProduct.intProductName, ''),

      }
    }),
    isMerchant: getSafe(() => store.auth.identity.isMerchant, false),
    isCompanyAdmin: getSafe(() => store.auth.identity.isCompanyAdmin, false),
    tutorialCompleted: getSafe(() => store.auth.identity.tutorialCompleted, false)
  }
}

export default withDatagrid(connect(mapStateToProps, { ...Actions })(BidsSent))