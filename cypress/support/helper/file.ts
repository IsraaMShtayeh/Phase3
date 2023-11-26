export const uploadFile = (name: string) => {
    cy.get('.oxd-switch-input',{timeout:40000}).click({ force: true })
    cy.get('input[type=file]').selectFile(`cypress/fixtures/${name}`, { force: true }).then(() => {
        cy.get('.oxd-form-actions > .oxd-button', { timeout: 40000 }).click({ force: true })
        cy.get('.orangehrm-file-preview', { timeout: 40000 }).click({ force: true })
    })

}