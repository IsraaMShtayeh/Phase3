Feature: Candidate Interview Result Verification Pass/Fail
    Scenario: The Admin should successfully transition the candidate's status to  Interview Passed
        Given  Admin login
        Given Created Employee
        Given Created job
        Given Created Vacancy
        Given Created Candidate
        When Change the candidate status to Interview Passed
        Then Successfully transition the candidate's status to Interview Passed
    Scenario: The Admin should successfully transition the candidate's status to Interview Failed
        Given  Admin login
        Given Created Employee
        Given Created job
        Given Created Vacancy
        Given Created Candidate
        When Change the candidate status to Interview Failed
        Then Successfully transition the candidate's status to Interview Field
    Scenario: The Admin should successfully transition the candidate's status to Hired
        Given  Admin login
        Given Created Employee
        Given Created job
        Given Created Vacancy
        Given Created Candidate
        When Change the candidate status to Hired
        Then Successfully transition the candidate's status to Hired