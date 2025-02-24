import React from "react";
import Input from "antd/es/input/Input";
import { EyeTwoTone, EyeInvisibleOutlined } from "@ant-design/icons";
function CustomInput({ label, name, onChange, value, error }) {
  return (
    <div className="input-card">
      <label className="label">{label}</label>
      {name.includes("password") ? (
        <Input.Password
          size="large"
          name={name}
          onChange={onChange}
          value={value}
          className="input-field"
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
        />
      ) : (
        <Input
          size="large"
          type={name}
          name={name}
          onChange={onChange}
          value={value}
          className="input-field"

          // iconRender={(visible) =>
          //   visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          // }
        />
      )}

      {error && <div className="errors">{error}</div>}
    </div>
  );
}

export default CustomInput;
