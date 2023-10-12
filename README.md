# Air Quality REST API

This Node.js-based REST API provides air quality information for the nearest city based on GPS coordinates using the IQAIR API.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Configuration](#configuration)
- [Testing](#testing)
- [Docker Support](#docker-support)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/air-quality-api.git
cd air-quality-api
```

2. Install dependencies:

```bash
npm install
```

3. Configure your environment variables (see [Configuration](#configuration)).

4. Start the server:

```bash
npm start
npm run dev
```

## Usage

This API allows you to retrieve air quality information for a specific location using longitude and latitude coordinates. You can make HTTP requests to the provided endpoints to access the data.

## Endpoints

1. **Retrieving Air Quality Data**

   - **Route**: `/airQuality/cities`
   - **Method**: GET
   - **Parameters**:
     - `longitude` (required): The longitude coordinate of the target location.
     - `latitude` (required): The latitude coordinate of the target location.
   - **Description**: Fetch air quality data for a specific location based on its GPS coordinates. This endpoint calls the IQAIR API's `nearest_city` endpoint and returns the air quality data.

   Example Request:
   ```http
   GET /airQuality/cities?longitude=48.856613&latitude=2.352222
   ```

2. **Retrieving Paris Air Quality Timestamp**

   - **Route**: `/airQuality/timestamp`
   - **Method**: GET
   - **Description**: Retrieve the timestamp of the most recent air quality data for the Paris zone. It provides the date and time when the air quality information for Paris was last updated.

   Example Request:
   ```http
   GET /airQuality/timestamp
   ```

3. **Cron Job (Scheduled Task)**

   - **Task**: Implement a CRON job to periodically (every 1 minute) fetch air quality data for the Paris zone, which has a latitude of 48.856613 and a longitude of 2.352222. The fetched data is saved in the database, including the date and time as part of the record.

4. **Optional Endpoint for Retrieving Most Polluted Paris Air Quality**

   - **Route**: `/airQuality/parisMostPolluted`
   - **Method**: GET
   - **Description**: This optional endpoint allows users to retrieve air quality data for the Paris zone that is the most polluted based on your CRON job results. It returns the air quality data with the highest pollution level.

## Configuration

To use this API, configure the following environment variables:

- `IQ_API_KEY`: Your API key from [IQAir](https://www.iqair.com/fr/dashboard/api).

```env
set IQ_API_KEY=a8bcef63-db6b-4c6a-883d-c901fe7e45b4
set AirVisual_URL=https://api.airvisual.com/v2/nearest_city
```
## Testing

Run unit tests with the following command:

```bash
npm run test
```

## Docker Support

You can run the Air Quality REST API using Docker, which provides an isolated and consistent environment. Follow these steps to set up the API with Docker:

1. **Install Docker**: If you haven't already installed Docker, please download and install it from the official [Docker website](https://www.docker.com/get-started).

2. **Build a Docker Image**:

   Open your terminal and navigate to the root directory of the project. Use the following command to build a Docker image:

   ```bash
   docker build -t air-quality-api .
   ```

   This command tells Docker to build an image named "air-quality-api" based on the project's `Dockerfile`.

3. **Run a Docker Container**:

   After building the Docker image, you can create and run a Docker container with the following command:

   ```bash
   docker run -p 3000:3000 --env-file .env air-quality-api
   ```

   This command starts a Docker container, maps port 3000 on your host machine to port 3000 within the container, and uses environment variables from the `.env` file for configuration.

4. **Access the API**:

   The API will be available at `http://localhost:3000`. You can make HTTP requests to the endpoints as described in the [Usage](#usage) section.

Please note that the `.env` file should be in the same directory as your project's root for Docker to access the required environment variables.

By following these steps, you can run the Air Quality REST API in a Docker container, providing a consistent and containerized environment for your application.

## Contributing

You are welcome to contribute to this project. Please follow our [contribution guidelines](CONTRIBUTING.md).

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
```

This README includes information on how to use Docker to run the application, along with all the other details you provided. Please replace `"your-username"` with the actual GitHub repository owner's username in the URLs.
