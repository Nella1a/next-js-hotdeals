**_Please note this project is in active development and subject to change and ongoing improvement._**

# MöbelDeals Platform Mock-Up

This is a basic platform mock-up bringing together deals from two Austrian retail chains in one convenient place. The platform is branded with a simple logo and name: MöbelDeals.
It is built as a Next.js application that uses a PostgreSQL database for storing and managing deals data. The data was scraped using Python packages (Scrapy and Playwright).

#### Features

Users can browse, search and filter deals by categories and shops.
Each deal links directly to the product page on the original store's website, allowing users to get more information and purchase items seamlessly.
Currently, deals are available in the following categories: Schlafzimmer (Bedroom), Badezimmer (Bathroom), Wohnzimmer (Living Room), Garten (Garden), and Kinderzimmer (Kids' Room)

#### Data Collection

Scraping: Deals were scraped using Scrapy, a Python framework for web scraping, combined with Playwright to handle dynamic content.
Database Integration: The scraped data is stored in a PostgreSQL database and accessed by the Next.js application.

## Development Setup

### Clone the repository

First, clone the repository. Then, you can run the application either using Docker or locally (without Docker).

```shell
git clone https://github.com/Nella1a/next-js-hotdeals.git
cd next-js-hotdeals
```

#### Run with Docker

- Make sure that you have a reasonably recent version of docker installed & running
- Make sure you have docker-compose installed

1. Create a .env file in the project’s root directory and set the environment variable for the database connection URL that Prisma ORM uses to connect to the database.
   For example:

   ```shell
     POSTGRES_PRISMA_URL="postgresql://myuser:mypassword@postgres-db:5432/mydatabase?schema=hotdeals"
   ```

2. Secrets:

   Create a new directory named docker/secrets in the project's root folder, and then:

   - Create a file named db-pass.txt and add your database password to it.
   - Create a file named db-user.txt and add your database username.
   - Create a file named db-name.txt and add your database name.

3. docker-compose.override.yaml:

   For development, a docker-compose.override-example.yaml is provided. After copying the example file to docker-compose.override.yaml, Docker Compose will automatically apply the overrides. The docker-compose.yaml file runs a Next.js app along with a PostgreSQL database in a Docker stack. You can find more details on how docker compose works [here](https://docs.docker.com/compose/how-tos/multiple-compose-files/merge/)

   ```shell
   cp docker-compose.override-example.yaml docker-compose.override.yaml
   ```

4. Start the entire application stack

   ```shell
   docker compose up
   ```

5. Open <http://localhost:3000> on your browser.

#### Run Local (without Docker)

1. Ensure that you have a PostgreSQL instance running, then create a database and user.

   ```sql
   CREATE DATABASE mydatabase;
   CREATE USER myuser WITH PASSWORD 'mypassword';
   GRANT ALL PRIVILEGES ON DATABASE mydatabase TO myuser;
   ```

   **Note:** The last command grants the user myuser full access to the database mydatabase.

2. Create a .env file in the project’s root directory and set the environment variable for the database connection URL that Prisma ORM uses to connect to the database.
   For example:

   ```shell
   POSTGRES_PRISMA_URL="postgresql://myuser:mypassword@localhost:5432/mydatabase?schema=hotdeals"
   ```

3. Install dependencies

   ```shell
   npm install
   ```

4. Run database migrations

   ```shell
   npx prisma migrate dev
   ```

5. Run application

   ```shell
   npm run dev
   ```

6. Open <http://localhost:3000> on your browser.

## CI/CD Pipeline – Jenkins Multibranch Pipeline

This process automates testing, versioning, builds and pushes a Docker image to a private Docker repository, and deploys it on an AWS EC2 instance.

#### Jenkins Requirements

- A configured Multibranch Pipeline job pointing to this repository.
- Required credentials:
  - Docker registry credentials (for authentication).
  - GitHub credentials with push access.
  - SSH key (openSSH) for connecting to the Amazon EC2 instance.
- A GitHub webhook configured to trigger the pipeline on push events and pull request updates.

#### AWS Requirements

- An AWS account
- An Amazon EC2 key pair
- An AWS IAM User with programmatic key access and permissions to launch EC2 instances
- A running Amazon EC2 instance with the following setup:
  - Docker installed (to run Docker commands)
  - Security Group / Firewall configured to:
    - Allow Jenkins to connect via SSH
    - Open the necessary application port(s) for external access

#### Jenkins Pipeline Features

- Automated Testing

  - End-to-end (E2E) tests are run using Playwright
  - Tests are triggered automatically whenever code is pushed to any active branch

- Full CI/CD Pipeline (on `main` branch updates)
  The complete pipeline — including versioning, build, test, and deployment — runs automatically when:

  - Code is pushed to the main branch, or
  - A pull request is merged into it

  The full pipeline includes the following steps:
  - Version Management
    - Reads the current version from `package.json`
    - Increments the patch version (e.g., `1.2.3 → 1.2.4`)
    - Commits the updated version back to the repository
  - Docker Image Build & Push
    - Builds a Docker image from the current state of the application
    - Tags the image using the new version (e.g: `kanjamn/demo-app:hotdeals-1.2.4`)
    - Pushes the image securely to a private Docker repository
  - Deployment to AWS EC2
    - Jenkins connects to the AWS EC2 instance via SSH
    - Pulls the Docker image from the private repository
    - Runs the container on the instance

## Technology Stack

- Frontend: Next.js for server-side rendering and efficient client-side interactions.
- Database: PostgreSQL for data storage. Prisma for database schema management and querying.
- Tests: End-to-end (E2E) tests using Playwright
- Styling: Tailwind CSS for rapid and customizable UI development.
- Containerization: Dockerfile & Docker Compose
- CI/CD: Jenkins – for building, testing, and deploying the application

## Screenshots

![Index Page](./public/picIndexPage.png)
![Index Page](./public/picCatPage.png)
