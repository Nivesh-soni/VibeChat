import React from "react";

const BorderAnimatedContainer = ({ children }) => {
  return (
    <div className="w-full max-w-[950px] [background:linear-gradient(#172033,#172033)_padding-box,conic-gradient(from_var(--border-angle),transparent_80%,#06b6d4_90%,transparent)_border-box] rounded-2xl border border-transparent animate-custom-border overflow-hidden shadow-2xl">
      <div className="w-full h-full bg-slate-900/10 backdrop-blur-sm p-2 rounded-2xl">
        {children}
      </div>
    </div>
  );
};

export default BorderAnimatedContainer;
