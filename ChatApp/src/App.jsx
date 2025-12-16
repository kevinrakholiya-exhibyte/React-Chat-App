import { Routes, Route } from 'react-router-dom'
import './App.css'
import Chat from './components/Chat'
import { ChatProvider } from './contextAPI/ChatContext'
import AddUser from './components/AddUser'

function App() {

  return (
    <ChatProvider>
      <Routes>
        <Route path='/chats' element={<Chat />} />
        <Route path='/User' element={<AddUser />} />
      </Routes>
    </ChatProvider>
  )
}

export default App
