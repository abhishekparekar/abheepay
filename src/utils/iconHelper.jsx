import React from "react";
import * as Icons from "react-icons/fi";

export const renderServiceIcon = (iconString, style = {}) => {
  if (!iconString) return <Icons.FiCpu {...style} />;

  // If it's a base64 image or URL, render as img tag
  if (iconString.startsWith("data:") || iconString.startsWith("http") || iconString.startsWith("/")) {
    return <img src={iconString} alt="icon" style={{ width: "100%", height: "100%", objectFit: "contain", ...style }} />;
  }

  // If it is a React Icon name, e.g. "FiCpu"
  const IconComponent = Icons[iconString];
  if (IconComponent) {
    return <IconComponent {...style} />;
  }

  // Fallback map based on emojis or string matches to remove raw emojis
  if (iconString === "💳") return <Icons.FiCreditCard {...style} />;
  if (iconString === "🏦") return <Icons.FiHome {...style} />;
  if (iconString === "⚡") return <Icons.FiActivity {...style} />;
  if (iconString === "📈") return <Icons.FiTrendingUp {...style} />;
  if (iconString === "🛡️") return <Icons.FiShield {...style} />;
  if (iconString === "✈️") return <Icons.FiGlobe {...style} />;
  if (iconString === "⚙️") return <Icons.FiSettings {...style} />;
  if (iconString === "🌐") return <Icons.FiGlobe {...style} />;
  if (iconString === "🛍️") return <Icons.FiShoppingBag {...style} />;
  if (iconString === "💻") return <Icons.FiMonitor {...style} />;
  if (iconString === "🛠️") return <Icons.FiTool {...style} />;
  if (iconString === "🏷️") return <Icons.FiTag {...style} />;
  if (iconString === "📱") return <Icons.FiSmartphone {...style} />;

  return <Icons.FiCpu {...style} />;
};
