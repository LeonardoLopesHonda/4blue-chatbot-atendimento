import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const API_URL = import.meta.env.VITE_DJANGO_API_URL

function Historico() {
  const navigate = useNavigate()
  const [conversation, setConversation] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(`${API_URL}/check-auth/`, {
          credentials: 'include'
        })
        const data = await response.json()
        
        if (data.authenticated) {
          setAuthenticated(true)
          loadConversation()
        } else {
          navigate('/login')
        }
      } catch (error) {
        console.error('Auth check error:', error)
        navigate('/login')
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const loadConversation = async () => {
    try {
      const response = await fetch(`${API_URL}/conversation/`, {
        credentials: 'include'
      })
      const data = await response.json()
      setConversation(data.conversation || [])
    } catch (error) {
      console.error('Error loading conversation:', error)
    }
  }

  if (loading) {
    return <div className="p-8">Carregando...</div>
  }  

  return (
    <>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-indigo-500">Histórico de Conversas</h1>
        </div>
        <div className="space-y-4">
          {conversation.length === 0 ? (
            <p className="text-gray-500">Nenhuma conversa ainda.</p>
          ) : (
            conversation.map((msg, index) => (
              <div
                  key={index}
                  className={`p-4 rounded-lg ${
                  msg.role === 'user'
                      ? 'bg-blue-100 ml-auto max-w-md'
                      : 'bg-gray-100 mr-auto max-w-md'
                  }`}
              >
                      <p className="font-semibold text-sm mb-1">
                      {msg.role === 'user' ? 'Você' : 'Bot'}
                      </p>
                      <p>{msg.message}</p>
                  </div>
                  ))
          )}
        </div>
      </div>
    </>
  )
}

export default Historico