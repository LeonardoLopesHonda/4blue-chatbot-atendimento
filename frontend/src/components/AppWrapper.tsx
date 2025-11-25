import App from "@/src/App";
import { SidebarProvider, SidebarTrigger } from "@components/sidebar";
import { SideBar } from "@/src/components/SideBar";
import { useLocation } from "react-router-dom";

export default function AppWrapper() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  if (isLoginPage) {
    return <App />;
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
  );
}
