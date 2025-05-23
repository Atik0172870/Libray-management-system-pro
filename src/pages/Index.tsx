
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import Dashboard from "@/components/pages/Dashboard";
import Books from "@/components/pages/Books";
import Members from "@/components/pages/Members";
import Borrowing from "@/components/pages/Borrowing";
import Returns from "@/components/pages/Returns";
import Categories from "@/components/pages/Categories";
import Authors from "@/components/pages/Authors";
import Reports from "@/components/pages/Reports";
import Settings from "@/components/pages/Settings";

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/books" element={<Books />} />
            <Route path="/members" element={<Members />} />
            <Route path="/borrowing" element={<Borrowing />} />
            <Route path="/returns" element={<Returns />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/authors" element={<Authors />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Index;
