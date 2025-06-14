import {accountMenuSelector, loginItemSelector, navbarSelector} from '../../support/commands';

describe('logout', () => {
    const username = Cypress.env('E2E_USERNAME') ?? 'user';
    const password = Cypress.env('E2E_PASSWORD') ?? 'user';

    it.skip('go to home page when successfully logs out', () => {
        cy.login(username, password);
        cy.visit('');
        cy.clickOnLogoutItem();
        // Wait logout
        cy.wait(500); // eslint-disable-line cypress/no-unnecessary-waiting
        cy.visit('');
        cy.get(navbarSelector).get(accountMenuSelector).click();
        cy.get(navbarSelector).get(accountMenuSelector).get(loginItemSelector).should('be.visible');
    });
});
