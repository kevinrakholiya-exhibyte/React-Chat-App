import React from 'react'
import Conversation from './Conversation'
import Messages from './Messages'
import { Home, HomeIcon, MessageCircle, Search, Settings, Users } from 'lucide-react'
import MessageInput from './MessageInput'
import { Link, Navigate } from 'react-router-dom'
import { useChat } from '../contextAPI/ChatContext'

const Chat = () => {
    
    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900">

            {/* Icons SideBar */}
            <div className="w-20 flex flex-col items-center justify-between py-6
                      bg-white dark:bg-gray-800 border-r dark:border-gray-700">
                {/* App Icon */}
                <button onClick={() => Navigate("/chats")}>
                    <MessageCircle className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                </button>
                {/* Navigation Icons */}
                <div className="flex flex-col gap-6">
                    <div className="p-2 rounded-lg cursor-pointer text-gray-500
                          hover:text-gray-700 dark:text-gray-400 dark:hover:text-white">
                        <Link to="/"><HomeIcon className="w-6 h-6" /></Link>
                    </div>
                    <div className="relative p-2 rounded-lg cursor-pointer
                          bg-blue-50 text-blue-500 dark:bg-gray-700">
                        <MessageCircle className="w-6 h-6" />
                        <span className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full" />
                    </div>
                    <div className="p-2 rounded-lg cursor-pointer text-gray-500
                          hover:text-gray-700 dark:text-gray-400 dark:hover:text-white">
                        <Link to="/User"><Users className="w-6 h-6" /></Link>
                    </div>
                </div>

                {/* Settings */}
                <div className="p-2 rounded-lg cursor-pointer text-gray-500
                        hover:text-gray-700 dark:text-gray-400 dark:hover:text-white">
                    <Settings className="w-6 h-6" />
                </div>
            </div>
            {/* Chat List */}
            <div className="hidden md:flex w-80 flex-col bg-gray-50 dark:bg-gray-800 border-r dark:border-gray-700">
                <h1 className="px-4 py-4 text-xl font-bold text-gray-700 dark:text-gray-200">
                    Chat App
                </h1>
                <p className="px-4 py-2 text-sm font-semibold text-gray-500 dark:text-gray-400">
                    Recent
                </p>
                {/* Conversation List */}
                <div className="flex-1 overflow-y-auto px-2 space-y-1">
                    <Conversation />
                </div>
            </div>
            {/* Chat Messages */}
            <div className="flex-1 flex flex-col bg-white dark:bg-gray-900">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-3">
                    <Messages />
                </div>
                {/* Message Input */}
                <div className="border-t dark:border-gray-700">
                    <MessageInput />
                </div>
            </div>
        </div>

    )
}

export default Chat