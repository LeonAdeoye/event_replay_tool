import { Client } from "amps";

export class PubSubManager {

    constructor(instanceName, connectionString, inboundTopic, outboundTopic) {
        this.instanceName = instanceName;
        this.connectionString = connectionString;
        this.inboundTopic = inboundTopic;
        this.outboundTopic = outboundTopic;
        this.actionCallback = null;
    }

    async publish(message) {
        try {
            if (this.client?.isConnected()) {
                await this.client.publish(this.outboundTopic, JSON.stringify(message));
            }
        } catch (error) {
            console.error('Error publishing message:', error);
        }
    }

    setActionCallback(callback) {
        this.actionCallback = callback;
    }

    async connect() {
        try {
            if (this.client?.isConnected()) return;

            this.client = new Client(this.instanceName);
            await this.client.connect(this.connectionString);

            await this.client.subscribe(({data}) => {
                try {
                    console.log('Received message from AMPS:', JSON.stringify(data));
                    if (this.actionCallback) {
                        this.actionCallback(data);
                    }
                } catch (error) {
                    console.error('Error processing inbound message:', error);
                }
            }, this.inboundTopic );

            console.log(`Connected to AMPS and subscribed to ${this.inboundTopic}`);
        } catch (error) {
            console.error('Error connecting to AMPS:', error);
            throw error;
        }
    }

    disconnect() {
        if(this.client.isConnected()) {
            this.client.disconnect().then(() => {
                console.log("Disconnected from AMPS.");
            }).catch((error) => {
                console.error(error);
            });
        }
    }
}
