@api
Feature: API product retrieval

  Scenario: Retrieve products with valid authorization
    Given I have authenticated with the API
    When I request the product list with authorization
    Then the product response should contain a list of products

  Scenario: Reject product retrieval without authorization
    When I request the product list without authorization
    Then the product request should be rejected with message "Error in authorization format"

  Scenario: Reject product retrieval with a revoked token
    Given a revoked API token is configured
    When I request the product list with the revoked token
    Then the product request should be rejected with message "Error access_token is revoked"
