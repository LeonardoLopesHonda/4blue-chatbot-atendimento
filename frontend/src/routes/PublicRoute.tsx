import { Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

const API_URL = import.meta.env.VITE_DJANGO_API_URL

interface PublicRouteProps {
    children: React.ReactNode
}

function PublicRoute({ children }: PublicRouteProps) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch(`${API_URL}/check-auth/`, { credentials: 'include' })
                const data = await response.json()
                setIsAuthenticated(data.authenticated || false)
            } catch (error) {
                setIsAuthenticated(false)
            } finally {
                setLoading(false)
            }
        }
        checkAuth()
    }, [])

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                <span className="text-indigo-500">Carregando...</span>
            </div>
        )
    }

    return isAuthenticated ? <Navigate to="/historico" replace /> : <>{children}</>
}

export default PublicRoute
