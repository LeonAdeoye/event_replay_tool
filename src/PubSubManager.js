import { Client } from "amps";

export class PubSubManager {

    constructor(instanceName, connectionString, inboundTopic, outboundTopic) {
        this.instanceName = instanceName;
        this.connectionString = connectionString;
        this.inboundTopic = inboundTopic;
        this.outboundTopic = outboundTopic;
    }

    publish(message) {
        if(this.client.isConnected()) {
            this.client.publish(this.outboundTopic, JSON.stringify(message));
        }
    }

    connect() {
        if(this.client?.isConnected())
            return;

        this.client = new Client(this.instanceName);
        this.client.connect(this.connectionString).then(() => {
            console.log("Connected to AMPS.");
            this.client.subscribe(() => {
                console.log("Received message from AMPS.");
            }, this.inboundTopic)
            .then(() => {
                console.log("Subscribed to " + this.inboundTopic);
            })
            .catch((error) => {
                console.error(error);
            })
        });
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
