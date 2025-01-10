# chat-server

## `user-service`

Description: The main folder for the User Service, houses all related files and folders.

- src folder:
  - Description: Contains the source code for the User Service, organized into subfolders for different functionalities.
    - config folder:
      - Description: Stores configuration settings for the User Service.
    - controllers folder:
      - Description: Holds the AuthController file and handles registration and login logic.
    - services folder:
      - Description: Holds our RabbitMQService file and is responsible for handling RabbitMQ interactions.
    - database folder:
      - models folder:
        - Description: Contains the UserModel file, defining the Mongoose user model.
      - connection.ts file:
        - Description: Manages the connection to the MongoDB database.
      - index.ts file:
        - Description: Acts as the entry point for the database-related functionality.
    - middleware folder:
      - index.ts file:
        - Description: Serves as the entry point for middleware-related functionality.
    - routes folder:
      - authRoutes.ts file:
        - Description: Defines Express routes for user authentication.
    - utils folder:
      - index.ts file:
        - Description: Contains utility functions, such as custom error handler and password-related functions.
- server.ts file:
  - Description: Serves as the entry point for the Express app setup.
- Dockerfile:
  - Description: Specifies the Docker instructions for containerizing the User Service.
- .dockerignore file:
  - Description: Lists files and directories to be excluded from the Docker build context.
- .env file:
  - Description: Stores environment variables for the User Service.

## Resource

- Source: https://dev.to/davydocsurg/mastering-microservices-a-hands-on-tutorial-with-nodejs-rabbitmq-nginx-and-docker-m4f
