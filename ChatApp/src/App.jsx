import { Routes, Route } from 'react-router-dom'
import './App.css'
import Chat from './components/Chat'
import { ChatProvider } from './contextAPI/ChatContext'
import AddUser from './components/AddUser'
import Home from './components/Home'
import { ThemeProvider } from './contextAPI/ThemeContext'
import Settings from './components/Settings'

function App() {

  return (
    <ChatProvider>
      <ThemeProvider>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/chats' element={<Chat />} />
          <Route path='/user' element={<AddUser />} />
          <Route path='/setting' element={<Settings />} />
        </Routes>
      </ThemeProvider>
    </ChatProvider>
  )
}

export default App
