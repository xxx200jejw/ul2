# UI test scenarios – MiniShop

Precondition for all scenarios: open a fresh page (`page.goto('/')`); the cart is empty.

| ID | REQ | Steps | Expected on screen | Type |
|---|---|---|---|---|
| UI-01 | REQ-UI-01 | Open `/`. | Heading `Products`, 6 product cards and `6 products`. | smoke |
| UI-02 | REQ-UI-02 | Enter `Mouse` in `Search products`. | One product remains: `Wireless Mouse`; counter is `1 products`. | positive |
| UI-03 | REQ-UI-02 | Enter lowercase `mouse` in `Search products`. | One product remains: `Wireless Mouse`. | regression / case |
| UI-04 | REQ-UI-03 | Click `Add Laptop Stand to cart`. | Cart badge displays `1`. | positive |
| UI-05 | REQ-UI-04 | Add `USB-C Hub` once and open `Cart`. | One cart row; `Total` is `39.00 €`. | calculation |
| UI-06 | REQ-UI-04 | Add `USB-C Hub` twice and open `Cart`. | Qty `2`, Line total `78.00 €`, Total `78.00 €`. | calculation / boundary |
| UI-07 | REQ-UI-05 | Add `Webcam HD`, open `Cart`, click `Remove Webcam HD`. | `Your cart is empty`; cart badge is `0`. | positive |
| UI-08 | REQ-UI-06 | Open `Cart` with an empty form and click `Place order`. | Name, email and address validation errors are displayed. | negative |
| UI-09 | REQ-UI-06 | Add `USB-C Hub`; enter name `Mari Maasikas`, email `mari@`, address `Pikk 1, Tallinn`; click `Place order`. | Email error `Enter a valid email address`; no order confirmation. | negative |
| UI-10 | REQ-UI-07 | Add `Wireless Mouse`, open `Cart`; enter `Mari Maasikas`, `mari@example.com`, `Pikk 1, Tallinn`; click `Place order`. | Confirmation includes `Thank you, Mari Maasikas!`; cart badge becomes `0`. | happy path |
