import React, { useEffect, useState } from "react";
import { FiArrowUp } from "react-icons/fi";

const ScrollTop = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const fn = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top:0, behavior:"smooth" })}
      aria-label="Scroll to top"
      style={{
        position:"fixed", bottom:24, right:24, zIndex:999,
        width:48, height:48, borderRadius:"50%",
        background:"var(--gradient-primary)",
        border:"none", color:"#fff",
        display:"flex", alignItems:"center", justifyContent:"center",
        boxShadow:"0 4px 20px rgba(229,57,53,0.5)",
        cursor:"pointer", transition:"all 0.3s cubic-bezier(0.4,0,0.2,1)",
        opacity: show ? 1 : 0,
        transform: show ? "scale(1)" : "scale(0.6)",
        pointerEvents: show ? "auto" : "none",
      }}
      onMouseEnter={e=>{ e.currentTarget.style.transform="scale(1.12)"; }}
      onMouseLeave={e=>{ e.currentTarget.style.transform="scale(1)"; }}
    >
      <FiArrowUp size={20}/>
    </button>
  );
};

export default ScrollTop;
