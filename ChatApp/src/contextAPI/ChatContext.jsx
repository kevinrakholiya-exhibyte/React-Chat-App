import { createContext, useContext, useEffect, useState } from "react";
import { addMessageToDB, addUsersToDB, getMessagesFromDB, getUsersFromDB } from "../DB/indexedDB";

const ChatContext = createContext()

export const ChatProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState([]);
    const [activeChat, setActiveChat] = useState(null)
    const [isTyping, setIsTyping] = useState(false)

    // Load Message from IndexedDB on app render
    const loadMessages = async () => {
        const data = await getMessagesFromDB();
        setMessage(Array.isArray(data) ? data : []);
    };
    // Load Users from IndexedDB on app render
    const loadUsers = async () => {
        const data = await getUsersFromDB();
        setUsers(Array.isArray(data) ? data : []);
    };
    useEffect(() => {
        // Persist activeChat whenever it changes
        if (activeChat !== null) {
            localStorage.setItem("activeChat", activeChat);
        }
        // Load saved active chat on first render
        const savedChat = localStorage.getItem("activeChat");
        if (savedChat && activeChat === null) {
            setActiveChat(Number(savedChat));
        }
        loadMessages();
        loadUsers();
    }, [activeChat]);

    const addMessage = async (text) => {
        const newMessage = {
            chatId: activeChat,
            text,
            sender: "me",
            time: Date.now(),
        };
        await addMessageToDB(newMessage);
        setMessage((prev) => [...prev, newMessage]);
    };

    const addUser = async (user) => {
        await addUsersToDB(user);
        setUsers((prev) => {
            const updatedUsers = [...prev, user];
            setActiveChat(user.id);
            return updatedUsers;
        });
    };

    return (
        <ChatContext.Provider value={{ users, setUsers, message, activeChat, setActiveChat, addMessage, addUser, isTyping, setIsTyping}}>
            {children}
        </ChatContext.Provider>
    )
}

export const useChat = () => useContext(ChatContext)
