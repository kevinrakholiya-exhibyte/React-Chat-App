import { Routes, Route } from 'react-router-dom'
import './App.css'
import Chat from './components/Chat'
import { ChatProvider } from './contextAPI/ChatContext'
import AddUser from './components/AddUser'
import Home from './components/Home'

function App() {

  return (
    <ChatProvider>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/chats' element={<Chat />} />
        <Route path='/user' element={<AddUser />} />
      </Routes>
    </ChatProvider>
  )
}

export default App
