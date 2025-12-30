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
        try {
            const data = await getMessagesFromDB();
            const messages = data.map((msg) => ({
                ...msg,
                status: msg.status || "sent",
            }));
            setMessage(messages);
        } catch (error) {
            console.error("Failed to load messages:", error);
            setMessage([]);
        }
    };
    // Load Users from IndexedDB on app render
    const loadUsers = async () => {
        try {
            const data = await getUsersFromDB();
            setUsers(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Failed to load users:", error);
            setUsers([]);
        }
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

    // add Message
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
    // add User
    const addUser = async (user) => {
        try {
            const newUser = {
                ...user,
                isPinned: false
            }
            await addUsersToDB(newUser);
            setUsers((prev) => {
                const updatedUsers = [...prev, newUser];
                setActiveChat(newUser.id);
                return updatedUsers;
            });
        } catch (error) {
            console.error("Failed to add user:", error);
        }
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
        try {
            setMessage((prev) =>
                prev.map((msg) =>
                    msg.id === id ? { ...msg, text: newText, edited: true } : msg
                )
            );
            const success = await updateMessageInDB(id, newText);
            if (!success) throw new Error("Edit failed");
        } catch (error) {
            console.error("Failed to edit message:", error);
        }
    }

    // delete Message
    const deleteMessage = async (id) => {
        try {
            await deleteMessageFromDB(id);
            setMessage((prev) => prev.filter((msg) => msg.id !== id));
        } catch (error) {
            console.error("Failed to delete message:", error);
        }
    }

    const togglePinChat = async (userId) => {
        try {
            const user = users.find((u) => u.id === userId);
            if (!user) return;
            const updatedPin = !user.isPinned;
            await updateUserProfile(userId, { isPinned: updatedPin });
            setUsers((prev) =>
                prev.map((u) =>
                    u.id === userId ? { ...u, isPinned: updatedPin } : u
                )
            );
        } catch (error) {
            console.error("Failed to pin chat:", error);
        }
    };

    return (
        <ChatContext.Provider value={{ users, setUsers, message, activeChat, setActiveChat, addMessage, addUser, isTyping, setIsTyping, editMessage, deleteMessage, updateUser, togglePinChat }}>
            {children}
        </ChatContext.Provider>
    )
}

export const useChat = () => useContext(ChatContext)
