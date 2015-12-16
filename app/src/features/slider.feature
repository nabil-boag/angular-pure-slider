Feature: Slider

  Scenario: Slider handle moves to correct position
    Given a slider width of 200px
    When I click the slider at 150px
    Then the handle should be at "75%"

  Scenario: Dragging the slider
    Given a slider width of 400px
    And a range of 0 to 200
    And a slider that is set to 50
    When I drag the slider to 300px
    Then the handle should be at "75%"

  Scenario: Customer types a value in the input box to update the slider
    Given a slider width of 200px
    And a range of 0 to 120
    And a slider that is set to 60
    When the input is changed to 30
    Then the handle should be at "25%"

  Scenario: jQuery included on the page BEFORE angular
    Given a page with jQuery
    And a slider width of 400px
    And a range of 0 to 200
    And a slider that is set to 50
    When I drag the slider to 300px
    Then the handle should be at "75%"

  Scenario: Invalid input reverts to slider value
    Given a slider width of 200px
    And a range of 0 to 120
    And a slider that is set to 60
    When the input is changed to "some invalid text"
    Then the handle should be at "50%"
