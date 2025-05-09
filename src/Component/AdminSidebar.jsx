import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, LayoutDashboard, FileText, Settings, Users, LogOut } from 'lucide-react';
import { signOut } from 'firebase/auth';
// import { db } from '../firebase/firebasee'; 
import { auth } from '../firebase/firebasee';
import { useNavigate } from 'react-router-dom';

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  const menuItems = [
    { title: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={20} /> },
    { title: 'Create Blog', path: '/admin/create', icon: <FileText size={20} /> },
    { title: 'Manage Blogs', path: '/admin/manage', icon: <FileText size={20} /> },
    { title: 'Users', path: '/admin/users', icon: <Users size={20} /> },
    { title: 'Settings', path: '/admin/UserSettings', icon: <Settings size={20} /> },
  ];

  return (
    <>
      {/* Mobile Toggle Button - Always visible on mobile */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed z-20 top-4 left-4 bg-red-600 text-white p-2 rounded-md shadow-lg"
        aria-label="Toggle Sidebar"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay for mobile when sidebar is open */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div 
        className={`fixed lg:static h-[100vh] z-20 transition-all duration-300 ease-in-out bg-[#1d1d1d] text-white
                   ${isOpen ? 'w-64 left-0' : 'w-0 -left-64 lg:w-20'} overflow-hidden`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-4 flex items-center justify-between border-b border-gray-700">
            <h2 className={`text-xl font-bold ${!isOpen && 'lg:hidden'}`}>Admin Panel</h2>
            <button 
              onClick={toggleSidebar}
              className="hidden lg:block text-white hover:text-gray-300"
              aria-label="Toggle Sidebar"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 py-4 overflow-y-auto">
            <ul className="space-y-2 px-3">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center p-2 rounded-lg transition-colors
                      ${location.pathname === item.path 
                        ? 'bg-red-600 text-white' 
                        : 'text-gray-300 hover:bg-gray-700'}`}
                  >
                    <span className="mr-3">{item.icon}</span>
                    <span className={`${!isOpen && 'lg:hidden'}`}>{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Sidebar Footer with Logout */}
          <div className="p-4 border-t border-gray-700">
            <button
              onClick={handleLogout}
              className="flex items-center w-full p-2 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors"
            >
              <LogOut size={20} className="mr-3" />
              <span className={`${!isOpen && 'lg:hidden'}`}>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}