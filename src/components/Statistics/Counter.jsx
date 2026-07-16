import React, { useState, useEffect, useRef } from "react";
import CountUp from "react-countup";

const counters = [
  { end:10000, suffix:"K+",  prefix:"",  label:"Businesses Trust Us", divisor:1000 },
  { end:2,     suffix:"B+",  prefix:"$", label:"Transactions Processed" },
  { end:99.9,  suffix:"%",   prefix:"",  label:"Uptime Guaranteed",    decimals:1  },
  { end:150,   suffix:"+",   prefix:"",  label:"Countries Supported"                },
];

const Counter = () => {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if(e.isIntersecting) setInView(true); }, { threshold:0.3 });
    if(ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} style={{
      padding:"80px 0",
      background:"linear-gradient(135deg, rgba(229,57,53,0.06) 0%, rgba(216,27,96,0.04) 100%)",
      borderTop:"1px solid var(--border)", borderBottom:"1px solid var(--border)",
    }}>
      <div className="container">
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:24 }} className="counter-grid">
          {counters.map(({ end, suffix, prefix, label, decimals=0 }, i) => (
            <div key={i} style={{
              textAlign:"center", padding:"32px 20px",
              background:"rgba(255,255,255,0.03)",
              border:"1px solid var(--border-card)",
              borderRadius:"var(--r-lg)",
              transition:"var(--ease)",
            }}
            onMouseEnter={e=>{e.currentTarget.style.background="rgba(229,57,53,0.08)";e.currentTarget.style.borderColor="var(--border-hover)";e.currentTarget.style.transform="translateY(-4px)";}}
            onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,0.03)";e.currentTarget.style.borderColor="var(--border-card)";e.currentTarget.style.transform="translateY(0)";}}>
              <div style={{
                fontFamily:"'Outfit',sans-serif", fontWeight:900,
                fontSize:"clamp(1.8rem,3vw,2.6rem)", lineHeight:1,
                background:"var(--gradient-text)",
                WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
                marginBottom:10,
              }}>
                {prefix}
                {inView && (
                  <CountUp end={end} duration={2.5} decimals={decimals} delay={i * 0.15} />
                )}
                {suffix}
              </div>
              <div style={{ fontSize:14, color:"var(--text-muted)", fontWeight:500 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media(max-width:768px){ .counter-grid{grid-template-columns:repeat(2,1fr)!important;} }
        @media(max-width:400px){ .counter-grid{grid-template-columns:1fr!important;} }
      `}</style>
    </section>
  );
};

export default Counter;
