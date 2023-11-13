const baseUrl = Cypress.config().baseUrl
export const addVacancy = (name: string,jobId:string,managerId:string) => {
    return cy.request({
        method: 'POST',
        url: `${baseUrl}/web/index.php/api/v2/recruitment/vacancies`,
        body: {
            name: name,
            jobTitleId: jobId,
            employeeId: managerId,
            numOfPositions: null,
            description: "",
            status: true,
            isPublished: true
        }
    })
}


export const deleteVacancy=(vacancyId:string)=>{
    cy.request({
        method: 'DELETE',
        url: `${baseUrl}/web/index.php/api/v2/recruitment/vacancies`,
        body: {
            "ids": [
                vacancyId
            ]
        }
    })
}