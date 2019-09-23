Cypress.Commands.add("belogin", () => {
    cy
		.request('POST', '/prodex/oauth/token', 'grant_type=password&username=user1@example.com&password=echopass123')
		.then((response) => {
        	expect(response.status).to.eq(200)
    	})
    //cy.getCookie('auth').should('exist')
})

Cypress.Commands.add('second', () =>{
	cy.request({
		method: 'POST',
		url: '/prodex/oauth/token', // baseUrl is prepended to url
		form: true, // indicates the body should be form urlencoded and sets Content-Type: application/x-www-form-urlencoded headers
		headers: {
			authorization: "Basic cHJvZGV4LXJlYWN0OmthcmVsLXZhcmVs",
			'sec-fetch-mode': 'cors',
			'sec-fetch-site': 'same-origin'
		},
		body: {
			username: 'user1@example.com',
			password: 'echopass123',
			grant_type: 'password'
		}
	})

	cy.getCookie('auth').should('exist')
})


