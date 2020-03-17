Cypress.Commands.add("deleteWholeCart", (token) => {
    cy.request({
        method: 'DELETE',
        url: '/prodex/api/cart',
        headers: {
            authorization: "Bearer " + token
        }
    }).then((response) => {
        expect(response.status).to.eq(200)
    })
})

Cypress.Commands.add("getToken", () => {
    cy.request({
        method: 'POST',
        url: '/prodex/oauth/token',
        headers: {
            authorization: "Basic cHJvZGV4LXJlYWN0OmthcmVsLXZhcmVs"
        },
        form: true,
        body: {
            grant_type: "password",
            username: "admin@example.com",
            password: "echopass123"
        }
    }).then((response) => {
        expect(response.status).to.eq(200)
        return response.body.access_token
    })
})

Cypress.Commands.add("getUserToken", (user, password) => {
    cy.request({
        method: 'POST',
        url: '/prodex/oauth/token',
        headers: {
            authorization: "Basic cHJvZGV4LXJlYWN0OmthcmVsLXZhcmVs"
        },
        form: true,
        body: {
            grant_type: "password",
            username: user,
            password: password
        }
    }).then((response) => {
        expect(response.status).to.eq(200)
        return response.body.access_token
    })
})


Cypress.Commands.add("getFirstItemId", (token) => {
    cy.request({
        method: 'POST',
        url: '/prodex/api/product-offers/own/datagrid/',
        headers: {
            authorization: "Bearer " + token
        },
        body: {pageNumber: 0, filters: [], pageSize: 50}
    }).then((response) => {
        expect(response.status).to.eq(200)
        return response.body[0].id
    })
})

Cypress.Commands.add("deleteEntity", (token, entity, id) => {
    cy.request({
        method: 'DELETE',
        url: '/prodex/api/' + entity + '/' + id,
        headers: {
            authorization: "Bearer " + token
        }
    }).then((response) => {
        expect(response.status).to.eq(200)
    })
})

Cypress.Commands.add("getFirstItemIdWithFilter", (token, filter) => {
    cy.request({
        method: 'POST',
        url: '/prodex/api/product-offers/own/datagrid/',
        headers: {
            authorization: "Bearer " + token
        },
        body: {filters: filter, pageNumber: 0, pageSize: 50}
    }).then((response) => {
        expect(response.status).to.eq(200)
        return response.body[0].id
    })
})

Cypress.Commands.add("getFirstEchoProductIdWithFilter", (token, filter) => {
    cy.request({
        method: 'POST',
        url: '/prodex/api/echo-products/datagrid',
        headers: {
            authorization: "Bearer " + token
        },
        body: {filters: filter, pageNumber: 0, pageSize: 50, "orOperator": true}
    }).then((response) => {
        expect(response.status).to.eq(200)
        return response.body[0].id
    })
})

Cypress.Commands.add("getFirstMarketName", (token, filter) => {
    cy.request({
        method: 'POST',
        url: '/prodex/api/product-offers/broadcasted/datagrid/',
        headers: {
            authorization: "Bearer " + token
        },
        body: {filters: filter, pageNumber: 0, pageSize: 50}
    }).then((response) => {
        expect(response.status).to.eq(200)
        return response.body[0].companyProduct.intProductName
    })
})

Cypress.Commands.add("getItemBody", (token, itemId) => {
    cy.request({
        method: 'GET',
        url: '/prodex/api/product-offers/' + itemId,
        headers: {
            authorization: "Bearer " + token
        }
    }).then((response) => {
        expect(response.status).to.eq(200)
        return response.body
    })
})

Cypress.Commands.add("getCartBody", (token) => {
    cy.request({
        method: 'GET',
        url: '/prodex/api/cart',
        headers: {
            authorization: "Bearer " + token
        }
    }).then((response) => {
        expect(response.status).to.eq(200)
        return response.body
    })
})

Cypress.Commands.add("getMarketPlaceDatagridBody", (token) => {
    cy.request({
        method: 'POST',
        url: '/prodex/api/product-offers/broadcasted/datagrid/',
        headers: {
            authorization: "Bearer " + token
        },
        body: {pageNumber: 0, filters: [], pageSize: 50}
    }).then((response) => {
        expect(response.status).to.eq(200)
        return response.body
    })
})

Cypress.Commands.add("getMarketPlaceFilteredDatagridBody", (token, filter) => {
    cy.request({
        method: 'POST',
        url: '/prodex/api/product-offers/broadcasted/datagrid/',
        headers: {
            authorization: "Bearer " + token
        },
        body: {pageNumber: 0, filters: filter, pageSize: 50}
    }).then((response) => {
        expect(response.status).to.eq(200)
        return response.body
    })
})

Cypress.Commands.add("getInventoryDatagridBody", (token) => {
    cy.request({
        method: 'POST',
        url: '/prodex/api/product-offers/own/datagrid/',
        headers: {
            authorization: "Bearer " + token
        },
        body: {pageNumber: 0, filters: [], pageSize: 50}
    }).then((response) => {
        expect(response.status).to.eq(200)
        return response.body
    })
})

Cypress.Commands.add("getExpectedCartPrice", (token) => {
    cy.request({
        method: 'POST',
        url: '/prodex/api/product-offers/broadcasted/datagrid/',
        headers: {
            authorization: "Bearer " + token
        },
        body: {pageNumber: 0, filters: [], pageSize: 50}
    }).then((response) => {
        expect(response.status).to.eq(200)
        let price = parseInt(response.body[0].pricingTiers[0].price.amount, 10) + parseInt(response.body[0].companyProduct.packagingSize, 10)
        return price
    })
})

Cypress.Commands.add("getFirstMarketIdWithFilter", (token, filter) => {
    cy.request({
        method: 'POST',
        url: '/prodex/api/product-offers/broadcasted/datagrid/',
        headers: {
            authorization: "Bearer " + token
        },
        body: {pageNumber: 0, filters: filter, pageSize: 50}
    }).then((response) => {
        expect(response.status).to.eq(200)
        return response.body[0].id
    })
})

Cypress.Commands.add("getFirstUser", (token) => {
    cy.request({
        method: 'POST',
        url: '/prodex/api/users/datagrid',
        headers: {
            authorization: "Bearer " + token
        },
        body: {pageNumber: 0, filters: filter, pageSize: 50}
    }).then((response) => {
        expect(response.status).to.eq(200)
        return response.body[0].id
    })
})

Cypress.Commands.add("getFirstUserIdWithFilter", (token, filter) => {
    cy.request({
        method: 'POST',
        url: '/prodex/api/users/datagrid',
        headers: {
            authorization: "Bearer " + token
        },
        body: {pageNumber: 0, filters: filter, pageSize: 50, orOperator: true}
    }).then((response) => {
        expect(response.status).to.eq(200)
        return response.body[0].id
    })
})

Cypress.Commands.add("getFirstBranchIdWithFilter", (token, filter) => {
    cy.request({
        method: 'POST',
        url: '/prodex/api/branches/datagrid',
        headers: {
            authorization: "Bearer " + token
        },
        body: {pageNumber: 0, filters: filter, pageSize: 50, orOperator: true}
    }).then((response) => {
        expect(response.status).to.eq(200)
        return response.body[0].id
    })
})

Cypress.Commands.add("getFirstProductIdWithFilter", (token, filter) => {
    cy.request({
        method: 'POST',
        url: '/prodex/api/products/datagrid',
        headers: {
            authorization: "Bearer " + token
        },
        body: {pageNumber: 0, filters: filter, pageSize: 50, orOperator: true}
    }).then((response) => {
        expect(response.status).to.eq(200)
        return response.body[0].id
    })
})

Cypress.Commands.add("getFirstAddressIdWithFilter", (token, filter) => {
    cy.request({
        method: 'POST',
        url: '/prodex/api/delivery-addresses/datagrid',
        headers: {
            authorization: "Bearer " + token
        },
        body: {pageNumber: 0, filters: filter, pageSize: 50}
    }).then((response) => {
        expect(response.status).to.eq(200)
        return response.body[0].id
    })
})

Cypress.Commands.add("getFirstCasProductWithFilter", (token, filter) => {
    cy.request({
        method: 'POST',
        url: '/prodex/api/cas-products/datagrid',
        headers: {
            authorization: "Bearer " + token
        },
        body: {pageNumber: 0, filters: filter, pageSize: 50, orOperator: true}
    }).then((response) => {
        expect(response.status).to.eq(200)
        if (response.body[0] == undefined) {
            return null
        } else {
            return response.body[0].id
        }
    })
})

Cypress.Commands.add("getFirstEntityWithFilter", (token, entity, filter) => {
    cy.request({
        method: 'POST',
        url: '/prodex/api/' + entity + '/datagrid',
        headers: {
            authorization: "Bearer " + token
        },
        body: {pageNumber: 0, filters: filter, pageSize: 50, orOperator: true}
    }).then((response) => {
        expect(response.status).to.eq(200)
        if (response.body[0] == undefined) {
            return null
        } else {
            return response.body[0].id
        }
    })
})

Cypress.Commands.add("getFirstPackagingUnitWithFilter", (token, filter) => {
    cy.request({
        method: 'POST',
        url: '/prodex/api/packaging-types/datagrid',
        headers: {
            authorization: "Bearer " + token
        },
        body: {pageNumber: 0, filters: filter, pageSize: 50}
    }).then((response) => {
        expect(response.status).to.eq(200)
        return response.body[0].id
    })
})

Cypress.Commands.add("getFirstDocumentTypeWithFilter", (token, filter) => {
    cy.request({
        method: 'POST',
        url: '/prodex/api/document-types/datagrid',
        headers: {
            authorization: "Bearer " + token
        },
        body: {pageNumber: 0, filters: filter, pageSize: 50}
    }).then((response) => {
        expect(response.status).to.eq(200)
        return response.body[0].id
    })
})

Cypress.Commands.add("getFirstMarketSegmentWithFilter", (token, filter) => {
    cy.request({
        method: 'POST',
        url: '/prodex/api/market-segments/datagrid',
        headers: {
            authorization: "Bearer " + token
        },
        body: {pageNumber: 0, filters: filter, pageSize: 50}
    }).then((response) => {
        expect(response.status).to.eq(200)
        return response.body[0].id
    })
})

Cypress.Commands.add("getFirstManufacturerWithFilter", (token, filter) => {
    cy.request({
        method: 'POST',
        url: '/prodex/api/manufacturers/datagrid',
        headers: {
            authorization: "Bearer " + token
        },
        body: {pageNumber: 0, filters: filter, pageSize: 50}
    }).then((response) => {
        expect(response.status).to.eq(200)
        return response.body[0].id
    })
})

Cypress.Commands.add("getFirstConditionWithFilter", (token, filter) => {
    cy.request({
        method: 'POST',
        url: '/prodex/api/product-conditions/datagrid',
        headers: {
            authorization: "Bearer " + token
        },
        body: {pageNumber: 0, filters: filter, pageSize: 50}
    }).then((response) => {
        expect(response.status).to.eq(200)
        return response.body[0].id
    })
})

Cypress.Commands.add("getFirstGradeWithFilter", (token, filter) => {
    cy.request({
        method: 'POST',
        url: '/prodex/api/product-grades/datagrid',
        headers: {
            authorization: "Bearer " + token
        },
        body: {pageNumber: 0, filters: filter, pageSize: 50}
    }).then((response) => {
        expect(response.status).to.eq(200)
        return response.body[0].id
    })
})

Cypress.Commands.add("getFirstFormWithFilter", (token, filter) => {
    cy.request({
        method: 'POST',
        url: '/prodex/api/product-forms/datagrid',
        headers: {
            authorization: "Bearer " + token
        },
        body: {pageNumber: 0, filters: filter, pageSize: 50}
    }).then((response) => {
        expect(response.status).to.eq(200)
        return response.body[0].id
    })
})

Cypress.Commands.add("getFirstConditionWithFilter", (token, filter) => {
    cy.request({
        method: 'POST',
        url: '/prodex/api/product-conditions/datagrid',
        headers: {
            authorization: "Bearer " + token
        },
        body: {pageNumber: 0, filters: filter, pageSize: 50}
    }).then((response) => {
        expect(response.status).to.eq(200)
        return response.body[0].id
    })
})

Cypress.Commands.add("getFirstCompanyWithFilter", (token, filter) => {
    cy.request({
        method: 'POST',
        url: '/prodex/api/companies/datagrid',
        headers: {
            authorization: "Bearer " + token
        },
        body: {pageNumber: 0, filters: filter, pageSize: 50}
    }).then((response) => {
        expect(response.status).to.eq(200)
        return response.body[0].id
    })
})

Cypress.Commands.add("getFirstCompanyProductWithFilter", (token, filter) => {
    cy.request({
        method: 'POST',
        url: '/prodex/api/company-products/datagrid',
        headers: {
            authorization: "Bearer " + token
        },
        body: {pageNumber: 0, filters: filter, pageSize: 50}
    }).then((response) => {
        expect(response.status).to.eq(200)
        return response.body[0].id
    })
})

Cypress.Commands.add("getFirstAttachmentWithFilter", (token, filter) => {
    cy.request({
        method: 'POST',
        url: '/prodex/api/attachments/datagrid/',
        headers: {
            authorization: "Bearer " + token
        },
        body: {pageNumber: 0, filters: filter, pageSize: 50}
    }).then((response) => {
        expect(response.status).to.eq(200)
        return response.body[0].id
    })
})

Cypress.Commands.add("turnOnGlobalBroadcasting", (token) => {
    cy.request({
        method: 'POST',
        url: '/prodex/api/broadcast-rules/general',
        headers: {
            authorization: "Bearer " + token
        },
        body: {anonymous: 0, broadcast: 1, priceAddition: 5, priceMultiplier: 0, priceOverride: 0, type: "root"}
    }).then((response) => {
        expect(response.status).to.eq(200)
    })
})

Cypress.Commands.add("turnOffGlobalBroadcasting", (token) => {
    cy.request({
        method: 'POST',
        url: '/prodex/api/broadcast-rules/general',
        headers: {
            authorization: "Bearer " + token
        },
        body: {type: "root",
            broadcast: 0,
            anonymous: 0,
            priceAddition: 0,
            priceMultiplier: 0,
            priceOverride: 0}
    }).then((response) => {
        expect(response.status).to.eq(200)
    })
})

Cypress.Commands.add("getDeliveryAddresses", (token) => {
    cy.request({
        method: 'GET',
        url: '/prodex/api/delivery-addresses/',
        headers: {
            authorization: "Bearer " + token
        }
    }).then((response) => {
        expect(response.status).to.eq(200)
        return response.body
    })
})

Cypress.Commands.add("setOfferBroadcasting", (token, id, state) => {
    cy.request({
        method: 'PATCH',
        url: '/prodex/api/product-offers/' + id +'/broadcast?broadcasted='+ state,
        headers: {
            authorization: "Bearer " + token
        }
    }).then((response) => {
        expect(response.status).to.eq(200)
    })
})

Cypress.Commands.add("setOfferPriceBook", (token, id, broadcastBody) => {
    cy.request({
        method: 'POST',
        url: '/prodex/api/broadcast-rules/' + id,
        headers: {
            authorization: "Bearer " + token
        },
        body: broadcastBody
    }).then((response) => {
        expect(response.status).to.eq(200)
    })
})

Cypress.Commands.add("cancelOffer", (token, id) => {
    cy.request({
        method: 'PATCH',
        url: '/prodex/api/holds/' + id + '/cancel',
        headers: {
            authorization: "Bearer " + token
        }
    }).then((response) => {
        expect(response.status).to.eq(200)
    })
})