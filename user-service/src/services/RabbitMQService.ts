import amqp, { Channel, Connection } from "amqplib";
import config from "../config/config";
import { User } from "../database";
import { ApiError } from "../utils";

// Start a rabbitMQ service by docker
// docker run -d \
//     --name rabbitmq \
//     -p 5672:5672 \
//     -p 15672:15672 \
//     rabbitmq:3-management
// Connection link: 'amqp://guest:guest@localhost:5672'

class RabbitMQService {
  private requestQueue = "USER_DETAILS_REQUEST";
  private responseQueue = "USER_DETAILS_RESPONSE";
  private connection!: Connection;
  private channel!: Channel;

  constructor() {
    this.init();
  }

  async init() {
    // Establish connection to RabbitMQ server
    // @ToFix: Not work with config.msgBrokerURL! on cloudamqp
    this.connection = await amqp.connect(config.msgBrokerURL!);
    this.channel = await this.connection.createChannel();

    // Asserting queues ensures they exist
    await this.channel.assertQueue(this.requestQueue);
    await this.channel.assertQueue(this.responseQueue);

    // Start listening for messages on the request queue
    this.listenForRequests();
  }

  private async listenForRequests() {
    this.channel.consume(this.requestQueue, async (msg) => {
      if (msg && msg.content) {
        const { userId } = JSON.parse(msg.content.toString());
        const userDetails = await getUserDetails(userId);

        // Send the user details response
        this.channel.sendToQueue(
          this.responseQueue,
          Buffer.from(JSON.stringify(userDetails)),
          { correlationId: msg.properties.correlationId },
        );

        // Acknowledge the processed message
        this.channel.ack(msg);
      }
    });
  }
}

const getUserDetails = async (userId: string) => {
  const userDetails = await User.findById(userId).select("-password");
  if (!userDetails) {
    throw new ApiError(404, "User not found");
  }

  return userDetails;
};
export const rabbitMQService = new RabbitMQService();
