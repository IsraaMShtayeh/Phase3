class CandidatePage {
  elements = {
    statusText: () => cy.get('.orangehrm-recruitment-status > .oxd-text', { timeout: 40000 }),
    failedBtn: () => cy.get('.orangehrm-recruitment-actions', { timeout: 40000 }).contains('Failed'),
    passedBtn: () => cy.get('.oxd-button--success'),
    saveBtn: () => cy.get('.oxd-form-actions', { timeout: 40000 }).contains('Save'),
    title: () => cy.get('.orangehrm-card-container > .oxd-text', { timeout: 40000 }),
    status: () => cy.get('.orangehrm-recruitment-status > .oxd-text', { timeout: 40000 }),
    loadingSpinner: () => cy.get('.oxd-loading-spinner-container')
  };
  submitFailed() {
    this.elements.statusText().should('contain', "Interview Scheduled");
    this.elements.failedBtn().click({ force: true });
    this.elements.title().contains("Failed")
    this.elements.loadingSpinner().should("exist").then(() => {
      this.elements.loadingSpinner().should("not.exist").then(() => {
        this.elements.saveBtn().click({ force: true });
      })
    })

  }
  submitPassed() {
    this.elements.statusText().should('contain', "Interview Scheduled");
    this.elements.passedBtn().click({ force: true });
    this.elements.title().contains("Passed")
    cy.wait(4000)
    this.elements.saveBtn().click({ force: true });


  }
  submitHired() {
    this.elements.statusText().should('contain', "Interview Passed");
    cy.get('.orangehrm-recruitment-actions', { timeout: 40000 }).contains('Offer').click({ force: true });
    this.elements.title().contains("Offer Job")
    cy.wait(4000)
    this.elements.saveBtn().click({ force: true });

  
        this.elements.status().should('contain', "Job Offered")
        this.elements.passedBtn().click({ force: true });
        cy.wait(4000)
        this.elements.saveBtn().click({ force: true });

  






  }
}

export const candidatePageObj = new CandidatePage();