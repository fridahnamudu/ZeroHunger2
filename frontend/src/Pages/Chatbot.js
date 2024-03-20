import React, { useState } from 'react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import '../css/Chatbot.css'
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';
// import { styled } from '@chatscope/chat-ui-kit-react';


const API_KEY = 'AIzaSyDNlOAlRcMxxL0JU5YR-KqMaGenYpMDu6w'


function Chatbot() {
    const [typing, setTyping] = useState(false);

    const [messages, setMessages] = useState([
        {
            message: "Hello there I am Gemini AI",
            sender: "Gemini"
        }
    ]);

    const handleSend = async (message) => {
        const newMessage = {
            message: message,
            sender: 'user',
            direction: 'outgoing'
        };

        const newMessages = [...messages, newMessage]; //all new messages + old messages
        // update our messages state
        setMessages(newMessages);
        // typing messages indictator
        setTyping(true);

        await processMessageToGemini(newMessages);

    };
    async function processMessageToGemini(chatMessages) {

        let apiMessages = chatMessages.map((messageObject) => {
            let role = 'http://localhost:3500/api/chat';
            if(messageObject.sender === 'Gemini') {
                role = "assistant"
            } else {
                role = "user" 
            }
            return { role: role, content:messageObject.message }
            
        });

        // how we want our gemini to talk
        const systemMessage = {
           role: "system",
           content: "Explain laying emphasis on Kenya" 
        }

        const apiRequestBody = {
            "model": "",
            "messages" : [ systemMessage, ...apiMessages]
        }
        await fetch('', {
            method: 'POST',
            headers: {
                "Authorization": "Bearer" + API_KEY,
                "Content-Type": "application/json"

            },
            body: JSON.stringify(apiRequestBody)
        }).then((data) => {
            return data.json();

        }).then((data) => {
            console.log(data)
        })

    }

    return (
        <div className='Chatbot'>
            <div style={{position: "relative", height:"50vh"}}>
                <MainContainer>
                    <ChatContainer>
                        <MessageList typingIndicator={typing ? <TypingIndicator content="Gemini is typing" /> : null}
                        >
                            {messages.map((message, i) => {
                                return <Message key={i} model={message} className={`message ${message.sender}`} />
                                })}
                                                        </MessageList>
                            <MessageInput placeholder='Type Message Here' onSend={handleSend} placeholderColor='white' />                   
                             </ChatContainer>
                </MainContainer>
            </div>
        </div>
    );
}

export default Chatbot;