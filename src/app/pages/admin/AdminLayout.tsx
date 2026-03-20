import { Outlet, Link, useLocation } from 'react-router';
import { LayoutDashboard, FolderKanban, Briefcase, Mail, MessageSquare, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';

export function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Projects', href: '/admin/projects', icon: FolderKanban },
    { name: 'Services', href: '/admin/services', icon: Briefcase },
    { name: 'Reviews', href: '/admin/reviews', icon: MessageSquare },
    { name: 'Messages', href: '/admin/messages', icon: Mail },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      {/* Mobile sidebar overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-[#21362e]/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed lg:static inset-y-0 left-0 w-64 bg-[#21362e] text-white z-50 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} flex flex-col`}>
        <div className="flex items-center justify-between h-16 px-6 bg-[#1a2b24]">
          <span className="text-xl font-bold font-['Space_Grotesk'] tracking-tight">
            Gritek <span className="text-[#b8ea27]">Admin</span>
          </span>
          <button className="lg:hidden text-white hover:text-[#b8ea27]" onClick={() => setIsSidebarOpen(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-8 space-y-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium ${
                  isActive 
                    ? 'bg-[#b8ea27] text-[#21362e] shadow-[0_0_15px_rgba(184,234,39,0.3)] font-bold' 
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <Link to="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:bg-white/10 hover:text-white transition-all duration-300 font-medium">
            <LogOut className="w-5 h-5" />
            Back to Site
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white shadow-sm flex items-center px-4 lg:px-8 shrink-0 relative z-30">
          <button 
            className="lg:hidden p-2 text-[#21362e] rounded-md hover:bg-[#f8fafc]"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
          
          <div className="ml-4 lg:ml-0 font-semibold text-[#21362e]">
            Admin Control Panel
          </div>
        </header>

        {/* Scrollable Main Area */}
        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
