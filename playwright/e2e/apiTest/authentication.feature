@api
Feature: API authentication

  Scenario: Login with valid credentials
    Given valid API credentials are configured
    When I submit the API login request
    Then the API login response should contain an access token

  Scenario: Login with invalid credentials
    When I submit the API login request with invalid credentials
    Then the API login response should be rejected with message "Incorrect email or password"
