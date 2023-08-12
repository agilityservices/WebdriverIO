

Feature: End to end scenario using api testing

    # Scenario Outline: valdate end to end GET API results

    #     Given I am on page <Pageurl>
    #     When I perforn <Endpoint> user search
    #     And I make GET <Endpoint> api call
    #     Then I validate the search results

    #     Examples:
    #         | Pageurl                   | Endpoint     |
    #         | https://resttesttest.com/ | /api/users/2 |

    Scenario Outline: valdate end to end GET API results
        # Given I am on page <Pageurl>
        # When I perforn create user using post api <Endpoint>
        And I make POST <Endpoint> api call
        # Then I validate the created user search results
        Then UPDATE the user <Endpoint>
        # Then DELETE the user <Endpoint>

        Examples:
            | Pageurl                           | Endpoint  |
            | https://gorest.co.in/rest-console | /v2/users |




