import React from "react";

function Input({ label, name, onChange, value, error }) {
  return (
    <div className="input-card">
      <label>{label}</label>
      <input
        type={name.includes("password") ? "password" : name}
        name={name}
        onChange={onChange}
        value={value}
      />
      {error && <div className="errors">{error}</div>}
    </div>
  );
}

export default Input;
