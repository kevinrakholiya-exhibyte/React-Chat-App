import React, { useEffect, useRef } from 'react'
import { useChat } from '../contextAPI/ChatContext';
import { Check } from 'lucide-react';

const Messages = () => {

    const { message, activeChat, users, isTyping } = useChat();
    console.log(message);

    const bottomRef = useRef(null);

    // Auto scroll to bottom on new message
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [message, activeChat]);

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });
    }

    const activeUser = users.find(
        user => Number(user.id) === Number(activeChat)
    );

    return (

        <div className="flex flex-col h-full bg-gray-100 dark:bg-gray-900">

            {/* HEADER */}
            <div className="w-full h-16 bg-purple-600 dark:bg-gray-800 flex items-center px-4 shadow-md">

                <img src={
                    activeUser?.avatar ||
                    "https://cdn.pixabay.com/photo/2017/01/31/21/23/avatar-2027366_960_720.png"
                }
                    alt={activeUser?.name || "User"}
                    className="w-11 h-11 rounded-full border-2 border-white" />

                <div className="ml-3 flex-1">
                    <p className="text-white font-semibold leading-tight">
                        {activeUser?.name || "Select a chat"}
                    </p>
                    <div className="flex items-center gap-1">
                        <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                        <span className="text-xs text-white/80">{activeUser ? "Online" : ""}</span>
                    </div>
                </div>
                {activeChat && isTyping && (
                    <div className="px-4 py-1 text-sm text-gray-400 italic animate-pulse">
                        Typing...
                    </div>
                )}
            </div>

            {/* MESSAGE LIST */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {message
                    .filter((msg) => msg.chatId === activeChat)
                    .map((msg, id) => (
                        <div key={id} className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>
                            <div className={`max-w-xs px-4 py-2 rounded-2xl text-sm shadow
                              ${msg.sender === "me" ? "bg-purple-600 text-white rounded-br-none" : "bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-bl-none"}`}>
                                {msg.text}
                                <div className="text-[10px] text-right opacity-70 mt-1">
                                    <span>{formatTime(msg.time)}</span>
                                    {msg.sender === "me" && msg.status === "sent" && (
                                        <Check size={14} />
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                <div ref={bottomRef} />
            </div>
        </div>

    )

}

export default Messages