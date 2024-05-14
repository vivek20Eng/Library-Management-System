import React from "react";

function LMButton({ type, onClick, children }) {
  return (
    <button
      className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default LMButton;
