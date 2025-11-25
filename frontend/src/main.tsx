import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, useLocation } from 'react-router-dom'
import { SidebarProvider, SidebarTrigger } from '@components/sidebar'
import { SideBar } from '@/src/components/SideBar'
import './index.css'
import App from './App.tsx'

function AppWrapper() {
  const location = useLocation()
  const isLoginPage = location.pathname === '/login'

  if (isLoginPage) {
    return <App />
  }

  return (
    <SidebarProvider>
      <SideBar />
      <div className="flex min-h-dvh w-full">
        <div className="flex-1 min-h-screen p-8">
          <SidebarTrigger />
          <App />
        </div>
      </div>
    </SidebarProvider>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  </StrictMode>
)
