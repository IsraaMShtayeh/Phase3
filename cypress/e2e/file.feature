Feature: Candidate Interview Result Verification Pass/Fail

Background:
 Given  Admin login
        And Created Employee
        And Created job
        And Created Vacancy
        And Created Candidate

    Scenario: Application Initiated
        When upload the file
        Then The uploaded file should contain the same data as was uploaded


    Scenario:  Hired statuses
        When Created Candidate to Scheduale
        And Change the candidate status to Hired
        And upload the file
        Then The uploaded file should contain the same data as was uploaded