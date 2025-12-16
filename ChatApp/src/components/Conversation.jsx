import React from 'react'
import ConversationItem from './ConversationItem'
import { useChat } from '../contextAPI/ChatContext';

const Conversation = () => {

    const { users, message, activeChat, setActiveChat } = useChat();
    console.log(users);

    return (
        <div className="p-1">
            {users.map((user) => {
                //get last message of this user
                const lastMessage = message
                    .filter((m) => m.chatId === user.id)
                    .slice(-1)[0];

                return (
                    <ConversationItem
                        key={user.id}
                        name={user.name}
                        avatar={user.avatar}
                        message={lastMessage?.text || "No messages yet"}
                        time={lastMessage?.time || ""}
                        active={activeChat === user.id}
                        onClick={() => setActiveChat(user.id)}
                    />
                );
            })}
        </div>

    )
}

export default Conversation