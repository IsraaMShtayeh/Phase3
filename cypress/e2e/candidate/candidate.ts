import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
 import { Employee } from "../../support/pageobjects/Employee";
import { addJob, deleteJob } from "../../support/helper/job";
import { addVacancy, deleteVacancy } from "../../support/helper/vacancy";
import { addCandidate, deleteCandidate, schedule_interview, shortlistCandidate } from "../../support/helper/candidate";
import { candidatePageObj } from "../../pages/CandidatePage";
let empNumber: string;
let jobId: string;
const jobName = "QA Engineueringg";
const vacancyName = "vacancyy";
const candidateFirstName = "canudidate20";
const candidateLastName = "candons";
const interviewName = "intervieww";
let vacancyId: string;
let candidateId: string;
Given("Admin login", () => {
    cy.visit("/web/index.php/auth/login");
    cy.fixture('employee').as('EmpInfo')
    cy.login("Admin", "admin123")
})
Given("Created job", () => {

    addJob(jobName + Math.ceil(Math.random() * 1000)).then((response) => {
        jobId = response.body.data.id
    })
})
Given("Created Employee", () => {
    cy.get('@EmpInfo').then((infoData: any) => {
        Employee.addEmployee(infoData.employee.firstName, infoData.employee.lastName)
            .then(async (response) => {
                empNumber = await response.body.data.empNumber
                Employee.addEmployeeLoginInfo(infoData.employee.username, infoData.employee.password, empNumber)

            })
    })
})
Given("Created Vacancy", () => {
    addVacancy(vacancyName, jobId, empNumber).then((response) => {
        console.log(response);
        vacancyId = response.body.data.id;
    })
})
Given("Created Candidate", () => {
    addCandidate(candidateFirstName, candidateLastName, vacancyId).then((response) => {
        candidateId = response.body.data.id;
    }).then(() => {
        shortlistCandidate(candidateId).then(() => {
            schedule_interview(interviewName, candidateId, empNumber)
        })
    })
})

When("Change the candidate status to Interview Passed", () => {
    cy.visit(`https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/addCandidate/${candidateId}`)
    candidatePageObj.submitPassed();
})

When("Change the candidate status to Interview Failed", () => {
    cy.visit(`https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/addCandidate/${candidateId}`)
    candidatePageObj.submitFailed();
})


Then("Successfully transition the candidate's status to Interview Passed", () => {

    cy.get('.orangehrm-recruitment-status > .oxd-text', { timeout: 40000 }).should('contain', "Passed")

})
Then("Successfully transition the candidate's status to Interview Field", () => {
    cy.get('.orangehrm-recruitment-status > .oxd-text', { timeout: 40000 }).should('contain', "Failed")
   
  
})
afterEach(() => {
    Employee.deleteEmployee(empNumber);
    deleteVacancy(vacancyId);
    deleteJob(jobId);
    deleteVacancy(vacancyId);
    deleteCandidate(candidateId);
  });