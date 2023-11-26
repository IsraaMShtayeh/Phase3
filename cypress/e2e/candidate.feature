Feature: Candidate Interview Result Verification Pass/Fail
    Background:
        Given  Admin login
        And Created Employee
        And Created job
        And Created Vacancy
        And Created Candidate
    Scenario: The Admin should successfully transition the candidate's status to  Interview Passed
        When Change the candidate status to Interview Passed
        Then Successfully transition the candidate's status to Interview Passed
    Scenario: The Admin should successfully transition the candidate's status to Interview Failed
        When Change the candidate status to Interview Failed
        Then Successfully transition the candidate's status to Interview Field
