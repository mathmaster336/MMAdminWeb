import React from "react";
import NavBar from "../NavBar/NavBar";
import { Outlet } from "react-router-dom";

function AdminLayput() {
  return (
    <div className="min-h-screen w-full flex flex-col">
      <NavBar />
      <div className="flex-grow">
       
        {/* add pt-16 to push content below sticky NavBar */}
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayput;
