/**
 * Created by ARTIO on 28.5.2019.
 */
context("Inventory",() => {
    beforeEach(() => {
        cy.login("user1@example.com","echopass123");
        cy.visit('/inventory/my');
        cy.wait(200);
        cy.get(".vertical.ellipsis").each(element => {
            //delete testing values
            if (element.parents("tr").first().text().indexOf("Fluorobenzylamine") > 0)
            {
                cy.wrap(element)
                    .click()
                    .then(() => cy.contains(".menu.visible span","Delete listing").click())
                    .then(() => cy.contains("Yes").click());

            }
        });
    });
    afterEach(() => {
        //cy.logout();
    });
    it('ADD and EDIT product offers',() => {
        cy.server();
        cy.route('/prodex/api/products/search*').as('search');
        cy.route("POST","/prodex/api/product-offers/").as("new_offer");

        //go to add inventory
        cy.visit('/inventory/my');
        cy.contains("Inventory").click();

        cy.contains("Add Inventory").click({timeout: 10000});
        cy.location('pathname', {timeout: 10000})
            .should('include', "inventory/add");

        cy.contains("Add Product Offer").as("submit");
        cy.get("@submit").click({"timeout": "5000"});
        cy.get(".error")
            .should("have.length",4)
            .find(".sui-error-message").each((element) => {
                expect(element.text()).to.match(/(required)|(must be number)|(Amount has to be greater than 0)/i);
        });
        cy.get("#field_dropdown_product")
            .parent().should("have.class","error")
            .should("contain","required");

        cy.contains("Product search")
            .siblings(".search.dropdown")
            .children("input")
            .type("Fluoro");

        cy.wait('@search');
        cy.get('@search').then(function (xhr) {
            expect(xhr.status).to.eq(200);
            expect(xhr.method).to.eq('GET');
            expect(xhr.responseBody.length).to.not.be.undefined.and.not.be.empty;
        });
        cy.contains("2-Fluorobenzylamine").first().click();
        cy.contains("Warehouse")
            .siblings(".selection.dropdown").click();
        cy.get(".menu").contains("Norman Fox").click();
        cy.get("#field_input_pkgAmount")
            .clear()
            .type(101)
            .should("have.value","101");
        cy.get("#field_dropdown_priceTiers").click();
        cy.get("#field_dropdown_priceTiers").contains("4").click();
        cy.get("#field_dropdown_priceTiers .text").should("contain",4);
        let i=0;
        cy.get(".tier-prices .row")
            .should("have.length",4)
            .each((element) => {
                console.log(element);
                let val,inputs = cy.wrap(element).find("input");
                val = Math.pow(10,i+1);
                cy.wrap(element).find("input").first().clear()
                    .type(val)
                    .should("have.value",val+"");
                val = 500-i*100;
                cy.wrap(element).find("input").last().clear()
                    .type(val)
                    .should("have.value",val+"");
                i++;
            });
        cy.get("@submit").click();
        cy.wait("@new_offer");
        cy.get(".modal")
            .should("contain","Product Offer was created");
        cy.contains("Add another one")
            .click();
    });
});