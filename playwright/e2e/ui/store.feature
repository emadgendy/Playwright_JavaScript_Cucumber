@ui
Feature: Store user journeys

  Scenario: Log in with a valid account
    Given I open the store home page
    When I log in with the configured account
    Then I should see the configured logged-in user

  Scenario: Verify monitor names and prices
    Given I open the store home page
    When I log in with the configured monitor account
    Then the configured monitor names and prices should be displayed

  Scenario: Purchase a product
    Given I open the store home page
    When I create a fresh account and log in for the product purchase
    Then I should see the configured product account logged in
    When I add the configured product to the cart
    Then I complete the configured purchase
    And I should be logged out

  Scenario: Sign up with a new account
    Given I open the store home page
    When I sign up with a new account
    Then the sign-up message should be "Sign up successful."

  Scenario: Reject a duplicate account
    Given I open the store home page
    When I sign up with the existing account
    Then the sign-up message should be "This user already exist."

  Scenario: Reject an empty sign-up form
    Given I open the store home page
    When I submit the empty sign-up form
    Then the sign-up message should be "Please fill out Username and Password."
