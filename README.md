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

### RabbitMQ Service

1. The Post Office (Message Broker): RabbitMQ is like the central post office. It sits in the middle, ready to receive, store, and deliver messages. In our code, the RabbitMQService class represents this central post office. It initializes the connection to RabbitMQ and sets up the necessary queues.
2. The Sender (Producer): The sender is like the part of your application that wants to send a message. In our code, the sender is not explicitly shown but is represented by the concept of producing messages. Messages are sent to the RabbitMQ exchange.
3. The Message (Letter): Messages are the information we want to share. In the code, messages are JSON objects containing a userId field. These messages are sent to the RabbitMQ request queue.
4. The Exchange (Mailbox): Before sending the letter, you put it in a mailbox. In RabbitMQ, this mailbox is called an exchange. There can be different types of mailboxes for different purposes. In our code, the requestQueue serves as the mailbox (exchange) where messages are sent for processing.
5. Routing (Delivery Instructions): Sometimes, you want your letter to go to a specific department or person. In RabbitMQ, routing specifies where a message should go. In our code, routing is not explicitly shown, but the requestQueue serves the purpose of directing messages to the proper destination.
6. The Receiver (Consumer): On the other end, someone is waiting to receive the letter. The receiver is like the part of your application waiting to receive and process the message. In our code, the listenForRequests function acts as the consumer, waiting for messages in the requestQueue.
7. Queues (Mail Sorting): Before reaching the receiver, letters are sorted in queues. Each type of letter (message) might have its queue. Here, messages are placed in the requestQueue before being processed.
8. Delivery to Consumers: Once sorted, the letters are delivered to the respective receivers (consumers) who can then process the information. The listenForRequests function processes messages from the requestQueue and delivers the user details response to the responseQueue.
9. Acknowledgment (Received Confirmation): In RabbitMQ, acknowledgments confirm that a message has been successfully processed. Our code uses this.channel.ack(msg) to acknowledge that the processed message has been received.

## Resource

- Source: https://dev.to/davydocsurg/mastering-microservices-a-hands-on-tutorial-with-nodejs-rabbitmq-nginx-and-docker-m4f
