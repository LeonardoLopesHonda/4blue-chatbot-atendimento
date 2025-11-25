import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Historico from './pages/Historico'
import ProtectedRoute from './routes/ProtectedRoute'
import PublicRoute from './routes/PublicRoute'
import Chat from './pages/Chat'

function App() {
  return (
    <Routes>
      <Route path="/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/historico" element={<ProtectedRoute><Historico /></ProtectedRoute>} />
      <Route path="*" element={<PublicRoute><Login /></PublicRoute>} />
    </Routes>
  )
}

export default App
