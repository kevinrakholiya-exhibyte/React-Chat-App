import React, { useState } from 'react'
import { useChat } from '../contextAPI/ChatContext'
import { X } from 'lucide-react';

const EditUserModel = ({ user, onClose }) => {
    const { updateUser } = useChat();

    const [form, setForm] = useState({
        name: user.name,
        avatar: user.avatar
    })

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        await updateUser(user.id, {
            name: form.name.trim(),
            avatar: form.avatar.trim(),
        });

        onClose();
    };
    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 w-96 rounded-xl p-5 shadow-lg">

                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold dark:text-white">
                        Edit Profile
                    </h3>
                    <X className="cursor-pointer text-gray-500 hover:text-red-500"onClick={onClose}/>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-sm dark:text-gray-300">
                            Name
                        </label>
                        <input
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            className="w-full p-2 rounded-lg border dark:bg-gray-700 dark:text-white" />
                    </div>

                    <div>
                        <label className="text-sm dark:text-gray-300">
                            Avatar URL
                        </label>
                        <input
                            name="avatar"
                            value={form.avatar}
                            onChange={handleChange}
                            className="w-full p-2 rounded-lg border dark:bg-gray-700 dark:text-white"/>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-2 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400">
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600">
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditUserModel