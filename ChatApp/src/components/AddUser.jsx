import { Image, Mail, UserPlus, UserPlus2 } from 'lucide-react'
import React, { useState } from 'react'
import { useChat } from '../contextAPI/ChatContext'
import { useNavigate } from 'react-router-dom'

const AddUser = () => {

    const { addUser } = useChat()
    const navigate = useNavigate()

    const [form, setForm] = useState({
        id: Date.now(),
        name: "",
        email: "",
        avatar: "",
    })
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.name.trim()) return;

        const newUser = {
            id: form.id,
            name: form.name,
            email: form.email,
            avatar: form.avatar || "https://cdn.vectorstock.com/i/1000v/66/13/default-avatar-profile-icon-social-media-user-vector-49816613.jpg",
            online: true,
        };

        await addUser(newUser);
        navigate("/chats");
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
            <form onSubmit={handleSubmit}
                className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 space-y-5">
                {/* Header */}
                <div className="text-center">
                    <UserPlus2 className="w-10 h-10 mx-auto text-indigo-500" />
                    <h2 className="text-xl font-semibold mt-2 dark:text-white">
                        Add New User
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Invite someone to chat
                    </p>
                </div>

                {/* Name */}
                <div>
                    <label className="text-sm font-medium dark:text-gray-200">
                        Name
                    </label>
                    <div className="flex items-center gap-2 mt-1">
                        <UserPlus className="w-4 h-4 text-gray-400" />
                        <input
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Full name"
                            className="w-full p-2 rounded-lg border dark:bg-gray-700 dark:text-white"
                        />
                    </div>
                </div>

                {/* Email */}
                <div>
                    <label className="text-sm font-medium dark:text-gray-200">
                        Email
                    </label>
                    <div className="flex items-center gap-2 mt-1">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <input
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="user@email.com"
                            className="w-full p-2 rounded-lg border dark:bg-gray-700 dark:text-white"
                        />
                    </div>
                </div>

                {/* Avatar URL */}
                <div>
                    <label className="text-sm font-medium dark:text-gray-200">
                        Avatar URL (optional)
                    </label>
                    <div className="flex items-center gap-2 mt-1">
                        <Image className="w-4 h-4 text-gray-400" />
                        <input
                            name="avatar"
                            value={form.avatar}
                            onChange={handleChange}
                            placeholder="https://image..."
                            className="w-full p-2 rounded-lg border dark:bg-gray-700 dark:text-white"
                        />
                    </div>
                </div>

                {/* Button */}
                <button
                    className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 disabled:opacity-50">
                    Add User
                </button>
            </form>
        </div>
    )
}

export default AddUser