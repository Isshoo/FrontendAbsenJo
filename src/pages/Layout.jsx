import React from "react";
import Navbar from "../component/Navbar";
import Sidebar from "../component/Sidebar";

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <Navbar />
      <div className="p-0 flex" style={{ minHeight: "100vh" }}>
        <div
          className="p-3 pt-5"
          style={{
            width: "240px",
            borderRight: "1px solid rgb(220, 220, 220)",
          }}
        >
          <Sidebar />
        </div>
      <div className="flex-1 p-5">
        <main
          className="min-h-screen mt-[60px]"
          style={{ minHeight: "100vh", Width: "100%" }}
        >
          {children}
        </main>
      </div>
      </div>
    </React.Fragment>
  );
};

export default Layout;