import React, { useState } from 'react'
import { Pencil, Search } from 'lucide-react';
import EditUserModel from './EditUserModel';

const ConversationItem = ({ active, name, avatar, onClick, message, time, userId }) => {
    const [openEdit, setOpenEdit] = useState(false)

    const formatTime = (timestamp) => {
        if (!timestamp) return "";
        const date = new Date(timestamp);
        const now = new Date();
        const isToday =
            date.toDateString() === now.toDateString();
        if (isToday) {
            return date.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            });
        }
        return date.toLocaleDateString();
    };


    return (
        <div
            onClick={onClick}
            className={`flex items-center gap-3 p-3 mx-2 my-1 rounded-xl cursor-pointer transition-all duration-200
        ${active ? "bg-gray-200 dark:bg-gray-600" : "bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"}`}>

            {/* Avatar */}
            <img
                src={
                    avatar ||
                    "https://cdn.pixabay.com/photo/2017/01/31/21/23/avatar-2027366_960_720.png"
                }
                alt={name}
                className="w-10 h-10 rounded-full object-cover" />

            {/* Content */}
            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">

                    <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-100 truncate">
                        {name}
                    </h4>
                    <div className="text-xs text-gray-400 dark:text-gray-300">{time ? formatTime(time) : ""}</div>
                    <Pencil
                        size={18}
                        onClick={(e) => {
                            e.stopPropagation();
                            setOpenEdit(true);
                        }}
                        className="ml-2 cursor-pointer text-gray-400 hover:text-indigo-500"/>

                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400  w-40 truncate">
                    {message}
                </div>
            </div>
            {openEdit && (
                <EditUserModel user={{ id: userId, name, avatar }}
                    onClose={() => setOpenEdit(false)} />
            )}
        </div>

    )
}

export default ConversationItem