## Prerequisites

- [Node.js v20+↗](https://nodejs.org/en/download)
- [Git CLI tool↗](https://git-scm.com/downloads)
- [PostgreSQL↗](https://www.postgresql.org/download/)

## Medusa

- clone repo
  ` git clone git@github.com:sandrozulim/agilo-assignment.git`

- cd medusa

- `cp .env.template .env` and make changes in created .env in DATABASE_URL variable

- yarn

- npx medusa db:setup

- yarn dev

- visit http://localhost:9000/app/login and login with following credentials:
  _email_: admin@medusajs.com
  _password_: supersecret

- Once inside Admin dashboard, navigate to **product** and click '**import**'. Import CSV file located in _agilo-assignment\medusa\src\scripts\1762376172118-product-exports.csv_.

## Storefront

- cd medusa-storefront

- cp .env.template .env.local

- Find and copy **PUBLISHABLE KEY** from **admin dashboard settings** and add it to **env.local** _NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY_

- yarn

- yarn dev

- Finally, navigate to http://localhost:8000/products/paloma-haven

## Project Description

This is a simple e-commerce application built with the latest **Medusa.js** for the backend and **Next.js** for the storefront.

The main focus of this project was to implement the **Product Details page**, including:

- Displaying detailed product information
- Adding selected product variants to the cart
- Showing the number of items in the cart in the header

## Challenges

The most challenging part of this assignment was designing and organizing data flow for variant selection on the Product Details page. The goal was to make the variant controls maintainable and easy to understand, while following best practices.

Additionally, adapting to the existing codebase required careful attention to avoid introducing any unwanted side effects, but there were no major roadblocks. The only roadblock I ran into was writing the seed script for initial product data. In the end, I went with the import/export CSV method to add products due to time constraints.
