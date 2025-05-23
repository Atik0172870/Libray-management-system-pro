
import { NavLink } from "react-router-dom";
import { 
  BookOpen, 
  Users, 
  BookPlus, 
  BookMinus, 
  Grid3X3, 
  User, 
  BarChart3, 
  Settings, 
  Library,
  Menu
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar = ({ isOpen, onToggle }: SidebarProps) => {
  const menuItems = [
    { icon: Grid3X3, label: "Dashboard", path: "/" },
    { icon: BookOpen, label: "Books", path: "/books" },
    { icon: Users, label: "Members", path: "/members" },
    { icon: BookPlus, label: "Issue Books", path: "/borrowing" },
    { icon: BookMinus, label: "Returns", path: "/returns" },
    { icon: Library, label: "Categories", path: "/categories" },
    { icon: User, label: "Authors", path: "/authors" },
    { icon: BarChart3, label: "Reports", path: "/reports" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  return (
    <div className={`fixed left-0 top-0 h-full bg-white shadow-lg transition-all duration-300 z-50 ${
      isOpen ? 'w-64' : 'w-16'
    }`}>
      <div className="flex items-center justify-between p-4 border-b">
        <div className={`flex items-center space-x-3 ${!isOpen && 'justify-center'}`}>
          <Library className="h-8 w-8 text-blue-600" />
          {isOpen && (
            <div>
              <h1 className="font-bold text-xl text-gray-800">LibraryPro</h1>
              <p className="text-sm text-gray-500">Management System</p>
            </div>
          )}
        </div>
      </div>
      
      <nav className="mt-6">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors ${
                isActive ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' : ''
              } ${!isOpen && 'justify-center'}`
            }
          >
            <item.icon className={`h-5 w-5 ${isOpen && 'mr-3'}`} />
            {isOpen && <span className="font-medium">{item.label}</span>}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
