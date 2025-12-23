import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { addMessageToDB, addUsersToDB, deleteMessageFromDB, getMessagesFromDB, getUsersFromDB, updateMessageInDB, updateUserProfile } from "../DB/indexedDB";
import chatReducer from "../Reducer/chatReducer";

const ChatContext = createContext()

export const ChatProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState([]);
    const [activeChat, setActiveChat] = useState(null)
    const [isTyping, setIsTyping] = useState(false)
    const [editState, dispatch] = useReducer(chatReducer, {
        message: []
    })

    // Load Message from IndexedDB on app render
    const loadMessages = async () => {
        const data = await getMessagesFromDB();
        const messages = data.map((msg) => ({
            ...msg,
            status: msg.status || "sent",
        }));
        setMessage(messages);
    };
    // Load Users from IndexedDB on app render
    const loadUsers = async () => {
        const data = await getUsersFromDB();
        setUsers(Array.isArray(data) ? data : []);
    };
    // Persist activeChat whenever it changes
    if (activeChat !== null) {
        localStorage.setItem("activeChat", activeChat);
    }
    // Load saved active chat on first render
    const savedChat = localStorage.getItem("activeChat");
    if (savedChat && activeChat === null) {
        setActiveChat(Number(savedChat));
    }
    useEffect(() => {
        loadMessages();
        loadUsers();
    }, []);

    const addMessage = async (text) => {
        const newMessage = {
            chatId: activeChat,
            text,
            sender: "me",
            time: Date.now(),
            status: "sent"
        };
        const savedMessage = await addMessageToDB(newMessage);
        setMessage((prev) => [...prev, savedMessage]);
    };

    const addUser = async (user) => {
        await addUsersToDB(user);
        setUsers((prev) => {
            const updatedUsers = [...prev, user];
            setActiveChat(user.id);
            return updatedUsers;
        });
    };

    //update user
    const updateUser = async (id, data) => {
        await updateUserProfile(id, data)

        setUsers(prevUser =>
            prevUser.map(user =>
                user.id === id ? { ...user, ...data } : user
            )
        )

    }

    // edit Message
    const editMessage = async (id, newText) => {
        setMessage(prev =>
            prev.map(msg => msg.id === id ? { ...msg, text: newText, edited: true } : msg)
        );
        await updateMessageInDB(id, newText);
    }

    // delete Message
    const deleteMessage = async (id) => {
        await deleteMessageFromDB(id)
        setMessage(prev => prev.filter(msg => msg.id !== id))
    }

    return (
        <ChatContext.Provider value={{ users, setUsers, message, activeChat, setActiveChat, addMessage, addUser, isTyping, setIsTyping, editMessage, deleteMessage, updateUser }}>
            {children}
        </ChatContext.Provider>
    )
}

export const useChat = () => useContext(ChatContext)
