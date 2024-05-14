import React from "react";

function LMInput({ type, placeholder, onKeyUpToChild, onChangeTochild }) {
  console.log(onKeyUpToChild,"kjhjhhj");
  return (
    <input
      className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
      type={type}
      placeholder={placeholder}
      onKeyUp={onKeyUpToChild}
      onChange={onChangeTochild}
    />
  );
}

export default LMInput;
