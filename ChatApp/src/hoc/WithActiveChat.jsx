import React from 'react'
import { useChat } from '../contextAPI/ChatContext'

const WithActiveChat = (WrappedComponent) => {
    return (props) => {
        const { activeChat } = useChat()
        return (
            <WrappedComponent
                {...props}
                isChatActive={Boolean(activeChat)}
                activeChat={activeChat}
            />
        )
    }
}

export default WithActiveChat