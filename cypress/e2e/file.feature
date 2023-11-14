Feature: Candidate Interview Result Verification Pass/Fail
    Scenario: Application Initiated
        Given  Admin login
        Given Created Employee
        Given Created job
        Given Created Vacancy
        Given Created Candidate
        When upload the file
        Then The uploaded file should contain the same data as was uploaded


    Scenario:  Hired statuses
        Given  Admin login
        Given Created Employee
        Given Created job
        Given Created Vacancy
        Given Created Candidate to Scheduale
        When Change the candidate status to Hired
        When upload the file
        Then The uploaded file should contain the same data as was uploaded