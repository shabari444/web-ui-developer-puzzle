#### Code Smells/Improvements:
- Spinner must be there as user tries to fetch the books with the text he/she enters (`Fixed`).
- Unittests are failing as `failedAddToReadingList` and `failedRemoveFromReadingList` are not available in reading-list.reducers.ts (`Fixed`).
- Maintaining async pipe is one of the improvements. Fetching books through selectors observable and subscribing through async pipe. (`Fixed`).
- Written missing testcases.(`Fixed`)
#### Accessibility issues identified (Automated scan):
- Foreground and Background colors do not have a sufficient contrast ratio. (`Fixed`).
- Accessible name is not available for buttons. (`Fixed`).
#### Accessibility issues identified (Manually):
- Aria-label is not available for Reading List close button(`Fixed`).
- Added aria disabled for the want to read button (`Fixed`).
- `alt` attribute is missing for images (`Fixed`).
