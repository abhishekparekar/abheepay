import React from "react";

const Loader = ({ fullScreen = true }) => {
  if (fullScreen) return (
    <div className="loader-wrap">
      <div className="loader-ring" />
      <p style={{ color:"var(--text-muted)", fontSize:14, fontWeight:500 }}>Loading...</p>
    </div>
  );
  return (
    <div style={{ display:"flex", justifyContent:"center", padding:40 }}>
      <div className="loader-ring" />
    </div>
  );
};

export default Loader;
