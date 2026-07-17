import React, { useState } from "react";
import {
  FiCpu, FiCreditCard, FiHome, FiActivity, FiShield, FiGrid,
  FiVolume2, FiSmartphone, FiWifi, FiDollarSign, FiTrendingUp,
  FiUsers, FiLayers, FiSend, FiBarChart2, FiZap, FiAward,
  FiPackage, FiGlobe, FiDatabase, FiServer, FiLock, FiKey,
  FiBriefcase, FiShoppingCart, FiPieChart, FiRepeat, FiLink,
  FiFileText, FiCheck, FiStar, FiHeart, FiMap, FiPhone,
  FiMail, FiCamera, FiImage, FiBell, FiSettings, FiTool,
  FiMonitor, FiPrinter, FiTablet, FiCloudLightning,
} from "react-icons/fi";

/* All available icons for the admin picker */
export const ICON_MAP = {
  FiCpu, FiCreditCard, FiHome, FiActivity, FiShield, FiGrid,
  FiVolume2, FiSmartphone, FiWifi, FiDollarSign, FiTrendingUp,
  FiUsers, FiLayers, FiSend, FiBarChart2, FiZap, FiAward,
  FiPackage, FiGlobe, FiDatabase, FiServer, FiLock, FiKey,
  FiBriefcase, FiShoppingCart, FiPieChart, FiRepeat, FiLink,
  FiFileText, FiCheck, FiStar, FiHeart, FiMap, FiPhone,
  FiMail, FiCamera, FiImage, FiBell, FiSettings, FiTool,
  FiMonitor, FiPrinter, FiTablet, FiCloudLightning,
};

/**
 * renderIcon — use this everywhere to render a service/solution icon.
 * Handles both image URLs (data: / http) and ICON_MAP named icons.
 */
export const renderIcon = (iconValue, size = 22, color = "#e53935") => {
  if (!iconValue) return <FiCpu size={size} color={color} />;
  if (iconValue.startsWith("data:") || iconValue.startsWith("http") || iconValue.startsWith("/")) {
    return <img src={iconValue} alt="icon" style={{ width: size, height: size, objectFit: "contain", display: "block" }} />;
  }
  const Icon = ICON_MAP[iconValue] || FiCpu;
  return <Icon size={size} color={color} />;
};

/**
 * IconPicker — a compact visual grid for admin to pick an icon or upload an image.
 * Props:
 *   value      : current selected icon name or base64/URL string
 *   onChange   : (newValue: string) => void
 */
const IconPicker = ({ value, onChange }) => {
  const [search, setSearch] = useState("");

  const isImage = value && (value.startsWith("data:") || value.startsWith("http") || value.startsWith("/"));
  const filtered = Object.keys(ICON_MAP).filter(k =>
    k.toLowerCase().includes(search.toLowerCase().replace("fi", "").trim())
  );

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => onChange(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <div style={{ border: "1.5px solid rgba(0,0,0,0.1)", borderRadius: 12, overflow: "hidden", background: "#f9fafb" }}>

      {/* Current selection preview */}
      <div style={{ padding: "12px 14px", borderBottom: "1px solid rgba(0,0,0,0.07)", display: "flex", alignItems: "center", gap: 12, background: "#fff" }}>
        <div style={{
          width: 40, height: 40, borderRadius: 10,
          background: "rgba(229,57,53,0.08)", border: "1px solid rgba(229,57,53,0.15)",
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
        }}>
          {renderIcon(value, 20, "#e53935")}
        </div>
        <div>
          <div style={{ fontSize: 11, color: "#77676c", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>Selected Icon</div>
          <div style={{ fontSize: 13, color: "#0c0509", fontWeight: 500, marginTop: 1 }}>
            {isImage ? "Custom Image" : (value || "None selected")}
          </div>
        </div>
        {isImage && (
          <button type="button" onClick={() => onChange("FiCpu")} style={{ marginLeft: "auto", fontSize: 11, color: "#e53935", background: "none", border: "none", cursor: "pointer", fontWeight: 600 }}>
            Remove Image
          </button>
        )}
      </div>

      {/* Upload image option */}
      <div style={{ padding: "10px 14px", borderBottom: "1px solid rgba(0,0,0,0.06)", display: "flex", alignItems: "center", gap: 10, background: "#fff" }}>
        <span style={{ fontSize: 12, color: "#524449", fontWeight: 600, flexShrink: 0 }}>📎 Upload Image:</span>
        <input
          type="file" accept="image/*"
          onChange={handleFileUpload}
          style={{ fontSize: 12.5, color: "#524449", flex: 1, cursor: "pointer" }}
        />
      </div>

      {/* Search */}
      <div style={{ padding: "8px 14px", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search icons… (e.g. credit, phone, bank)"
          style={{ width: "100%", padding: "7px 10px", border: "1px solid rgba(0,0,0,0.1)", borderRadius: 8, fontSize: 12.5, color: "#0c0509", background: "#fff", boxSizing: "border-box", outline: "none" }}
        />
      </div>

      {/* Icon Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(44px, 1fr))", gap: 4, padding: 10, maxHeight: 200, overflowY: "auto" }}>
        {filtered.map((name) => {
          const Icon = ICON_MAP[name];
          const isSelected = value === name;
          return (
            <button
              key={name}
              type="button"
              title={name}
              onClick={() => onChange(name)}
              style={{
                width: 44, height: 44, borderRadius: 8, border: "none",
                background: isSelected ? "rgba(229,57,53,0.12)" : "transparent",
                outline: isSelected ? "2px solid #e53935" : "none",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", transition: "all 0.15s ease", flexShrink: 0
              }}
              onMouseEnter={e => { if (!isSelected) e.currentTarget.style.background = "rgba(0,0,0,0.05)"; }}
              onMouseLeave={e => { if (!isSelected) e.currentTarget.style.background = "transparent"; }}
            >
              <Icon size={18} color={isSelected ? "#e53935" : "#524449"} />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default IconPicker;
