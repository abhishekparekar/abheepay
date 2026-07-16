import React, { useState, useEffect } from "react";
import { Link, NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import {
  FiGrid, FiCpu, FiUsers, FiMessageSquare,
  FiMail, FiSettings, FiArrowLeft, FiLogOut, FiShield, FiFileText, FiMenu, FiX
} from "react-icons/fi";

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  const navItems = [
    { label: "Dashboard",    to: "/admin",            icon: FiGrid,          end: true },
    { label: "Services",     to: "/admin/services",   icon: FiCpu },
    { label: "Solutions",    to: "/admin/solutions",  icon: FiFileText },
    { label: "Partners",     to: "/admin/partners",   icon: FiUsers },
    { label: "Testimonials", to: "/admin/testimonials",icon: FiMessageSquare },
    { label: "Inquiries",    to: "/admin/contacts",   icon: FiMail },
    { label: "Settings",     to: "/admin/settings",   icon: FiSettings },
  ];

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      background: "#f4f7f6",
      color: "#0c0509",
      fontFamily: "'Inter', sans-serif",
      position: "relative"
    }}>
      
      {/* Mobile Sidebar Backdrop Overlay */}
      {sidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)}
          className="admin-sidebar-overlay"
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(17, 7, 9, 0.4)",
            zIndex: 998,
            backdropFilter: "blur(2px)"
          }}
        />
      )}

      {/* Sidebar - Solid Dark Premium with Mobile Responsive Drawer */}
      <aside 
        className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}
        style={{
          width: 260,
          background: "#110709",
          borderRight: "1px solid rgba(255, 255, 255, 0.05)",
          display: "flex",
          flexDirection: "column",
          position: "sticky",
          top: 0,
          height: "100vh",
          zIndex: 999,
          transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
        }}
      >
        {/* Sidebar Brand Logo */}
        <div style={{
          padding: "24px 20px",
          borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}>
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <div style={{
              width: 36, height: 36, borderRadius: 8,
              background: "linear-gradient(135deg, #e53935 0%, #d81b60 100%)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 4px 14px rgba(229,57,53,0.3)",
            }}>
              <FiShield size={18} color="#fff" />
            </div>
            <div>
              <div style={{
                fontFamily: "'Outfit',sans-serif",
                fontWeight: 900,
                fontSize: 16,
                color: "#ffffff"
              }}>SiD Pay</div>
              <div style={{ fontSize: 9, color: "#77676c", fontWeight: 700, letterSpacing: "0.06em" }}>ADMIN PORTAL</div>
            </div>
          </Link>

          {/* Close Sidebar icon for mobile */}
          <button 
            className="sidebar-close-btn"
            onClick={() => setSidebarOpen(false)}
            style={{
              background: "none",
              border: "none",
              color: "#c9a8b4",
              cursor: "pointer",
              display: "none",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Sidebar Nav Links */}
        <nav style={{
          padding: "24px 16px",
          display: "flex",
          flexDirection: "column",
          gap: 6,
          flexGrow: 1,
          overflowY: "auto"
        }}>
          {navItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={idx}
                to={item.to}
                end={item.end}
                style={({ isActive }) => ({
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "12px 16px",
                  borderRadius: 12,
                  fontSize: 14.5,
                  fontWeight: 600,
                  color: isActive ? "#fff" : "#c9a8b4",
                  background: isActive ? "linear-gradient(135deg, rgba(229,57,53,0.15) 0%, rgba(216,27,96,0.1) 100%)" : "transparent",
                  border: isActive ? "1px solid rgba(229,57,53,0.25)" : "1px solid transparent",
                  transition: "all 0.2s ease",
                  textDecoration: "none"
                })}
                onMouseEnter={e => {
                  if (!e.currentTarget.className.includes("active")) {
                    e.currentTarget.style.color = "#fff";
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.02)";
                  }
                }}
                onMouseLeave={e => {
                  if (!e.currentTarget.className.includes("active")) {
                    e.currentTarget.style.color = "#c9a8b4";
                    e.currentTarget.style.background = "transparent";
                  }
                }}
              >
                <Icon size={16} style={{ flexShrink: 0 }} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Sidebar Bottom Action Profile */}
        <div style={{
          padding: "20px 16px",
          borderTop: "1px solid rgba(255, 255, 255, 0.05)",
          display: "flex",
          flexDirection: "column",
          gap: 10
        }}>
          <Link to="/" style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "10px 14px",
            borderRadius: 10,
            fontSize: 13.5,
            color: "#c9a8b4",
            textDecoration: "none",
            transition: "all 0.2s ease"
          }}
            onMouseEnter={e => { e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={e => { e.currentTarget.style.color = "#c9a8b4"; }}
          >
            <FiArrowLeft size={15} />
            <span>Go to Website</span>
          </Link>

          <button
            onClick={handleLogout}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 14px",
              borderRadius: 10,
              fontSize: 13.5,
              color: "#ef5350",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              textAlign: "left",
              width: "100%",
              transition: "all 0.2s ease"
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(239, 83, 80, 0.08)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
          >
            <FiLogOut size={15} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Panel Content Window - Light Contrast Theme */}
      <main style={{
        flexGrow: 1,
        minWidth: 0,
        display: "flex",
        flexDirection: "column"
      }}>
        {/* Header bar - White Accent */}
        <header style={{
          height: 72,
          borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 32px",
          background: "#ffffff"
        }}>
          {/* Mobile hamburger menu toggle */}
          <button
            className="hamburger-toggle-btn"
            onClick={() => setSidebarOpen(true)}
            style={{
              background: "none",
              border: "none",
              color: "#110709",
              cursor: "pointer",
              display: "none",
              alignItems: "center",
              justifyContent: "center",
              padding: 8,
              borderRadius: 8
            }}
          >
            <FiMenu size={20} />
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: 12, marginLeft: "auto" }}>
            <div style={{ textAlign: "right" }} className="admin-header-profile-text">
              <div style={{ fontSize: 14, fontWeight: 700, color: "#0c0509" }}>
                {user?.displayName || "System Admin"}
              </div>
              <div style={{ fontSize: 11, color: "#524449" }}>
                {user?.email}
              </div>
            </div>
            {/* Avatar circle */}
            <div style={{
              width: 38,
              height: 38,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #e53935 0%, #d81b60 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 800,
              color: "#fff",
              fontSize: 14
            }}>
              {user?.displayName?.charAt(0).toUpperCase() || "A"}
            </div>
          </div>
        </header>

        {/* Content Outlet wrapper */}
        <div style={{
          padding: "36px 40px",
          flexGrow: 1,
          overflowY: "auto",
          background: "#f4f7f6"
        }} className="admin-content-window">
          <Outlet />
        </div>
      </main>

      <style>{`
        @media(max-width: 768px) {
          .admin-sidebar {
            position: fixed !important;
            top: 0 !important;
            bottom: 0 !important;
            left: 0 !important;
            transform: translateX(-100%);
            z-index: 9999 !important;
            box-shadow: 10px 0 30px rgba(0,0,0,0.15) !important;
          }
          .admin-sidebar.open {
            transform: translateX(0);
          }
          .hamburger-toggle-btn {
            display: flex !important;
          }
          .sidebar-close-btn {
            display: flex !important;
          }
          .admin-content-window {
            padding: 24px 16px !important;
          }
          .admin-header-profile-text {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminLayout;
