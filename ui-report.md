# UI test report – MiniShop

**Team:**  Timur Glebov ja Sergei Maksimov
**Repository:** https://github.com/xxx200jejw/ul2 
**Branch:** 

## 1. Summary

- Scenarios: 10
- Automated UI tests: 10
- Results before fixes: 7 passed / 3 failed
- Results after fixes: 10 passed (expected after running `npx playwright test --project=ui`)

## 2. Scenarios and results

| ID | REQ | Result before fix | Defect |
|---|---|---|---|
| UI-01 | REQ-UI-01 | PASS | – |
| UI-02 | REQ-UI-02 | PASS | – |
| UI-03 | REQ-UI-02 | FAIL | D-01 |
| UI-04 | REQ-UI-03 | PASS | – |
| UI-05 | REQ-UI-04 | PASS | – |
| UI-06 | REQ-UI-04 | FAIL | D-02 |
| UI-07 | REQ-UI-05 | PASS | – |
| UI-08 | REQ-UI-06 | PASS | – |
| UI-09 | REQ-UI-06 | FAIL | D-03 |
| UI-10 | REQ-UI-07 | PASS | – |

## 3. Defects

| ID | Location | Expected | Actual before fix | Fix |
|---|---|---|---|---|
| D-01 | `shop.js`, line 32, `renderProducts()` (search filter) | Searching `mouse` finds `Wireless Mouse`. | Search was case-sensitive and returned 0 products. | Convert both product name and query to lowercase before comparing. |
| D-02 | `shop.js`, line 50, `renderCart()` (grand total) | Two USB-C Hubs cost `78.00 €` in total. | Qty and line total were correct, but grand total stayed `39.00 €`. | Multiply each product price by its quantity when calculating the grand total. |
| D-03 | `shop.js`, line 81, `validate()` (email validation) | `mari@` is rejected with `Enter a valid email address`. | Any value containing `@` passed validation. | Validate the full `user@domain.tld` format with a regular expression. |

**Commit notes:** create one separate Git commit for each fix using the messages in the handout:
- `Fix D-01: case-insensitive product search`
- `Fix D-02: cart total multiplies price by quantity`
- `Fix D-03: validate email format on checkout`

## 4. Locator choices

- `getByRole()` is used for buttons, links, headings and the search box because these locators reflect the role and accessible name presented to the user.
- `getByLabel()` is used for the Full name, Email and Delivery address fields because the form labels identify them.
- `getByTestId()` is used for product cards, cart quantity, line total, cart count, grand total, empty-cart text and order confirmation where the application provides stable test IDs.
- CSS locators (`#name-error`, `#email-error`, `#address-error`) are used for validation messages because the handout specifically identifies these IDs and no accessible label or test ID is provided for the messages.

## 5. What we would test next

1. Search for a term with no matching product and verify that the result count is `0 products`.
2. Enter a one-character name and verify that the full-name validation error appears.
3. Try to submit a valid-looking order with an empty cart and verify that the application displays `Your cart is empty`.

## Final verification

Run `npx playwright test --project=ui`. After applying the three fixes, confirm that the terminal reports `10 passed`. Update this report with the actual run result and add the real repository link and both team members' names before submission.
