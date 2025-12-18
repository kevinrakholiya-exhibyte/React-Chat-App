import React, { useRef, useState } from 'react'
import { useChat } from '../contextAPI/ChatContext';

const MessageInput = () => {
    const [text, setText] = useState("");
    const { addMessage, setIsTyping } = useChat();
    const typingTimeoutRef = useRef(null);

    const isDisabled = !text.trim();

    const handleChange = (e) => {
        const value = e.target.value
        setText(value)
        setIsTyping(true)
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current)
        }
        typingTimeoutRef.current = setTimeout(() => {
            setIsTyping(false);
        }, 900);

    }

    const sendMessage = () => {
        if (isDisabled) return;
        addMessage(text);
        setText("");
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }
    };

    return (
        <div className="flex gap-2 p-2 bg-gray-900">
            <input
                value={text}
                onChange={handleChange}
                placeholder="Type a message..."
                className="flex-1 p-2 rounded-lg bg-gray-800 text-white outline-none"
                onKeyDown={(e) => {
                    if (e.key === "Enter") sendMessage();
                }} />
            <button
                onClick={sendMessage}
                disabled={isDisabled}
                className={`px-4 rounded-lg transition
          ${isDisabled ? "bg-gray-600 cursor-not-allowed"
                        : "bg-blue-500 hover:bg-blue-600"} text-white`}>
                Send
            </button>
        </div>
    );
};


export default MessageInput