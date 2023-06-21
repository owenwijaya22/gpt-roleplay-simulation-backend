# Chat Application

This is a real-time chat application built using Node.js, MongoDB, Docker, and more. 

## Project Structure

- `flask_app.py`: Flask app which is hosted on https://owen.pythonanywhere.com for POST requests
- `pages/api`: routings for migrating to Next.js
- `tests`: unit tests for all the Express endpoints
- `controllers/`: Contains all the controller functions
- `db/`: Contains database initialization scripts
- `models/`: Contains all the data models
- `routes/`: Contains all the route definitions
- `.eslintrc.json`: ESLint configuration
- `.gitignore`: Specifies files and directories to be ignored by Git
- `.prettierrc`: Prettier configuration
- `Dockerfile`: Defines the Docker image
- `app.js`: Main application file
- `config.env`: Environment-specific settings
- `docker-compose.yml`: Docker Compose configuration file
- `package-lock.json` & `package.json`: npm package dependencies
- `server.js`: Entry point to the Node.js application

## Setup and Installation

1. Clone the repository and navigate into the directory
    ```bash
    git clone https://github.com/your-username/chat-application.git
    cd chat-application
    ```

2. Build the Docker image and start the Docker containers
    ```bash
    docker-compose up --build
    ```

## Contribution

To contribute:

1. Fork the project
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

## License

This project is licensed under the terms of the MIT license.
