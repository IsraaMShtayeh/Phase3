import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { Employee } from "../../support/pageobjects/Employee";
import { addJob, deleteJob } from "../../support/helper/job";
import { addVacancy, deleteVacancy } from "../../support/helper/vacancy";
import { addCandidate, deleteCandidate, schedule_interview, shortlistCandidate } from "../../support/helper/candidate";
import { candidatePageObj } from "../../pages/CandidatePage";
import { uploadFile } from "../../support/helper/file";
let empNumber: string;
let jobId: string;
const jobName = "QA Engineeroo";
const vacancyName = "vacancyoo";
const candidateFirstName = "candidateoo";
const candidateLastName = "candidateoo";
const interviewName = "interviewoo";
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
    })
})
When("Created Candidate to Scheduale", () => {
  
        shortlistCandidate(candidateId).then(() => {
            schedule_interview(interviewName, candidateId, empNumber)
        })
   
})
When("upload the file", () => {
    cy.visit(`/web/index.php/recruitment/addCandidate/${candidateId}`)
    uploadFile("file.txt")
})
When("Change the candidate status to Hired", () => {
    cy.visit(`https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/addCandidate/${candidateId}`)
    candidatePageObj.submitPassed();
  
    candidatePageObj.submitHired();
})
Then("The uploaded file should contain the same data as was uploaded", () => {
cy.readFile("cypress/downloads/file.txt",{timeout:40000}).should('contain','Hello')
    Employee.deleteEmployee(empNumber);
    deleteVacancy(vacancyId);
    deleteJob(jobId);
    deleteVacancy(vacancyId);
    deleteCandidate(candidateId);
})