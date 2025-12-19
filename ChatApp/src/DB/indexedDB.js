const DB_NAME = "chatDB";
const MESSAGE_STORE = "messages";
const USER_STORE = "users";

export const openDB = () => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, 2);

        request.onupgradeneeded = () => {
            const db = request.result;
            db.createObjectStore(MESSAGE_STORE, {
                keyPath: "id",
                autoIncrement: true,
            });
            db.createObjectStore(USER_STORE, {
                keyPath: "id",
                autoIncrement: true,
            });
        };

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
};

// Add Messages To IndexedDB
export const addMessageToDB = async (message) => {
    const db = await openDB();
    const transaction = db.transaction(MESSAGE_STORE, "readwrite");
    transaction.objectStore(MESSAGE_STORE).add(message);
}


// Display Messages From IndexedDB
export const getMessagesFromDB = async () => {
    const db = await openDB();
    const transaction = db.transaction(MESSAGE_STORE, "readonly");
    const store = transaction.objectStore(MESSAGE_STORE);
    return new Promise((resolve) => {
        const request = store.getAll();
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(req.error);
    });
}

// Add Users To IndexedDB
export const addUsersToDB = async (user) => {
    const db = await openDB();
    const transaction = db.transaction(USER_STORE, "readwrite");
    transaction.objectStore(USER_STORE).add(user);
}

// Display Users From IndexedDB
export const getUsersFromDB = async () => {
    const db = await openDB();
    const transaction = db.transaction(USER_STORE, "readonly");
    const store = transaction.objectStore(USER_STORE);
    return new Promise((resolve) => {
        const request = store.getAll();
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

// Update UserProfile
export const updateUserProfile = async (updatedUser) => {
    const db = await openDB()
    const transaction = db.transaction(USER_STORE, "readwrite")
    const store = transaction.objectStore(USER_STORE);
    return new Promise((resolve, reject) => {
        const request = store.put(updatedUser);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    })
}

// Update Message 
export const updateMessageInDB = async (updatedMessage) => {
    const db = await openDB()
    const transaction = db.transaction(MESSAGE_STORE, "readwrite");
    const store = transaction.objectStore(MESSAGE_STORE);
    return new Promise((resolve, reject) => {
        const request = store.put(updatedMessage)
        request.onsuccess = () => resolve(request.result)
        request.onerror = () => reject(request.error)
    })
}

// Delete Message
export const deleteMessageFromDB = async (messageId) => {
    const db = await openDB()
    const transaction = db.transaction(MESSAGE_STORE, "readwrite")
    const store = transaction.objectStore(MESSAGE_STORE);
    return new Promise((resolve, reject) => {
        const request = store.delete(messageId);
        request.onsuccess = () => resolve(request.result)
        request.onerror = () => reject(request.error)
    })
}