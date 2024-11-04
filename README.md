# MöbelDeals Platform Mock-Up

This is a basic platform mock-up showcasing deals from two Austrian furniture stores. The platform is branded with a simple logo and name: MöbelDeals.

MöbelDeals is built as a Next.js application that uses a PostgreSQL database for storing and managing deals data. The data is scraped using Python packages, specifically Scrapy and Playwright.

## Features

Users can browse and filter deals by categories and shops.
Each deal links directly to the product page on the original store's website, allowing users to get more information and purchase items seamlessly.
Currently, deals are available for the following categories: Wohnzimmer (Living Room), Schlafzimmer (Bedroom), and Badezimmer (Bathroom).

## Data Collection

Scraping: Deals are scraped using Scrapy, a Python framework for web scraping, combined with Playwright to handle dynamic content.
Database Integration: The scraped data is stored in a PostgreSQL database and accessed by the Next.js application.

Note: Only deals with an actual discount are displayed (thus if no discount or list price is provided on the original website, the deals is filtered out ).

## Technology Stack

Frontend: Next.js for server-side rendering and efficient client-side interactions.
Styling: Tailwind CSS for rapid and customizable UI development.
Backend: Scrapy and Playwright for web scraping and data collection.
Database:

- PostgreSQL for data storage.
- Prisma for database schema management and querying.
