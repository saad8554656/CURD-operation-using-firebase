import React from "react";
import Menu from "./components/Menu"
import { Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <Menu />
      <Outlet />
    </>
  );
}

export default App;
