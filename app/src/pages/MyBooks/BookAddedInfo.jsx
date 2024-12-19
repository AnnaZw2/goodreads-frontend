import { useEffect,useState } from "react";
import Paho from "paho-mqtt";
export function BookAddedInfo() {
    const [messages, setMessages] = useState([]);

        useEffect(() => {
          const cfg = {
            host: "localhost",
            port: 9001,
            clientId: "annaClientID-01-1-1",
            topic: "goodreads/user/created",
          };
      
          const client = new Paho.Client(cfg.host, Number(cfg.port), cfg.clientId);
   

          client.onConnectionLost = onConnectionLost;
          client.onMessageArrived = onMessageArrived;
      
          client.connect({ onSuccess: onConnect });
      
          function onConnect() {
            console.log("onConnect");
            client.subscribe(cfg.topic);
          }
      
          function onConnectionLost(responseObject) {
            if (responseObject.errorCode !== 0) {
              console.log("onConnectionLost:" + responseObject.errorMessage);
            }
          }
      
          
          function onMessageArrived(message) {
            const msg = JSON.parse(message.payloadString);
            let email = msg.email || "Email not set";
            let username = msg.username || "Username not set";
            let role = msg.role || "Role not set";
          
            setMessages((prev) => [
              { email: email, username: username, role: role },
              ...prev.slice(0, 4),
            ]);
          }
      
          return () => {
            client.disconnect();
          };
        }, []);    

        return (
            <div style={{  overflow: "scroll" }} className="flex h-72  rounded-md flex-col ml-48 mr-48 bg-dark-beige gap-2">
            {messages.map((message, i) => (
            <div className="bg-white flex flex-col ml-20 mr-20 mt-3" key={i}>
            <p><strong>Username:</strong> {message.username}</p>
            <p><strong>Email:</strong> {message.email}</p>
            <p><strong>Role:</strong> {message.role}</p>
            </div>
            )) }
            </div>
            );
            }