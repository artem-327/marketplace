Cypress.Commands.add("deleteBroadcastRule", (token,ruleId) => {
    cy.request({
        method: 'DELETE',
        url: '/prodex/api/broadcast-rules/'+ruleId,
        headers: {
            authorization: "Bearer " + token
        }
    }).then((response) => {
        expect(response.status).to.eq(200)
    })
})

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

Cypress.Commands.add("getBroadcastRuleId", (token, offerId) => {
    cy.request({
        method: 'GET',
        url: '/prodex/api/broadcast-rules/productOffer/'+offerId,
        headers: {
            authorization: "Bearer " + token
        }
    }).then((response) => {
        expect(response.status).to.eq(200)
        if(response.body[0] === undefined){
            return -1
        }else{
            return response.body[0].id
        }
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
            username: "user1@example.com",
            password: "echopass123"
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

Cypress.Commands.add("getFirstItemIdWithFilter", (token, filter) => {
    cy.request({
        method: 'POST',
        url: '/prodex/api/product-offers/own/datagrid/',
        headers: {
            authorization: "Bearer " + token
        },
        body: {filters: filter,pageNumber: 0, pageSize: 50}
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
        body: {filters: filter,pageNumber: 0, pageSize: 50, "orOperator": true}
    }).then((response) => {
        expect(response.status).to.eq(200)
        return response.body[0].id
    })
})


Cypress.Commands.add("getFirstMarketId", (token) => {
    cy.request({
        method: 'POST',
        url: '/prodex/api/product-offers/broadcasted/datagrid/',
        headers: {
            authorization: "Bearer " + token
        },
        body: {pageNumber: 0, filters: [], pageSize: 50}
    }).then((response) => {
        expect(response.status).to.eq(200)
        return response.body[0].id
    })
})

Cypress.Commands.add("getFirstMarketIdWithFilter", (token,filter) => {
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

Cypress.Commands.add("getFirstUserIdWithFilter", (token,filter) => {
    cy.request({
        method: 'POST',
        url: '/prodex/api/users/datagrid',
        headers: {
            authorization: "Bearer " + token
        },
        body: {pageNumber: 0, filters: filter, pageSize: 50, orOperator:true}
    }).then((response) => {
        expect(response.status).to.eq(200)
        return response.body[0].id
    })
})

Cypress.Commands.add("getFirstBranchIdWithFilter", (token,filter) => {
    cy.request({
        method: 'POST',
        url: '/prodex/api/branches/datagrid',
        headers: {
            authorization: "Bearer " + token
        },
        body: {pageNumber: 0, filters: filter, pageSize: 50, orOperator:true}
    }).then((response) => {
        expect(response.status).to.eq(200)
        return response.body[0].id
    })
})

Cypress.Commands.add("getFirstProductIdWithFilter", (token,filter) => {
    cy.request({
        method: 'POST',
        url: '/prodex/api/products/datagrid',
        headers: {
            authorization: "Bearer " + token
        },
        body: {pageNumber: 0, filters: filter, pageSize: 50, orOperator:true}
    }).then((response) => {
        expect(response.status).to.eq(200)
        return response.body[0].id
    })
})

Cypress.Commands.add("getFirstAddressIdWithFilter", (token,filter) => {
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

Cypress.Commands.add("getFirstCasProductWithFilter", (token,filter) => {
    cy.request({
        method: 'POST',
        url: '/prodex/api/cas-products/datagrid',
        headers: {
            authorization: "Bearer " + token
        },
        body: {pageNumber: 0, filters: filter, pageSize: 50, orOperator:true}
    }).then((response) => {
        expect(response.status).to.eq(200)
        return response.body[0].id
    })
})

Cypress.Commands.add("getFirstPackagingUnitWithFilter", (token,filter) => {
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

Cypress.Commands.add("getFirstDocumentTypeWithFilter", (token,filter) => {
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

Cypress.Commands.add("getFirstMarketSegmentWithFilter", (token,filter) => {
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

Cypress.Commands.add("getFirstManufacturerWithFilter", (token,filter) => {
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

Cypress.Commands.add("getFirstConditionWithFilter", (token,filter) => {
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

Cypress.Commands.add("getFirstGradeWithFilter", (token,filter) => {
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

Cypress.Commands.add("getFirstFormWithFilter", (token,filter) => {
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

Cypress.Commands.add("getFirstConditionWithFilter", (token,filter) => {
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

Cypress.Commands.add("getFirstCompanyWithFilter", (token,filter) => {
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
