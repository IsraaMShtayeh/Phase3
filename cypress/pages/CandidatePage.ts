class CandidatePage {
  elements = {
    statusText: () => cy.get('.orangehrm-recruitment-status > .oxd-text', { timeout: 40000 }),
    failedBtn: () => cy.get('.orangehrm-recruitment-actions', { timeout: 40000 }).contains('Failed'),
    passedBtn: () => cy.get('.oxd-button--success'),
    saveBtn: () => cy.get('.oxd-form-actions', { timeout: 40000 }).contains('Save'),
    title: () => cy.get('.orangehrm-card-container > .oxd-text', { timeout: 40000 }),
    status: () => cy.get('.orangehrm-recruitment-status > .oxd-text', { timeout: 40000 }),
    loadingSpinner: () => cy.get('.oxd-loading-spinner-container'),
   
  };
  statusText(status: string) {
    this.elements.status().should('contain', "Interview Scheduled");
  }
  titleText(title: string) {
    this.elements.title().contains("Failed")
  }
  submitFailed() {
    this.statusText("Interview Scheduled");
    this.elements.failedBtn().click({ force: true });
    this.titleText("Failed");
    this.elements.loadingSpinner().should("exist").then(() => {
      this.elements.loadingSpinner().should("not.exist").then(() => {
        this.elements.saveBtn().click({ force: true });
      })
    })

  }
  submitPassed() {
    this.statusText("Interview Scheduled");
    this.elements.passedBtn().click({ force: true });
    this.titleText("Passed")
    this.elements.saveBtn().click({ force: true });
    this.elements.statusText().should('contain', "Passed")
  }
  submitHired() {
    this.statusText("Interview Passed");
    cy.get('.orangehrm-recruitment-actions', { timeout: 40000 }).contains('Offer').click({ force: true });
    this.titleText("Offer Job")
    this.elements.saveBtn().click({ force: true });
    this.statusText("Job Offered")
    this.elements.passedBtn().click({ force: true });
    this.elements.saveBtn().click({ force: true });
  }
}

export const candidatePageObj = new CandidatePage();