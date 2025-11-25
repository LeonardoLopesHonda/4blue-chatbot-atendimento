import { History, MessageCircle } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@components/sidebar"
import { useNavigate } from "react-router-dom"

// Menu items.
const items = [
  {
    title: "Chat",
    url: "/chat",
    icon: MessageCircle,
  },
  {
    title: "Historico",
    url: "/historico",
    icon: History,
  },
]

export function SideBar() {
  const navigate = useNavigate()
  const API_URL = import.meta.env.VITE_DJANGO_API_URL
  
  const handleLogout = async () => {
    try {
      await fetch(`${API_URL}/logout/`, {
        method: 'POST',
        credentials: 'include'
      })
      navigate('/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex justify-center my-4">
            <h2 className="text-center text-2xl/9 font-bold text-indigo-500">
              <span className="text-indigo-500">
                4blue Chatbot
              </span>
            </h2>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className="transition-all duration-300 hover:scale-105">
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarGroup>
          <SidebarGroupLabel>
            <div className="w-full mb-8">
              <button
                onClick={handleLogout}
                className="w-full p-3 bg-red-400 text-white rounded hover:bg-red-700 transition-all duration-300"
                >
                  Logout
              </button>
            </div>
          </SidebarGroupLabel>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  )
}