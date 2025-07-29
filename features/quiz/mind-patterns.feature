Feature: Mind Patterns Quiz
The quiz determines the user's Mind Pattern
The quiz in 2 steps where the user chooses one the options to proceed to the next step
- In Step 1 there are 3 options to choose from
- In Step 2 there are 2 options to choose from
The user then sees the Mind Pattern that corresponds to their choices
The user can change their choices and see the corresponding Mind Pattern again
When they confirm their choice, they can see more details about their Mind Pattern


  Scenario Outline: Quincy takes the first step in the Quiz
    Given Quincy is at the start of the Mind Patterns Quiz
    Given Quincy chooses "<Option 1>" in Step 1
    Then Quincy should see only "<Option 2a>" and "<Option 2b>" in Step 2

    Examples:
      | Option 1 | Option 2a | Option 2b |
      | A1       | K2        | V2        |
      | V1       | A2        | K2        |
      | K1       | V2        | A2        |

  Scenario Outline: Alex takes the second step in the Quiz
    Given Alex is at the start of the Mind Patterns Quiz
    When Alex chooses "A1" and "<Option 2>"
    Then Alex should see only "<Option 3>" in Step 3
    And Alex should see their Mind Pattern as "<Mind Pattern>"

    Examples:
      | Option 2 | Option 3 | Mind Pattern |
      | K2       | V3       | AKV          |
      | V2       | K3       | AVK          |

  Scenario Outline: Vicky takes the second step in the Quiz
    Given Vicky is at the start of the Mind Patterns Quiz
    When Vicky chooses "V1" and "<Option 2>"
    Then Vicky should see only "<Option 3>" in Step 3
    And Vicky should see their Mind Pattern as "<Mind Pattern>"

    Examples:
      | Option 2 | Option 3 | Mind Pattern |
      | A2       | K3       | VAK          |
      | K2       | A3       | VKA          |

  Scenario Outline: Kevin takes the second step in the Quiz
    Given Kevin is at the start of the Mind Patterns Quiz
    When Kevin chooses "K1" and "<Option 2>"
    Then Kevin should see only "<Option 3>" in Step 3
    And Kevin should see their Mind Pattern as "<Mind Pattern>"

    Examples:
      | Option 2 | Option 3 | Mind Pattern |
      | V2       | A3       | KVA          |
      | A2       | V3       | KAV          |

  Scenario: Alex disagrees with their choices
    Given Alex is at the start of the Mind Patterns Quiz
    When Alex chooses "A1" and "K2"
    And Alex cancels their choices
    Then Alex should return to Step 1
