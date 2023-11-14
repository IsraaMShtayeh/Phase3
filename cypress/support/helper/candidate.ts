import { padTo2Digits } from "./format";
const baseUrl = Cypress.config().baseUrl
const date = (new Date());
const today = [
    date.getFullYear(),
    padTo2Digits(date.getMonth() + 1),
    padTo2Digits(date.getDate()),
].join('-')
export const addCandidate = (firstName: string, lastName: string, vacancyId: string) => {
    return cy.request({
        method: 'POST',
        url: `${baseUrl}/web/index.php/api/v2/recruitment/candidates`,
        body: {
            firstName: firstName,
            middleName: null,
            lastName: "candidate",
            email: firstName + "@gmail.com",
            contactNumber: null,
            keywords: null,
            comment: null,
            dateOfApplication: today,
            consentToKeepData: false,
            vacancyId: vacancyId
        }
    })
}
export const deleteCandidate = (candidateId: string) => {
    return cy.request({
        method: 'DELETE',
        url: `${baseUrl}/web/index.php/api/v2/recruitment/candidates`,
        body: {
           ids:[

           ]
        }
    })
}
export const shortlistCandidate = (candidateId: string) => {
    return cy.request({
        method: 'PUT',
        url: `${baseUrl}/web/index.php/api/v2/recruitment/candidates/${candidateId}/shortlist`,
        body: {
            note: null
        }
    })
}
export const schedule_interview = (name: string, candidateId: string, empNumber: string) => {
    return cy.request({
        method: 'POST',
        url: `${baseUrl}/web/index.php/api/v2/recruitment/candidates/${candidateId}/shedule-interview`,
        body: {
            interviewName: name,
            interviewDate: today,
            interviewTime: null,
            note: null,
            interviewerEmpNumbers: [
                empNumber
            ]
        }
    })
}