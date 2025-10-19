import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Layers, CreditCard, User, Users, BarChart3, Bell, Settings, Briefcase, Megaphone, UserSearch } from "lucide-react";
import { useAuth,  } from "../../utils/AuthContext";
import "./SidebarLayout.css";
import { useEffect, useState } from "react";


function SidebarLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const name = user?.name || 'お名前'; 
  const role = user?.role || 'admin';

  const menuItems = [
    { path: "/admin/users", label: "ユーザー管理", icon: UserSearch, adminOnly: true },
    { path: "/products", label: "プロダクト", icon: Layers },
    { path: "/contracts", label: "契約", icon: Briefcase },
    { path: "/clients", label: "クライアント", icon: Users },
    { path: "/revenues", label: "売上", icon: BarChart3 },
    { path: "/notices", label: "お知らせ", icon: Megaphone }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="sidebar-layout">
      {/* Sidebar */}
      <nav className="sidebar">
        {/* Header */}
        <div className="sidebar-header">
          {/*<div className="logo-beconn" onClick={() => navigate('/')} style={{cursor: 'pointer'}}>BeConn</div>*/}
          <Link to='/'><div className="logo-beconn" style={{cursor: 'pointer'}}>BeConn</div></Link>
          <div className="user-info">
            <div className="user-avatar">
            <User className="avatar-icon" />
            </div>
            <Settings className="settings-icon" />
          </div>
          <div className="user-name">
            {user?.name || 'お名前'}
          </div>
        </div>

        {/* Menu Items */}
        <div className="menu-items">
          {menuItems
            .filter(item => !item.adminOnly || role == 'admin')
            .map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`menu-item ${active ? 'active' : ''}`}
              >
                <Icon className="menu-icon" />
                <span className="menu-label">{item.label}</span>
                <svg className="menu-arrow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            );
          })}
        </div>

        {/* Logout */}
        <div className="sidebar-footer">
          <button className="logout-btn" onClick={() => { logout(); navigate('/login'); }}>
            <svg className="logout-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            LOGOUT
          </button>
        </div>
      </nav>
      
      {/* Main Content */}
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default SidebarLayout;

