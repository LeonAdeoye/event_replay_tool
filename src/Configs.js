export const configs = {
    "amps": {
        "exampleMessage": '[{"action": "orderDialog/openOrderDialog", "payload": {"price":10, "symbol":"0001.HK"}},{"action": "orderDialog/closeOrderDialog", "payload": {"price":20, "symbol":"0005.HK"}}]',
        "instanceName": "action-event-dispatcher",
        "connectionString": "ws://localhost:9008/amps/json",
        "topics": {
            "outbound": "action-event-request",
            "inbound": "action-event-response"
        }
    }
}
