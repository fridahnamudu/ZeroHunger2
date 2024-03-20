import React, { useState } from 'react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import './Chatbot.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';
import axios from 'axios'
// const API_KEY = 'AIzaSyDNlOAlRcMxxL0JU5YR-KqMaGenYpMDu6w'


function Chatbot() {
    const [typing, setTyping] = useState(false);
    const[input, setInput] = useState("")
    const[data, setData] = useState([])
    console.log(input)
    const [messages, setMessages] = useState([
        {
            message: "Hello there I am Gemini AI",
            sender: "Gemini"
        }
    ]);

    const handleSend = async () => {
        // const newMessage = {
        //     message: message,
        //     sender: 'user',
        //     direction: 'outgoing'
        // };

        // const newMessages = [...messages, newMessage]; //all new messages + old messages
        // // update our messages state
        // setMessages(newMessages);
        // // typing messages indictator
        // setTyping(true);
        try {
            const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWZhMjlhYTI1NmY0YjU5MzZlZDkwMDgiLCJmaXJzdF9uYW1lIjoiZXZlIiwibGFzdF9uYW1lIjoibmplcmkiLCJlbWFpbCI6ImV2ZUBnbWFpbC5jb20iLCJjaGF0SGlzdG9yeSI6W10sImNyZWF0ZWRBdCI6IjIwMjQtMDMtMjBUMDA6MTE6MjIuNTI2WiIsInVwZGF0ZWRBdCI6IjIwMjQtMDMtMjBUMDA6MTE6MjIuNTI2WiIsIl9fdiI6MCwiaWF0IjoxNzEwODkzNTI1LCJleHAiOjE3MTE0OTgzMjV9.vGJxTkwNkBXRXiTw1ITmRGdKwt7DYW6NeFNBD5NlZIo';
          const response = await axios.post(
            'http://localhost:3500/api/chat',{input},
            {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
                }
              }
          );
          setData(response.data);
          console.log(response.data)
        } catch (err) {
        console.log(err)
        }

        // await processMessageToGemini(newMessages);

    };
    const chatRequest = async () => {
        try {
            const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWZhMjlhYTI1NmY0YjU5MzZlZDkwMDgiLCJmaXJzdF9uYW1lIjoiZXZlIiwibGFzdF9uYW1lIjoibmplcmkiLCJlbWFpbCI6ImV2ZUBnbWFpbC5jb20iLCJjaGF0SGlzdG9yeSI6W10sImNyZWF0ZWRBdCI6IjIwMjQtMDMtMjBUMDA6MTE6MjIuNTI2WiIsInVwZGF0ZWRBdCI6IjIwMjQtMDMtMjBUMDA6MTE6MjIuNTI2WiIsIl9fdiI6MCwiaWF0IjoxNzEwODkzNTI1LCJleHAiOjE3MTE0OTgzMjV9.vGJxTkwNkBXRXiTw1ITmRGdKwt7DYW6NeFNBD5NlZIo';
          const response = await axios.post(
            'http://localhost:3500/api/chat',{input},
            {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
                }
              }
          );
          setData(response.data);
          console.log(response.data)
        } catch (err) {
        console.log(err)
        }
      };
    // async function processMessageToGemini(chatMessages) {

    //     let apiMessages = chatMessages.map((messageObject) => {
    //         let role = 'http://localhost:3500/api/chat';
    //         if(messageObject.sender === 'Gemini') {
    //             role = "assistant"
    //         } else {
    //             role = "user" 
    //         }
    //         return { role: role, content:messageObject.message }
            
    //     });

    //     // how we want our gemini to talk
    //     const systemMessage = {
    //        role: "system",
    //        content: "Explain laying emphasis on Kenya" 
    //     }

    //     const apiRequestBody = {
    //         "model": "",
    //         "messages" : [ systemMessage, ...apiMessages]
    //     }
    //     await fetch('', {
    //         method: 'POST',
    //         headers: {
    //             "Authorization": "Bearer" + API_KEY,
    //             "Content-Type": "application/json"

    //         },
    //         body: JSON.stringify(apiRequestBody)
    //     }).then((data) => {
    //         return data.json();

    //     }).then((data) => {
    //         console.log(data)
    //     })

    // }

    return (
        <div className='Chatbot'>
            <div>
                <MainContainer>
                    <ChatContainer>
                        <MessageList typingIndicator={typing ? <TypingIndicator content="Gemini is typing"/> : null}
                        >
                            {messages.map((message, i) => {
                                return <Message key={i} model={message} />
                            })}
                        </MessageList>
                        <MessageInput value={input} onChange={(e)=>setInput(e.toLowerCase())} placeholder='Type Message Here' onSend={handleSend} />
                    </ChatContainer>
                </MainContainer>
            </div>
        </div>
    );
}

export default Chatbot;