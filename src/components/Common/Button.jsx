import React from "react";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  onClick,
  type = "button",
  disabled = false,
  loading = false,
  className = "",
  ...props
}) => {
  const styles = {
    base: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      fontFamily: "inherit",
      fontWeight: 600,
      borderRadius: "var(--radius-full)",
      transition: "var(--transition)",
      cursor: disabled || loading ? "not-allowed" : "pointer",
      opacity: disabled || loading ? 0.6 : 1,
      border: "none",
      outline: "none",
      textDecoration: "none",
      whiteSpace: "nowrap",
    },
    sizes: {
      sm: { padding: "8px 20px", fontSize: "14px" },
      md: { padding: "12px 28px", fontSize: "15px" },
      lg: { padding: "16px 36px", fontSize: "16px" },
      xl: { padding: "18px 44px", fontSize: "17px" },
    },
    variants: {
      primary: {
        background: "linear-gradient(135deg, var(--primary), var(--secondary))",
        color: "#fff",
        boxShadow: "0 4px 20px rgba(99,102,241,0.4)",
      },
      secondary: {
        background: "var(--bg-glass)",
        color: "var(--text-primary)",
        border: "1px solid var(--border)",
        backdropFilter: "blur(12px)",
      },
      outline: {
        background: "transparent",
        color: "var(--primary-light)",
        border: "1px solid var(--primary)",
      },
      ghost: {
        background: "transparent",
        color: "var(--text-secondary)",
      },
      danger: {
        background: "linear-gradient(135deg, #ef4444, #dc2626)",
        color: "#fff",
        boxShadow: "0 4px 20px rgba(239,68,68,0.4)",
      },
    },
  };

  const handleMouseEnter = (e) => {
    if (disabled || loading) return;
    if (variant === "primary") {
      e.currentTarget.style.transform = "translateY(-2px)";
      e.currentTarget.style.boxShadow = "0 8px 32px rgba(99,102,241,0.6)";
    } else if (variant === "secondary") {
      e.currentTarget.style.background = "var(--bg-glass-hover)";
    } else if (variant === "outline") {
      e.currentTarget.style.background = "rgba(99,102,241,0.1)";
    }
  };

  const handleMouseLeave = (e) => {
    if (disabled || loading) return;
    Object.assign(e.currentTarget.style, styles.variants[variant]);
    e.currentTarget.style.transform = "translateY(0)";
  };

  return (
    <button
      type={type}
      onClick={disabled || loading ? undefined : onClick}
      style={{ ...styles.base, ...styles.sizes[size], ...styles.variants[variant] }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={className}
      {...props}
    >
      {loading ? (
        <>
          <span
            style={{
              width: 16,
              height: 16,
              border: "2px solid rgba(255,255,255,0.3)",
              borderTopColor: "#fff",
              borderRadius: "50%",
              display: "inline-block",
              animation: "spin 0.8s linear infinite",
            }}
          />
          Loading...
        </>
      ) : children}
    </button>
  );
};

export default Button;
