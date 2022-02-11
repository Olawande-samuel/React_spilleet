import React from "react";
import { Outlet } from "react-router-dom";
import Settings from "./Settings";

const SettingsOut = () => {
  return (
    <Settings>
      <Outlet />
    </Settings>
  );
};

export default SettingsOut;
