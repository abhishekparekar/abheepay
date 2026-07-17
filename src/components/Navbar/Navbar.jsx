import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FiMenu, FiX, FiUser, FiLogOut, FiChevronDown,
  FiShield, FiHome, FiGrid, FiLayers, FiUsers, FiMail, FiInfo
} from "react-icons/fi";
import { useAuth } from "../../hooks/useAuth";
import { serviceCategories } from "../../data/servicesData";
import { fetchSolutions } from "../../services/solutionService";
import { getCollection } from "../../firebase/firestore";
import { renderServiceIcon } from "../../utils/iconHelper";

const navLinks = [
  { path: "/",          label: "Home",      icon: FiHome },
  { path: "/services",  label: "Services",  icon: FiGrid },
  { path: "/solutions", label: "Solutions", icon: FiLayers },
  { path: "/partners",  label: "Partners",  icon: FiUsers },
  { path: "/about",     label: "About",     icon: FiInfo },
  { path: "/contact",   label: "Contact",   icon: FiMail },
];

const Navbar = () => {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [userMenu,    setUserMenu]    = useState(false);
  const [servicesMenu, setServicesMenu] = useState(false);
  const [solutionsMenu, setSolutionsMenu] = useState(false);
  const [solutionsList, setSolutionsList] = useState([]);
  const [servicesList, setServicesList] = useState([]);
  const [dynamicServices, setDynamicServices] = useState(serviceCategories);
  const { pathname } = useLocation();
  const navigate     = useNavigate();
  const { user, isAuthenticated, isAdmin, logout, tenantId } = useAuth();

  useEffect(() => {
    const loadServices = async () => {
      try {
        const data = await getCollection(tenantId, "services");
        if (data && data.length > 0) {
          const activeServices = data.filter(item => item.active !== false).sort((a, b) => (a.order || 0) - (b.order || 0));
          setServicesList(activeServices);

          const grouped = { api: [], banking: [], development: [] };
          activeServices.forEach(item => {
            const cat = (item.category || "api").toLowerCase();
            if (grouped[cat]) {
              grouped[cat].push({
                slug: item.id,
                title: item.title,
                icon: item.icon || "💳"
              });
            } else {
              grouped.api.push({
                slug: item.id,
                title: item.title,
                icon: item.icon || "💳"
              });
            }
          });
          setDynamicServices({
            api: { title: "API", items: grouped.api },
            banking: { title: "Banking", items: grouped.banking },
            development: { title: "Development", items: grouped.development }
          });
        } else {
          setDynamicServices(serviceCategories);
          const staticList = [];
          Object.keys(serviceCategories).forEach(catKey => {
            serviceCategories[catKey].items.forEach(item => {
              staticList.push({
                id: item.slug,
                title: item.title,
                icon: item.icon,
                category: catKey
              });
            });
          });
          setServicesList(staticList);
        }
      } catch (err) {
        console.error(err);
        setDynamicServices(serviceCategories);
      }
    };
    loadServices();
  }, [tenantId]);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { setMobileOpen(false); setUserMenu(false); }, [pathname]);

  useEffect(() => {
    const loadSolutions = async () => {
      try {
        const data = await fetchSolutions(tenantId);
        setSolutionsList(data || []);
      } catch (err) {
        console.error(err);
      }
    };
    loadSolutions();
  }, [tenantId]);

  const handleLogout = async () => { await logout(); navigate("/"); };

  const isActive = (p) => p === "/" ? pathname === "/" : pathname.startsWith(p);

  return (
    <>
      {/* ── Navbar ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 999,
        padding: "12px 0",
        background: "#110709",
        borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
        transition: "var(--ease-slow)",
      }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:16, width: "100%", padding: "0 4%", margin: "0 auto", boxSizing: "border-box" }}>

          {/* Logo */}
          <Link to="/" style={{ display:"flex", alignItems:"center", gap:10, flexShrink:0, textDecoration: "none" }}>
            <div style={{
              width: 38, height: 38, borderRadius: 10,
              background: "#e53935",
              display:"flex", alignItems:"center", justifyContent:"center",
              boxShadow: "0 4px 18px rgba(229,57,53,0.3)",
              flexShrink: 0,
            }}>
              <FiShield size={20} color="#fff" />
            </div>
            <div style={{ lineHeight: 1.1 }}>
              <div style={{
                fontFamily:"'Outfit',sans-serif", fontWeight:900, fontSize:18,
                color: "#ffffff",
                letterSpacing:"-0.01em",
              }}>SiD Pay</div>
              <div style={{ fontSize:8.5, color:"rgba(255,255,255,0.6)", fontWeight:700, letterSpacing:"0.08em" }}>BY SHASHWAT</div>
            </div>
          </Link>

          {/* Desktop Links */}
          <ul style={{ display:"flex", gap:2, alignItems:"center" }} className="nav-desktop">
            {navLinks.map(({ path, label }) => {
              const active = isActive(path);
              if (label === "Services") {
                return (
                  <li
                    key={path}
                    onMouseEnter={() => setServicesMenu(true)}
                    onMouseLeave={() => setServicesMenu(false)}
                    style={{ position: "relative" }}
                  >
                    <button
                      onClick={() => navigate("/services")}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 5,
                        padding: "7px 14px",
                        borderRadius: "var(--r-full)",
                        fontSize: 14,
                        fontWeight: 500,
                        color: active ? "#fff" : "var(--text-secondary)",
                        background: active ? "var(--gradient-primary)" : "transparent",
                        boxShadow: active ? "0 2px 12px rgba(229,57,53,0.35)" : "none",
                        transition: "var(--ease)",
                        cursor: "pointer",
                        border: "none"
                      }}
                      onMouseEnter={e => { if (!active) { e.currentTarget.style.color = "var(--text-primary)"; e.currentTarget.style.background = "rgba(229,57,53,0.1)"; } }}
                      onMouseLeave={e => { if (!active) { e.currentTarget.style.color = "var(--text-secondary)"; e.currentTarget.style.background = "transparent"; } }}
                    >
                      <span>{label}</span>
                      <FiChevronDown size={12} style={{ transform: servicesMenu ? "rotate(180deg)" : "none", transition: "transform 0.2s ease" }} />
                    </button>

                    {/* Megamenu dropdown */}
                    {servicesMenu && (
                      <div style={{
                        position: "absolute",
                        top: "100%",
                        left: "50%",
                        transform: "translateX(-50%)",
                        paddingTop: 14,
                        zIndex: 1000
                      }}>
                        {servicesList.length <= 6 ? (
                          /* Compact dropdown list (e.g. 3 services created by the user) */
                          <div style={{
                            background: "#0c0509",
                            border: "1px solid rgba(229,57,53,0.22)",
                            borderRadius: 20,
                            padding: "16px",
                            width: 320,
                            display: "flex",
                            flexDirection: "column",
                            gap: 8,
                            boxShadow: "0 20px 60px rgba(0,0,0,0.8), 0 0 40px rgba(229,57,53,0.06)",
                            animation: "fadeIn 0.2s cubic-bezier(0.4, 0, 0.2, 1) both",
                            boxSizing: "border-box"
                          }}>
                            {servicesList.map((item, idx) => (
                              <Link
                                key={idx}
                                to={`/services/${item.id || item.slug}`}
                                onClick={() => setServicesMenu(false)}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 12,
                                  padding: "8px 12px",
                                  borderRadius: 12,
                                  color: "var(--text-secondary)",
                                  textDecoration: "none",
                                  transition: "all 0.2s ease"
                                }}
                                onMouseEnter={e => {
                                  e.currentTarget.style.color = "#fff";
                                  e.currentTarget.style.background = "rgba(229,57,53,0.08)";
                                }}
                                onMouseLeave={e => {
                                  e.currentTarget.style.color = "var(--text-secondary)";
                                  e.currentTarget.style.background = "transparent";
                                }}
                              >
                                <div style={{ 
                                  width: 28, 
                                  height: 28, 
                                  borderRadius: 8, 
                                  background: "rgba(255,255,255,0.05)", 
                                  display: "flex", 
                                  alignItems: "center", 
                                  justifyContent: "center",
                                  flexShrink: 0
                                }}>
                                  {renderServiceIcon(item.icon, { size: 14, height: "14px", width: "auto" })}
                                </div>
                                <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
                                  <span style={{ fontSize: 13.5, fontWeight: 700, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                    {item.title}
                                  </span>
                                  <span style={{ fontSize: 10, color: "var(--red-light)", textTransform: "uppercase", letterSpacing: "0.04em", marginTop: 2 }}>
                                    {item.category || "API"}
                                  </span>
                                </div>
                              </Link>
                            ))}
                          </div>
                        ) : (
                          /* Large megamenu dropdown list */
                          <div style={{
                            background: "#0c0509",
                            border: "1px solid rgba(229,57,53,0.22)",
                            borderRadius: 20,
                            padding: "32px 36px",
                            width: 860,
                            display: "grid",
                            gridTemplateColumns: "repeat(3, 1fr)",
                            gap: 28,
                            boxShadow: "0 20px 60px rgba(0,0,0,0.8), 0 0 40px rgba(229,57,53,0.06)",
                            animation: "fadeIn 0.2s cubic-bezier(0.4, 0, 0.2, 1) both"
                          }}>
                            {Object.keys(dynamicServices).map(catKey => {
                              const cat = dynamicServices[catKey];
                              return (
                                <div key={catKey}>
                                  <h4 style={{
                                    fontSize: 13,
                                    fontWeight: 800,
                                    color: "var(--red-light)",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.06em",
                                    marginBottom: 16,
                                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                                    paddingBottom: 6
                                  }}>
                                    {cat.title}
                                  </h4>
                                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                                    {cat.items.map((item, idx) => (
                                      <Link
                                        key={idx}
                                        to={`/services/${item.slug}`}
                                        onClick={() => setServicesMenu(false)}
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                          gap: 8,
                                          fontSize: 13.5,
                                          color: "var(--text-secondary)",
                                          textDecoration: "none",
                                          transition: "all 0.2s ease"
                                        }}
                                        onMouseEnter={e => {
                                          e.currentTarget.style.color = "#fff";
                                          e.currentTarget.style.paddingLeft = "4px";
                                        }}
                                        onMouseLeave={e => {
                                          e.currentTarget.style.color = "var(--text-secondary)";
                                          e.currentTarget.style.paddingLeft = "0";
                                        }}
                                      >
                                        <span style={{ width: 14, height: 14, color: "var(--red-light)", display: "flex", alignItems: "center" }}>
                                          {renderServiceIcon(item.icon, { size: 14 })}
                                        </span>
                                        <span>{item.title}</span>
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    )}
                  </li>
                );
              }
              if (label === "Solutions") {
                return (
                  <li
                    key={path}
                    onMouseEnter={() => setSolutionsMenu(true)}
                    onMouseLeave={() => setSolutionsMenu(false)}
                    style={{ position: "relative" }}
                  >
                    <button
                      onClick={() => navigate("/solutions")}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 5,
                        padding: "7px 14px",
                        borderRadius: "var(--r-full)",
                        fontSize: 14,
                        fontWeight: 500,
                        color: active ? "#fff" : "var(--text-secondary)",
                        background: active ? "var(--gradient-primary)" : "transparent",
                        boxShadow: active ? "0 2px 12px rgba(229,57,53,0.35)" : "none",
                        transition: "var(--ease)",
                        cursor: "pointer",
                        border: "none"
                      }}
                      onMouseEnter={e => { if (!active) { e.currentTarget.style.color = "var(--text-primary)"; e.currentTarget.style.background = "rgba(229,57,53,0.1)"; } }}
                      onMouseLeave={e => { if (!active) { e.currentTarget.style.color = "var(--text-secondary)"; e.currentTarget.style.background = "transparent"; } }}
                    >
                      <span>{label}</span>
                      <FiChevronDown size={12} style={{ transform: solutionsMenu ? "rotate(180deg)" : "none", transition: "transform 0.2s ease" }} />
                    </button>

                    {/* Solutions dropdown list */}
                    {solutionsMenu && (
                      <div style={{
                        position: "absolute",
                        top: "100%",
                        left: "50%",
                        transform: "translateX(-50%)",
                        paddingTop: 14,
                        zIndex: 1000
                      }}>
                        <div style={{
                          background: "#0c0509",
                          border: "1px solid rgba(229,57,53,0.22)",
                          borderRadius: 20,
                          padding: "20px 24px",
                          width: 280,
                          display: "flex",
                          flexDirection: "column",
                          gap: 12,
                          boxShadow: "0 20px 60px rgba(0,0,0,0.8), 0 0 40px rgba(229,57,53,0.06)",
                          animation: "fadeIn 0.2s cubic-bezier(0.4, 0, 0.2, 1) both"
                        }}>
                          {solutionsList.length === 0 ? (
                            <div style={{ fontSize: 13, color: "var(--text-muted)", textAlign: "center", padding: "10px 0" }}>
                              No solutions configured
                            </div>
                          ) : (
                            solutionsList.map((item, idx) => (
                              <Link
                                key={idx}
                                to={`/solutions/${item.id}`}
                                onClick={() => setSolutionsMenu(false)}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 8,
                                  fontSize: 13.5,
                                  color: "var(--text-secondary)",
                                  textDecoration: "none",
                                  transition: "all 0.2s ease",
                                  padding: "6px 8px",
                                  borderRadius: 8
                                }}
                                onMouseEnter={e => {
                                  e.currentTarget.style.color = "#fff";
                                  e.currentTarget.style.background = "rgba(229,57,53,0.08)";
                                }}
                                onMouseLeave={e => {
                                  e.currentTarget.style.color = "var(--text-secondary)";
                                  e.currentTarget.style.background = "transparent";
                                }}
                              >
                                <div style={{ 
                                  width: 22, 
                                  height: 22, 
                                  borderRadius: 6, 
                                  background: "rgba(255,255,255,0.05)", 
                                  display: "flex", 
                                  alignItems: "center", 
                                  justifyContent: "center",
                                  flexShrink: 0
                                }}>
                                  {renderServiceIcon(item.icon, { size: 12, height: "12px", width: "auto" })}
                                </div>
                                <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.title}</span>
                              </Link>
                            ))
                          )}
                        </div>
                      </div>
                    )}
                  </li>
                );
              }
              return (
                <li key={path}>
                  <Link to={path} style={{
                    display:"block",
                    padding:"7px 14px",
                    borderRadius:"var(--r-full)",
                    fontSize:14, fontWeight:500,
                    color: active ? "#fff" : "var(--text-secondary)",
                    background: active ? "var(--gradient-primary)" : "transparent",
                    boxShadow: active ? "0 2px 12px rgba(229,57,53,0.35)" : "none",
                    transition:"var(--ease)",
                  }}
                  onMouseEnter={e=>{if(!active){e.currentTarget.style.color="var(--text-primary)";e.currentTarget.style.background="rgba(229,57,53,0.1)";}}}
                  onMouseLeave={e=>{if(!active){e.currentTarget.style.color="var(--text-secondary)";e.currentTarget.style.background="transparent";}}}>
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Right */}
          <div style={{ display:"flex", alignItems:"center", gap:10, flexShrink:0 }}>
            {isAuthenticated ? (
              <div style={{ position:"relative" }}>
                <button onClick={()=>setUserMenu(!userMenu)} style={{
                  display:"flex", alignItems:"center", gap:8, padding:"7px 12px",
                  borderRadius:"var(--r-full)", background:"#120609",
                  border:"1px solid rgba(255,255,255,0.08)", color:"#ffffff",
                  fontSize:13, cursor:"pointer", transition:"var(--ease)",
                }}>
                  <div style={{
                    width:22, height:22, borderRadius:"50%",
                    background:"#e53935",
                    color: "#fff",
                    display:"flex", alignItems:"center", justifyContent:"center",
                    fontSize:11, fontWeight:800,
                  }}>
                    {(user?.displayName || user?.email || "U")[0].toUpperCase()}
                  </div>
                  <span style={{ maxWidth:90, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", fontWeight: 600 }} className="nav-desktop">
                    {user?.displayName || user?.email?.split("@")[0]}
                  </span>
                  <FiChevronDown size={13} style={{ transition:"var(--ease)", transform: userMenu?"rotate(180deg)":"none", color: "rgba(255,255,255,0.7)" }} />
                </button>
                {userMenu && (
                  <div style={{
                    position:"absolute", right:0, top:"calc(100% + 10px)",
                    background:"#140a0e", border:"1px solid var(--border)",
                    borderRadius:"var(--r-md)", padding:6,
                    minWidth:180, boxShadow:"var(--shadow-lg)",
                    animation:"fadeIn 0.18s ease",
                    zIndex: 1000
                  }}>
                    <div style={{ padding:"10px 14px 8px", borderBottom:"1px solid var(--border)", marginBottom:4 }}>
                      <div style={{ display: "flex", alignItems: "center", justifySelf: "space-between", gap: 6 }}>
                        <div style={{ fontSize:13, fontWeight:600 }}>{user?.displayName || "User"}</div>
                        {isAdmin && <span style={{ fontSize: 9, fontWeight: 700, color: "#fff", background: "var(--gradient-primary)", padding: "1px 5px", borderRadius: 4 }}>ADMIN</span>}
                      </div>
                      <div style={{ fontSize:11, color:"var(--text-muted)", marginTop:2 }}>{user?.email}</div>
                    </div>
                    {isAdmin && (
                      <Link to="/admin" style={{
                        display:"flex",
                        alignItems:"center",
                        gap:8,
                        padding:"10px 14px",
                        borderRadius:"var(--r-xs)",
                        color:"#fff",
                        fontSize:13,
                        cursor:"pointer",
                        transition:"var(--ease)",
                        textDecoration:"none"
                      }}
                      onMouseEnter={e=>{e.currentTarget.style.background="rgba(229,57,53,0.15)";}}
                      onMouseLeave={e=>{e.currentTarget.style.background="none";}}>
                        <FiGrid size={14} style={{ color: "var(--red-light)" }} /> Admin Portal
                      </Link>
                    )}
                    <button onClick={handleLogout} style={{
                      width:"100%", display:"flex", alignItems:"center", gap:8, padding:"10px 14px",
                      borderRadius:"var(--r-xs)", color:"var(--red-light)",
                      fontSize:13, cursor:"pointer", background:"none", border:"none",
                      transition:"var(--ease)", textAlign:"left",
                    }}
                    onMouseEnter={e=>{e.currentTarget.style.background="rgba(229,57,53,0.1)";}}
                    onMouseLeave={e=>{e.currentTarget.style.background="none";}}>
                      <FiLogOut size={15} /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login" className="nav-desktop">
                  <button className="btn-outline" style={{ padding:"8px 20px", fontSize:14 }}>Sign In</button>
                </Link>
                <Link to="/register">
                  <button className="btn-gradient" style={{ padding:"8px 20px", fontSize:14 }}>Get Started</button>
                </Link>
              </>
            )}
            {/* Mobile Toggle */}
            <button onClick={()=>setMobileOpen(!mobileOpen)} className="nav-toggle" style={{
              width:38, height:38, borderRadius:"var(--r-sm)",
              background:"rgba(229,57,53,0.1)", border:"1px solid var(--border-hover)",
              color:"var(--text-primary)", display:"flex", alignItems:"center", justifyContent:"center",
              cursor:"pointer",
            }}>
              {mobileOpen ? <FiX size={20}/> : <FiMenu size={20}/>}
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile Drawer ── */}
      {mobileOpen && (
        <div style={{
          position:"fixed", inset:0, zIndex:998,
          background:"rgba(8,3,6,0.98)", backdropFilter:"blur(24px)",
          WebkitBackdropFilter:"blur(24px)",
          paddingTop:72, animation:"fadeIn 0.2s ease",
          display:"flex", flexDirection:"column",
        }}>
          <div className="container" style={{ flex:1 }}>
            <div style={{ marginBottom:8, paddingBottom:16, borderBottom:"1px solid var(--border)" }}>
              <div style={{ fontSize:11, fontWeight:700, color:"var(--text-muted)", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:12 }}>Navigation</div>
              {navLinks.map(({ path, label, icon: Icon }) => {
                const active = isActive(path);
                return (
                  <Link key={path} to={path} style={{
                    display:"flex", alignItems:"center", gap:12,
                    padding:"13px 16px", borderRadius:"var(--r-md)",
                    color: active ? "#fff" : "var(--text-secondary)",
                    background: active ? "rgba(229,57,53,0.15)" : "transparent",
                    borderLeft: active ? "3px solid var(--red)" : "3px solid transparent",
                    fontSize:16, fontWeight: active ? 600 : 400,
                    marginBottom:4, transition:"var(--ease)",
                  }}>
                    <Icon size={18} style={{ color: active ? "var(--red-light)" : "var(--text-muted)" }} />
                    {label}
                  </Link>
                );
              })}
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:10, paddingTop:16 }}>
              {!isAuthenticated ? (
                <>
                  <Link to="/login"><button className="btn-outline" style={{ width:"100%", padding:"13px" }}>Sign In</button></Link>
                  <Link to="/register"><button className="btn-gradient" style={{ width:"100%", padding:"13px" }}>Create Account</button></Link>
                </>
              ) : (
                <>
                  {isAdmin && (
                    <Link to="/admin" style={{ width:"100%" }}>
                      <button className="btn-gradient" style={{ width:"100%", padding:"13px", marginBottom:8, gap:8 }}>
                        <FiGrid size={16} /> Admin Portal
                      </button>
                    </Link>
                  )}
                  <button className="btn-outline" onClick={handleLogout} style={{ width:"100%", padding:"13px", color:"var(--red-light)", borderColor:"var(--red)" }}>
                    <FiLogOut size={16} style={{ marginRight:8 }} /> Sign Out
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media(min-width:769px){ .nav-toggle{display:none!important;} }
        @media(max-width:768px){ .nav-desktop{display:none!important;} }
      `}</style>
    </>
  );
};

export default Navbar;
