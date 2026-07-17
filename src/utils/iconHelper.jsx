import React from "react";
import * as Icons from "react-icons/fi";

export const renderServiceIcon = (iconString, styleProps = {}) => {
  if (!iconString) return <Icons.FiCpu size={styleProps.size} color={styleProps.color} style={styleProps} />;

  const { size, color, ...cssStyles } = styleProps;

  // If it's a base64 image or URL, render as img tag
  if (iconString.startsWith("data:") || iconString.startsWith("http") || iconString.startsWith("/")) {
    return <img src={iconString} alt="icon" style={{ width: "100%", height: "100%", objectFit: "contain", ...styleProps }} />;
  }

  // If it is a React Icon name, e.g. "FiCpu"
  const IconComponent = Icons[iconString];
  if (IconComponent) {
    return <IconComponent size={size} color={color} style={cssStyles} />;
  }

  // Fallback map based on emojis or string matches to remove raw emojis
  let SelectedIcon = Icons.FiCpu;
  if (iconString === "💳") SelectedIcon = Icons.FiCreditCard;
  else if (iconString === "🏦") SelectedIcon = Icons.FiHome;
  else if (iconString === "⚡") SelectedIcon = Icons.FiActivity;
  else if (iconString === "📈") SelectedIcon = Icons.FiTrendingUp;
  else if (iconString === "🛡️") SelectedIcon = Icons.FiShield;
  else if (iconString === "✈️") SelectedIcon = Icons.FiGlobe;
  else if (iconString === "⚙️") SelectedIcon = Icons.FiSettings;
  else if (iconString === "🌐") SelectedIcon = Icons.FiGlobe;
  else if (iconString === "🛍️") SelectedIcon = Icons.FiShoppingBag;
  else if (iconString === "💻") SelectedIcon = Icons.FiMonitor;
  else if (iconString === "🛠️") SelectedIcon = Icons.FiTool;
  else if (iconString === "🏷️") SelectedIcon = Icons.FiTag;
  else if (iconString === "📱") SelectedIcon = Icons.FiSmartphone;

  return <SelectedIcon size={size} color={color} style={cssStyles} />;
};
