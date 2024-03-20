import React, { useState } from 'react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import '../css/Chatbot.css'
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';
// import { styled } from '@chatscope/chat-ui-kit-react';
import axios from 'axios'

// const API_KEY = 'AIzaSyDNlOAlRcMxxL0JU5YR-KqMaGenYpMDu6w'


function Chatbot() {
    const [typing, setTyping] = useState(false);
    const[user_input, setInput] = useState("")
    const[direction, setDirection] = useState({
        incoming: "incoming",
        outgoing: "outgoing"
    })
    const[sender, setSender] = useState({
        gemini: "gemini",
        user: "user"
    })
    const[isUserTurn, setIsUserTurn] = useState(true)
    const[data, setData] = useState([])
    console.log(user_input)

    const [messages, setMessages] = useState([
        {
            message: "Hello there I am Gemini AI",
            sender: "gemini",
            direction: "incoming"
        },
    ]);

    const handleUserSend = async (message) => {
        const newMessage = {
            message: message,
            sender: isUserTurn? sender.user: sender.gemini,
            direction: isUserTurn?direction.outgoing: direction.incoming
        };

        const newMessages = [...messages, newMessage]; //all new messages + old messages
        // update our messages state
        setMessages(newMessages);
        setIsUserTurn(!isUserTurn)
        // typing messages indictator
        setTyping(isUserTurn?typing:!typing);

        try {
            const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWZiNGM4NjQ3OTU5MTYwOWRiMTk1ZTkiLCJmaXJzdF9uYW1lIjoibiIsImxhc3RfbmFtZSI6ImoiLCJlbWFpbCI6Im5qQGdtYWlsLmNvbSIsImNoYXRIaXN0b3J5IjpbXSwiY3JlYXRlZEF0IjoiMjAyNC0wMy0yMFQyMDo1MjoyMi4wNzhaIiwidXBkYXRlZEF0IjoiMjAyNC0wMy0yMFQyMDo1MjoyMi4wNzhaIiwiX192IjowLCJpYXQiOjE3MTA5Njc5NTksImV4cCI6MTcxMTU3Mjc1OX0.7jrd-WEY64zIhBwkwgHtqLwd7W9MuTvJyggyh6VSGKI';
          const response = await axios.post(
            'http://localhost:3500/api/chat',{
                user_input
              },
            {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
                }
              }
          );
          setData(response.data);
          setInput("")
          console.log(response.data.data)
        } catch (err) {
        console.log(err)
        }

    };

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
                            <MessageInput autoFocus onChange={(e)=>setInput(e.toLowerCase())} placeholder='Type Message Here' onSend={handleUserSend} />                   
                             </ChatContainer>
                </MainContainer>
            </div>
        </div>
    );
}

export default Chatbot;