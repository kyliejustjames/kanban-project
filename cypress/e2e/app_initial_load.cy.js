// cypress/e2e/app_initial_load.cy.js

// This test suite describes the initial loading behavior of your application.
describe('App Initial Load and Basic Interaction', () => {

    // Before each test in this suite, visit the correct subpath of your application.
    beforeEach(() => {
      cy.visit('/kanban-project');
    });
  
    // Test case: Verify that the main app title is visible on load.
    it('should display the app title', () => {
      // FIX: Look for the h1 element and then assert it contains "Reddit Clone"
      // This handles the "My Reddit Clone App" being split across elements.
      cy.get('h1').contains('Reddit Clone').should('be.visible'); // <--- THIS IS THE CORRECTED LINE
    });
  
    // Test case: Verify that the search bar input is visible and has the correct placeholder.
    it('should display the search bar', () => {
      cy.get('input[placeholder="Search Reddit..."]').should('be.visible');
    });
  
    // Test case: Verify that the "Search" button is visible.
    it('should display the search button', () => {
      cy.contains('button', 'Search').should('be.visible');
    });
  
    // Test case: Verify that the category filter buttons are visible.
    it('should display category filter buttons', () => {
      cy.contains('button', 'Hot').should('be.visible');
      cy.contains('button', 'New').should('be.visible');
      cy.contains('button', 'Top').should('be.visible');
    });
  
    // Test case: Verify that posts are loaded and displayed.
    // This is a basic check. We're looking for at least one post item.
    it('should display a list of posts', () => {
      // Assuming each post item has the class 'card' (from our recent CSS changes)
      // We wait for at least one card to appear.
      cy.get('.card').should('have.length.at.least', 1);
    });
  });