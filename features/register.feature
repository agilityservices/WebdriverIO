@regression
Feature: The Internet Guinea Pig Website

    Scenario Outline: As a user, I can log into the secure area

        Given I am on the register page
        When user enter fullname <fname> lastname <lname>
        When click below radio button in register page
            | fieldName |
            | Female    |
        When user enter below personal details
            | fieldName           | dataToEnter   |
            | E-Mail              | abc@gmail.com |
            | Contact No.         | (415)8265412  |
            | Department / Office | MCR           |
        When user clicks submit button in register page
        Then user should get success message as " Success Success!."
        # Then verify the registered users in register page
        #     | FirstName | LastName          | Department | Email               | ContactNo    |
        #     | John      | Oliver            | IT         | john.oliver@abc.com | (415)8265412 |
        #     | tomsmith  | tomsmithlastname! | MCR        | abc@gmail.com       | (415)8265413 |


        Examples:
            | fname    | lname             |
            | tomsmith | tomsmithlastname! |




