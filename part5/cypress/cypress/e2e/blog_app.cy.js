describe('Blog app', function () {
	beforeEach(function () {
		cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
		const mainUser = {
			name: 'Nuno Araújo',
			username: 'nuno',
			password: 'nuno',
		}
		const defaultUser = {
			name: 'Default User',
			username: 'default',
			password: 'default',
		}
		cy.request('POST', `${Cypress.env('BACKEND')}/users`, mainUser)
		cy.request('POST', `${Cypress.env('BACKEND')}/users`, defaultUser)
		cy.visit('')
	})

	it('Login form is shown', function () {
		cy.contains('username')
		cy.contains('password')
		cy.contains('login')
	})

	describe('Login', function () {
		it('succeeds with correct credentials', function () {
			cy.get('#username').type('nuno')
			cy.get('#password').type('nuno')
			cy.get('#login-button').click()

			cy.contains('Login successful')
		})

		it('fails with wrong credentials', function () {
			cy.get('#username').type('nuno')
			cy.get('#password').type('123')
			cy.get('#login-button').click()

			cy.get('.error')
				.should('contain', 'Wrong username or password')
				.and('have.css', 'color', 'rgb(255, 0, 0)')
				.and('have.css', 'border-style', 'solid')
			cy.get('html').should('not.contain', 'Login successful')
		})
	})

	describe('When logged in', function () {
		beforeEach(function () {
			cy.login({ username: 'nuno', password: 'nuno' })
			cy.createBlog({ title: 'First blog', author: 'Nuno Araújo', url: 'http://test.com' })
		})

		it('A blog can be created', function () {
			cy.createBlog({ title: 'Test blog', author: 'Nuno Araújo', url: 'http://test.com' })
		})

		it('A blog can be liked', function () {
			cy.contains('Test blog').parent().find('button').as('theButton')
			cy.get('@theButton').click()
			cy.contains('Like').click()
			cy.contains("You liked 'Test blog' by Nuno Araújo")
		})

		it('A blog can be deleted by its creator', function () {
			cy.contains('View Info').click()
			cy.contains('Delete').click()
			cy.contains('The blog has been removing')
		})

		it('Only blog creator can see the delete button', function () {
			cy.contains('Logout').click()
			cy.login({ username: 'default', password: 'default' })
			cy.contains('View Info').click()
			cy.get('html').should('not.contain', 'Delete')
		})

		it.only('Check blogs ordered by likes', function () {
			cy.createBlog({ title: 'Second blog', author: 'Nuno Araújo', url: 'http://test.com', likes: 2 })
			cy.createBlog({ title: 'Third blog', author: 'Nuno Araújo', url: 'http://test.com', likes: 5 })
			cy.get('.blog').eq(0).should('contain', 'Third blog')
			cy.get('.blog').eq(1).should('contain', 'Second blog')
      cy.get('.blog').eq(2).should('contain', 'First blog')
		})
	})
})
