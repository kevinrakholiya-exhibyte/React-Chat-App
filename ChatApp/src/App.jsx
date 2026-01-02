import { Routes, Route } from 'react-router-dom'
import './App.css'
import { ChatProvider } from './contextAPI/ChatContext'
import { ThemeProvider } from './contextAPI/ThemeContext'
import { lazy, Suspense } from 'react'
import LoadingSkeleton from './components/LoadingSkeleton'

const Home = lazy(() => import('./components/Home'))
const Chat = lazy(() => import('./components/Chat'))
const AddUser = lazy(() => import('./components/AddUser'))
const Settings = lazy(() => import('./components/Settings'))

function App() {

  return (
    <ChatProvider>
      <ThemeProvider>
        <Suspense fallback={<LoadingSkeleton />}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/chats' element={<Chat />} />
            <Route path='/user' element={<AddUser />} />
            <Route path='/setting' element={<Settings />} />
          </Routes>
        </Suspense>
      </ThemeProvider>
    </ChatProvider>
  )
}

export default App
