const DB_NAME = "chatDB";
const MESSAGE_STORE = "messages";
const USER_STORE = "users";

export const openDB = () => {
    return new Promise((resolve, reject) => {
        try {
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
        } catch (error) {
            console.error("IndexedDB open error", error);
            reject(error);
        }
    });
};

// Add Messages To IndexedDB
export const addMessageToDB = async (message) => {
    try {
        const db = await openDB();
        const transaction = db.transaction(MESSAGE_STORE, "readwrite");
        const store = transaction.objectStore(MESSAGE_STORE);
        return new Promise((resolve, reject) => {
            const request = store.add(message);
            request.onsuccess = () => {
                resolve({ ...message, id: request.result });
            };
            request.onerror = () => reject(request.error);
        });
    } catch (error) {
        console.error("addMessageToDB error", error);
        return null;
    }
}


// Display Messages From IndexedDB
export const getMessagesFromDB = async () => {
    try {
        const db = await openDB();
        const transaction = db.transaction(MESSAGE_STORE, "readonly");
        const store = transaction.objectStore(MESSAGE_STORE);
        return new Promise((resolve) => {
            const request = store.getAll();
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(req.error);
        });
    } catch (error) {
        console.error("getMessagesFromDB error", error);
        return [];
    }
}

// Add Users To IndexedDB
export const addUsersToDB = async (user) => {
    const db = await openDB();
    const transaction = db.transaction(USER_STORE, "readwrite");
    transaction.objectStore(USER_STORE).add(user);
}

// Display Users From IndexedDB
export const getUsersFromDB = async () => {
    try {
        const db = await openDB();
        const transaction = db.transaction(USER_STORE, "readonly");
        const store = transaction.objectStore(USER_STORE);
        return new Promise((resolve) => {
            const request = store.getAll();
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    } catch (error) {
        console.error("getUsersFromDB error", error);
        return [];
    }
}

// Update UserProfile
export const updateUserProfile = async (id, data) => {
    try {
        const db = await openDB()
        const transaction = db.transaction(USER_STORE, "readwrite")
        const store = transaction.objectStore(USER_STORE);
        return new Promise((resolve, reject) => {
            const getRequest = store.get(id)
            getRequest.onsuccess = () => {
                const user = getRequest.result;
                if (!user) {
                    reject("User Not found")
                    return
                }
                const updatedUser = { ...user, ...data }
                const request = store.put(updatedUser)
                request.onsuccess = () => resolve(updatedUser)
                request.onerror = () => reject(request.error)
            }
        })
    } catch (error) {
        console.error("updateUserProfile error", error);
        return null;
    }
}

// Update Message 
export const updateMessageInDB = async (id, newText) => {
    try {
        const db = await openDB()
        const transaction = db.transaction(MESSAGE_STORE, "readwrite");
        const store = transaction.objectStore(MESSAGE_STORE);
        return new Promise((resolve, reject) => {
            const request = store.get(id);
            request.onsuccess = () => {
                const message = request.result
                if (!message) {
                    reject("Message not found")
                    return
                }
                message.text = newText
                message.edited = true
                store.put(message)
            }
            transaction.oncomplete = () => resolve(true);
        })
    } catch (error) {
        console.error("updateMessageInDB error", error);
        return false;
    }
}

// Delete Message
export const deleteMessageFromDB = async (messageId) => {
    try {
        const db = await openDB()
        const transaction = db.transaction(MESSAGE_STORE, "readwrite")
        const store = transaction.objectStore(MESSAGE_STORE);
        return new Promise((resolve, reject) => {
            const request = store.delete(messageId);
            request.onsuccess = () => resolve(request.result)
            request.onerror = () => reject(request.error)
        })
    } catch (error) {
        console.error("deleteMessageFromDB error", error);
        return false;
    }
}