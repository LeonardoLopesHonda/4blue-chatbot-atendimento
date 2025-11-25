import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const API_URL = import.meta.env.VITE_DJANGO_API_URL

function Login() {
  const [usuario, setUsuario] = useState('')
  const [senha, setSenha] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const response = await fetch(`${API_URL}/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ nome: usuario, senha: senha })
      })
      const data = await response.json()

      if (response.ok) {
        setSuccess('Login realizado com sucesso')
        navigate('/chat', { replace: true })
      } else {
        setError(data.error || 'Erro ao fazer login')
      }
    } catch (error) {
      setError('Algo deu errado. Verifique sua conexão e tente novamente.')
      console.error('Login error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="flex min-dvh-screen flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-indigo-500">4blue Chatbot</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} method="POST" className="space-y-6">
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Usuario:
              </label>
              <select name="usuario" 
              id="usuario" 
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              className={`w-full border-2 rounded-md p-2 md:py-2.5 text-gray-700 shadow-sm ${error ? 'border-red-500' : 'border-gray-300'}`}>  
                <option value="" disabled>Selecione um usuario</option>
                <option value="Usuario A">Usuario A</option>
                <option value="Usuario B">Usuario B</option>
              </select>
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Senha</label>
              <input type="password" 
                name="senha" 
                id="senha" 
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className={`w-full border-2 rounded-md p-2 md:py-2.5 text-gray-700 shadow-sm ${error ? 'border-red-500' : 'border-gray-300'}`} />
            </div>

            {error && (
              <div className="text-red-500 text-sm">{error}</div>
            )}
            {success && (
              <div className="text-green-500 text-sm">{success}</div>
            )}

            <button 
              type="submit" 
              disabled={loading || !usuario || !senha}
              className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-800 md:py-3 md:text-base transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login
