Feature: Ticket booking

  Scenario: Reservation of one place
    Given the user is on the page with URL "https://qamid.tmweb.ru/client/index.php"
    And the user selects a date with time stamp 4
    And the user selects a seance start time "660"
    When the user clicks on the seat in the 1 row and 3 chair
    Then the reservation button should be active with label "Забронировать"

  Scenario: Reservation of two place
    Given the user is on the page with URL "https://qamid.tmweb.ru/client/index.php"
    And the user selects a date with time stamp 4
    And the user selects a seance start time "660"
    When the user clicks on the seat in the 2 row and 5 chair
    And the user clicks on another seat in the 9 row and 9 chair
    Then the reservation button should be active with label "Забронировать"

  Scenario: Reservation of a occupied seat
    Given the user is on the page with URL "https://qamid.tmweb.ru/client/index.php"
    And the user selects a date with time stamp 4
    And the user selects a seance start time "660"
    When the user clicks on the seat in the 6 row and 3 chair
    Then the reservation button should be inactive "Забронировать"